import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { Lock, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, login } = useAuth();

  useEffect(() => {
    if (user) {
      if (user.role === 'merchant') navigate('/merchant-dashboard');
      else navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (!ok) setError('Email ou mot de passe incorrect');
    else {
      setError('');
      if (email === 'admin@gmail.com') {
        window.open('/admin-dashboard', '_blank');
        navigate('/admin-dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-tunisian-navy via-tunisian-red/10 to-tunisian-gold/10 flex items-center justify-center py-16 px-2">
      <Card className="w-full max-w-md p-8 bg-white/90 shadow-lg border-0">
        <h1 className="text-3xl font-bold text-tunisian-navy mb-6 text-center">Connexion</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tunisian-red w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="Votre email"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-tunisian-red bg-gray-50"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tunisian-gold w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Votre mot de passe"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-tunisian-red bg-gray-50"
              />
            </div>
          </div>
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          <Button type="submit" size="lg" variant="primary" className="w-full">Se connecter</Button>
        </form>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-2 text-sm">
          <Link to="/forgot-password" className="text-tunisian-red hover:underline">Mot de passe oublié ?</Link>
          <span className="hidden sm:inline-block">|</span>
          <Link to="/register" className="text-tunisian-navy hover:underline">Créer un compte</Link>
        </div>
      </Card>
    </div>
  );
};

export default Login; 