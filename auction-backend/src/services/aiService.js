const https = require('https');
const http = require('http');

// Configuration constants
const AI_CONFIG = {
  TEMPERATURE: 0.7,
  MAX_TOKENS: 500,
  GEMINI_API_VERSION: 'v1beta',
  OLLAMA_DEFAULT_URL: 'http://localhost:11434',
  OLLAMA_DEFAULT_PORT: 11434,
  HTTPS_PORT: 443,
  OLLAMA_MODEL: 'gpt-oss:20b'
};

class AIService {
  constructor() {
    this.useOllama = process.env.USE_OLLAMA === 'true';
    this.geminiKey = process.env.GEMINI_API_KEY;
    this.geminiModel = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
    this.ollamaUrl = process.env.OLLAMA_URL || AI_CONFIG.OLLAMA_DEFAULT_URL;
    this.ollamaModel = AI_CONFIG.OLLAMA_MODEL;
  }

  isConfigured() {
    if (this.useOllama) {
      return true;
    }
    return !!this.geminiKey;
  }

  getProvider() {
    if (this.useOllama) return 'ollama';
    if (this.geminiKey) return 'gemini';
    return null;
  }

  async generateSellerResponse(auction, questionText, conversationHistory = []) {
    const systemPrompt = this.buildSellerPrompt(auction);

    if (this.useOllama) {
      return this.callOllama(systemPrompt, questionText, conversationHistory);
    } else if (this.geminiKey) {
      return this.callGemini(systemPrompt, questionText, conversationHistory);
    } else {
      throw new Error('No AI provider configured. Set GEMINI_API_KEY or USE_OLLAMA=true');
    }
  }

  buildConversationContext(conversationHistory) {
    if (!conversationHistory || conversationHistory.length === 0) {
      return '';
    }

    const context = conversationHistory.map(q => {
      let entry = `Buyer: ${q.question_text}`;
      if (q.answer_text) {
        entry += `\nSeller: ${q.answer_text}`;
      }
      return entry;
    }).join('\n\n');

    return `\n\nPrevious conversation:\n${context}\n`;
  }

  buildSellerPrompt(auction) {
    // Format end date if available
    const endDate = auction.end_date || auction.closing_time;
    const endDateStr = endDate ? new Date(endDate).toLocaleDateString('en-NZ', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: '2-digit'
    }) : 'Not specified';

    // Format shipping info
    let shippingInfo = 'Contact seller';
    if (auction.shipping_options && auction.shipping_options.length > 0) {
      shippingInfo = auction.shipping_options.map(s => `${s.method}: $${s.price}`).join(', ');
    } else if (auction.shipping_price !== undefined) {
      shippingInfo = auction.shipping_price > 0 ? `$${auction.shipping_price}` : 'Free';
    }

    // Get seller name if populated
    const sellerName = auction.seller_id?.username || 'Seller';

    return `You are ${sellerName}, a friendly seller on Trade Me (New Zealand's online auction marketplace). You are selling the following item:

ITEM DETAILS:
- Title: ${auction.title}
- Description: ${auction.description}
- Category: ${auction.category}
- Condition: ${auction.condition || 'Not specified'}
- Colour: ${auction.colour || 'Not specified'}
- Location: ${auction.location}

PRICING:
- Starting Price: $${auction.start_price}
- Reserve Price: $${auction.reserve_price} (DO NOT reveal the exact reserve - just say "there is a reserve" if asked)
- Buy Now Price: ${auction.buy_now_price ? `$${auction.buy_now_price}` : 'Not available'}
- Current Bid: ${auction.current_bid ? `$${auction.current_bid}` : 'No bids yet'}
- Reserve Met: ${auction.reserve_met ? 'Yes' : 'No'}

AUCTION INFO:
- Closing: ${endDateStr}
- Number of Bids: ${auction.bid_count || 0}
- Watchers: ${auction.watchers_count || 0}
- Status: ${auction.status || 'Active'}

SHIPPING & PAYMENT:
- Shipping: ${shippingInfo}
- Payment Methods: ${auction.payment_methods?.length > 0 ? auction.payment_methods.join(', ') : 'Contact seller'}

INSTRUCTIONS:
- Respond helpfully and concisely as if you are the actual seller
- Keep responses brief (1-3 sentences)
- Be friendly but professional
- NEVER reveal the exact reserve price - only say "there is a reserve" or "reserve not yet met"
- Only answer based on the information provided - if you don't know something, say so politely`;
  }

  async callGemini(systemPrompt, userQuestion, conversationHistory = []) {
    const url = `https://generativelanguage.googleapis.com/${AI_CONFIG.GEMINI_API_VERSION}/models/${this.geminiModel}:generateContent?key=${this.geminiKey}`;
    const conversationContext = this.buildConversationContext(conversationHistory);

    const requestBody = JSON.stringify({
      contents: [{
        parts: [{
          text: `${systemPrompt}${conversationContext}\n\nBuyer's new question: ${userQuestion}`
        }]
      }],
      generationConfig: {
        temperature: AI_CONFIG.TEMPERATURE,
        maxOutputTokens: AI_CONFIG.MAX_TOKENS
      }
    });

    return new Promise((resolve, reject) => {
      const req = https.request(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(requestBody)
        }
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const response = JSON.parse(data);
            if (response.candidates && response.candidates[0]?.content?.parts?.[0]?.text) {
              resolve(response.candidates[0].content.parts[0].text.trim());
            } else if (response.error) {
              reject(new Error(`Gemini API error: ${response.error.message}`));
            } else {
              reject(new Error('Unexpected Gemini response format'));
            }
          } catch (e) {
            reject(new Error(`Failed to parse Gemini response: ${e.message}`));
          }
        });
      });

      req.on('error', reject);
      req.write(requestBody);
      req.end();
    });
  }

  async callOllama(systemPrompt, userQuestion, conversationHistory = []) {
    const urlObj = new URL(`${this.ollamaUrl}/api/generate`);
    const isHttps = urlObj.protocol === 'https:';
    const httpModule = isHttps ? https : http;
    const conversationContext = this.buildConversationContext(conversationHistory);

    const requestBody = JSON.stringify({
      model: this.ollamaModel,
      prompt: `${systemPrompt}${conversationContext}\n\nBuyer's new question: ${userQuestion}\n\nSeller's response:`,
      stream: false,
      options: {
        temperature: AI_CONFIG.TEMPERATURE,
        num_predict: AI_CONFIG.MAX_TOKENS
      }
    });

    return new Promise((resolve, reject) => {
      const req = httpModule.request({
        hostname: urlObj.hostname,
        port: urlObj.port || (isHttps ? AI_CONFIG.HTTPS_PORT : AI_CONFIG.OLLAMA_DEFAULT_PORT),
        path: urlObj.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(requestBody)
        }
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const response = JSON.parse(data);
            if (response.response) {
              resolve(response.response.trim());
            } else if (response.error) {
              reject(new Error(`Ollama error: ${response.error}`));
            } else {
              reject(new Error('Unexpected Ollama response format'));
            }
          } catch (e) {
            reject(new Error(`Failed to parse Ollama response: ${e.message}`));
          }
        });
      });

      req.on('error', (e) => {
        reject(new Error(`Ollama connection failed: ${e.message}. Is Ollama running?`));
      });

      req.write(requestBody);
      req.end();
    });
  }
}

module.exports = new AIService();
