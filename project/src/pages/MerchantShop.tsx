import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Mock commerçants (doit matcher ceux de Merchants.tsx)
const merchants = [
  {
    id: '1',
    name: 'Boulangerie du Centre',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    description: 'Pains et pâtisseries artisanales au cœur de la ville.',
    address: 'Rue de la Liberté, Tunis',
    phone: '+216 71 123 456',
    hours: 'Lundi - Vendredi: 07h00 - 19h00',
    website: 'https://www.boulangerieducentre.com',
  },
  {
    id: '2',
    name: 'Épicerie Bio Soleil',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    description: 'Produits bio, locaux et responsables.',
    address: 'Avenue Habib Bourguiba, Tunis',
    phone: '+216 71 234 567',
    hours: 'Lundi - Samedi: 08h00 - 20h00',
    website: 'https://www.epiceriebiosoleil.com',
  },
  {
    id: '3',
    name: 'Librairie Les Mots',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    description: 'Livres, papeterie et cadeaux pour tous les âges.',
    address: 'Rue de la Liberté, Tunis',
    phone: '+216 71 345 678',
    hours: 'Lundi - Dimanche: 09h00 - 21h00',
    website: 'https://www.librairielemots.com',
  },
  {
    id: '4',
    name: 'Boutique Mode Chic',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    description: 'Vêtements et accessoires tendance pour femmes.',
    address: 'Avenue de la Liberté, Tunis',
    phone: '+216 71 456 789',
    hours: 'Lundi - Vendredi: 10h00 - 18h00',
    website: 'https://www.boutiquemodechic.com',
  },
];

// Mock produits par commerçant
const productsByMerchant: Record<string, any[]> = {
  '1': [
    { id: 'p1', name: 'Baguette Tradition', price: 1.2, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
    { id: 'p2', name: 'Croissant Beurre', price: 0.9, image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80' },
  ],
  '2': [
    { id: 'p3', name: 'Miel Bio', price: 7.5, image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
    { id: 'p4', name: 'Huile d’olive', price: 5.9, image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80' },
  ],
  '3': [
    { id: 'p5', name: 'Roman policier', price: 12, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80' },
    { id: 'p6', name: 'Cahier A5', price: 2.5, image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80' },
  ],
  '4': [
    { id: 'p7', name: 'Robe été', price: 29.9, image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80' },
    { id: 'p8', name: 'Sac à main', price: 45, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80' },
  ],
  '5': [
    { id: 'p9', name: 'Ordinateur portable', price: 1200, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80' },
    { id: 'p10', name: 'Smartphone Pro', price: 899, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80' },
  ],
  '6': [
    { id: 'p11', name: 'Café Latte', price: 3.5, image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
    { id: 'p12', name: 'Tarte aux fraises', price: 4.2, image: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80' },
  ],
  '7': [
    { id: 'p13', name: 'Bouquet de roses', price: 25, image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
    { id: 'p14', name: 'Plante verte', price: 15, image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80' },
  ],
  '8': [
    { id: 'p15', name: 'Paracétamol', price: 2.5, image: 'https://images.unsplash.com/photo-1588776814546-ec7e1b1b1b1b?auto=format&fit=crop&w=400&q=80' },
    { id: 'p16', name: 'Gel désinfectant', price: 4, image: 'https://images.unsplash.com/photo-1588776814546-ec7e1b1b1b1b?auto=format&fit=crop&w=400&q=80' },
  ],
  '9': [
    { id: 'p17', name: 'Pizza Margherita', price: 18, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80' },
    { id: 'p18', name: 'Pizza 4 fromages', price: 22, image: 'https://images.unsplash.com/photo-1548365328-8b6b7c7c7c7c?auto=format&fit=crop&w=400&q=80' },
  ],
  '10': [
    { id: 'p19', name: 'Lunettes de vue', price: 120, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80' },
    { id: 'p20', name: 'Lunettes de soleil', price: 90, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80' },
  ],
  '11': [
    { id: 'p21', name: 'Shampoing soin', price: 8, image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80' },
    { id: 'p22', name: 'Coupe homme', price: 15, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80' },
  ],
  '12': [
    { id: 'p23', name: 'Côte de boeuf', price: 35, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
    { id: 'p24', name: 'Merguez', price: 18, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
  ],
  '13': [
    { id: 'p25', name: 'Ballon de foot', price: 25, image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80' },
    { id: 'p26', name: 'Chaussures running', price: 80, image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80' },
  ],
  '14': [
    { id: 'p27', name: 'Crème hydratante', price: 19, image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80' },
    { id: 'p28', name: 'Huile essentielle', price: 12, image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
  ],
  '15': [
    { id: 'p29', name: 'Perceuse Bosch', price: 150, image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80' },
    { id: 'p30', name: 'Marteau', price: 12, image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80' },
  ],
  '16': [
    { id: 'p31', name: 'Manette PS5', price: 89, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80' },
    { id: 'p32', name: 'Casque gaming', price: 59, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80' },
  ],
  '17': [
    { id: 'p33', name: 'Plateau sushi 12 pièces', price: 28, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
    { id: 'p34', name: 'Maki avocat', price: 14, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
  ],
  '18': [
    { id: 'p35', name: 'Vélo de ville', price: 350, image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80' },
    { id: 'p36', name: 'Casque vélo', price: 29, image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80' },
  ],
  '19': [
    { id: 'p37', name: 'Jeu éducatif', price: 22, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
    { id: 'p38', name: 'Peluche lapin', price: 18, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
  ],
  '20': [
    { id: 'p39', name: 'Coffret gourmand', price: 49, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80' },
    { id: 'p40', name: 'Miel artisanal', price: 15, image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
  ],
};

const MerchantShop: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const merchant = merchants.find(m => m.id === id);
  const products = productsByMerchant[id || ''] || [];
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (product: any) => {
    setCart(prev => {
      const found = prev.find(p => p.id === product.id);
      if (found) {
        return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };
  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(p => p.id !== productId));
  };

  if (!merchant) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Commerçant introuvable</div>;
  }

  // Sécuriser l'accès aux détails du commerçant (fallback si undefined)
  const getDetail = (val: any, fallback = 'Non renseigné') => val ? val : fallback;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-orange-50 py-10 px-4">
      <button className="mb-6 text-tunisian-gold hover:underline" onClick={() => navigate('/merchants')}>← Retour à l’annuaire</button>
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8">
        {/* Infos commerçant */}
        <div className="flex flex-col items-center md:w-1/3">
          <img src={merchant.avatar} alt={merchant.name} className="w-28 h-28 rounded-full mb-4 object-cover border-4 border-tunisian-gold" />
          <h1 className="text-2xl font-bold mb-2 text-center">{merchant.name}</h1>
          <p className="text-gray-500 text-center mb-2">{merchant.description}</p>
          <div className="text-xs text-gray-600 mb-2 flex flex-col gap-1 items-center">
            <span className="flex items-center gap-1"><svg className="w-4 h-4 text-tunisian-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"/><circle cx="12" cy="10" r="3"/></svg> {getDetail(merchant.address)}</span>
            <span className="flex items-center gap-1"><svg className="w-4 h-4 text-tunisian-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92V19a2 2 0 01-2 2A19.72 19.72 0 013 5a2 2 0 012-2h2.09a2 2 0 012 1.72c.13.81.36 1.6.7 2.34a2 2 0 01-.45 2.11l-.27.27a16 16 0 006.29 6.29l.27-.27a2 2 0 012.11-.45c.74.34 1.53.57 2.34.7A2 2 0 0121 16.91z"/></svg> {getDetail(merchant.phone)}</span>
            <span className="flex items-center gap-1"><svg className="w-4 h-4 text-tunisian-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 19c-4.418 0-8-1.79-8-4V7c0-2.21 3.582-4 8-4s8 1.79 8 4v8c0 2.21-3.582 4-8 4z"/><path d="M6 10h.01M18 10h.01"/></svg> {getDetail(merchant.hours)}</span>
            <span className="flex items-center gap-1"><svg className="w-4 h-4 text-tunisian-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.93V17a1 1 0 01-2 0v-2.07a8.001 8.001 0 01-6.32-6.32H7a1 1 0 010-2H4.07A8.001 8.001 0 0112 3.07V7a1 1 0 012 0v3.93a8.001 8.001 0 016.32 6.32H17a1 1 0 010 2h2.93A8.001 8.001 0 0113 16.93z"/></svg> {merchant.website ? <a href={merchant.website} target="_blank" rel="noopener noreferrer" className="text-tunisian-gold hover:underline">{merchant.website.replace('https://', '')}</a> : 'Non renseigné'}</span>
          </div>
        </div>
        {/* Produits */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Produits en vente</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {products.length === 0 ? (
              <div className="col-span-2 text-gray-400 text-center">Aucun produit pour ce commerçant.</div>
            ) : products.map(product => (
              <div key={product.id} className="bg-gray-50 rounded-xl p-4 flex flex-col items-center shadow">
                <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded mb-2" />
                <div className="font-semibold mb-1">{product.name}</div>
                <div className="text-tunisian-gold font-bold mb-2">{product.price} DT</div>
                <button
                  className="bg-tunisian-gold text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
                  onClick={() => addToCart(product)}
                >
                  Ajouter au panier
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Panier latéral */}
        <div className="md:w-64 w-full bg-yellow-50 rounded-xl p-4 shadow flex flex-col">
          <h3 className="font-semibold mb-2 text-tunisian-gold">🛒 Panier</h3>
          {cart.length === 0 ? (
            <div className="text-gray-400 text-sm">Votre panier est vide.</div>
          ) : (
            <ul className="mb-2">
              {cart.map(item => (
                <li key={item.id} className="flex justify-between items-center mb-1">
                  <span>{item.name} x{item.qty}</span>
                  <button className="text-red-500 ml-2" onClick={() => removeFromCart(item.id)}>✕</button>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-auto font-bold text-right text-tunisian-gold">
            Total : {cart.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)} DT
          </div>
          <button
            className="mt-3 bg-tunisian-gold text-white px-3 py-2 rounded hover:bg-yellow-500 transition disabled:opacity-50"
            disabled={cart.length === 0}
          >
            Commander
          </button>
        </div>
      </div>
    </div>
  );
};

export default MerchantShop; 