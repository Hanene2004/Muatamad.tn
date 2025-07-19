import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, User, Heart, MessageCircle, Settings, ShoppingBag, LogOut, LogIn, Briefcase } from 'lucide-react';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const navigation = [
    { name: 'Accueil', href: '/', icon: ShoppingBag },
    { name: 'Commerçants', href: '/merchants', icon: Search },
    { name: 'Catégories', href: '/categories', icon: Menu },
    { name: 'Contact', href: '/contact', icon: MessageCircle },
  ];

  const userMenuItems = [
    { name: 'Mon Profil', href: '/profile', icon: User },
    { name: 'Mes Favoris', href: '/favorites', icon: Heart },
    { name: 'Messages', href: '/messages', icon: MessageCircle },
    { name: 'Paramètres', href: '/settings', icon: Settings },
  ];

  return (
    <header className="bg-softui-light shadow-soft sticky top-0 z-50 border-b border-softui-border rounded-b-softxl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-softui-primary/90 rounded-full flex items-center justify-center shadow-soft">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-extrabold text-softui-primary leading-tight">
                {user?.role === 'admin' ? 'Admin' : user?.role === 'merchant' ? 'Commerçant' : 'Muatamad.tn'}
              </span>
              <span className="text-2xl font-extrabold text-softui-secondary leading-tight ml-1">
                {user ? 'Dashboard' : ''}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-soft font-medium transition-colors duration-200 text-softui-secondary hover:text-softui-primary hover:bg-softui-accent/60 shadow-soft ${location.pathname === item.href ? 'text-softui-primary bg-softui-accent/80' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Menu & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* User Menu */}
            {user ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  icon={User}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="hidden md:flex rounded-soft px-3 py-2 text-softui-primary font-semibold shadow-soft hover:bg-softui-accent/60"
                >
                  {user.name}
                </Button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-softui-light rounded-soft shadow-softxl py-1 z-10 border border-softui-border">
                    {user && user.role === 'merchant' && (
                      <Link
                        to="/merchant-dashboard"
                        className="flex items-center px-4 py-2 text-sm text-softui-warning hover:bg-softui-accent/60 font-semibold rounded-soft"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Briefcase className="w-4 h-4 mr-3" />
                        Tableau de bord
                      </Link>
                    )}
                    {user && user.role === 'admin' && (
                      <Link
                        to="/admin-dashboard"
                        className="flex items-center px-4 py-2 text-sm text-softui-warning hover:bg-softui-accent/60 font-semibold rounded-soft"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Briefcase className="w-4 h-4 mr-3" />
                        Tableau de bord Admin
                      </Link>
                    )}
                    {userMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="flex items-center px-4 py-2 text-sm text-softui-secondary hover:bg-softui-accent/60 rounded-soft"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <item.icon className="w-4 h-4 mr-3" />
                        {item.name}
                      </Link>
                    ))}
                    <hr className="my-1 border-softui-border" />
                    <Link
                      to="/logout"
                      className="flex items-center w-full px-4 py-2 text-sm text-softui-danger hover:bg-softui-accent/60 rounded-soft"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Déconnexion
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" icon={LogIn} className="border-softui-primary text-softui-primary rounded-soft shadow-soft">Connexion</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm" className="rounded-soft shadow-soft">Inscription</Button>
                </Link>
              </>
            )}
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              icon={isMenuOpen ? X : Menu}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden rounded-soft shadow-soft"
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-softui-border bg-softui-light rounded-b-softxl shadow-softxl">
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 rounded-soft text-base font-medium transition-colors duration-200 shadow-soft ${location.pathname === item.href ? 'bg-softui-primary/10 text-softui-primary' : 'text-softui-secondary hover:text-softui-primary hover:bg-softui-accent/60'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              ))}
              <hr className="my-2 border-softui-border" />
              {user ? (
                <>
                  {user.role === 'merchant' && (
                    <Link
                      to="/merchant-dashboard"
                      className="flex items-center px-3 py-2 rounded-soft text-base font-medium text-softui-warning hover:bg-softui-accent/60 font-semibold shadow-soft"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Briefcase className="w-5 h-5 mr-3" />
                      Tableau de bord
                    </Link>
                  )}
                  {user.role === 'admin' && (
                    <Link
                      to="/admin-dashboard"
                      className="flex items-center px-3 py-2 rounded-soft text-base font-medium text-softui-warning hover:bg-softui-accent/60 font-semibold shadow-soft"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Briefcase className="w-5 h-5 mr-3" />
                      Tableau de bord Admin
                    </Link>
                  )}
                  {userMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex items-center px-3 py-2 rounded-soft text-base font-medium text-softui-secondary hover:text-softui-primary hover:bg-softui-accent/60 shadow-soft"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    to="/logout"
                    className="flex items-center px-3 py-2 rounded-soft text-base font-medium text-softui-danger hover:bg-softui-accent/60 shadow-soft"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Déconnexion
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="sm" icon={LogIn} className="border-softui-primary text-softui-primary w-full mb-2 rounded-soft shadow-soft">Connexion</Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="primary" size="sm" className="w-full rounded-soft shadow-soft">Inscription</Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;