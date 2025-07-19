import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { User, Mail, Lock, Briefcase } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Register: React.FC = () => {
  const [role, setRole] = useState<'user' | 'merchant'>('user');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { user, register } = useAuth();

  useEffect(() => {
    if (user && success) {
      if (user.role === 'merchant') navigate('/merchant-dashboard');
      else navigate('/');
    }
    if (user && !success) navigate('/');
  }, [user, navigate, success]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    setError('');
    await register(name, email, password, role);
    setSuccess(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-tunisian-navy via-tunisian-red/10 to-tunisian-gold/10 flex items-center justify-center py-16 px-2">
      <Card className="w-full max-w-md p-8 bg-white/90 shadow-lg border-0">
        <h1 className="text-3xl font-bold text-tunisian-navy mb-6 text-center">Créer un compte</h1>
        {/* Sélecteur de rôle */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => setRole('user')}
            className={`flex flex-col items-center px-4 py-2 rounded-lg border-2 ${role === 'user' ? 'border-tunisian-red bg-tunisian-red/10' : 'border-gray-200 bg-white'} transition`}
          >
            <User className={`w-6 h-6 mb-1 ${role === 'user' ? 'text-tunisian-red' : 'text-gray-400'}`} />
            <span className="font-semibold">Visiteur</span>
            <span className="text-xs text-gray-500">Compte classique</span>
          </button>
          <button
            type="button"
            onClick={() => setRole('merchant')}
            className={`flex flex-col items-center px-4 py-2 rounded-lg border-2 ${role === 'merchant' ? 'border-tunisian-gold bg-tunisian-gold/10' : 'border-gray-200 bg-white'} transition`}
          >
            <Briefcase className={`w-6 h-6 mb-1 ${role === 'merchant' ? 'text-tunisian-gold' : 'text-gray-400'}`} />
            <span className="font-semibold">Commerçant</span>
            <span className="text-xs text-gray-500">Gérer une boutique</span>
          </button>
        </div>
        {success ? (
          <div className="text-green-600 text-center font-semibold text-lg">Inscription réussie !<br/>Redirection...</div>
        ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Nom complet</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tunisian-navy w-5 h-5" />
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                placeholder="Votre nom complet"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-tunisian-red bg-gray-50"
              />
            </div>
          </div>
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
          <div>
            <label className="block text-gray-700 font-medium mb-2">Confirmer le mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tunisian-gold w-5 h-5" />
              <input
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                placeholder="Confirmez le mot de passe"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-tunisian-red bg-gray-50"
              />
            </div>
          </div>
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          <Button type="submit" size="lg" variant="primary" className="w-full">S'inscrire</Button>
        </form>
        )}
        <div className="flex justify-center items-center mt-6 text-sm">
          <span className="text-gray-500 mr-2">Déjà un compte ?</span>
          <Link to="/login" className="text-tunisian-navy hover:underline">Se connecter</Link>
        </div>
      </Card>
    </div>
  );
};

export default Register; 