/**
 * ProductDetailPage - Dev 2
 *
 * Product detail page with bidding functionality
 * - Single product view with image gallery
 * - Product details and specifications
 * - Seller information
 * - Questions & Answers section
 * - Bidding functionality
 */

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getAuctionById } from '../services/api'
import Button from '../components/shared/Button'
import './ProductDetailPage.css'

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await getAuctionById(id)

        if (response.success) {
          setProduct(response.data)
        } else {
          throw new Error(response.error || 'Failed to fetch product')
        }
      } catch (err) {
        setError(err.message)
        console.error('Error fetching product:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <main className="container" style={{ paddingTop: '48px', textAlign: 'center' }}>
        <p>Loading product details...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="container" style={{ paddingTop: '48px' }}>
        <div style={{
          textAlign: 'center',
          padding: '48px',
          color: '#E34647',
          backgroundColor: '#E3464720',
          borderRadius: '4px'
        }}>
          <h2>Error Loading Product</h2>
          <p>{error}</p>
          <p style={{ fontSize: '14px', marginTop: '16px' }}>
            Make sure the backend server is running and the product ID is valid.
          </p>
        </div>
      </main>
    )
  }

  if (!product) {
    return (
      <main className="container" style={{ paddingTop: '48px', textAlign: 'center' }}>
        <h2>Product not found</h2>
      </main>
    )
  }

  return (
    <main className="container product-detail-page">
      <div className="product-detail-layout">
        {/* Left Column - Main Content */}
        <div className="product-detail-main">
          {/* Image Gallery Placeholder */}
          <div className="product-image-gallery">
            <div className="product-image-main">
              <div className="image-placeholder">
                <p>Image Gallery</p>
                <p style={{ fontSize: '12px', color: '#76716D' }}>To be implemented</p>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="product-section">
            <h3>Details</h3>
            <div className="product-details-grid">
              <div className="detail-item">
                <span className="detail-label">Condition:</span>
                <span className="detail-value">Used</span>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="product-section">
            <h3>Description</h3>
            <p className="product-description">{product.description}</p>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <aside className="product-detail-sidebar">
          {/* Product Title */}
          <h1 className="product-title">{product.title}</h1>

          {/* Pricing */}
          <div className="product-pricing">
            <p className="pricing-label">Starting price</p>
            <p className="pricing-amount">${product.start_price.toFixed(2)}</p>
          </div>

          {/* Action Buttons */}
          <div className="product-actions">
            <Button variant="primary" size="large" fullWidth>
              Place bid
            </Button>

            <div style={{ marginTop: '8px' }}>
              <p style={{ fontSize: '12px', color: '#76716D', textAlign: 'center' }}>
                Reserve not met
              </p>
              <p style={{ fontSize: '12px', color: '#76716D', textAlign: 'center' }}>
                No bids
              </p>
            </div>

            <Button variant="warning" size="large" fullWidth style={{ marginTop: '16px' }}>
              Add to Watchlist
            </Button>
          </div>

          {/* Product Meta */}
          <div className="product-meta">
            <div className="meta-item">
              <span className="meta-label">Category:</span>
              <span className="meta-value">{product.category}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Location:</span>
              <span className="meta-value">{product.location}</span>
            </div>
            {product.colour && (
              <div className="meta-item">
                <span className="meta-label">Colour:</span>
                <span className="meta-value">{product.colour}</span>
              </div>
            )}
            {product.reserve_price && (
              <div className="meta-item">
                <span className="meta-label">Reserve:</span>
                <span className="meta-value">${product.reserve_price.toFixed(2)}</span>
              </div>
            )}
          </div>
        </aside>
      </div>
    </main>
  )
}
