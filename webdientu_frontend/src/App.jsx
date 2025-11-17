import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminLayout from './components/AdminLayout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Dashboard from './pages/admin/Dashboard';
import ProductManagement from './pages/admin/ProductManagement';
import AccountManagement from './pages/admin/AccountManagement';
import Reports from './pages/admin/Reports';
import Settings from './pages/admin/Settings';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Public Routes with Header & Footer */}
          <Route path="/" element={
            <div className="app">
              <Header />
              <main className="main-content">
                <Home />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/products" element={
            <div className="app">
              <Header />
              <main className="main-content">
                <Products />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/product/:id" element={
            <div className="app">
              <Header />
              <main className="main-content">
                <ProductDetail />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/cart" element={
            <div className="app">
              <Header />
              <main className="main-content">
                <Cart />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/favorites" element={
            <div className="app">
              <Header />
              <main className="main-content">
                <Favorites />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/profile" element={
            <div className="app">
              <Header />
              <main className="main-content">
                <Profile />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/orders" element={
            <div className="app">
              <Header />
              <main className="main-content">
                <Orders />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/login" element={
            <div className="app">
              <Header />
              <main className="main-content">
                <Login />
              </main>
              <Footer />
            </div>
          } />

          {/* Admin Routes without Header & Footer */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="accounts" element={<AccountManagement />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
