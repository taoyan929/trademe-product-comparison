/**
 * BidModal Component
 * Modal for placing bids on auctions with auto-bid support
 */

import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../../services/api'
import './BidModal.css'

export default function BidModal({
  isOpen,
  onClose,
  onBidSuccess,
  userId,
  product,
  currentBid,
  timeRemaining
}) {
  const [bidAmount, setBidAmount] = useState('')
  const [isAutoBid, setIsAutoBid] = useState(false)
  const [maxAutoBid, setMaxAutoBid] = useState('')
  const [selectedShipping, setSelectedShipping] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Fetch user's existing bid when modal opens
  useEffect(() => {
    if (!isOpen || !userId || !product?._id) return

    const fetchExistingBid = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/bids/user/${userId}/auction/${product._id}`
        )
        const result = await response.json()
        if (result.success && result.data) {
          // Pre-populate auto-bid settings if they exist
          if (result.data.is_auto_bid && result.data.max_auto_bid) {
            setIsAutoBid(true)
            setMaxAutoBid(String(Math.floor(result.data.max_auto_bid)))
          }
        }
      } catch (err) {
        console.error('Error fetching existing bid:', err)
      }
    }

    fetchExistingBid()
  }, [isOpen, userId, product?._id])

  if (!isOpen) return null

  // Round up to next whole dollar for minimum bid (must exceed current bid or start price)
  const minBid = currentBid > 0 ? Math.ceil(currentBid) + 1 : Math.ceil(product.start_price) + 1
  const suggestedBid = minBid

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      // Validate bid amount - must be whole number
      const amount = Math.floor(parseFloat(bidAmount))
      if (isNaN(amount) || amount < minBid) {
        setError(`Bid must be at least $${minBid}`)
        setIsSubmitting(false)
        return
      }

      // Validate auto-bid if enabled
      if (isAutoBid) {
        const maxAmount = parseFloat(maxAutoBid)
        if (isNaN(maxAmount) || maxAmount < amount) {
          setError('Maximum auto-bid must be higher than your bid')
          setIsSubmitting(false)
          return
        }
      }

      // Validate shipping selection
      if (!selectedShipping) {
        setError('Please select a shipping option')
        setIsSubmitting(false)
        return
      }

      const response = await fetch(`${API_BASE_URL}/bids`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          auction_id: product._id,
          bidder_id: userId,
          amount: amount,
          is_auto_bid: isAutoBid,
          max_auto_bid: isAutoBid ? parseFloat(maxAutoBid) : null,
          selected_shipping_method: selectedShipping
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to place bid')
      }

      // Show success state
      setShowSuccess(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    // If bid was successful, notify parent to refresh data
    if (showSuccess && onBidSuccess) {
      onBidSuccess()
    }
    // Reset form
    setBidAmount('')
    setIsAutoBid(false)
    setMaxAutoBid('')
    setSelectedShipping('')
    setShowSuccess(false)
    setError('')
    onClose()
  }

  const handleBackToListing = () => {
    handleClose()
  }

  // Success state
  if (showSuccess) {
    return (
      <div className="bid-modal-overlay" onClick={handleClose}>
        <div className="bid-modal" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={handleClose}>×</button>

          <div className="modal-header">
            <h2>{isAutoBid ? 'Your auto bid limit has been set' : 'Your bid has been placed'}</h2>
          </div>

          <div className="bid-success">
            <div className="success-product">
              <img src={product.images ? product.images[0] : product.image} alt={product.title} />
              <div className="success-product-info">
                <h3>{product.title}</h3>
                <div className="success-bid-details">
                  <div className="success-row">
                    <span className="label">Your {isAutoBid ? 'maximum' : ''} bid</span>
                    <span className="value">${isAutoBid ? maxAutoBid : bidAmount}</span>
                  </div>
                  <div className="success-row">
                    <span className="label">Time</span>
                    <span className="value">{new Date().toLocaleTimeString('en-NZ', { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
                  </div>
                  <div className="success-row">
                    <span className="label">Date</span>
                    <span className="value">{new Date().toLocaleDateString('en-NZ', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="success-message">
              <p>Thank you for your bid</p>
              <p>We will notify you if you win this auction via notifications and email</p>
            </div>

            <button className="link-button" onClick={handleBackToListing}>
              Go back to listing
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Bidding form
  return (
    <div className="bid-modal-overlay" onClick={handleClose}>
      <div className="bid-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>×</button>

        <div className="modal-header">
          <h2>Place a bid</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-product">
            <img src={product.images ? product.images[0] : product.image} alt={product.title} />
            <div className="modal-product-info">
              <div className="product-title-row">
                <h3>{product.title}</h3>
                <span className="product-price">
                  ${currentBid > 0 ? currentBid.toFixed(2) : product.start_price.toFixed(2)}
                </span>
              </div>
              <div className="product-meta">
                <div className="meta-row">
                  <span className="label">Location</span>
                  <span className="value">{product.location}</span>
                </div>
                <div className="meta-row">
                  <span className="label">Closes</span>
                  <span className="value">{timeRemaining}</span>
                </div>
                <div className="meta-row">
                  <span className="label">Reserve</span>
                  <span className="value">{product.reserve_met ? 'Met' : 'Not met'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bid-input-section">
            <div className="bid-input-header">
              <label htmlFor="bidAmount">Enter your bid</label>
              <a href="#" className="help-link">Bidding help</a>
            </div>
            <div className="bid-input-wrapper">
              <span className="bid-currency">$</span>
              <input
                id="bidAmount"
                type="number"
                step="1"
                min={minBid}
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value.split('.')[0])}
                placeholder={String(suggestedBid)}
                className="bid-input"
                required
              />
            </div>
          </div>

          <div className="auto-bid-section">
            <div className="auto-bid-toggle">
              <label htmlFor="autoBid">
                Set auto bid
                <span className="info-icon">?</span>
              </label>
              <input
                id="autoBid"
                type="checkbox"
                checked={isAutoBid}
                onChange={(e) => setIsAutoBid(e.target.checked)}
                className="toggle-checkbox"
              />
            </div>

            {isAutoBid && (
              <div className="auto-bid-input">
                <div className="bid-input-wrapper">
                  {maxAutoBid && <span className="bid-currency">$</span>}
                  <input
                    type="number"
                    step="1"
                    min={bidAmount}
                    value={maxAutoBid}
                    onChange={(e) => setMaxAutoBid(e.target.value.split('.')[0])}
                    placeholder="Enter maximum auto-bid amount"
                    className={`bid-input ${maxAutoBid ? '' : 'no-currency'}`}
                    required={isAutoBid}
                  />
                </div>
                <p className="auto-bid-help">
                  We'll bid up to this amount automatically when outbid
                </p>
              </div>
            )}
          </div>

          <div className="shipping-section">
            <label>Shipping</label>
            <div className="shipping-options">
              {product.shipping_options && product.shipping_options.length > 0 ? product.shipping_options.map((option, index) => (
                <label key={index} className="shipping-option">
                  <input
                    type="radio"
                    name="shipping"
                    value={option.method}
                    checked={selectedShipping === option.method}
                    onChange={(e) => setSelectedShipping(e.target.value)}
                    required
                  />
                  <span>
                    {option.method}
                    {option.price > 0 && ` - $${option.price}`}
                    {option.location && ` (${option.location})`}
                  </span>
                </label>
              )) : (
                <label className="shipping-option">
                  <input
                    type="radio"
                    name="shipping"
                    value="standard"
                    checked={selectedShipping === 'standard'}
                    onChange={(e) => setSelectedShipping(e.target.value)}
                    required
                  />
                  <span>
                    Standard Shipping
                    {product.shipping_price > 0 && ` - $${product.shipping_price}`}
                  </span>
                </label>
              )}
            </div>
          </div>

          <div className="disclaimer">
            <p><strong>Seller accepts payment by {product.payment_methods && product.payment_methods.length > 0 ? product.payment_methods.join(', ') : 'Bank transfer, Cash'}</strong></p>
            <p>If you win, you are legally obligated to complete your purchase</p>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="modal-actions">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Placing bid...' : 'Place your bid'}
            </button>
            <button type="button" onClick={handleClose} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
