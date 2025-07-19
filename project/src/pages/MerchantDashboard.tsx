import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import AnimatedCard from '../components/common/AnimatedCard';
import Loader from '../components/common/Loader';
import { toast } from 'react-toastify';
import { Briefcase, BarChart2, Activity, Star, PieChart as PieChartIcon, Package, User, TrendingUp, MessageCircle, X, ShoppingCart, X as CloseIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// Corriger l'import Recharts : utiliser l'import groupé (barrel import)
import {
  ResponsiveContainer,
  LineChart, Line,
  BarChart, Bar,
  PieChart, Pie, Cell,
  CartesianGrid, XAxis, YAxis, Tooltip, Legend
} from 'recharts';

// Supprimer toutes les données statiques mock
// Remplacer l'affichage des graphiques/tableaux par un placeholder dans chaque section
// Exemple pour chaque section :
// <div className="text-center text-gray-400 py-8">Aucune donnée</div>

// Définir un type pour les avis
interface Review {
  id: number;
  client?: string;
  rating?: number;
  comment?: string;
  reponse_commercant?: string;
  [key: string]: any;
}

// Définir un type pour les produits
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

// Définir un type pour les coupons
interface Coupon {
  id: number;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minAmount?: number;
  maxUses?: number;
  currentUses: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  description?: string;
}

// Ajouter la liste des sections pour la navbar
const NAV_SECTIONS = [
  { key: 'tout', label: 'Tout' },
  { key: 'ventes', label: 'Ventes' },
  { key: 'trafic', label: 'Trafic' },
  { key: 'comportement', label: 'Comportement' },
  { key: 'satisfaction', label: 'Satisfaction' },
  { key: 'marketing', label: 'Marketing' },
  { key: 'stock', label: 'Stock' },
  { key: 'finances', label: 'Finances' },
  { key: 'analyse', label: 'Analyse' },
  { key: 'avis', label: 'Avis' },
  { key: 'coupons', label: 'Coupons' },
  { key: 'profil', label: 'Profil' },
];

const MerchantDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<any>(null);
  const [form, setForm] = useState({ name: '', price: '', stock: '' });
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [errorProducts, setErrorProducts] = useState<any>(null);
  // Profil connecté à l'API
  const [profile, setProfile] = useState({ nom: '', email: '', password: '' });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState('');
  const [profileError, setProfileError] = useState('');

  // CRUD Avis connecté à l'API
  const [avis, setAvis] = useState<Review[]>([]);
  const [avisLoading, setAvisLoading] = useState(false);
  const [avisError, setAvisError] = useState('');
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedAvis, setSelectedAvis] = useState<Review | null>(null);
  const [replyText, setReplyText] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  // CRUD Coupons
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [couponsLoading, setCouponsLoading] = useState(false);
  const [couponsError, setCouponsError] = useState('');
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [couponForm, setCouponForm] = useState({
    code: '',
    type: 'percentage' as 'percentage' | 'fixed',
    value: '',
    minAmount: '',
    maxUses: '',
    validFrom: '',
    validUntil: '',
    description: ''
  });
  const [couponFilter, setCouponFilter] = useState('all');

  // Gérer l'ouverture/fermeture de la modal d'agrandissement
  const [selectedChart, setSelectedChart] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('tout');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role === 'admin') {
      // Rediriger les admins vers leur dashboard
      navigate('/admin-dashboard');
    } else if (user.role !== 'merchant') {
      // Pour les autres utilisateurs non-commerçants, rediriger vers login
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    // Charger le profil depuis l'API PHP
    setProfileLoading(true);
    fetch('http://localhost/projet_ministre_api/get_profile.php')
      .then(res => res.json())
      .then(data => {
        setProfile({ nom: data.nom, email: data.email, password: '' });
        setProfileLoading(false);
      })
      .catch(() => {
        // Fallback mock profile si erreur API
        setProfile({ nom: 'Demo Merchant', email: 'demo@merchant.com', password: '' });
        setProfileError('');
        setProfileLoading(false);
      });
  }, []);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileSuccess('');
    setProfileError('');
    fetch('http://localhost/projet_ministre_api/update_profile.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `nom=${encodeURIComponent(profile.nom)}&email=${encodeURIComponent(profile.email)}&password=${encodeURIComponent(profile.password)}`
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProfileSuccess('Profil mis à jour !');
        } else {
          setProfileError('Erreur lors de la mise à jour');
        }
        setProfileLoading(false);
      })
      .catch(() => {
        setProfileError('Erreur réseau');
        setProfileLoading(false);
      });
  };

  useEffect(() => {
    setAvisLoading(true);
    fetch('http://localhost/projet_ministre_api/get_reviews.php')
      .then(res => res.json())
      .then(data => {
        setAvis(data);
        setAvisLoading(false);
      })
      .catch(() => {
        // Fallback mock data si erreur API
        setAvis([]);
        setAvisError('');
        setAvisLoading(false);
      });
  }, []);

  // Statistiques
  const stats = [
    { label: 'Produits', value: products.length, icon: Package, color: 'border-tunisian-gold' },
    { label: 'Commandes', value: 0, icon: ShoppingCart, color: 'border-tunisian-red' },
    { label: 'Avis', value: avis.length, icon: Star, color: 'border-tunisian-navy' },
    { label: 'Note Moyenne', value: (avis.reduce((a, r) => a + r.rating, 0) / avis.length).toFixed(1), icon: Star, color: 'border-tunisian-gold' },
  ];

  // Gestion produits (mock)
  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const openAddModal = () => {
    setEditProduct(null);
    setForm({ name: '', price: '', stock: '' });
    setShowModal(true);
  };

  const openEditModal = (prod: any) => {
    setEditProduct(prod);
    setForm({ name: prod.name, price: String(prod.price), stock: String(prod.stock) });
    setShowModal(true);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.stock) return;
    if (editProduct) {
      setProducts(products.map(p => p.id === editProduct.id ? { ...p, ...form, price: Number(form.price), stock: Number(form.stock) } : p));
    } else {
      setProducts([
        ...products,
        { id: Date.now(), name: form.name, price: Number(form.price), stock: Number(form.stock) }
      ]);
    }
    setShowModal(false);
    setEditProduct(null);
    setForm({ name: '', price: '', stock: '' });
  };

  useEffect(() => {
    if (products && products.length > 0) {
      toast.success('Produits chargés avec succès !');
    }
  }, [products]);

  const handleReply = (review: Review) => {
    setSelectedAvis(review);
    setReplyText(review.reponse_commercant || '');
    setShowReplyModal(true);
  };
  const submitReply = async () => {
    if (!selectedAvis) return;
    setActionLoading(true);
    try {
      const res = await fetch('http://localhost/projet_ministre_api/reply_review.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=${selectedAvis.id}&reponse_commercant=${encodeURIComponent(replyText)}`
      });
      if (res.ok) {
        setShowReplyModal(false);
        
        const data = await fetch('http://localhost/projet_ministre_api/get_reviews.php').then(r => r.json());
        setAvis(data);
      }
    } catch (e) {}
    setActionLoading(false);
  };
  const handleDelete = async (review: Review) => {
    if (!window.confirm('Supprimer cet avis ?')) return;
    setActionLoading(true);
    try {
      const res = await fetch('http://localhost/projet_ministre_api/delete_review.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=${review.id}`
      });
      if (res.ok) {
        // Recharger les avis
        const data = await fetch('http://localhost/projet_ministre_api/get_reviews.php').then(r => r.json());
        setAvis(data);
      }
    } catch (e) {}
    setActionLoading(false);
  };
  const handleFlag = async (review: Review) => {
    if (!window.confirm('Signaler cet avis comme abusif ?')) return;
    setActionLoading(true);
    try {
      const res = await fetch('http://localhost/projet_ministre_api/flag_review.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=${review.id}`
      });
      if (res.ok) {
        // Recharger les avis
        const data = await fetch('http://localhost/projet_ministre_api/get_reviews.php').then(r => r.json());
        setAvis(data);
      }
    } catch (e) {}
    setActionLoading(false);
  };

  // Fonctions de gestion des coupons
  useEffect(() => {
    // Charger les coupons depuis l'API PHP
    setCouponsLoading(true);
    fetch('http://localhost/projet_ministre_api/get_coupons.php')
      .then(res => res.json())
      .then(data => {
        setCoupons(data);
        setCouponsLoading(false);
      })
      .catch(() => {
        // Fallback mock data si erreur API
        setCoupons([
          {
            id: 1,
            code: 'WELCOME10',
            type: 'percentage',
            value: 10,
            minAmount: 50,
            maxUses: 100,
            currentUses: 45,
            validFrom: '2024-01-01',
            validUntil: '2024-12-31',
            isActive: true,
            description: 'Réduction de 10% pour les nouveaux clients'
          },
          {
            id: 2,
            code: 'SAVE20',
            type: 'fixed',
            value: 20,
            minAmount: 100,
            maxUses: 50,
            currentUses: 12,
            validFrom: '2024-06-01',
            validUntil: '2024-08-31',
            isActive: true,
            description: 'Économisez 20 DT sur vos achats'
          }
        ]);
        setCouponsError('');
        setCouponsLoading(false);
      });
  }, []);

  const openAddCouponModal = () => {
    setEditingCoupon(null);
    setCouponForm({
      code: '',
      type: 'percentage',
      value: '',
      minAmount: '',
      maxUses: '',
      validFrom: '',
      validUntil: '',
      description: ''
    });
    setShowCouponModal(true);
  };

  const openEditCouponModal = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setCouponForm({
      code: coupon.code,
      type: coupon.type,
      value: String(coupon.value),
      minAmount: String(coupon.minAmount || ''),
      maxUses: String(coupon.maxUses || ''),
      validFrom: coupon.validFrom,
      validUntil: coupon.validUntil,
      description: coupon.description || ''
    });
    setShowCouponModal(true);
  };

  const handleCouponFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setCouponForm({ ...couponForm, [e.target.name]: e.target.value });
  };

  const handleCouponSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponForm.code || !couponForm.value || !couponForm.validFrom || !couponForm.validUntil) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setCouponsLoading(true);
    try {
      const endpoint = editingCoupon ? 'update_coupon.php' : 'create_coupon.php';
      const body = editingCoupon 
        ? `id=${editingCoupon.id}&code=${encodeURIComponent(couponForm.code)}&type=${couponForm.type}&value=${couponForm.value}&minAmount=${couponForm.minAmount}&maxUses=${couponForm.maxUses}&validFrom=${couponForm.validFrom}&validUntil=${couponForm.validUntil}&description=${encodeURIComponent(couponForm.description)}`
        : `code=${encodeURIComponent(couponForm.code)}&type=${couponForm.type}&value=${couponForm.value}&minAmount=${couponForm.minAmount}&maxUses=${couponForm.maxUses}&validFrom=${couponForm.validFrom}&validUntil=${couponForm.validUntil}&description=${encodeURIComponent(couponForm.description)}`;

      const res = await fetch(`http://localhost/projet_ministre_api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
      });

      if (res.ok) {
        // Recharger les coupons
        const data = await fetch('http://localhost/projet_ministre_api/get_coupons.php').then(r => r.json());
        setCoupons(data);
        setShowCouponModal(false);
        toast.success(editingCoupon ? 'Coupon mis à jour !' : 'Coupon créé !');
      } else {
        toast.error('Erreur lors de l\'opération');
      }
    } catch (error) {
      toast.error('Erreur réseau');
    }
    setCouponsLoading(false);
  };

  const handleDeleteCoupon = async (coupon: Coupon) => {
    if (!window.confirm(`Supprimer le coupon "${coupon.code}" ?`)) return;
    
    setCouponsLoading(true);
    try {
      const res = await fetch('http://localhost/projet_ministre_api/delete_coupon.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=${coupon.id}`
      });

      if (res.ok) {
        // Recharger les coupons
        const data = await fetch('http://localhost/projet_ministre_api/get_coupons.php').then(r => r.json());
        setCoupons(data);
        toast.success('Coupon supprimé !');
      } else {
        toast.error('Erreur lors de la suppression');
      }
    } catch (error) {
      toast.error('Erreur réseau');
    }
    setCouponsLoading(false);
  };

  const toggleCouponStatus = async (coupon: Coupon) => {
    setCouponsLoading(true);
    try {
      const res = await fetch('http://localhost/projet_ministre_api/toggle_coupon.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=${coupon.id}&isActive=${!coupon.isActive}`
      });

      if (res.ok) {
        // Recharger les coupons
        const data = await fetch('http://localhost/projet_ministre_api/get_coupons.php').then(r => r.json());
        setCoupons(data);
        toast.success(`Coupon ${!coupon.isActive ? 'activé' : 'désactivé'} !`);
      } else {
        toast.error('Erreur lors du changement de statut');
      }
    } catch (error) {
      toast.error('Erreur réseau');
    }
    setCouponsLoading(false);
  };

  const generateCouponCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCouponForm({ ...couponForm, code: result });
  };

  const filteredCoupons = coupons.filter(coupon => {
    if (couponFilter === 'active') return coupon.isActive;
    if (couponFilter === 'inactive') return !coupon.isActive;
    if (couponFilter === 'expired') return new Date(coupon.validUntil) < new Date();
    return true;
  });

  // Données d'exemple pour les diagrammes
  const salesData = [
    { date: '01/07', ventes: 120 },
    { date: '02/07', ventes: 98 },
    { date: '03/07', ventes: 150 },
    { date: '04/07', ventes: 80 },
    { date: '05/07', ventes: 170 },
    { date: '06/07', ventes: 140 },
    { date: '07/07', ventes: 200 },
  ];
  const salesPieData = [
    { name: 'Produit A', value: 400 },
    { name: 'Produit B', value: 300 },
    { name: 'Produit C', value: 300 },
  ];
  const trafficData = [
    { date: '01/07', visiteurs: 320 },
    { date: '02/07', visiteurs: 280 },
    { date: '03/07', visiteurs: 350 },
    { date: '04/07', visiteurs: 400 },
    { date: '05/07', visiteurs: 370 },
    { date: '06/07', visiteurs: 420 },
    { date: '07/07', visiteurs: 390 },
  ];
  const trafficPieData = [
    { name: 'Direct', value: 300 },
    { name: 'Recherche', value: 500 },
    { name: 'Réseaux sociaux', value: 200 },
  ];
  const pagesBarData = [
    { page: 'Accueil', vues: 1200 },
    { page: 'Produits', vues: 900 },
    { page: 'Contact', vues: 400 },
  ];
  const funnelData = [
    { step: 'Accueil', value: 1000 },
    { step: 'Panier', value: 400 },
    { step: 'Achat', value: 200 },
  ];
  const abandonData = [
    { label: 'Ajout au panier', value: 400 },
    { label: 'Achat', value: 200 },
  ];
  const avgTimeData = [
    { date: '01/07', minutes: 3 },
    { date: '02/07', minutes: 2.5 },
    { date: '03/07', minutes: 4 },
    { date: '04/07', minutes: 3.2 },
    { date: '05/07', minutes: 3.8 },
    { date: '06/07', minutes: 2.9 },
    { date: '07/07', minutes: 4.1 },
  ];
  const devicePieData = [
    { name: 'Mobile', value: 600 },
    { name: 'Desktop', value: 350 },
    { name: 'Tablette', value: 150 },
  ];
  const reviewsBarData = [
    { type: 'Positifs', value: 80 },
    { type: 'Négatifs', value: 20 },
  ];
  const avgRatingData = [
    { name: 'Produit A', rating: 4.2 },
    { name: 'Produit B', rating: 3.8 },
    { name: 'Produit C', rating: 4.7 },
  ];
  const responseTimeData = [
    { date: '01/07', minutes: 30 },
    { date: '02/07', minutes: 25 },
    { date: '03/07', minutes: 40 },
    { date: '04/07', minutes: 35 },
    { date: '05/07', minutes: 28 },
    { date: '06/07', minutes: 32 },
    { date: '07/07', minutes: 27 },
  ];
  const emailOpenData = [
    { date: '01/07', taux: 45 },
    { date: '02/07', taux: 50 },
    { date: '03/07', taux: 48 },
    { date: '04/07', taux: 52 },
  ];
  const campaignPieData = [
    { name: 'Campagne A', value: 120 },
    { name: 'Campagne B', value: 80 },
    { name: 'Campagne C', value: 60 },
  ];
  const channelBarData = [
    { channel: 'Email', conversion: 30, leads: 70 },
    { channel: 'Réseaux sociaux', conversion: 20, leads: 50 },
    { channel: 'SEO', conversion: 15, leads: 40 },
  ];
  const cacLineData = [
    { date: '01/07', cac: 12 },
    { date: '02/07', cac: 15 },
    { date: '03/07', cac: 13 },
    { date: '04/07', cac: 14 },
  ];
  const stockBarData = [
    { name: 'Produit A', stock: 30 },
    { name: 'Produit B', stock: 12 },
    { name: 'Produit C', stock: 50 },
  ];
  const salesVsStockData = [
    { name: 'Produit A', ventes: 20, stock: 30 },
    { name: 'Produit B', ventes: 10, stock: 12 },
    { name: 'Produit C', ventes: 40, stock: 50 },
  ];
  const deliveryLineData = [
    { date: '01/07', jours: 2 },
    { date: '02/07', jours: 3 },
    { date: '03/07', jours: 2.5 },
    { date: '04/07', jours: 2.8 },
  ];
  const rupturePieData = [
    { type: 'Rupture', value: 2 },
    { type: 'Surstock', value: 1 },
  ];
  const revenueVsExpensesBar = [
    { mois: 'Mai', ca: 12000, dep: 8000 },
    { mois: 'Juin', ca: 15000, dep: 9000 },
    { mois: 'Juil', ca: 17000, dep: 9500 },
  ];
  const avgBasketData = [
    { date: '01/07', panier: 80 },
    { date: '02/07', panier: 90 },
    { date: '03/07', panier: 85 },
    { date: '04/07', panier: 95 },
  ];
  const returnRateBarData = [
    { produit: 'Produit A', taux: 2 },
    { produit: 'Produit B', taux: 1 },
    { produit: 'Produit C', taux: 3 },
  ];
  const geoPieData = [
    { region: 'Tunis', value: 300 },
    { region: 'Sfax', value: 200 },
    { region: 'Sousse', value: 150 },
  ];
  const loyalBarData = [
    { type: 'Fidèles', value: 120 },
    { type: 'Nouveaux', value: 80 },
  ];
  const freqBarData = [
    { client: 'Client A', freq: 5 },
    { client: 'Client B', freq: 2 },
    { client: 'Client C', freq: 3 },
  ];
  const ageBarData = [
    { group: '18-25', achats: 40, visites: 100 },
    { group: '26-35', achats: 60, visites: 120 },
    { group: '36-50', achats: 30, visites: 80 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-pink-100 to-orange-100">
      {/* Barre d'onglets Soft UI */}
      <div className="w-full flex justify-center pt-6">
        <div className="flex gap-2 overflow-x-auto py-2 mb-8 bg-softui-light rounded-softxl shadow-softxl px-4 max-w-5xl w-full border border-softui-border">
          {NAV_SECTIONS.map(section => (
            <button
              key={section.key}
              className={`px-4 py-2 rounded-soft font-semibold transition shadow-soft text-base
                ${activeSection === section.key
                  ? "bg-softui-primary text-white ring-2 ring-softui-primary/40 shadow-softxl"
                  : "bg-softui-accent text-softui-secondary hover:bg-softui-primary/10 hover:text-softui-primary"}
              `}
              onClick={() => setActiveSection(section.key)}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
      <main className="container mx-auto max-w-5xl px-4 md:px-8">
        {/* Section Dashboard */}
        {activeSection === 'tout' && (
          <div className="mb-16">
            <div className="bg-softui-card rounded-softxl shadow-softxl p-10 w-full text-center mb-8 animate-fade-in border border-softui-border">
              <h1 className="text-4xl font-extrabold text-softui-primary mb-4 tracking-tight">Commerçant Dashboard</h1>
              <p className="text-lg text-softui-secondary mb-8">Bienvenue sur votre espace commerçant.</p>
              {/* KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 mb-8">
                {[
                  { label: 'Produits', value: products.length, variation: +3 },
                  { label: 'Commandes', value: 0, variation: 0 },
                  { label: 'Avis', value: avis.length, variation: +1 },
                ].map((stat, i) => (
                  <div key={stat.label} className="bg-softui-accent rounded-xl shadow-soft p-6 flex flex-col items-center border border-softui-border animate-fade-in">
                    <div className="text-3xl font-extrabold text-softui-primary mb-2 flex items-center gap-2">
                      {stat.value}
                      <span className={stat.variation >= 0 ? 'text-green-500 text-lg' : 'text-red-500 text-lg'}>
                        {stat.variation >= 0 ? '▲' : '▼'} {Math.abs(stat.variation)}%
                      </span>
                    </div>
                    <div className="text-softui-secondary text-lg font-semibold mb-1">{stat.label}</div>
                    <div className="w-10 h-1 rounded-full bg-softui-primary/20 mt-2" />
                  </div>
                ))}
              </div>
              {/* Graphique évolution */}
              <div className="bg-white rounded-xl shadow-softxl p-6 mb-8 border border-softui-border">
                <h3 className="text-xl font-bold text-softui-primary mb-4">Évolution des ventes (7 derniers jours)</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="ventes" stroke="#5e72e4" strokeWidth={3} dot={{ r: 3 }} name="Ventes" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {/* Bloc Alertes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  { type: 'stock', label: '1 produit en rupture', color: 'bg-yellow-100 text-yellow-700' },
                  { type: 'avis', label: '2 avis à traiter', color: 'bg-red-100 text-red-700' },
                  { type: 'commande', label: '0 commande en attente', color: 'bg-blue-100 text-blue-700' },
                ].map((a, i) => (
                  <div key={a.type} className={`rounded-xl p-4 font-semibold shadow-soft border border-softui-border flex items-center justify-center ${a.color}`}>
                    {a.label}
                  </div>
                ))}
              </div>
              {/* Top produits */}
              <div className="bg-softui-accent rounded-xl shadow-softxl p-6 border border-softui-border max-w-md mx-auto">
                <h3 className="text-xl font-bold text-softui-primary mb-4">Top produits</h3>
                <ol className="space-y-2">
                  {[
                    { nom: 'Pain complet', ventes: 120 },
                    { nom: "Huile d'olive", ventes: 110 },
                    { nom: 'Livre scolaire', ventes: 95 },
                  ].map((p, i) => (
                    <li key={p.nom} className="flex items-center gap-3 text-lg font-semibold">
                      <span className="w-8 h-8 flex items-center justify-center rounded-full bg-softui-primary/10 text-softui-primary font-bold">{i+1}</span>
                      <span>{p.nom}</span>
                      <span className="ml-auto text-softui-secondary font-normal">Ventes : {p.ventes}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}
        {(activeSection === 'tout' || activeSection === 'ventes') && (
          <section className="bg-softui-card rounded-softxl shadow-softxl p-10 w-full text-left mb-10 border border-softui-border animate-fade-in">
            <h2 className="text-2xl font-extrabold text-softui-primary mb-6 flex items-center gap-2">🛍️ Ventes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 📈 Évolution des ventes */}
              <div>
                <h3 className="font-semibold mb-2 text-softui-secondary">Évolution des ventes</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="ventes" stroke="#5e72e4" strokeWidth={3} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {/* 📊 Répartition des ventes par produit */}
              <div>
                <h3 className="font-semibold mb-2 text-softui-secondary">Répartition des ventes</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie data={salesPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                      {salesPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${index * 100}, 70%, 50%)`} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/*  Taux de conversion */}
              <div className="flex flex-col items-center justify-center">
                <h3 className="font-semibold mb-2 text-softui-secondary">Taux de conversion</h3>
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 36 36">
                    <path d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none" stroke="#e5e7eb" strokeWidth="3.5" />
                    <path d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831"
                      fill="none" stroke="#2dce89" strokeWidth="3.5" strokeDasharray="23, 100" />
                  </svg>
                  <span className="text-2xl font-bold text-green-600">23%</span>
                </div>
                <div className="text-softui-secondary mt-2">Visiteurs → Acheteurs</div>
              </div>
            </div>
          </section>
        )}
        {(activeSection === 'tout' || activeSection === 'trafic') && (
          <section className="bg-softui-card rounded-softxl shadow-softxl p-10 w-full text-left mb-10 border border-softui-border animate-fade-in">
            <h2 className="text-2xl font-extrabold text-softui-primary mb-6 flex items-center gap-2">📈 Trafic du site</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* 👥 Nombre de visiteurs uniques */}
              <div>
                <h3 className="font-semibold mb-2 text-softui-secondary">Visiteurs uniques</h3>
                <ResponsiveContainer width="100%" height={160}>
                  <LineChart data={trafficData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="visiteurs" stroke="#3182CE" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {/* 🌐 Origine du trafic */}
              <div>
                <h3 className="font-semibold mb-2 text-softui-secondary">Origine du trafic</h3>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie data={trafficPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={55} label>
                      {trafficPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${index * 100}, 70%, 50%)`} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* 🚪 Taux de rebond */}
              <div className="flex flex-col items-center justify-center">
                <h3 className="font-semibold mb-2 text-softui-secondary">Taux de rebond</h3>
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg width="96" height="96">
                    <circle cx="48" cy="48" r="40" fill="#F3F4F6" />
                    <circle
                      cx="48" cy="48" r="40"
                      fill="none"
                      stroke="#E53E3E"
                      strokeWidth="8"
                      strokeDasharray={Math.PI * 2 * 40}
                      strokeDashoffset={Math.PI * 2 * 40 * (1 - 38 / 100)}
                      strokeLinecap="round"
                      transform="rotate(-90 48 48)"
                    />
                  </svg>
                  <span className="absolute text-lg font-bold text-red-600">38%</span>
                </div>
                <span className="text-sm text-gray-500 mt-1">Visiteurs quittant rapidement</span>
              </div>
              {/* 🧭 Pages les plus consultées */}
              <div>
                <h3 className="font-semibold mb-2 text-softui-secondary">Pages les plus consultées</h3>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={pagesBarData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="page" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="vues" fill="#F59E42" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        )}
        {(activeSection === 'tout' || activeSection === 'comportement') && (
          <section className="bg-softui-card rounded-softxl shadow-softxl p-10 w-full text-left mb-10 border border-softui-border animate-fade-in">
            <h2 className="text-2xl font-extrabold text-softui-primary mb-6 flex items-center gap-2">🛒 Comportement d'achat</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* 🔄 Tunnel de conversion (funnel chart) */}
              <div>
                <h3 className="font-semibold mb-2 text-softui-secondary">Tunnel de conversion</h3>
                {/* Recharts FunnelChart n'est dispo qu'en v2+ */}
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={funnelData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="step" type="category" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3182CE" barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* 🛍️ Taux d'abandon de panier */}
              <div>
                <h3 className="font-semibold mb-2 text-softui-secondary">Taux d'abandon de panier</h3>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={abandonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#E53E3E" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="text-center mt-2 text-lg font-bold text-red-600">0%</div>
                <div className="text-center text-xs text-gray-500">d'abandon</div>
              </div>
              {/* ⏱️ Temps moyen passé sur le site */}
              <div>
                <h3 className="font-semibold mb-2 text-softui-secondary">Temps moyen passé</h3>
                <ResponsiveContainer width="100%" height={160}>
                  <LineChart data={avgTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="minutes" stroke="#F59E42" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {/* 📱 Appareil utilisé */}
              <div>
                <h3 className="font-semibold mb-2 text-softui-secondary">Appareil utilisé</h3>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie data={devicePieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={55} label>
                      {devicePieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${index * 100}, 70%, 50%)`} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        )}
        {(activeSection === 'tout' || activeSection === 'satisfaction') && (
          <section className="bg-softui-card rounded-softxl shadow-softxl p-10 w-full text-left mb-10 border border-softui-border animate-fade-in">
            <h2 className="text-2xl font-extrabold text-softui-primary mb-6 flex items-center gap-2">⭐ Satisfaction client</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 💬 Avis clients (positifs vs négatifs) */}
              <div>
                <h3 className="font-semibold mb-2 text-softui-secondary">Avis clients</h3>
                <ResponsiveContainer width="100%" height={140}>
                  <BarChart data={reviewsBarData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#38A169" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* 🌟 Note moyenne par produit/service */}
              <div className="flex flex-col items-center justify-center">
                <h3 className="font-semibold mb-2 text-softui-secondary">Note moyenne par produit</h3>
                <div className="flex flex-col gap-2 w-full">
                  {avgRatingData.map((prod) => (
                    <div key={prod.name} className="flex items-center gap-2">
                      <span className="w-24 text-sm text-gray-700">{prod.name}</span>
                      <span className="flex items-center">
                        {[1,2,3,4,5].map(i => (
                          <svg key={i} className={`w-5 h-5 ${i <= Math.round(prod.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><polygon points="9.9,1.1 7.6,6.6 1.6,7.6 6,11.9 4.9,17.9 9.9,14.9 14.9,17.9 13.8,11.9 18.2,7.6 12.2,6.6 "/></svg>
                        ))}
                      </span>
                      <span className="ml-2 text-xs text-gray-500">{prod.rating.toFixed(1)}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* 📩 Temps moyen de réponse aux demandes client */}
              <div>
                <h3 className="font-semibold mb-2 text-softui-secondary">Temps moyen de réponse</h3>
                <ResponsiveContainer width="100%" height={140}>
                  <LineChart data={responseTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="minutes" stroke="#3182CE" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        )}
        {(activeSection === 'tout' || activeSection === 'marketing') && (
          <section className="bg-softui-card rounded-softxl shadow-softxl p-10 w-full text-left mb-10 border border-softui-border animate-fade-in">
            <h2 className="text-2xl font-extrabold text-softui-primary mb-6 flex items-center gap-2">📢 Marketing & publicité</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* 📨 Taux d'ouverture d'emails */}
              <div>
                <h3 className="font-semibold mb-2 text-softui-secondary">Taux d'ouverture d'emails</h3>
                <ResponsiveContainer width="100%" height={140}>
                  <BarChart data={emailOpenData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="taux" fill="#3182CE" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* 🎯 Taux de clic sur campagnes (CTR) */}
              <div>
                <h3 className="font-semibold mb-2 text-softui-secondary">Taux de clic sur campagnes</h3>
                <ResponsiveContainer width="100%" height={140}>
                  <PieChart>
                    <Pie data={campaignPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={55} label>
                      {campaignPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${index * 100}, 70%, 50%)`} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* 🛍️ Taux de conversion par canal marketing */}
              <div>
                <h3 className="font-semibold mb-2 text-softui-secondary">Taux de conversion par canal</h3>
                <ResponsiveContainer width="100%" height={140}>
                  <BarChart data={channelBarData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="channel" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="conversion" stackId="a" fill="#38A169" />
                    <Bar dataKey="leads" stackId="a" fill="#F59E42" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* 💰 Coût d'acquisition client (CAC) */}
              <div>
                <h3 className="font-semibold mb-2 text-softui-secondary">Coût d'acquisition client (CAC)</h3>
                <ResponsiveContainer width="100%" height={140}>
                  <LineChart data={cacLineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="cac" stroke="#E53E3E" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        )}
        {(activeSection === 'tout' || activeSection === 'stock') && (
          <section className="bg-softui-card rounded-softxl shadow-softxl p-10 w-full text-left mb-10 border border-softui-border animate-fade-in">
            <h2 className="text-2xl font-extrabold text-softui-primary mb-6 flex items-center gap-2">📦 Stock & logistique</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* 📦 État du stock par produit */}
              <div>
                <h3 className="font-semibold mb-2 text-softui-secondary">État du stock par produit</h3>
                <ResponsiveContainer width="100%" height={140}>
                  <BarChart data={stockBarData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="stock" fill="#3182CE" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* 🛒 Ventes vs stock disponible */}
              <div>
                <h3 className="font-semibold mb-2 text-softui-secondary">Ventes vs stock disponible</h3>
                <ResponsiveContainer width="100%" height={140}>
                  <BarChart data={salesVsStockData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="ventes" fill="#E53E3E" />
                    <Bar dataKey="stock" fill="#38A169" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* 🚚 Délai moyen de livraison */}
              <div>
                <h3 className="font-semibold mb-2 text-softui-secondary">Délai moyen de livraison</h3>
                <ResponsiveContainer width="100%" height={140}>
                  <LineChart data={deliveryLineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="jours" stroke="#F59E42" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {/* 📦 Taux de rupture/surstock */}
              <div>
                <h3 className="font-semibold mb-2 text-softui-secondary">Taux de rupture/surstock</h3>
                <ResponsiveContainer width="100%" height={140}>
                  <PieChart>
                    <Pie data={rupturePieData} dataKey="value" nameKey="type" cx="50%" cy="50%" outerRadius={55} label>
                      {rupturePieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${index * 100}, 70%, 50%)`} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        )}
        {(activeSection === 'tout' || activeSection === 'finances') && (
          <section className="bg-softui-card rounded-softxl shadow-softxl p-10 w-full text-left mb-10 border border-softui-border animate-fade-in">
            <h2 className="text-2xl font-extrabold text-softui-primary mb-6 flex items-center gap-2">💰 Finances</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 📈 Chiffre d'affaires vs dépenses */}
              <div>
                <h3 className="font-semibold mb-2 text-softui-secondary">Chiffre d'affaires vs dépenses</h3>
                <ResponsiveContainer width="100%" height={140}>
                  <BarChart data={revenueVsExpensesBar}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mois" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="ca" fill="#3182CE" name="Chiffre d'affaires" />
                    <Bar dataKey="dep" fill="#E53E3E" name="Dépenses" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* 💳 Panier moyen */}
              <div className="flex flex-col items-center justify-center">
                <h3 className="font-semibold mb-2 text-softui-secondary">Panier moyen</h3>
                <ResponsiveContainer width="100%" height={140}>
                  <LineChart data={avgBasketData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="panier" stroke="#38A169" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
                <div className="text-center mt-2 text-lg font-bold text-green-600">0 DT</div>
                <div className="text-center text-xs text-gray-500">sur la période</div>
              </div>
              {/* 🔁 Taux de retour produit */}
              <div>
                <h3 className="font-semibold mb-2 text-softui-secondary">Taux de retour produit</h3>
                <ResponsiveContainer width="100%" height={140}>
                  <BarChart data={returnRateBarData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="produit" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="taux" fill="#F59E42" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        )}
        {(activeSection === 'tout' || activeSection === 'analyse') && (
          <section className="bg-softui-card rounded-softxl shadow-softxl p-10 w-full text-left mb-10 border border-softui-border animate-fade-in">
            <h2 className="text-2xl font-extrabold text-softui-primary mb-6 flex items-center gap-2">🧠 Analyse clients</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* 🌍 Répartition géographique des clients */}
              <div>
                <h3 className="font-semibold mb-2 text-softui-secondary">Répartition géographique</h3>
                <ResponsiveContainer width="100%" height={140}>
                  <PieChart>
                    <Pie data={geoPieData} dataKey="value" nameKey="region" cx="50%" cy="50%" outerRadius={55} label>
                      {geoPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${index * 100}, 70%, 50%)`} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* 📊 Clients fidèles vs nouveaux clients */}
              <div>
                <h3 className="font-semibold mb-2 text-softui-secondary">Fidèles vs nouveaux</h3>
                <ResponsiveContainer width="100%" height={140}>
                  <BarChart data={loyalBarData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3182CE" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* 📆 Fréquence d'achat par client */}
              <div>
                <h3 className="font-semibold mb-2 text-softui-secondary">Fréquence d'achat par client</h3>
                <ResponsiveContainer width="100%" height={140}>
                  <BarChart data={freqBarData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="client" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="freq" fill="#F59E42" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* 🧓 Répartition par âge / sexe / comportement */}
              <div>
                <h3 className="font-semibold mb-2 text-softui-secondary">Âge / sexe / comportement</h3>
                <ResponsiveContainer width="100%" height={140}>
                  <BarChart data={ageBarData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="group" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="achats" fill="#3182CE" name="Achats" />
                    <Bar dataKey="visites" fill="#E53E3E" name="Visites" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        )}
        {(activeSection === 'tout' || activeSection === 'avis') && (
          <section className="bg-softui-card rounded-softxl shadow-softxl p-10 w-full text-left mb-10 border border-softui-border animate-fade-in">
            <h2 className="text-2xl font-extrabold text-softui-primary mb-6 flex items-center gap-2">⭐ Avis & Commentaires</h2>
            {/* Table des avis avec actions CRUD */}
            <div>
              {avisLoading ? (
                <div className="text-center text-gray-500 py-8">Chargement des avis...</div>
              ) : avisError ? (
                <div className="text-center text-red-600 py-8">{avisError}</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-3 py-2 border">Client</th>
                        <th className="px-3 py-2 border">Note</th>
                        <th className="px-3 py-2 border">Commentaire</th>
                        <th className="px-3 py-2 border">Réponse</th>
                        <th className="px-3 py-2 border">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {avis.length === 0 ? (
                        <tr><td colSpan={5} className="text-center py-6 text-gray-400">Aucun avis pour le moment</td></tr>
                      ) : avis.map((review: Review) => (
                        <tr key={review.id} className="border-b">
                          <td className="px-3 py-2 border font-medium">{review.client || review.userName}</td>
                          <td className="px-3 py-2 border">
                            {[1,2,3,4,5].map(i => (
                              <svg key={i} className={`inline w-4 h-4 ${i <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><polygon points="9.9,1.1 7.6,6.6 1.6,7.6 6,11.9 4.9,17.9 9.9,14.9 14.9,17.9 13.8,11.9 18.2,7.6 12.2,6.6 "/></svg>
                            ))}
                            <span className="ml-1 text-xs text-gray-500">{review.rating}</span>
                          </td>
                          <td className="px-3 py-2 border max-w-xs truncate" title={review.comment}>{review.comment}</td>
                          <td className="px-3 py-2 border text-xs text-gray-700">{review.reponse_commercant || <span className="italic text-gray-400">Non répondu</span>}</td>
                          <td className="px-3 py-2 border space-x-2">
                            <button onClick={() => handleReply(review)} className="text-blue-600 hover:underline text-xs">Répondre</button>
                            <button onClick={() => handleDelete(review)} className="text-red-600 hover:underline text-xs">Supprimer</button>
                            <button onClick={() => handleFlag(review)} className="text-yellow-600 hover:underline text-xs">Signaler</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {/* Modal de réponse */}
              {showReplyModal && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                    <h3 className="text-lg font-bold mb-4">Répondre à l'avis</h3>
                    <textarea
                      className="w-full border rounded p-2 mb-4"
                      rows={4}
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                      placeholder="Votre réponse au client..."
                    />
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setShowReplyModal(false)} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Annuler</button>
                      <button onClick={submitReply} disabled={actionLoading} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50">Envoyer</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
        {(activeSection === 'tout' || activeSection === 'coupons') && (
          <section className="bg-softui-card rounded-softxl shadow-softxl p-10 w-full text-left mb-10 border border-softui-border animate-fade-in">
            <h2 className="text-2xl font-extrabold text-softui-primary mb-6 flex items-center gap-2">🎁 Coupons</h2>
            
            {/* Statistiques des coupons */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Total', value: coupons.length, color: 'bg-blue-100 text-blue-700' },
                { label: 'Actifs', value: coupons.filter(c => c.isActive).length, color: 'bg-green-100 text-green-700' },
                { label: 'Expirés', value: coupons.filter(c => new Date(c.validUntil) < new Date()).length, color: 'bg-red-100 text-red-700' },
                { label: 'Utilisations', value: coupons.reduce((sum, c) => sum + c.currentUses, 0), color: 'bg-yellow-100 text-yellow-700' },
              ].map((stat, i) => (
                <div key={stat.label} className={`rounded-xl p-4 font-semibold shadow-soft border border-softui-border flex items-center justify-center ${stat.color}`}>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Filtres et actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="flex flex-wrap gap-2">
                <select 
                  value={couponFilter} 
                  onChange={(e) => setCouponFilter(e.target.value)}
                  className="px-4 py-2 rounded-soft border border-softui-border bg-white focus:ring-2 focus:ring-softui-primary/20 focus:border-softui-primary"
                >
                  <option value="all">Tous les coupons</option>
                  <option value="active">Actifs uniquement</option>
                  <option value="inactive">Inactifs uniquement</option>
                  <option value="expired">Expirés</option>
                </select>
                <input 
                  type="text" 
                  placeholder="Rechercher un coupon..." 
                  className="px-4 py-2 rounded-soft border border-softui-border bg-white focus:ring-2 focus:ring-softui-primary/20 focus:border-softui-primary"
                />
              </div>
              <Button onClick={openAddCouponModal} className="bg-softui-primary text-white hover:shadow-softxl transition-all">
                <Package className="w-5 h-5 mr-2" /> Nouveau Coupon
              </Button>
            </div>

            {/* Table des coupons */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-softui-border rounded-soft overflow-hidden">
                <thead>
                  <tr className="bg-softui-accent">
                    <th className="px-4 py-3 border-b border-softui-border text-left font-semibold text-softui-primary">Code</th>
                    <th className="px-4 py-3 border-b border-softui-border text-left font-semibold text-softui-primary">Type</th>
                    <th className="px-4 py-3 border-b border-softui-border text-left font-semibold text-softui-primary">Valeur</th>
                    <th className="px-4 py-3 border-b border-softui-border text-left font-semibold text-softui-primary">Min. Montant</th>
                    <th className="px-4 py-3 border-b border-softui-border text-left font-semibold text-softui-primary">Utilisations</th>
                    <th className="px-4 py-3 border-b border-softui-border text-left font-semibold text-softui-primary">Validité</th>
                    <th className="px-4 py-3 border-b border-softui-border text-left font-semibold text-softui-primary">Statut</th>
                    <th className="px-4 py-3 border-b border-softui-border text-left font-semibold text-softui-primary">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {couponsLoading ? (
                    <tr><td colSpan={8} className="text-center py-8 text-softui-secondary">Chargement des coupons...</td></tr>
                  ) : couponsError ? (
                    <tr><td colSpan={8} className="text-center py-8 text-red-600">{couponsError}</td></tr>
                  ) : filteredCoupons.length === 0 ? (
                    <tr><td colSpan={8} className="text-center py-8 text-softui-secondary">Aucun coupon trouvé.</td></tr>
                  ) : filteredCoupons.map((coupon: Coupon) => {
                    const isExpired = new Date(coupon.validUntil) < new Date();
                    const usagePercentage = coupon.maxUses ? (coupon.currentUses / coupon.maxUses) * 100 : 0;
                    
                    return (
                      <tr key={coupon.id} className="border-b border-softui-border hover:bg-softui-accent/50 transition-colors">
                        <td className="px-4 py-3 border-b border-softui-border">
                          <div className="font-mono font-semibold text-softui-primary">{coupon.code}</div>
                          {coupon.description && (
                            <div className="text-xs text-softui-secondary mt-1">{coupon.description}</div>
                          )}
                        </td>
                        <td className="px-4 py-3 border-b border-softui-border">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            coupon.type === 'percentage' 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {coupon.type === 'percentage' ? 'Pourcentage' : 'Fixe'}
                          </span>
                        </td>
                        <td className="px-4 py-3 border-b border-softui-border font-semibold">
                          {coupon.type === 'percentage' ? `${coupon.value}%` : `${coupon.value} DT`}
                        </td>
                        <td className="px-4 py-3 border-b border-softui-border">
                          {coupon.minAmount ? `${coupon.minAmount} DT` : 'Aucun'}
                        </td>
                        <td className="px-4 py-3 border-b border-softui-border">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{coupon.currentUses}</span>
                            {coupon.maxUses && (
                              <>
                                <span className="text-softui-secondary">/</span>
                                <span className="text-softui-secondary">{coupon.maxUses}</span>
                              </>
                            )}
                          </div>
                          {coupon.maxUses && (
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                              <div 
                                className="bg-softui-primary h-2 rounded-full transition-all" 
                                style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                              ></div>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 border-b border-softui-border">
                          <div className="text-xs">
                            <div>Du: {new Date(coupon.validFrom).toLocaleDateString()}</div>
                            <div>Au: {new Date(coupon.validUntil).toLocaleDateString()}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 border-b border-softui-border">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${coupon.isActive && !isExpired ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span className={`text-xs font-semibold ${
                              coupon.isActive && !isExpired ? 'text-green-700' : 'text-red-700'
                            }`}>
                              {isExpired ? 'Expiré' : coupon.isActive ? 'Actif' : 'Inactif'}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 border-b border-softui-border">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => openEditCouponModal(coupon)} 
                              className="text-blue-600 hover:text-blue-800 text-xs font-semibold hover:underline"
                            >
                              Modifier
                            </button>
                            <button 
                              onClick={() => toggleCouponStatus(coupon)} 
                              className={`text-xs font-semibold hover:underline ${
                                coupon.isActive ? 'text-yellow-600 hover:text-yellow-800' : 'text-green-600 hover:text-green-800'
                              }`}
                            >
                              {coupon.isActive ? 'Désactiver' : 'Activer'}
                            </button>
                            <button 
                              onClick={() => handleDeleteCoupon(coupon)} 
                              className="text-red-600 hover:text-red-800 text-xs font-semibold hover:underline"
                            >
                              Supprimer
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Modal de création/édition de coupon */}
            {showCouponModal && (
              <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setShowCouponModal(false)}>
                <div className="bg-white rounded-xl shadow-softxl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-softui-primary">
                      {editingCoupon ? 'Modifier le coupon' : 'Créer un nouveau coupon'}
                    </h3>
                    <button 
                      onClick={() => setShowCouponModal(false)}
                      className="text-softui-secondary hover:text-softui-primary transition-colors"
                    >
                      <CloseIcon className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <form onSubmit={handleCouponSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-softui-secondary mb-2">Code du coupon *</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            name="code"
                            value={couponForm.code}
                            onChange={handleCouponFormChange}
                            className="flex-1 px-4 py-3 rounded-soft border border-softui-border bg-white focus:ring-2 focus:ring-softui-primary/20 focus:border-softui-primary transition-all"
                            placeholder="Ex: WELCOME10"
                            disabled={editingCoupon}
                          />
                          {!editingCoupon && (
                            <button 
                              type="button" 
                              onClick={generateCouponCode}
                              className="px-4 py-3 bg-softui-accent text-softui-primary rounded-soft font-semibold hover:shadow-soft transition-all border border-softui-border"
                            >
                              Générer
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-softui-secondary mb-2">Type de réduction *</label>
                        <select
                          name="type"
                          value={couponForm.type}
                          onChange={handleCouponFormChange}
                          className="w-full px-4 py-3 rounded-soft border border-softui-border bg-white focus:ring-2 focus:ring-softui-primary/20 focus:border-softui-primary transition-all"
                        >
                          <option value="percentage">Pourcentage (%)</option>
                          <option value="fixed">Montant fixe (DT)</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-softui-secondary mb-2">
                          Valeur {couponForm.type === 'percentage' ? '(%)' : '(DT)'} *
                        </label>
                        <input
                          type="number"
                          name="value"
                          value={couponForm.value}
                          onChange={handleCouponFormChange}
                          className="w-full px-4 py-3 rounded-soft border border-softui-border bg-white focus:ring-2 focus:ring-softui-primary/20 focus:border-softui-primary transition-all"
                          placeholder={couponForm.type === 'percentage' ? 'Ex: 10' : 'Ex: 50'}
                          min="0"
                          max={couponForm.type === 'percentage' ? '100' : undefined}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-softui-secondary mb-2">Montant minimum (DT)</label>
                        <input
                          type="number"
                          name="minAmount"
                          value={couponForm.minAmount}
                          onChange={handleCouponFormChange}
                          className="w-full px-4 py-3 rounded-soft border border-softui-border bg-white focus:ring-2 focus:ring-softui-primary/20 focus:border-softui-primary transition-all"
                          placeholder="Ex: 50 (optionnel)"
                          min="0"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-softui-secondary mb-2">Maximum d'utilisations</label>
                        <input
                          type="number"
                          name="maxUses"
                          value={couponForm.maxUses}
                          onChange={handleCouponFormChange}
                          className="w-full px-4 py-3 rounded-soft border border-softui-border bg-white focus:ring-2 focus:ring-softui-primary/20 focus:border-softui-primary transition-all"
                          placeholder="Ex: 100 (optionnel)"
                          min="1"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-softui-secondary mb-2">Date de début *</label>
                        <input
                          type="date"
                          name="validFrom"
                          value={couponForm.validFrom}
                          onChange={handleCouponFormChange}
                          className="w-full px-4 py-3 rounded-soft border border-softui-border bg-white focus:ring-2 focus:ring-softui-primary/20 focus:border-softui-primary transition-all"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-softui-secondary mb-2">Date de fin *</label>
                        <input
                          type="date"
                          name="validUntil"
                          value={couponForm.validUntil}
                          onChange={handleCouponFormChange}
                          className="w-full px-4 py-3 rounded-soft border border-softui-border bg-white focus:ring-2 focus:ring-softui-primary/20 focus:border-softui-primary transition-all"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-softui-secondary mb-2">Description</label>
                      <textarea
                        name="description"
                        value={couponForm.description}
                        onChange={handleCouponFormChange}
                        className="w-full px-4 py-3 rounded-soft border border-softui-border bg-white focus:ring-2 focus:ring-softui-primary/20 focus:border-softui-primary transition-all"
                        rows={3}
                        placeholder="Description du coupon (optionnel)"
                      />
                    </div>
                    
                    <div className="flex justify-end gap-3 pt-4 border-t border-softui-border">
                      <button 
                        type="button" 
                        onClick={() => setShowCouponModal(false)}
                        className="px-6 py-3 bg-softui-accent text-softui-secondary rounded-soft font-semibold hover:shadow-soft transition-all border border-softui-border"
                      >
                        Annuler
                      </button>
                      <button 
                        type="submit" 
                        disabled={couponsLoading}
                        className="px-6 py-3 bg-softui-primary text-white rounded-soft font-semibold hover:shadow-softxl transition-all disabled:opacity-50 flex items-center gap-2"
                      >
                        {couponsLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Enregistrement...
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {editingCoupon ? 'Enregistrer les modifications' : 'Créer le coupon'}
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </section>
        )}
        {(activeSection === 'tout' || activeSection === 'profil') && (
          <section className="bg-softui-card rounded-softxl shadow-softxl p-10 w-full text-left mb-10 border border-softui-border animate-fade-in">
            <h2 className="text-2xl font-extrabold text-softui-primary mb-6 flex items-center gap-2">👤 Profil</h2>
            
            {/* Informations du profil */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Informations personnelles */}
              <div className="lg:col-span-2">
                <div className="bg-softui-accent rounded-xl shadow-soft p-6 border border-softui-border">
                  <h3 className="text-xl font-bold text-softui-primary mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Informations personnelles
                  </h3>
                  <form onSubmit={handleProfileSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-softui-secondary mb-2">Nom complet</label>
                        <input 
                          type="text" 
                          name="nom" 
                          value={profile.nom} 
                          onChange={handleProfileChange} 
                          className="w-full px-4 py-3 rounded-soft border border-softui-border bg-white focus:ring-2 focus:ring-softui-primary/20 focus:border-softui-primary transition-all" 
                          placeholder="Votre nom complet"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-softui-secondary mb-2">Email</label>
                        <input 
                          type="email" 
                          name="email" 
                          value={profile.email} 
                          onChange={handleProfileChange} 
                          className="w-full px-4 py-3 rounded-soft border border-softui-border bg-white focus:ring-2 focus:ring-softui-primary/20 focus:border-softui-primary transition-all" 
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-softui-secondary mb-2">Nouveau mot de passe</label>
                      <input 
                        type="password" 
                        name="password" 
                        value={profile.password} 
                        onChange={handleProfileChange} 
                        className="w-full px-4 py-3 rounded-soft border border-softui-border bg-white focus:ring-2 focus:ring-softui-primary/20 focus:border-softui-primary transition-all" 
                        placeholder="Laissez vide pour ne pas changer"
                      />
                      <p className="text-xs text-softui-secondary mt-1">Laissez vide pour conserver le mot de passe actuel</p>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button 
                        type="submit" 
                        disabled={profileLoading}
                        className="bg-softui-primary text-white px-6 py-3 rounded-soft font-semibold shadow-soft hover:shadow-softxl transition-all disabled:opacity-50 flex items-center gap-2"
                      >
                        {profileLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Enregistrement...
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Enregistrer les modifications
                          </>
                        )}
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setProfile({ nom: 'Demo Merchant', email: 'demo@merchant.com', password: '' })}
                        className="bg-softui-accent text-softui-secondary px-6 py-3 rounded-soft font-semibold shadow-soft hover:shadow-softxl transition-all border border-softui-border"
                      >
                        Réinitialiser
                      </button>
                    </div>
                    {profileSuccess && (
                      <div className="bg-green-50 border border-green-200 rounded-soft p-4 text-green-700">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {profileSuccess}
                        </div>
                      </div>
                    )}
                    {profileError && (
                      <div className="bg-red-50 border border-red-200 rounded-soft p-4 text-red-700">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          {profileError}
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </div>

              {/* Statistiques du profil */}
              <div className="space-y-6">
                <div className="bg-softui-accent rounded-xl shadow-soft p-6 border border-softui-border">
                  <h3 className="text-lg font-bold text-softui-primary mb-4 flex items-center gap-2">
                    <BarChart2 className="w-5 h-5" />
                    Statistiques
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-softui-secondary">Produits actifs</span>
                      <span className="font-bold text-softui-primary">{products.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-softui-secondary">Avis reçus</span>
                      <span className="font-bold text-softui-primary">{avis.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-softui-secondary">Coupons actifs</span>
                      <span className="font-bold text-softui-primary">{coupons.filter(c => c.isActive).length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-softui-secondary">Note moyenne</span>
                      <span className="font-bold text-softui-primary">
                        {avis.length > 0 ? (avis.reduce((a, r) => a + (r.rating || 0), 0) / avis.length).toFixed(1) : '0.0'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-softui-accent rounded-xl shadow-soft p-6 border border-softui-border">
                  <h3 className="text-lg font-bold text-softui-primary mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Activité récente
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-softui-secondary">Dernière connexion</span>
                      <span className="font-medium text-softui-primary">Aujourd'hui</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-softui-secondary">Profil mis à jour</span>
                      <span className="font-medium text-softui-primary">Il y a 2 jours</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-softui-secondary">Nouveau produit</span>
                      <span className="font-medium text-softui-primary">Il y a 1 semaine</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Paramètres de sécurité */}
            <div className="bg-softui-accent rounded-xl shadow-soft p-6 border border-softui-border">
              <h3 className="text-xl font-bold text-softui-primary mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Sécurité
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white rounded-soft border border-softui-border">
                    <div>
                      <h4 className="font-semibold text-softui-primary">Authentification à deux facteurs</h4>
                      <p className="text-sm text-softui-secondary">Sécurisez votre compte avec la 2FA</p>
                    </div>
                    <button className="bg-softui-primary text-white px-4 py-2 rounded-soft text-sm font-semibold hover:shadow-soft transition-all">
                      Activer
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-soft border border-softui-border">
                    <div>
                      <h4 className="font-semibold text-softui-primary">Notifications de connexion</h4>
                      <p className="text-sm text-softui-secondary">Recevez un email lors de nouvelles connexions</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-softui-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-softui-primary"></div>
                    </label>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white rounded-soft border border-softui-border">
                    <div>
                      <h4 className="font-semibold text-softui-primary">Sessions actives</h4>
                      <p className="text-sm text-softui-secondary">Gérez vos connexions actives</p>
                    </div>
                    <button className="bg-softui-accent text-softui-primary px-4 py-2 rounded-soft text-sm font-semibold hover:shadow-soft transition-all border border-softui-border">
                      Voir
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-soft border border-softui-border">
                    <div>
                      <h4 className="font-semibold text-softui-primary">Historique des connexions</h4>
                      <p className="text-sm text-softui-secondary">Consultez vos dernières connexions</p>
                    </div>
                    <button className="bg-softui-accent text-softui-primary px-4 py-2 rounded-soft text-sm font-semibold hover:shadow-soft transition-all border border-softui-border">
                      Voir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      {selectedChart === 'ventes' && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setSelectedChart(null)}>
          <div className="bg-white rounded-xl shadow-2xl p-8 relative w-full max-w-3xl" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={() => setSelectedChart(null)}>
              <CloseIcon className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">📈 Détail des ventes</h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={salesData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="ventes" stroke="#E53E3E" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Données détaillées</h4>
              <table className="min-w-full text-sm border">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-3 py-2 border">Date</th>
                    <th className="px-3 py-2 border">Ventes</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-3 py-2 border">{item.date}</td>
                      <td className="px-3 py-2 border">{item.ventes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MerchantDashboard; 