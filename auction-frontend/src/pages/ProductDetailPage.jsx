/**
 
 * Product detail page with bidding functionality

 */

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getAuctionById } from '../services/api'
import Button from '../components/shared/Button'
import BidModal from '../components/shared/BidModal'
import { ClockIcon, CalendarIcon, BinocularsIcon, CheckIcon, UserAvatarIcon, SellerAvatarIcon } from '../components/shared/Icons'
import './ProductDetailPage.css'

// Helper function to calculate time remaining
const getTimeRemaining = (endDate) => {
  const now = new Date()
  const end = new Date(endDate)
  const diff = end - now

  if (diff <= 0) {
    return 'Auction ended'
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ${hours} hour${hours !== 1 ? 's' : ''}`
  } else if (hours > 0) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`
  } else {
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`
  }
}

// Helper function to format date
const formatDate = (date) => {
  const d = new Date(date)
  const options = { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', hour12: true }
  return d.toLocaleDateString('en-NZ', options)
}

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [timeRemaining, setTimeRemaining] = useState('')
  const [selectedImage, setSelectedImage] = useState(0)
  const [isBidModalOpen, setIsBidModalOpen] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await getAuctionById(id)

        if (response.success) {
          setProduct(response.data)
          // Support both end_date and closing_time
          const endTime = response.data.end_date || response.data.closing_time
          setTimeRemaining(getTimeRemaining(endTime))
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

  // Update countdown timer every minute
  useEffect(() => {
    const endTime = product?.end_date || product?.closing_time
    if (!endTime) return

    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining(endTime))
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [product])

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
      {/* Breadcrumbs */}
      <nav className="breadcrumbs">
        <a href="/">Home</a>
        <span className="breadcrumb-separator">/</span>
        <a href="/">Marketplace</a>
        <span className="breadcrumb-separator">/</span>
        <a href="/">{product.category}</a>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">{product.title}</span>
      </nav>

      <div className="product-detail-layout">
        {/* Left Column - Main Content */}
        <div className="product-detail-main">
          {/* Image Gallery */}
          <div className="product-image-gallery">
            <div className="product-image-main">
              {(() => {
                // Support both images array and single image
                const imageArray = product.images || (product.image ? [product.image] : [])
                return imageArray.length > 0 ? (
                  <img
                    src={imageArray[selectedImage]}
                    alt={`${product.title} - Image ${selectedImage + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                  />
                ) : (
                  <div className="image-placeholder">
                    <p>No image available</p>
                  </div>
                )
              })()}
            </div>
            {/* Image thumbnails */}
            {(() => {
              const imageArray = product.images || (product.image ? [product.image] : [])
              return imageArray.length > 1 && (
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  {imageArray.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    onClick={() => setSelectedImage(index)}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      border: selectedImage === index ? '2px solid #F9AF2C' : '2px solid transparent'
                    }}
                  />
                  ))}
                </div>
              )
            })()}
          </div>

          {/* Details Section */}
          <div className="product-section">
            <h3>Details</h3>
            <div className="product-details-grid">
              <div className="detail-item">
                <span className="detail-label">Condition:</span>
                <span className="detail-value">{product.condition}</span>
              </div>
              {product.colour && (
                <div className="detail-item">
                  <span className="detail-label">Colour:</span>
                  <span className="detail-value">{product.colour}</span>
                </div>
              )}
              <div className="detail-item">
                <span className="detail-label">Location:</span>
                <span className="detail-value">{product.location}</span>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="product-section">
            <h3>Description</h3>
            <p className="product-description">{product.description}</p>
          </div>

          {/* Shipping & Pick-up Options */}
          <div className="product-section">
            <h3>Shipping & pick-up options</h3>
            <div>
              <div className="shipping-table">
                <div className="shipping-header">
                  <span className="shipping-col-destination">Destination & description</span>
                  <span className="shipping-col-price">Price</span>
                </div>
                {product.shipping_options && product.shipping_options.length > 0 ? (
                  product.shipping_options.map((option, index) => (
                    <div key={index} className="shipping-row">
                      <span className="shipping-destination">
                        {option.method}
                        {option.location && ` (${option.location})`}
                      </span>
                      <span className="shipping-price">
                        {option.price === 0 ? 'Free' : `$${option.price.toFixed(2)}`}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="shipping-row">
                    <span className="shipping-destination">Contact seller for shipping details</span>
                    <span className="shipping-price">-</span>
                  </div>
                )}
              </div>
              <div className="shipping-info-box">
                <p>Learn more about shipping & delivery options.</p>
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div className="product-section">
            <h3>Payment Options</h3>
            <p className="payment-text">
              Seller accepts payment by{' '}
              <span style={{ fontWeight: 600 }}>
                {product.payment_methods && product.payment_methods.length > 0
                  ? product.payment_methods.join(', ')
                  : 'Contact seller for payment details'}
              </span>
            </p>
          </div>

          {/* Questions & Answers */}
          <div className="product-section">
            <h3>Questions & Answers (2)</h3>
            <div className="qa-container">
              <div className="qa-item">
                <div className="qa-question">
                  <div className="qa-avatar">
                    <UserAvatarIcon size={20} />
                  </div>
                  <div className="qa-content">
                    <p className="qa-text">Which suburb is collection?</p>
                    <p className="qa-user">Trade Me User</p>
                  </div>
                </div>
                <div className="qa-answer">
                  <div className="qa-avatar qa-avatar-seller">
                    <SellerAvatarIcon size={20} />
                  </div>
                  <div className="qa-content">
                    <p className="qa-text">Devonport Peninsula</p>
                    <p className="qa-seller">Trade Me Seller</p>
                  </div>
                </div>
              </div>

              <div className="qa-item">
                <div className="qa-question">
                  <div className="qa-avatar">
                    <UserAvatarIcon size={20} />
                  </div>
                  <div className="qa-content">
                    <p className="qa-text">
                      Is the finish original, or has this solid oak piece been recently stripped or painted?
                      Can you confirm all drawers slide smoothly?
                    </p>
                    <p className="qa-user">Trade Me User</p>
                  </div>
                </div>
              </div>

              <Button variant="primary" size="large" fullWidth>
                Ask a question
              </Button>
            </div>
          </div>

          {/* About the Seller */}
          <div className="product-section">
            <h3>About the seller</h3>
            <div className="seller-info-main">
              {product.seller_id && (
                <>
                  <div className="seller-avatar-main">
                    {product.seller_id.avatar_url ? (
                      <img
                        src={product.seller_id.avatar_url}
                        alt={product.seller_id.username}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                      />
                    ) : (
                      <div className="seller-initial">
                        {product.seller_id.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="seller-details-main">
                    <p className="seller-name">
                      {product.seller_id.username} ({product.seller_id.total_ratings})
                    </p>
                    <p className="seller-rating">
                      {product.seller_id.rating_positive_percentage}% positive feedback
                    </p>
                    <div className="seller-meta">
                      <div className="seller-meta-item">
                        <span className="meta-label">Location</span>
                        <span className="meta-value">{product.seller_id.location}</span>
                      </div>
                      <div className="seller-meta-item">
                        <span className="meta-label">Member since</span>
                        <span className="meta-value">
                          {new Date(product.seller_id.member_since).toLocaleDateString('en-NZ', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                    <a href="#" className="seller-link">
                      View seller's other listings →
                    </a>
                    <Button variant="primary" size="large" fullWidth style={{ marginTop: '16px' }}>
                      Add to Favourite Sellers
                    </Button>
                    <a href="#" className="seller-link" style={{ display: 'block', textAlign: 'center', marginTop: '16px' }}>
                      Read our safe buying advice
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <aside className="product-detail-sidebar">
          {/* Product Title */}
          <h1 className="product-title">{product.title}</h1>

          {/* Time Left & Closing Date - Stacked */}
          <div className="time-date-stack">
            <div className="time-left">
              <span className="time-icon">
                <ClockIcon size={16} />
              </span>
              <span className="time-text">Closes: {timeRemaining}</span>
            </div>
            <div className="closing-date">
              <span className="date-icon">
                <CalendarIcon size={16} />
              </span>
              <span className="date-text">{formatDate(product.end_date || product.closing_time)}</span>
            </div>
          </div>

          {/* Pricing Container with Button & Bid Info */}
          <div className="product-pricing">
            <p className="pricing-label">
              {(product.bid_count || 0) > 0 ? 'Current bid' : 'Starting price'}
            </p>
            <p className="pricing-amount">
              ${(product.bid_count || 0) > 0
                ? (product.current_bid || 0).toFixed(2)
                : product.start_price.toFixed(2)}
            </p>

            <Button
              variant="primary"
              size="large"
              fullWidth
              onClick={() => setIsBidModalOpen(true)}
            >
              Place bid
            </Button>

            <div className="bid-info">
              <p style={{ fontSize: '16px', color: '#65605d', textAlign: 'center', margin: '0 0 4px 0' }}>
                {product.reserve_met ? 'Reserve met' : 'Reserve not met'}
              </p>
              <p style={{ fontSize: '16px', color: '#007acd', textAlign: 'center', textDecoration: 'underline', margin: '0' }}>
                {(product.bid_count || 0) === 0
                  ? 'No bids'
                  : `${product.bid_count} bid${product.bid_count !== 1 ? 's' : ''}`}
              </p>
            </div>
          </div>

          {/* Watchlist Button */}
          <Button variant="warning" size="large" fullWidth style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <BinocularsIcon size={22} watching={false} />
            Add to Watchlist
          </Button>

          {/* Email Reminder & Watchlist Count */}
          <div className="watchlist-info">
            <p className="watchlist-reminder">
              Set email reminder: <span style={{ color: '#007acd' }}>12 hours</span>
            </p>
            <p className="watchlist-count">
              <span style={{ fontWeight: 600 }}>{product.watchers_count || 0}</span>{' '}
              {(product.watchers_count || 0) === 1 ? 'person' : 'others'} watchlisted
            </p>
          </div>

          {/* Seller Profile Card */}
          {product.seller_id && (
            <div className="seller-profile-card">
              <div className="seller-avatar">
                {product.seller_id.avatar_url ? (
                  <img
                    src={product.seller_id.avatar_url}
                    alt={product.seller_id.username}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#E0E0E0',
                    color: '#666',
                    fontSize: '24px',
                    fontWeight: 600
                  }}>
                    {product.seller_id.username.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="seller-info">
                <p className="seller-username">
                  {product.seller_id.username}
                  {product.seller_id.total_ratings > 0 && ` (${product.seller_id.total_ratings})`}
                  {product.seller_id.verified && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '4px' }} title="Verified seller">
                      <CheckIcon size={16} color="#007ACD" />
                    </span>
                  )}
                </p>
                {product.seller_id.total_ratings > 0 && (
                  <p className="seller-feedback">
                    {product.seller_id.rating_positive_percentage}% positive feedback
                  </p>
                )}
                <p className="seller-location">{product.seller_id.location}</p>
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Bid Modal */}
      <BidModal
        isOpen={isBidModalOpen}
        onClose={() => setIsBidModalOpen(false)}
        product={product}
        currentBid={product.current_bid || 0}
        timeRemaining={timeRemaining}
      />
    </main>
  )
}
