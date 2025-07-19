import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import { LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);
    return () => clearTimeout(timer);
  }, [logout, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-tunisian-navy via-tunisian-red/10 to-tunisian-gold/10 py-16 px-2">
      <Card className="w-full max-w-md p-8 bg-white/90 shadow-lg border-0 flex flex-col items-center text-center">
        <LogOut className="w-12 h-12 text-tunisian-red mb-4" />
        <h1 className="text-2xl font-bold text-tunisian-navy mb-2">Déconnexion</h1>
        <p className="text-gray-700 mb-4">Vous avez été déconnecté avec succès.<br/>Redirection vers l'accueil...</p>
      </Card>
    </div>
  );
};

export default Logout; 