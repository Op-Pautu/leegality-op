import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FilterProvider } from './context/FilterContext'
import Header from './components/Header'
import ProductListingPage from './pages/ProductListingPage'
import ProductDetailPage from './pages/ProductDetailPage'
import './App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <BrowserRouter>
      <FilterProvider>
        <div className="min-h-screen bg-[#f3f4f6]">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          <Routes>
            <Route path="/" element={<ProductListingPage sidebarOpen={sidebarOpen} onSidebarClose={() => setSidebarOpen(false)} />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
          </Routes>
        </div>
      </FilterProvider>
    </BrowserRouter>
  )
}

export default App
