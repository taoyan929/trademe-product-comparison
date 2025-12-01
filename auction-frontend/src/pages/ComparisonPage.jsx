/**
 * ComparisonPage - Dev 3
 *
 * Comparison tool for comparing multiple items
 * - Multi-product comparison view
 * - Add/remove items from comparison
 * - Filter products for comparison
 */

export default function ComparisonPage() {
  return (
    <main className="container" style={{ paddingTop: '24px', paddingBottom: '48px' }}>
      <h1>Comparison Tool</h1>
      <p style={{ fontSize: '16px', marginTop: '8px', color: '#65605d' }}>
        Dev 3: This page will allow users to compare multiple auction items side-by-side.
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
          <li>Comparison table/grid layout</li>
          <li>Add items to comparison</li>
          <li>Remove items from comparison</li>
          <li>Filter and search for items to compare</li>
          <li>Side-by-side specifications view</li>
        </ul>
      </div>
    </main>
  )
}
