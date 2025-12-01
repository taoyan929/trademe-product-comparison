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

export default function ProductDetailPage() {
  return (
    <main className="container" style={{ paddingTop: '24px', paddingBottom: '48px' }}>
      <h1>Product Detail Page</h1>
      <p style={{ fontSize: '16px', marginTop: '8px', color: '#65605d' }}>
        Dev 2: This page will display individual product details with bidding functionality.
      </p>

      <div style={{
        marginTop: '32px',
        padding: '24px',
        backgroundColor: '#F5F5F5',
        borderRadius: '8px',
        border: '1px solid #D9D9D9'
      }}>
        <h2>Todo:</h2>
        <ul style={{ marginLeft: '24px', marginTop: '8px', lineHeight: '1.8' }}>
          <li>Image gallery component</li>
          <li>Product specifications</li>
          <li>Seller information section</li>
          <li>Q&A section</li>
          <li>Bidding panel</li>
        </ul>
      </div>
    </main>
  )
}
