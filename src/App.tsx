import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FilterProvider } from './context/FilterContext'
import Header from './components/Header'
import ProductListingPage from './pages/ProductListingPage'
import ProductDetailPage from './pages/ProductDetailPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <FilterProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<ProductListingPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
            </Routes>
          </main>
        </div>
      </FilterProvider>
    </BrowserRouter>
  )
}

export default App
