/**
 * HomePage - Dev 1
 *
 * Home/Browse marketplace page with search and filters
 * - Marketplace grid layout
 * - Search and filter UI
 * - Category filtering
 */

import { useState, useEffect } from 'react'
import ProductCard from '../components/shared/ProductCard'
import Button from '../components/shared/Button'

export default function HomePage() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/api/auctions');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          setAuctions(data.data);
        } else {
          throw new Error(data.error || 'Failed to fetch auctions');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching auctions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  return (
    <main className="container" style={{ paddingTop: '24px', paddingBottom: '48px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1>Browse Marketplace</h1>
        <p style={{ fontSize: '16px', marginTop: '8px' }}>
          Discover amazing deals on quality pre-loved items
        </p>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '48px' }}>
          <p>Loading auctions...</p>
        </div>
      )}

      {error && (
        <div style={{
          textAlign: 'center',
          padding: '48px',
          color: '#d32f2f',
          backgroundColor: '#ffebee',
          borderRadius: '4px',
          marginBottom: '24px'
        }}>
          <p><strong>Error:</strong> {error}</p>
          <p style={{ fontSize: '14px', marginTop: '8px' }}>
            Make sure the backend server is running on http://localhost:3000
          </p>
        </div>
      )}

      {!loading && !error && auctions.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px' }}>
          <p>No auctions found</p>
        </div>
      )}

      {!loading && !error && auctions.length > 0 && (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '32px'
          }}>
            {auctions.map(auction => (
              <ProductCard
                key={auction._id}
                product={auction}
                showBookmark={true}
                onBookmarkClick={(id) => console.log('Bookmarked:', id)}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Button variant="primary" size="large">
              View More Auctions
            </Button>
          </div>
        </>
      )}
    </main>
  )
}
