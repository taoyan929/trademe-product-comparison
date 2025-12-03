/**
 * App Component
 *
 * Root component that handles routing for the entire application.
 * Each page is developed independently by different team members:
 * - HomePage: Dev 1 (Browse marketplace, search, filters)
 * - ProductDetailPage: Dev 2 (Product details, bidding)
 * - ComparisonPage: Dev 3 (Compare multiple items)
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import HomePage from './pages/HomePage'
import ProductDetailPage from './pages/ProductDetailPage'
import ComparisonPage from './pages/ComparisonPage'
import SearchBar from './components/shared/SearchBar'
import MarketplacePage from './pages/MarketplacePage'
function App() {
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />

        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/comparison" element={<ComparisonPage />} />

      </Routes>
      <SearchBar/>
    </BrowserRouter>
  )
}

export default App
