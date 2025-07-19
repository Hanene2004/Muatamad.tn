import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Merchants from './pages/Merchants';
import MerchantDetail from './pages/MerchantDetail';
import Categories from './pages/Categories';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import MerchantDashboard from './pages/MerchantDashboard';
import AdminDashboard from './pages/AdminDashboard';
import NotificationProvider from './components/common/NotificationProvider';

function App() {
  return (
    <NotificationProvider>
      <Router>
        <div className="min-h-screen bg-white flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/merchants" element={<Merchants />} />
              <Route path="/merchants/:id" element={<MerchantDetail />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<div className="p-8">Page profil en construction</div>} />
              <Route path="/favorites" element={<div className="p-8">Page favoris en construction</div>} />
              <Route path="/messages" element={<div className="p-8">Page messages en construction</div>} />
              <Route path="/settings" element={<div className="p-8">Page paramètres en construction</div>} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/register" element={<Register />} />
              <Route path="/merchant-dashboard" element={<MerchantDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </NotificationProvider>
  );
}

export default App;