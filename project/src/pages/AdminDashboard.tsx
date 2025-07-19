import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend
} from 'recharts';
import CountUp from 'react-countup';
import { BarChart2 } from 'lucide-react';
import HomeIcon from '@heroicons/react/24/solid/HomeIcon';
import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import StarIcon from '@heroicons/react/24/solid/StarIcon';
import ShieldCheckIcon from '@heroicons/react/24/solid/ShieldCheckIcon';
import UserAddIcon from '@heroicons/react/24/solid/UserPlusIcon';
import ArchiveBoxIcon from '@heroicons/react/24/solid/ArchiveBoxIcon';
import AwardIcon from '@heroicons/react/24/solid/TrophyIcon';
import UsersCogIcon from '@heroicons/react/24/solid/UserGroupIcon';
import BookOpenIcon from '@heroicons/react/24/solid/BookOpenIcon';

// Types explicites pour les modals et objets
type BadgeType = { id: number; nom: string; emoji: string; desc: string; regle: string; popularite: number };
type BadgeModalType = { id?: number; nom: string; emoji: string; desc: string; regle: string; popularite: number } | null;
type VendeurType = { id: number; nom: string; email: string; statut: string; badge: string; docs: string[]; details: string; badges: BadgeType[] };
type AvisType = { id: number; client: string; note: number; commentaire: string; date: string; statut: string };
type ReclamType = { id: number; client: string; objet: string; description: string; date: string; statut: string };
type DemandeType = { id: number; nom: string; email: string; date: string; statut: string; justificatif: string; message: string };
type FaqType = { id: number; question: string; answer: string };

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role === 'merchant') {
      // Rediriger les commerçants vers leur dashboard
      navigate('/merchant-dashboard');
    } else if (user.email !== 'admin@gmail.com') {
      // Pour les autres utilisateurs non-admin, rediriger vers login
      navigate('/login');
    }
  }, [user, navigate]);

  // MOCK vendeurs en attente (state)
  // MOCK badges disponibles
  const badgesDisponibles = [
    { id: 1, nom: 'Service client rapide', emoji: '⚡' },
    { id: 2, nom: 'Livraison Express', emoji: '🚚' },
    { id: 3, nom: 'Meilleur vendeur du mois', emoji: '🏆' },
    { id: 4, nom: 'Top qualité', emoji: '🌟' },
  ];
  // Ajout d'un champ badges dans vendeurs
  const [vendeurs, setVendeurs] = useState<VendeurType[]>([
    { id: 1, nom: 'Ali Ben Salah', email: 'ali@vendeur.com', statut: 'En attente', badge: '⏳', docs: ['CR', 'CIN'], details: 'Boulangerie, Tunis. Inscrit le 01/07/2024.', badges: [] },
    { id: 2, nom: 'Sonia Trabelsi', email: 'sonia@tkana.tn', statut: 'Validé', badge: '🥇', docs: ['CR', 'CIN', 'RIB'], details: 'Épicerie, Sfax. Inscrite le 15/06/2024.', badges: [{ id: 1, nom: 'Service client rapide', emoji: '⚡' }] },
    { id: 3, nom: 'Maroof Store', email: 'contact@maroof.tn', statut: 'Or', badge: '🏅', docs: ['CR', 'CIN', 'RIB', 'Certificat'], details: 'Boutique, Sousse. Inscrit le 20/05/2024.', badges: [{ id: 3, nom: 'Meilleur vendeur du mois', emoji: '🏆' }] },
  ]);
  const [profilVendeur, setProfilVendeur] = useState<VendeurType | null>(null);
  const [badgeModalVendeur, setBadgeModalVendeur] = useState<VendeurType | null>(null);
  const [badgeChoisi, setBadgeChoisi] = useState<number|null>(null);

  const handleValider = (id: number) => {
    setVendeurs(vendeurs => vendeurs.map(v => v.id === id ? { ...v, statut: 'Validé', badge: '🥇' } : v));
  };
  const handleRefuser = (id: number) => {
    setVendeurs(vendeurs => vendeurs.map(v => v.id === id ? { ...v, statut: 'Refusé', badge: '❌' } : v));
  };
  const handleVoirProfil = (vendeur: any) => {
    setProfilVendeur(vendeur);
  };
  const handleCloseProfil = () => setProfilVendeur(null);

  const handleOuvrirBadgeModal = (vendeur: any) => {
    setBadgeModalVendeur(vendeur);
    setBadgeChoisi(null);
  };
  const handleAttribuerBadge = () => {
    if (badgeModalVendeur && badgeChoisi) {
      setVendeurs(vendeurs => vendeurs.map(v => {
        if (v.id === badgeModalVendeur.id) {
          const badgeToAdd = badgesDisponibles.find(b => b.id === badgeChoisi);
          if (badgeToAdd && !v.badges.some((b: any) => b.id === badgeToAdd.id)) {
            return { ...v, badges: [...v.badges, badgeToAdd] };
          }
        }
        return v;
      }));
      setBadgeModalVendeur(null);
      setBadgeChoisi(null);
    }
  };
  const handleFermerBadgeModal = () => {
    setBadgeModalVendeur(null);
    setBadgeChoisi(null);
  };

  // MOCK avis (state)
  const [avis, setAvis] = useState<AvisType[]>([
    { id: 1, client: 'Fatma B.', note: 5, commentaire: 'Super service, très satisfaite !', date: '2024-07-01', statut: 'visible' },
    { id: 2, client: 'Karim Z.', note: 2, commentaire: 'Produit non conforme à la description.', date: '2024-06-28', statut: 'signale' },
    { id: 3, client: 'Anonyme', note: 4, commentaire: 'Livraison rapide, merci.', date: '2024-06-25', statut: 'visible' },
    { id: 4, client: 'Sami T.', note: 1, commentaire: 'Très mauvaise expérience.', date: '2024-06-20', statut: 'supprime' },
  ]);
  const [filtreNote, setFiltreNote] = useState('');
  const [filtreStatut, setFiltreStatut] = useState('');
  const [detailAvis, setDetailAvis] = useState<AvisType | null>(null);

  const avisFiltrés = avis.filter(a =>
    (filtreNote ? String(a.note) === filtreNote : true) &&
    (filtreStatut ? a.statut === filtreStatut : true)
  );

  const handleSignalerAvis = (id: number) => {
    setAvis(avis => avis.map(a => a.id === id ? { ...a, statut: 'signale' } : a));
  };
  const handleSupprimerAvis = (id: number) => {
    setAvis(avis => avis.map(a => a.id === id ? { ...a, statut: 'supprime' } : a));
  };
  const handleVoirAvis = (avis: any) => setDetailAvis(avis);
  const handleCloseAvis = () => setDetailAvis(null);

  // Exemples de stats mock
  const stats = [
    { label: 'Commerçants', value: 20 },
    { label: 'Utilisateurs', value: 150 },
    { label: 'Commandes', value: 320 },
  ];

  // MOCK réclamations (state)
  const [reclamations, setReclamations] = useState<ReclamType[]>([
    { id: 1, client: 'Fatma B.', objet: 'Produit non reçu', description: 'Commande #1234 jamais livrée.', date: '2024-07-01', statut: 'nouveau' },
    { id: 2, client: 'Karim Z.', objet: 'Contrefaçon', description: 'Produit reçu semble être une contrefaçon.', date: '2024-06-28', statut: 'en_cours' },
    { id: 3, client: 'Anonyme', objet: 'Transaction frauduleuse', description: 'Débit non autorisé sur ma carte.', date: '2024-06-25', statut: 'escalade' },
    { id: 4, client: 'Sami T.', objet: 'Mauvais service', description: 'Support client injoignable.', date: '2024-06-20', statut: 'resolu' },
  ]);
  const [filtreStatutReclam, setFiltreStatutReclam] = useState('');
  const [detailReclam, setDetailReclam] = useState<ReclamType | null>(null);

  const reclamationsFiltrees = reclamations.filter(r =>
    (filtreStatutReclam ? r.statut === filtreStatutReclam : true)
  );

  const handleVoirReclam = (reclam: any) => setDetailReclam(reclam);
  const handleCloseReclam = () => setDetailReclam(null);
  const handleAssignerReclam = (id: number) => {
    setReclamations(reclamations => reclamations.map(r => r.id === id ? { ...r, statut: 'en_cours' } : r));
  };
  const handleCloturerReclam = (id: number) => {
    setReclamations(reclamations => reclamations.map(r => r.id === id ? { ...r, statut: 'resolu' } : r));
  };
  const handleEscaladerReclam = (id: number) => {
    setReclamations(reclamations => reclamations.map(r => r.id === id ? { ...r, statut: 'escalade' } : r));
  };

  // MOCK archivage & purge
  const [vendeursInactifs, setVendeursInactifs] = useState([
    { id: 1, nom: 'Boutique Mode Chic', dernier: '2023-10-12' },
    { id: 2, nom: 'Épicerie Bio Soleil', dernier: '2023-12-01' },
  ]);
  const [avisVieux, setAvisVieux] = useState([
    { id: 1, client: 'Anonyme', date: '2022-05-10' },
    { id: 2, client: 'Karim Z.', date: '2021-11-22' },
  ]);
  const [ticketsResolus, setTicketsResolus] = useState([
    { id: 1, objet: 'Produit non reçu', date: '2024-01-15' },
    { id: 2, objet: 'Contrefaçon', date: '2023-09-30' },
  ]);

  const handleArchiverVendeur = (id: number) => {
    setVendeursInactifs(list => list.filter(v => v.id !== id));
  };
  const handleSupprimerAvisVieux = (id: number) => {
    setAvisVieux(list => list.filter(a => a.id !== id));
  };
  const handlePurgerTicket = (id: number) => {
    setTicketsResolus(list => list.filter(t => t.id !== id));
  };

  // MOCK équipe admin
  const [equipe, setEquipe] = useState([
    { id: 1, nom: 'Admin Principal', email: 'admin@gmail.com', role: 'superadmin', stats: { tickets: 42, temps: '2h' } },
    { id: 2, nom: 'Sami Modérateur', email: 'sami@mod.tn', role: 'moderateur', stats: { tickets: 18, temps: '4h' } },
    { id: 3, nom: 'Leila Support', email: 'leila@support.tn', role: 'support', stats: { tickets: 25, temps: '3h' } },
  ]);
  const rolesDisponibles = [
    { value: 'superadmin', label: 'Super Admin' },
    { value: 'moderateur', label: 'Modérateur' },
    { value: 'support', label: 'Support' },
    { value: 'analyste', label: 'Analyste' },
  ];
  const [nouveauMembre, setNouveauMembre] = useState({ nom: '', email: '', role: 'moderateur' });
  const [affectationModal, setAffectationModal] = useState<any>(null);
  const [affectationType, setAffectationType] = useState<'vendeur'|'ticket'|null>(null);
  const [rechercheEquipe, setRechercheEquipe] = useState('');

  const equipeFiltrée = equipe.filter(m =>
    m.nom.toLowerCase().includes(rechercheEquipe.toLowerCase()) ||
    m.email.toLowerCase().includes(rechercheEquipe.toLowerCase())
  );

  const handleAjouterMembre = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nouveauMembre.nom || !nouveauMembre.email) return;
    setEquipe(eq => [...eq, { id: Date.now(), nom: nouveauMembre.nom, email: nouveauMembre.email, role: nouveauMembre.role, stats: { tickets: 0, temps: '-' } }]);
    setNouveauMembre({ nom: '', email: '', role: 'moderateur' });
  };
  const handleChangerRole = (id: number, role: string) => {
    setEquipe(eq => eq.map(m => m.id === id ? { ...m, role } : m));
  };
  const handleOuvrirAffectation = (membre: any, type: 'vendeur'|'ticket') => {
    setAffectationModal(membre);
    setAffectationType(type);
  };
  const handleFermerAffectation = () => {
    setAffectationModal(null);
    setAffectationType(null);
  };

  const handleSupprimerMembre = (id: number) => {
    setEquipe(eq => eq.filter(m => m.id !== id));
  };
  const handleExportEquipe = () => {
    // Mock export CSV
    const header = 'Nom,Email,Rôle,Tickets résolus,Temps de réponse\n';
    const rows = equipe.map(m => `${m.nom},${m.email},${m.role},${m.stats.tickets},${m.stats.temps}`).join('\n');
    const csv = header + rows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'equipe_admin.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // MOCK données graphiques
  const evolutionData = [
    { mois: 'Jan', inscriptions: 12, commandes: 30 },
    { mois: 'Fév', inscriptions: 18, commandes: 42 },
    { mois: 'Mar', inscriptions: 25, commandes: 55 },
    { mois: 'Avr', inscriptions: 20, commandes: 48 },
    { mois: 'Mai', inscriptions: 30, commandes: 60 },
    { mois: 'Juin', inscriptions: 28, commandes: 70 },
    { mois: 'Juil', inscriptions: 35, commandes: 80 },
    { mois: 'Août', inscriptions: 32, commandes: 75 },
    { mois: 'Sep', inscriptions: 27, commandes: 68 },
    { mois: 'Oct', inscriptions: 22, commandes: 50 },
    { mois: 'Nov', inscriptions: 18, commandes: 40 },
    { mois: 'Déc', inscriptions: 24, commandes: 55 },
  ];
  const alertes = [
    { type: 'validation', label: '3 vendeurs à valider', color: 'bg-yellow-100 text-yellow-700' },
    { type: 'avis', label: '2 avis signalés', color: 'bg-red-100 text-red-700' },
    { type: 'litige', label: '1 litige urgent', color: 'bg-blue-100 text-blue-700' },
  ];
  const topVendeurs = [
    { nom: 'Maroof Store', score: 98 },
    { nom: 'Sonia Trabelsi', score: 92 },
    { nom: 'Ali Ben Salah', score: 89 },
  ];
  const topProduits = [
    { nom: 'Pain complet', ventes: 120 },
    { nom: "Huile d'olive", ventes: 110 },
    { nom: 'Livre scolaire', ventes: 95 },
  ];

  // Réfs pour scrollTo
  const refs = {
    dashboard: useRef<HTMLDivElement>(null),
    vendeurs: useRef<HTMLDivElement>(null),
    avis: useRef<HTMLDivElement>(null),
    reclam: useRef<HTMLDivElement>(null),
    archivage: useRef<HTMLDivElement>(null),
    badges: useRef<HTMLDivElement>(null),
    equipe: useRef<HTMLDivElement>(null),
    knowledge: useRef<HTMLDivElement>(null),
  };
  const scrollToSection = (key: keyof typeof refs) => {
    refs[key].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Ajout du type pour ongletActif
  const [ongletActif, setOngletActif] = useState<'dashboard'|'statistiques'|'vendeurs'|'avis'|'reclam'|'archivage'|'badges'|'equipe'|'knowledge'|'demandes'>('dashboard');

  // MOCK badges enrichis
  const [badges, setBadges] = useState<BadgeType[]>([
    { id: 1, nom: 'Service client rapide', emoji: '⚡', desc: 'Répond vite aux clients', regle: 'Note > 4.5', popularite: 12 },
    { id: 2, nom: 'Livraison Express', emoji: '🚚', desc: 'Livraison en moins de 24h', regle: 'Livraison < 24h', popularite: 8 },
    { id: 3, nom: 'Meilleur vendeur du mois', emoji: '🏆', desc: 'Top ventes du mois', regle: 'Top 1 ventes', popularite: 5 },
    { id: 4, nom: 'Top qualité', emoji: '🌟', desc: 'Aucune réclamation', regle: '0 litige', popularite: 7 },
  ]);
  const [badgeCatalogueModal, setBadgeCatalogueModal] = useState<BadgeModalType>(null);
  const [historique, setHistorique] = useState([
    { id: 1, badge: 'Service client rapide', vendeur: 'Sonia Trabelsi', date: '2024-07-01', admin: 'Admin Principal' },
    { id: 2, badge: 'Meilleur vendeur du mois', vendeur: 'Maroof Store', date: '2024-07-01', admin: 'Admin Principal' },
    { id: 3, badge: 'Livraison Express', vendeur: 'Ali Ben Salah', date: '2024-06-15', admin: 'Sami Modérateur' },
  ]);
  const [filtreBadge, setFiltreBadge] = useState('');
  const [filtreVendeur, setFiltreVendeur] = useState('');

  const handleOuvrirBadgeCatalogueModal = (badge?: any) => {
    setBadgeCatalogueModal(badge ? { ...badge } : { nom: '', emoji: '', desc: '', regle: '' });
  };
  const handleFermerBadgeCatalogueModal = () => setBadgeCatalogueModal(null);
  const handleChangeBadgeCatalogueModal = (e: any) => {
    setBadgeCatalogueModal(badgeCatalogueModal => badgeCatalogueModal ? { ...badgeCatalogueModal, [e.target.name]: e.target.value } : null);
  };
  const handleSaveBadgeCatalogue = () => {
    if (!badgeCatalogueModal) return;
    if (badgeCatalogueModal.id !== undefined) {
      setBadges(badges => badges.map(b => b.id === badgeCatalogueModal.id ? { ...badgeCatalogueModal, id: badgeCatalogueModal.id, popularite: b.popularite } : b));
    } else {
      setBadges(badges => [...badges, { ...badgeCatalogueModal, id: Date.now(), popularite: 0 }]);
    }
    setBadgeCatalogueModal(null);
  };
  const handleDeleteBadgeCatalogue = (id: number) => {
    setBadges(badges => badges.filter(b => b.id !== id));
  };
  const historiqueFiltre = historique.filter(h =>
    (filtreBadge ? h.badge === filtreBadge : true) &&
    (filtreVendeur ? h.vendeur.toLowerCase().includes(filtreVendeur.toLowerCase()) : true)
  );

  // Ajout pour l'interactivité
  const [periode, setPeriode] = useState('12mois');
  const [loadingStats, setLoadingStats] = useState(false);
  const [showDetail, setShowDetail] = useState<string|null>(null);

  // Données dynamiques selon la période (mock)
  const statsData = {
    '12mois': [20, 150, 320],
    '6mois': [12, 90, 180],
    'mois': [3, 20, 40],
  };
  const statsLabels = ['Commerçants', 'Utilisateurs', 'Commandes'];
  const statsDyn = statsLabels.map((label, i) => ({ label, value: statsData[periode as keyof typeof statsData][i] }));

  const refreshStats = () => {
    setLoadingStats(true);
    setTimeout(() => setLoadingStats(false), 1000);
  };

  const [statSubTab, setStatSubTab] = useState('ventes'); // State for the sub-tab

  const COLORS = ['#5e72e4', '#11cdef', '#2dce89', '#fb6340', '#f5365c', '#f4f5fb', '#172b4d', '#f59e0b'];

  // Données mock pour chaque graphique/statistique
  const ventesData = [
    { date: 'Lun', ventes: 120 },
    { date: 'Mar', ventes: 200 },
    { date: 'Mer', ventes: 150 },
    { date: 'Jeu', ventes: 170 },
    { date: 'Ven', ventes: 250 },
    { date: 'Sam', ventes: 300 },
    { date: 'Dim', ventes: 220 },
  ];
  const repartitionVentes = [
    { name: 'Pain', value: 400 },
    { name: 'Huile', value: 300 },
    { name: 'Livre', value: 300 },
    { name: 'Autres', value: 200 },
  ];
  const tauxConversionData = [
    { step: 'Visiteurs', value: 1000 },
    { step: 'Ajout Panier', value: 400 },
    { step: 'Achat', value: 120 },
  ];
  const traficData = [
    { date: 'Lun', visiteurs: 800 },
    { date: 'Mar', visiteurs: 1200 },
    { date: 'Mer', visiteurs: 950 },
    { date: 'Jeu', visiteurs: 1100 },
    { date: 'Ven', visiteurs: 1400 },
    { date: 'Sam', visiteurs: 1700 },
    { date: 'Dim', visiteurs: 1300 },
  ];
  const origineTrafic = [
    { name: 'Organique', value: 600 },
    { name: 'Réseaux sociaux', value: 400 },
    { name: 'Publicité', value: 300 },
    { name: 'Référencement', value: 200 },
  ];
  const pagesConsult = [
    { page: 'Accueil', vues: 1200 },
    { page: 'Produits', vues: 900 },
    { page: 'Contact', vues: 400 },
    { page: 'FAQ', vues: 300 },
  ];
  const tunnelConversion = [
    { step: 'Accueil', value: 1000 },
    { step: 'Panier', value: 400 },
    { step: 'Achat', value: 120 },
  ];
  const abandonPanier = [
    { label: 'Abandon', value: 68 },
    { label: 'Achat', value: 32 },
  ];
  const tempsMoyenData = [
    { date: 'Lun', temps: 3 },
    { date: 'Mar', temps: 4 },
    { date: 'Mer', temps: 2 },
    { date: 'Jeu', temps: 5 },
    { date: 'Ven', temps: 6 },
    { date: 'Sam', temps: 7 },
    { date: 'Dim', temps: 4 },
  ];
  const appareils = [
    { name: 'Mobile', value: 60 },
    { name: 'Desktop', value: 30 },
    { name: 'Tablette', value: 10 },
  ];
  const avisClients = [
    { type: 'Positifs', value: 80 },
    { type: 'Négatifs', value: 20 },
  ];
  const noteMoyenne = 4.2;
  const tempsReponse = [
    { date: 'Lun', temps: 2 },
    { date: 'Mar', temps: 1.5 },
    { date: 'Mer', temps: 2.2 },
    { date: 'Jeu', temps: 1.8 },
    { date: 'Ven', temps: 2.5 },
    { date: 'Sam', temps: 2.1 },
    { date: 'Dim', temps: 1.9 },
  ];
  const emailsOuverts = [
    { date: 'S1', taux: 45 },
    { date: 'S2', taux: 50 },
    { date: 'S3', taux: 60 },
    { date: 'S4', taux: 55 },
  ];
  const ctrCampagnes = [
    { name: 'Campagne A', value: 40 },
    { name: 'Campagne B', value: 30 },
    { name: 'Campagne C', value: 30 },
  ];
  const conversionCanal = [
    { canal: 'Email', value: 30 },
    { canal: 'Social', value: 25 },
    { canal: 'Pub', value: 20 },
    { canal: 'SEO', value: 25 },
  ];
  const cacData = [
    { mois: 'Jan', cac: 12 },
    { mois: 'Fév', cac: 10 },
    { mois: 'Mar', cac: 15 },
    { mois: 'Avr', cac: 13 },
  ];
  const stockProduits = [
    { produit: 'Pain', stock: 120 },
    { produit: 'Huile', stock: 80 },
    { produit: 'Livre', stock: 60 },
  ];
  const ventesVsStock = [
    { produit: 'Pain', ventes: 100, stock: 120 },
    { produit: 'Huile', ventes: 70, stock: 80 },
    { produit: 'Livre', ventes: 50, stock: 60 },
  ];
  const delaiLivraison = [
    { date: 'S1', jours: 2 },
    { date: 'S2', jours: 1.8 },
    { date: 'S3', jours: 2.2 },
    { date: 'S4', jours: 2 },
  ];
  const ruptureSurstock = [
    { type: 'Rupture', value: 10 },
    { type: 'Surstock', value: 5 },
    { type: 'OK', value: 85 },
  ];
  const financesData = [
    { mois: 'Jan', ca: 12000, dep: 8000 },
    { mois: 'Fév', ca: 15000, dep: 9000 },
    { mois: 'Mar', ca: 17000, dep: 9500 },
  ];
  const panierMoyen = [
    { date: 'S1', panier: 45 },
    { date: 'S2', panier: 50 },
    { date: 'S3', panier: 60 },
    { date: 'S4', panier: 55 },
  ];
  const retourProduit = [
    { produit: 'Pain', taux: 2 },
    { produit: 'Huile', taux: 1 },
    { produit: 'Livre', taux: 3 },
  ];
  const geoClients = [
    { region: 'Nord', value: 40 },
    { region: 'Sud', value: 30 },
    { region: 'Est', value: 20 },
    { region: 'Ouest', value: 10 },
  ];
  const fidelesVsNouveaux = [
    { type: 'Fidèles', value: 70 },
    { type: 'Nouveaux', value: 30 },
  ];
  const freqAchat = [
    { client: 'Client A', freq: 5 },
    { client: 'Client B', freq: 3 },
    { client: 'Client C', freq: 7 },
  ];
  const ageSexe = [
    { group: '18-25', homme: 20, femme: 30 },
    { group: '26-35', homme: 25, femme: 35 },
    { group: '36-50', homme: 15, femme: 25 },
  ];

  // Ajout du state pour la FAQ
  const [faqItems, setFaqItems] = useState<FaqType[]>([
    { id: 1, question: "Comment attribuer un badge à un vendeur ?", answer: "Pour attribuer un badge à un vendeur, cliquez sur le bouton 'Attribuer Badge' dans le profil du vendeur." }
  ]);
  const [faqForm, setFaqForm] = useState({ question: '', answer: '' });
  const [faqEditModal, setFaqEditModal] = useState<FaqType | null>(null);

  const [reclamDetailModal, setReclamDetailModal] = useState<ReclamType | null>(null);

  // Ajout du state pour les demandes commerçants
  const [demandesCommercants, setDemandesCommercants] = useState<DemandeType[]>([
    { id: 1, nom: 'Sophie Martin', email: 'sophie.martin@email.com', date: '2024-07-01', statut: 'en_attente', justificatif: 'justificatif_sophie.pdf', message: 'Je souhaite vendre des produits artisanaux.' },
    { id: 2, nom: 'Ali Ben', email: 'ali.ben@email.com', date: '2024-07-02', statut: 'en_attente', justificatif: 'justificatif_ali.pdf', message: 'Demande d\'ouverture de boutique pour produits bio.' },
  ]);
  const [demandeDetailModal, setDemandeDetailModal] = useState<DemandeType | null>(null);
  const [demandeNotif, setDemandeNotif] = useState('');
  const [demandeSearch, setDemandeSearch] = useState('');

  const onglets = [
    { key: 'dashboard', label: 'Dashboard', icon: <HomeIcon /> },
    { key: 'statistiques', label: 'Statistiques avancées', icon: <ChartBarIcon /> },
    { key: 'vendeurs', label: 'Vendeurs', icon: <UsersIcon /> },
    { key: 'avis', label: 'Avis', icon: <StarIcon /> },
    { key: 'reclam', label: 'Litiges', icon: <ShieldCheckIcon /> },
    { key: 'demandes', label: 'Demandes', icon: <UserAddIcon /> }, // nouvel onglet
    { key: 'archivage', label: 'Archivage', icon: <ArchiveBoxIcon /> },
    { key: 'badges', label: 'Badges', icon: <AwardIcon /> },
    { key: 'equipe', label: 'Équipe', icon: <UsersCogIcon /> },
    { key: 'knowledge', label: 'FAQ', icon: <BookOpenIcon /> },
  ];

  return (
    <div className="min-h-screen bg-softui-light">
      {/* Barre d'onglets centrée */}
      <div className="w-full flex justify-center pt-6">
        <div className="flex gap-2 overflow-x-auto py-2 mb-8 bg-softui-light rounded-softxl shadow-softxl px-4 max-w-5xl w-full border border-softui-border">
          {onglets.map(tab => (
            <button
              key={tab.key}
              onClick={() => setOngletActif(tab.key as keyof typeof refs)}
              className={`px-4 py-2 rounded-soft font-semibold transition shadow-soft text-base
                ${ongletActif === tab.key
                  ? "bg-softui-primary text-white ring-2 ring-softui-primary/40 shadow-softxl"
                  : "bg-softui-accent text-softui-secondary hover:bg-softui-primary/10 hover:text-softui-primary"}
              `}
            >
              <span className="mr-1">{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>
      </div>
      {/* Contenu principal centré */}
      <main className="container mx-auto max-w-5xl px-4 md:px-8">
        {/* Dashboard */}
        {ongletActif==='dashboard' && (
          <div className="mb-16">
            <div className="bg-softui-card rounded-softxl shadow-softxl p-10 w-full text-center mb-8 animate-fade-in border border-softui-border">
              <h1 className="text-4xl font-extrabold text-softui-primary mb-4 tracking-tight">Tableau de bord Admin</h1>
              <p className="text-lg text-softui-secondary mb-8">Bienvenue sur l'espace d'administration de la plateforme.</p>
              {/* KPIs avancés */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 mb-8">
                {[
                  { label: 'Commerçants', value: 20, variation: +5 },
                  { label: 'Utilisateurs', value: 150, variation: -2 },
                  { label: 'Commandes', value: 320, variation: +12 },
                ].map((stat, i) => (
                  <div key={stat.label} className="bg-softui-accent rounded-xl shadow-soft p-6 flex flex-col items-center border border-softui-border animate-fade-in">
                    <div className="text-3xl font-extrabold text-softui-primary mb-2 flex items-center gap-2">
                      <CountUp end={stat.value} duration={1.2} />
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
                <h3 className="text-xl font-bold text-softui-primary mb-4">Évolution des utilisateurs & commandes (12 derniers mois)</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={evolutionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mois" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="inscriptions" stroke="#5e72e4" strokeWidth={3} dot={{ r: 3 }} name="Utilisateurs" />
                    <Line type="monotone" dataKey="commandes" stroke="#2dce89" strokeWidth={3} dot={{ r: 3 }} name="Commandes" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {/* Bloc Alertes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {alertes.map((a, i) => (
                  <div key={a.type} className={`rounded-xl p-4 font-semibold shadow-soft border border-softui-border flex items-center justify-center ${a.color}`}>
                    {a.label}
                  </div>
                ))}
              </div>
              {/* Top vendeurs */}
              <div className="bg-softui-accent rounded-xl shadow-softxl p-6 border border-softui-border max-w-md mx-auto">
                <h3 className="text-xl font-bold text-softui-primary mb-4">Top vendeurs</h3>
                <ol className="space-y-2">
                  {topVendeurs.map((v, i) => (
                    <li key={v.nom} className="flex items-center gap-3 text-lg font-semibold">
                      <span className="w-8 h-8 flex items-center justify-center rounded-full bg-softui-primary/10 text-softui-primary font-bold">{i+1}</span>
                      <span>{v.nom}</span>
                      <span className="ml-auto text-softui-secondary font-normal">Score : {v.score}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}
        {ongletActif==='statistiques' && (
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-xl p-10 w-full text-center mb-8 animate-fade-in border border-softui-border">
              <h2 className="text-3xl font-extrabold text-softui-primary mb-8 tracking-tight flex items-center justify-center gap-2">📊 Statistiques avancées</h2>
              {/* Sous-navbar horizontale */}
              <div className="flex flex-wrap gap-2 justify-center mb-10">
                {[
                  { key: 'ventes', label: '🛍️ Ventes' },
                  { key: 'trafic', label: '📈 Trafic du site' },
                  { key: 'comportement', label: '🛒 Comportement d\'achat' },
                  { key: 'satisfaction', label: '⭐ Satisfaction client' },
                  { key: 'marketing', label: '📢 Marketing & publicité' },
                  { key: 'finances', label: '💰 Finances' },
                  { key: 'analyse', label: '🧠 Analyse clients' },
                ].map(sub => (
                  <button
                    key={sub.key}
                    onClick={() => setStatSubTab(sub.key)}
                    className={`px-4 py-2 rounded-full font-semibold transition shadow-soft text-base border border-softui-border
                      ${statSubTab === sub.key ? 'bg-softui-primary text-white ring-2 ring-softui-primary/40 shadow-softxl' : 'bg-softui-accent text-softui-secondary hover:bg-softui-primary/10 hover:text-softui-primary'}`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
              {/* Contenu dynamique selon la sous-catégorie */}
              {statSubTab === 'ventes' && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold mb-4 text-softui-primary">🛍️ Ventes</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-softui-accent rounded-xl p-6 shadow-soft border border-softui-border">
                      <h4 className="font-semibold mb-2">📈 Évolution des ventes (jour/semaine/mois)</h4>
                      <ResponsiveContainer width="100%" height={180}>
                        <LineChart data={ventesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="ventes" stroke="#5e72e4" strokeWidth={3} dot={{ r: 3 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-softui-accent rounded-xl p-6 shadow-soft border border-softui-border">
                      <h4 className="font-semibold mb-2">📊 Répartition des ventes par produit/catégorie</h4>
                      <ResponsiveContainer width="100%" height={180}>
                        <PieChart>
                          <Pie data={repartitionVentes} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                            {repartitionVentes.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-softui-accent rounded-xl p-6 shadow-soft border border-softui-border col-span-2">
                      <h4 className="font-semibold mb-2">💸 Taux de conversion (visiteurs ➝ acheteurs)</h4>
                      <ResponsiveContainer width="100%" height={120}>
                        <BarChart data={tauxConversionData} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="step" type="category" />
                          <Tooltip />
                          <Bar dataKey="value" fill="#2dce89" barSize={30} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}
              {statSubTab === 'trafic' && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold mb-4 text-softui-primary">📈 Trafic du site</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-softui-accent rounded-xl p-6 shadow-soft border border-softui-border">
                      <h4 className="font-semibold mb-2">👥 Nombre de visiteurs uniques</h4>
                      <ResponsiveContainer width="100%" height={180}>
                        <LineChart data={traficData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="visiteurs" stroke="#5e72e4" strokeWidth={3} dot={{ r: 3 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-softui-accent rounded-xl p-6 shadow-soft border border-softui-border">
                      <h4 className="font-semibold mb-2">🌐 Origine du trafic</h4>
                      <ResponsiveContainer width="100%" height={180}>
                        <PieChart>
                          <Pie data={origineTrafic} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                            {origineTrafic.map((entry, index) => (
                              <Cell key={`cell-origine-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-softui-accent rounded-xl p-6 shadow-soft border border-softui-border">
                      <h4 className="font-semibold mb-2">🚪 Taux de rebond</h4>
                      <div className="h-32 flex items-center justify-center text-2xl font-bold text-softui-primary">42%</div>
                      <div className="text-xs text-softui-secondary">(Mock KPI)</div>
                    </div>
                    <div className="bg-softui-accent rounded-xl p-6 shadow-soft border border-softui-border">
                      <h4 className="font-semibold mb-2">🧭 Pages les plus consultées</h4>
                      <ResponsiveContainer width="100%" height={180}>
                        <BarChart data={pagesConsult}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="page" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="vues" fill="#11cdef" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}
              {statSubTab === 'comportement' && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold mb-4 text-softui-primary">🛒 Comportement d'achat</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-softui-accent rounded-xl p-6 shadow-soft border border-softui-border">
                      <h4 className="font-semibold mb-2">🔄 Tunnel de conversion</h4>
                      <ResponsiveContainer width="100%" height={180}>
                        <BarChart data={tunnelConversion} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="step" type="category" />
                          <Tooltip />
                          <Bar dataKey="value" fill="#2dce89" barSize={30} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-softui-accent rounded-xl p-6 shadow-soft border border-softui-border">
                      <h4 className="font-semibold mb-2">🛍️ Taux d'abandon de panier</h4>
                      <ResponsiveContainer width="100%" height={120}>
                        <BarChart data={abandonPanier}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="label" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#f5365c" />
                        </BarChart>
                      </ResponsiveContainer>
                      <div className="text-center mt-2 text-lg font-bold text-red-600">{abandonPanier[0].value}%</div>
                      <div className="text-center text-xs text-gray-500">d'abandon</div>
                    </div>
                    <div className="bg-softui-accent rounded-xl p-6 shadow-soft border border-softui-border">
                      <h4 className="font-semibold mb-2">⏱️ Temps moyen passé sur le site</h4>
                      <ResponsiveContainer width="100%" height={120}>
                        <LineChart data={tempsMoyenData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="temps" stroke="#5e72e4" strokeWidth={3} dot={{ r: 3 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-softui-accent rounded-xl p-6 shadow-soft border border-softui-border">
                      <h4 className="font-semibold mb-2">📱 Appareil utilisé</h4>
                      <ResponsiveContainer width="100%" height={120}>
                        <PieChart>
                          <Pie data={appareils} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={40} label>
                            {appareils.map((entry, index) => (
                              <Cell key={`cell-appareil-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}
              {statSubTab === 'satisfaction' && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold mb-4 text-softui-primary">⭐ Satisfaction client</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-softui-accent rounded-xl p-6 shadow-soft border border-softui-border">
                      <h4 className="font-semibold mb-2">💬 Avis clients (positifs vs négatifs)</h4>
                      <ResponsiveContainer width="100%" height={120}>
                        <BarChart data={avisClients}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="type" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#2dce89" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-softui-accent rounded-xl p-6 shadow-soft border border-softui-border flex flex-col items-center justify-center">
                      <h4 className="font-semibold mb-2">🌟 Note moyenne par produit/service</h4>
                      <div className="flex items-center gap-1 text-2xl text-yellow-400 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i}>{i < Math.round(noteMoyenne) ? '★' : '☆'}</span>
                        ))}
                      </div>
                      <div className="text-softui-primary font-bold text-lg">{noteMoyenne} / 5</div>
                    </div>
                    <div className="bg-softui-accent rounded-xl p-6 shadow-soft border border-softui-border col-span-2">
                      <h4 className="font-semibold mb-2">📩 Temps moyen de réponse aux demandes client</h4>
                      <ResponsiveContainer width="100%" height={120}>
                        <LineChart data={tempsReponse}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="temps" stroke="#11cdef" strokeWidth={3} dot={{ r: 3 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}
              {statSubTab === 'marketing' && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold mb-4 text-softui-primary">📢 Marketing & publicité</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-softui-accent rounded-xl p-6 shadow-soft border border-softui-border">
                      <h4 className="font-semibold mb-2">📨 Taux d'ouverture d'emails marketing</h4>
                      <ResponsiveContainer width="100%" height={120}>
                        <LineChart data={emailsOuverts}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="taux" stroke="#5e72e4" strokeWidth={3} dot={{ r: 3 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-softui-accent rounded-xl p-6 shadow-soft border border-softui-border">
                      <h4 className="font-semibold mb-2">🎯 Taux de clic sur campagnes (CTR)</h4>
                      <ResponsiveContainer width="100%" height={120}>
                        <PieChart>
                          <Pie data={ctrCampagnes} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={40} label>
                            {ctrCampagnes.map((entry, index) => (
                              <Cell key={`cell-ctr-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-softui-accent rounded-xl p-6 shadow-soft border border-softui-border">
                      <h4 className="font-semibold mb-2">🛍️ Taux de conversion par canal marketing</h4>
                      <ResponsiveContainer width="100%" height={120}>
                        <BarChart data={conversionCanal}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="canal" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#2dce89" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-softui-accent rounded-xl p-6 shadow-soft border border-softui-border">
                      <h4 className="font-semibold mb-2">💰 Coût d'acquisition client (CAC)</h4>
                      <ResponsiveContainer width="100%" height={120}>
                        <LineChart data={cacData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="mois" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="cac" stroke="#f5365c" strokeWidth={3} dot={{ r: 3 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}
              {statSubTab === 'finances' && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold mb-4 text-softui-primary">💰 Finances</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-softui-accent rounded-xl p-6 shadow-soft border border-softui-border">
                      <h4 className="font-semibold mb-2">📈 Chiffre d'affaires vs dépenses</h4>
                      <ResponsiveContainer width="100%" height={120}>
                        <BarChart data={financesData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="mois" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="ca" fill="#2dce89" name="Chiffre d'affaires" />
                          <Bar dataKey="dep" fill="#f5365c" name="Dépenses" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-softui-accent rounded-xl p-6 shadow-soft border border-softui-border">
                      <h4 className="font-semibold mb-2">💳 Panier moyen</h4>
                      <ResponsiveContainer width="100%" height={120}>
                        <LineChart data={panierMoyen}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="panier" stroke="#11cdef" strokeWidth={3} dot={{ r: 3 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-softui-accent rounded-xl p-6 shadow-soft border border-softui-border col-span-2">
                      <h4 className="font-semibold mb-2">🔁 Taux de retour produit</h4>
                      <ResponsiveContainer width="100%" height={120}>
                        <BarChart data={retourProduit}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="produit" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="taux" fill="#5e72e4" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}
              {statSubTab === 'analyse' && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold mb-4 text-softui-primary">🧠 Analyse clients</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-softui-accent rounded-xl p-6 shadow-soft border border-softui-border">
                      <h4 className="font-semibold mb-2">🌍 Répartition géographique des clients</h4>
                      <ResponsiveContainer width="100%" height={120}>
                        <PieChart>
                          <Pie data={geoClients} dataKey="value" nameKey="region" cx="50%" cy="50%" outerRadius={40} label>
                            {geoClients.map((entry, index) => (
                              <Cell key={`cell-geo-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-softui-accent rounded-xl p-6 shadow-soft border border-softui-border">
                      <h4 className="font-semibold mb-2">📊 Clients fidèles vs nouveaux clients</h4>
                      <ResponsiveContainer width="100%" height={120}>
                        <BarChart data={fidelesVsNouveaux}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="type" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#2dce89" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-softui-accent rounded-xl p-6 shadow-soft border border-softui-border">
                      <h4 className="font-semibold mb-2">📆 Fréquence d'achat par client</h4>
                      <ResponsiveContainer width="100%" height={120}>
                        <BarChart data={freqAchat}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="client" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="freq" fill="#5e72e4" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-softui-accent rounded-xl p-6 shadow-soft border border-softui-border">
                      <h4 className="font-semibold mb-2">🧓 Répartition par âge / sexe / comportement</h4>
                      <ResponsiveContainer width="100%" height={120}>
                        <RadarChart data={ageSexe} outerRadius={40}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="group" />
                          <PolarRadiusAxis />
                          <Radar name="Hommes" dataKey="homme" stroke="#5e72e4" fill="#5e72e4" fillOpacity={0.6} />
                          <Radar name="Femmes" dataKey="femme" stroke="#f5365c" fill="#f5365c" fillOpacity={0.6} />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
        {ongletActif==='vendeurs' && (
          <section className="mb-16">
            <div className="bg-softui-card rounded-softxl shadow-softxl p-10 w-full text-center mb-8 animate-fade-in border border-softui-border">
              <h2 className="text-3xl font-extrabold text-softui-primary mb-4 tracking-tight flex items-center justify-center gap-2">Gestion des Vendeurs</h2>
              <p className="text-lg text-softui-secondary mb-8">Vérifiez et gérez les vendeurs inscrits sur la plateforme.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-softui-accent rounded-xl p-8 shadow-soft text-center border border-softui-border">
                  <h3 className="text-2xl font-bold text-softui-primary mb-4">Vendeurs en attente de validation</h3>
                  <p className="text-softui-secondary text-lg">Nombre de vendeurs à valider : <span className="font-extrabold text-softui-primary">{vendeurs.filter(v => v.statut === 'En attente').length}</span></p>
                  <button onClick={() => scrollToSection('vendeurs')} className="mt-6 px-6 py-3 rounded-soft font-semibold bg-softui-primary text-white hover:bg-softui-primary/90 transition shadow-soft">
                    Voir les vendeurs
                  </button>
                </div>
                <div className="bg-softui-accent rounded-xl p-8 shadow-soft text-center border border-softui-border">
                  <h3 className="text-2xl font-bold text-softui-primary mb-4">Vendeurs validés</h3>
                  <p className="text-softui-secondary text-lg">Nombre de vendeurs validés : <span className="font-extrabold text-softui-primary">{vendeurs.filter(v => v.statut === 'Validé').length}</span></p>
                  <button onClick={() => scrollToSection('vendeurs')} className="mt-6 px-6 py-3 rounded-soft font-semibold bg-softui-primary text-white hover:bg-softui-primary/90 transition shadow-soft">
                    Voir les vendeurs
                  </button>
                </div>
              </div>
              <div className="mt-10">
                <h3 className="text-2xl font-bold text-softui-primary mb-4">Liste des vendeurs</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-softxl shadow-softxl border border-softui-border">
                    <thead>
                      <tr className="bg-softui-accent text-softui-secondary text-sm font-semibold uppercase tracking-wider">
                        <th className="px-6 py-3 text-left text-xs font-medium">Nom</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Statut</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Badges</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {vendeurs.map(vendeur => (
                        <tr key={vendeur.id} className="hover:bg-softui-accent/10">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-softui-primary">{vendeur.nom}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-softui-secondary">{vendeur.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              vendeur.statut === 'En attente' ? 'bg-yellow-100 text-yellow-700' :
                              vendeur.statut === 'Validé' ? 'bg-green-100 text-green-700' :
                              vendeur.statut === 'Refusé' ? 'bg-red-100 text-red-700' :
                              vendeur.statut === 'Or' ? 'bg-purple-100 text-purple-700' : ''
                            }`}>
                              {vendeur.statut}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-softui-secondary">
                            {vendeur.badges.map((badge: any) => (
                              <span key={badge.id} className="mr-1 text-sm">{badge.emoji}</span>
                            ))}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button onClick={() => handleVoirProfil(vendeur)} className="text-softui-primary hover:text-softui-primary/80 mr-2">
                              Voir Profil
                            </button>
                            {vendeur.statut === 'En attente' && (
                              <>
                                <button onClick={() => handleValider(vendeur.id)} className="text-green-600 hover:text-green-700 mr-2">
                                  Valider
                                </button>
                                <button onClick={() => handleRefuser(vendeur.id)} className="text-red-600 hover:text-red-700">
                                  Refuser
                                </button>
                              </>
                            )}
                            {vendeur.statut === 'Validé' && (
                              <button onClick={() => handleOuvrirBadgeModal(vendeur)} className="text-softui-primary hover:text-softui-primary/80">
                                Attribuer Badge
                              </button>
                            )}
                            {vendeur.statut === 'Or' && (
                              <button onClick={() => handleOuvrirBadgeModal(vendeur)} className="text-softui-primary hover:text-softui-primary/80">
                                Attribuer Badge
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}
        {ongletActif==='avis' && (
          <section className="mb-16">
            <div className="bg-softui-card rounded-softxl shadow-softxl p-10 w-full text-center mb-8 animate-fade-in border border-softui-border">
              <h2 className="text-3xl font-extrabold text-softui-primary mb-4 tracking-tight flex items-center justify-center gap-2">Gestion des Avis</h2>
              <p className="text-lg text-softui-secondary mb-8">Modérez et gérez les avis des utilisateurs.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-softui-accent rounded-xl p-8 shadow-soft text-center border border-softui-border">
                  <h3 className="text-2xl font-bold text-softui-primary mb-4">Avis signalés</h3>
                  <p className="text-softui-secondary text-lg">Nombre d'avis signalés : <span className="font-extrabold text-softui-primary">{avis.filter(a => a.statut === 'signale').length}</span></p>
                  <button onClick={() => scrollToSection('avis')} className="mt-6 px-6 py-3 rounded-soft font-semibold bg-softui-primary text-white hover:bg-softui-primary/90 transition shadow-soft">
                    Voir les avis
                  </button>
                </div>
                <div className="bg-softui-accent rounded-xl p-8 shadow-soft text-center border border-softui-border">
                  <h3 className="text-2xl font-bold text-softui-primary mb-4">Avis visibles</h3>
                  <p className="text-softui-secondary text-lg">Nombre d'avis visibles : <span className="font-extrabold text-softui-primary">{avis.filter(a => a.statut === 'visible').length}</span></p>
                  <button onClick={() => scrollToSection('avis')} className="mt-6 px-6 py-3 rounded-soft font-semibold bg-softui-primary text-white hover:bg-softui-primary/90 transition shadow-soft">
                    Voir les avis
                  </button>
                </div>
              </div>
              <div className="mt-10">
                <h3 className="text-2xl font-bold text-softui-primary mb-4">Liste des avis</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-softxl shadow-softxl border border-softui-border">
                    <thead>
                      <tr className="bg-softui-accent text-softui-secondary text-sm font-semibold uppercase tracking-wider">
                        <th className="px-6 py-3 text-left text-xs font-medium">Client</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Note</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Commentaire</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Statut</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {avisFiltrés.map(avis => (
                        <tr key={avis.id} className="hover:bg-softui-accent/10">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-softui-primary">{avis.client}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-softui-primary">{avis.note}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-softui-secondary">{avis.commentaire}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-softui-secondary">{avis.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              avis.statut === 'signale' ? 'bg-red-100 text-red-700' :
                              avis.statut === 'visible' ? 'bg-green-100 text-green-700' :
                              avis.statut === 'supprime' ? 'bg-gray-100 text-gray-700' : ''
                            }`}>
                              {avis.statut}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button onClick={() => handleVoirAvis(avis)} className="text-softui-primary hover:text-softui-primary/80 mr-2">
                              Voir détail
                            </button>
                            {avis.statut === 'signale' && (
                              <button onClick={() => handleSignalerAvis(avis.id)} className="text-red-600 hover:text-red-700 mr-2">
                                Signaler
                              </button>
                            )}
                            {avis.statut === 'visible' && (
                              <button onClick={() => handleSupprimerAvis(avis.id)} className="text-red-600 hover:text-red-700">
                                Supprimer
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}
        {ongletActif==='reclam' && (
          <section className="mb-16">
            <div className="bg-softui-card rounded-softxl shadow-softxl p-10 w-full text-center mb-8 animate-fade-in border border-softui-border">
              <h2 className="text-3xl font-extrabold text-softui-primary mb-4 tracking-tight flex items-center justify-center gap-2">Gestion des Litiges</h2>
              <p className="text-lg text-softui-secondary mb-8">Suivez et gérez les réclamations des utilisateurs.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-softui-accent rounded-xl p-8 shadow-soft text-center border border-softui-border">
                  <h3 className="text-2xl font-bold text-softui-primary mb-4">Réclamations en cours</h3>
                  <p className="text-softui-secondary text-lg">Nombre de réclamations en cours : <span className="font-extrabold text-softui-primary">{reclamations.filter(r => r.statut === 'en_cours').length}</span></p>
                  <button onClick={() => scrollToSection('reclam')} className="mt-6 px-6 py-3 rounded-soft font-semibold bg-softui-primary text-white hover:bg-softui-primary/90 transition shadow-soft">
                    Voir les réclamations
                  </button>
                </div>
                <div className="bg-softui-accent rounded-xl p-8 shadow-soft text-center border border-softui-border">
                  <h3 className="text-2xl font-bold text-softui-primary mb-4">Réclamations résolues</h3>
                  <p className="text-softui-secondary text-lg">Nombre de réclamations résolues : <span className="font-extrabold text-softui-primary">{reclamations.filter(r => r.statut === 'resolu').length}</span></p>
                  <button onClick={() => scrollToSection('reclam')} className="mt-6 px-6 py-3 rounded-soft font-semibold bg-softui-primary text-white hover:bg-softui-primary/90 transition shadow-soft">
                    Voir les réclamations
                  </button>
                </div>
              </div>
              <div className="mt-10">
                <h3 className="text-2xl font-bold text-softui-primary mb-4">Liste des réclamations</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-softxl shadow-softxl border border-softui-border">
                    <thead>
                      <tr className="bg-softui-accent text-softui-secondary text-sm font-semibold uppercase tracking-wider">
                        <th className="px-6 py-3 text-left text-xs font-medium">Client</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Objet</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Statut</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {reclamationsFiltrees.map(reclam => (
                        <tr key={reclam.id} className="hover:bg-softui-accent/10">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-softui-primary">{reclam.client}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-softui-secondary">{reclam.objet}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-softui-secondary">{reclam.description}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-softui-secondary">{reclam.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              reclam.statut === 'nouveau' ? 'bg-yellow-100 text-yellow-700' :
                              reclam.statut === 'en_cours' ? 'bg-blue-100 text-blue-700' :
                              reclam.statut === 'escalade' ? 'bg-red-100 text-red-700' :
                              reclam.statut === 'resolu' ? 'bg-green-100 text-green-700' : ''
                            }`}>
                              {reclam.statut}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button onClick={() => setReclamDetailModal(reclam)} className="text-softui-primary hover:text-softui-primary/80 mr-2">
                              Voir détail
                            </button>
                            <button onClick={() => {
                              if (window.confirm('Supprimer cette réclamation ?')) {
                                setReclamations(recs => recs.filter(r => r.id !== reclam.id));
                              }
                            }} className="text-red-600 hover:text-red-700">Supprimer</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* Modal de détail réclamation */}
            {reclamDetailModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg border border-softui-border animate-fade-in">
                  <h3 className="text-xl font-bold mb-4 text-softui-primary">Détail de la réclamation</h3>
                  <div className="mb-4 text-left">
                    <div><span className="font-semibold">Client :</span> {reclamDetailModal.client}</div>
                    <div><span className="font-semibold">Objet :</span> {reclamDetailModal.objet}</div>
                    <div><span className="font-semibold">Description :</span> {reclamDetailModal.description}</div>
                    <div><span className="font-semibold">Date :</span> {reclamDetailModal.date}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-semibold">Statut :</span>
                      <select value={reclamDetailModal.statut} onChange={e => {
                        const newStatut = e.target.value;
                        setReclamations(recs => recs.map(r => r.id === reclamDetailModal.id ? { ...r, statut: newStatut } : r));
                        setReclamDetailModal(r => ({ ...r, statut: newStatut }));
                      }} className="px-2 py-1 rounded-soft border border-softui-border">
                        <option value="nouveau">nouveau</option>
                        <option value="en_cours">en_cours</option>
                        <option value="escalade">escalade</option>
                        <option value="resolu">resolu</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end mt-6">
                    <button onClick={() => setReclamDetailModal(null)} className="px-6 py-2 rounded-soft font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition">Fermer</button>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}
        {ongletActif==='archivage' && (
          <section className="mb-16">
            <div className="bg-softui-card rounded-softxl shadow-softxl p-10 w-full text-center mb-8 animate-fade-in border border-softui-border">
              <h2 className="text-3xl font-extrabold text-softui-primary mb-4 tracking-tight flex items-center justify-center gap-2">Archivage & Purge</h2>
              <p className="text-lg text-softui-secondary mb-8">Gérez les vendeurs inactifs et les avis/tickets archivés.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-softui-accent rounded-xl p-8 shadow-soft text-center border border-softui-border">
                  <h3 className="text-2xl font-bold text-softui-primary mb-4">Vendeurs inactifs</h3>
                  <p className="text-softui-secondary text-lg">Nombre de vendeurs inactifs : <span className="font-extrabold text-softui-primary">{vendeursInactifs.length}</span></p>
                  <button onClick={() => scrollToSection('archivage')} className="mt-6 px-6 py-3 rounded-soft font-semibold bg-softui-primary text-white hover:bg-softui-primary/90 transition shadow-soft">
                    Voir les vendeurs inactifs
                  </button>
                </div>
                <div className="bg-softui-accent rounded-xl p-8 shadow-soft text-center border border-softui-border">
                  <h3 className="text-2xl font-bold text-softui-primary mb-4">Avis et tickets archivés</h3>
                  <p className="text-softui-secondary text-lg">Nombre d'avis et de tickets archivés : <span className="font-extrabold text-softui-primary">{avisVieux.length + ticketsResolus.length}</span></p>
                  <button onClick={() => scrollToSection('archivage')} className="mt-6 px-6 py-3 rounded-soft font-semibold bg-softui-primary text-white hover:bg-softui-primary/90 transition shadow-soft">
                    Voir les archives
                  </button>
                </div>
              </div>
              <div className="mt-10">
                <h3 className="text-2xl font-bold text-softui-primary mb-4">Vendeurs inactifs</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-softxl shadow-softxl border border-softui-border">
                    <thead>
                      <tr className="bg-softui-accent text-softui-secondary text-sm font-semibold uppercase tracking-wider">
                        <th className="px-6 py-3 text-left text-xs font-medium">Nom</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Dernière activité</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {vendeursInactifs.map(vendeur => (
                        <tr key={vendeur.id} className="hover:bg-softui-accent/10">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-softui-primary">{vendeur.nom}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-softui-secondary">{vendeur.dernier}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button onClick={() => handleArchiverVendeur(vendeur.id)} className="text-red-600 hover:text-red-700 mr-2">
                              Archiver
                            </button>
                            <button onClick={() => handleSupprimerAvisVieux(vendeur.id)} className="text-red-600 hover:text-red-700">
                              Supprimer
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-10">
                <h3 className="text-2xl font-bold text-softui-primary mb-4">Avis et tickets archivés</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-softxl shadow-softxl border border-softui-border">
                    <thead>
                      <tr className="bg-softui-accent text-softui-secondary text-sm font-semibold uppercase tracking-wider">
                        <th className="px-6 py-3 text-left text-xs font-medium">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {avisVieux.map(avis => (
                        <tr key={avis.id} className="hover:bg-softui-accent/10">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-softui-secondary">Avis</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-softui-secondary">{avis.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button onClick={() => handleSupprimerAvisVieux(avis.id)} className="text-red-600 hover:text-red-700">
                              Supprimer
                            </button>
                          </td>
                        </tr>
                      ))}
                      {ticketsResolus.map(ticket => (
                        <tr key={ticket.id} className="hover:bg-softui-accent/10">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-softui-secondary">Ticket</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-softui-secondary">{ticket.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button onClick={() => handlePurgerTicket(ticket.id)} className="text-red-600 hover:text-red-700">
                              Purger
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}
        {ongletActif==='badges' && (
          <section className="mb-16">
            <div className="bg-softui-card rounded-softxl shadow-softxl p-10 w-full text-center mb-8 animate-fade-in border border-softui-border">
              <h2 className="text-3xl font-extrabold text-softui-primary mb-4 tracking-tight flex items-center justify-center gap-2">Gestion des Badges</h2>
              <p className="text-lg text-softui-secondary mb-8">Définissez et gérez les badges disponibles pour les vendeurs.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-softui-accent rounded-xl p-8 shadow-soft text-center border border-softui-border">
                  <h3 className="text-2xl font-bold text-softui-primary mb-4">Badges disponibles</h3>
                  <p className="text-softui-secondary text-lg">Nombre de badges disponibles : <span className="font-extrabold text-softui-primary">{badgesDisponibles.length}</span></p>
                  <button onClick={() => scrollToSection('badges')} className="mt-6 px-6 py-3 rounded-soft font-semibold bg-softui-primary text-white hover:bg-softui-primary/90 transition shadow-soft">
                    Voir les badges
                  </button>
                </div>
                <div className="bg-softui-accent rounded-xl p-8 shadow-soft text-center border border-softui-border">
                  <h3 className="text-2xl font-bold text-softui-primary mb-4">Badges attribués</h3>
                  <p className="text-softui-secondary text-lg">Nombre de badges attribués à des vendeurs : <span className="font-extrabold text-softui-primary">{vendeurs.flatMap(v => v.badges).length}</span></p>
                  <button onClick={() => scrollToSection('badges')} className="mt-6 px-6 py-3 rounded-soft font-semibold bg-softui-primary text-white hover:bg-softui-primary/90 transition shadow-soft">
                    Voir les badges attribués
                  </button>
                </div>
              </div>
              <div className="mt-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-softui-primary">Badges disponibles</h3>
                  <button
                    onClick={() => setBadgeCatalogueModal({ nom: '', emoji: '', desc: '', regle: '', popularite: 0 })}
                    className="px-4 py-2 rounded-soft font-semibold bg-softui-primary text-white hover:bg-softui-primary/90 transition shadow-soft"
                  >
                    + Ajouter un badge
                  </button>
                </div>
                {/* Modal d'ajout/édition de badge */}
                {badgeCatalogueModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-softui-border animate-fade-in">
                      <h3 className="text-xl font-bold mb-4 text-softui-primary">{badgeCatalogueModal.id ? 'Modifier le badge' : 'Ajouter un badge'}</h3>
                      <form onSubmit={e => {
                        e.preventDefault();
                        if (!badgeCatalogueModal.nom || !badgeCatalogueModal.emoji) return;
                        if (badgeCatalogueModal.id !== undefined) {
                          setBadges(badges => badges.map(b => b.id === badgeCatalogueModal.id ? { ...badgeCatalogueModal, id: badgeCatalogueModal.id, popularite: b.popularite } : b));
                        } else {
                          setBadges(badges => [...badges, { ...badgeCatalogueModal, id: Date.now(), popularite: 0 }]);
                        }
                        setBadgeCatalogueModal(null);
                      }} className="flex flex-col gap-4">
                        <input type="text" name="nom" placeholder="Nom du badge" className="px-4 py-2 rounded-soft border border-softui-border" required value={badgeCatalogueModal.nom} onChange={handleChangeBadgeCatalogueModal} />
                        <input type="text" name="emoji" placeholder="Emoji" className="px-4 py-2 rounded-soft border border-softui-border" required value={badgeCatalogueModal.emoji} onChange={handleChangeBadgeCatalogueModal} />
                        <input type="text" name="desc" placeholder="Description" className="px-4 py-2 rounded-soft border border-softui-border" value={badgeCatalogueModal.desc} onChange={handleChangeBadgeCatalogueModal} />
                        <input type="text" name="regle" placeholder="Règle d'attribution" className="px-4 py-2 rounded-soft border border-softui-border" value={badgeCatalogueModal.regle} onChange={handleChangeBadgeCatalogueModal} />
                        <input type="number" name="popularite" placeholder="Popularité" className="px-4 py-2 rounded-soft border border-softui-border" value={badgeCatalogueModal.popularite || 0} onChange={handleChangeBadgeCatalogueModal} min={0} />
                        <div className="flex gap-2 mt-2">
                          <button type="submit" className="px-6 py-2 rounded-soft font-semibold bg-softui-primary text-white hover:bg-softui-primary/90 transition shadow-soft">
                            {badgeCatalogueModal.id ? 'Enregistrer' : 'Ajouter'}
                          </button>
                          <button type="button" onClick={handleFermerBadgeCatalogueModal} className="px-6 py-2 rounded-soft font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition">
                            Annuler
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-softxl shadow-softxl border border-softui-border">
                    <thead>
                      <tr className="bg-softui-accent text-softui-secondary text-sm font-semibold uppercase tracking-wider">
                        <th className="px-6 py-3 text-left text-xs font-medium">Nom</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Emoji</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Règle</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Popularité</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {badgesDisponibles.map(badge => (
                        <tr key={badge.id} className="hover:bg-softui-accent/10">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-softui-primary">{badge.nom}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-softui-secondary">{badge.emoji}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-softui-secondary">{badge.desc}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-softui-secondary">{badge.regle}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-softui-secondary">{badge.popularite}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button onClick={() => setBadgeCatalogueModal(badge)} className="text-softui-primary hover:text-softui-primary/80 mr-2">
                              Modifier
                            </button>
                            <button onClick={() => {
                              if (window.confirm('Voulez-vous vraiment supprimer ce badge ?')) {
                                handleDeleteBadgeCatalogue(badge.id);
                              }
                            }} className="text-red-600 hover:text-red-700">
                              Supprimer
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-10">
                <h3 className="text-2xl font-bold text-softui-primary mb-4">Badges attribués</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-softxl shadow-softxl border border-softui-border">
                    <thead>
                      <tr className="bg-softui-accent text-softui-secondary text-sm font-semibold uppercase tracking-wider">
                        <th className="px-6 py-3 text-left text-xs font-medium">Vendeur</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Badge</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Date d'attribution</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Admin</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {vendeurs.flatMap(vendeur => vendeur.badges.map(badge => (
                        <tr key={`${vendeur.id}-${badge.id}`} className="hover:bg-softui-accent/10">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-softui-primary">{vendeur.nom}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-softui-secondary">{badge.emoji}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-softui-secondary">{vendeur.badges.find(b => b.id === badge.id)?.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-softui-secondary">{vendeur.badges.find(b => b.id === badge.id)?.admin}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button onClick={() => handleAttribuerBadge()} className="text-softui-primary hover:text-softui-primary/80 mr-2">
                              Attribuer
                            </button>
                            <button onClick={() => handleFermerBadgeModal()} className="text-red-600 hover:text-red-700">
                              Retirer
                            </button>
                          </td>
                        </tr>
                      )))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}
        {ongletActif==='equipe' && (
          <section className="mb-16">
            <div className="bg-softui-card rounded-softxl shadow-softxl p-10 w-full text-center mb-8 animate-fade-in border border-softui-border">
              <h2 className="text-3xl font-extrabold text-softui-primary mb-4 tracking-tight flex items-center justify-center gap-2">Gestion de l'Équipe</h2>
              <p className="text-lg text-softui-secondary mb-8">Gérez les membres de l'équipe et leurs rôles.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-softui-accent rounded-xl p-8 shadow-soft text-center border border-softui-border">
                  <h3 className="text-2xl font-bold text-softui-primary mb-4">Membres de l'équipe</h3>
                  <p className="text-softui-secondary text-lg">Nombre de membres : <span className="font-extrabold text-softui-primary">{equipe.length}</span></p>
                  <button onClick={() => scrollToSection('equipe')} className="mt-6 px-6 py-3 rounded-soft font-semibold bg-softui-primary text-white hover:bg-softui-primary/90 transition shadow-soft">
                    Voir l'équipe
                  </button>
                </div>
                <div className="bg-softui-accent rounded-xl p-8 shadow-soft text-center border border-softui-border">
                  <h3 className="text-2xl font-bold text-softui-primary mb-4">Nouveau membre</h3>
                  <form onSubmit={handleAjouterMembre} className="flex flex-col gap-4">
                    <input type="text" name="nom" placeholder="Nom du membre" className="px-4 py-2 rounded-soft border border-softui-border focus:ring-2 focus:ring-softui-primary/50 focus:border-softui-primary" required />
                    <input type="email" name="email" placeholder="Email du membre" className="px-4 py-2 rounded-soft border border-softui-border focus:ring-2 focus:ring-softui-primary/50 focus:border-softui-primary" required />
                    <select name="role" className="px-4 py-2 rounded-soft border border-softui-border focus:ring-2 focus:ring-softui-primary/50 focus:border-softui-primary" required>
                      <option value="">Sélectionner un rôle</option>
                      {rolesDisponibles.map(role => (
                        <option key={role.value} value={role.value}>{role.label}</option>
                      ))}
                    </select>
                    <button type="submit" className="px-6 py-3 rounded-soft font-semibold bg-softui-primary text-white hover:bg-softui-primary/90 transition shadow-soft">
                      Ajouter Membre
                    </button>
                  </form>
                </div>
              </div>
              <div className="mt-10">
                <h3 className="text-2xl font-bold text-softui-primary mb-4">Membres de l'équipe</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-softxl shadow-softxl border border-softui-border">
                    <thead>
                      <tr className="bg-softui-accent text-softui-secondary text-sm font-semibold uppercase tracking-wider">
                        <th className="px-6 py-3 text-left text-xs font-medium">Nom</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Rôle</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Tickets résolus</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Temps de réponse</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {equipeFiltrée.map(membre => (
                        <tr key={membre.id} className="hover:bg-softui-accent/10">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-softui-primary">{membre.nom}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-softui-secondary">{membre.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <select value={membre.role} onChange={(e) => handleChangerRole(membre.id, e.target.value)} className="px-2 py-1 rounded-soft border border-softui-border text-sm">
                              {rolesDisponibles.map(role => (
                                <option key={role.value} value={role.value}>{role.label}</option>
                              ))}
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-softui-secondary">{membre.stats.tickets}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-softui-secondary">{membre.stats.temps}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button onClick={() => handleOuvrirAffectation(membre, 'vendeur')} className="text-softui-primary hover:text-softui-primary/80 mr-2">
                              Affecter vendeur
                            </button>
                            <button onClick={() => handleOuvrirAffectation(membre, 'ticket')} className="text-softui-primary hover:text-softui-primary/80">
                              Affecter ticket
                            </button>
                            <button onClick={() => handleSupprimerMembre(membre.id)} className="text-red-600 hover:text-red-700 ml-2">
                              Supprimer
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}
        {ongletActif==='knowledge' && (
          <section className="mb-16">
            <div className="bg-softui-card rounded-softxl shadow-softxl p-10 w-full text-center mb-8 animate-fade-in border border-softui-border">
              <h2 className="text-3xl font-extrabold text-softui-primary mb-4 tracking-tight flex items-center justify-center gap-2">FAQ</h2>
              <p className="text-lg text-softui-secondary mb-8">Trouvez ici les réponses aux questions fréquentes.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-softui-accent rounded-xl p-8 shadow-soft text-center border border-softui-border">
                  <h3 className="text-2xl font-bold text-softui-primary mb-4">Questions fréquentes</h3>
                  <p className="text-softui-secondary text-lg">Nombre de questions : <span className="font-extrabold text-softui-primary">{faqItems.length}</span></p>
                  <button onClick={() => scrollToSection('knowledge')} className="mt-6 px-6 py-3 rounded-soft font-semibold bg-softui-primary text-white hover:bg-softui-primary/90 transition shadow-soft">
                    Voir les questions
                  </button>
                </div>
                <div className="bg-softui-accent rounded-xl p-8 shadow-soft text-center border border-softui-border">
                  <h3 className="text-2xl font-bold text-softui-primary mb-4">Ajouter une question</h3>
                  <form onSubmit={e => {
                    e.preventDefault();
                    if (!faqForm.question.trim() || !faqForm.answer.trim()) return;
                    setFaqItems(items => [...items, { id: Date.now(), question: faqForm.question, answer: faqForm.answer }]);
                    setFaqForm({ question: '', answer: '' });
                  }} className="flex flex-col gap-4">
                    <input type="text" name="question" placeholder="Question" className="px-4 py-2 rounded-soft border border-softui-border focus:ring-2 focus:ring-softui-primary/50 focus:border-softui-primary" required value={faqForm.question} onChange={e => setFaqForm(f => ({ ...f, question: e.target.value }))} />
                    <textarea name="answer" placeholder="Réponse" className="px-4 py-2 rounded-soft border border-softui-border focus:ring-2 focus:ring-softui-primary/50 focus:border-softui-primary" rows={4} required value={faqForm.answer} onChange={e => setFaqForm(f => ({ ...f, answer: e.target.value }))}></textarea>
                    <button type="submit" className="px-6 py-3 rounded-soft font-semibold bg-softui-primary text-white hover:bg-softui-primary/90 transition shadow-soft">
                      Ajouter Question
                    </button>
                  </form>
                </div>
              </div>
              <div className="mt-10">
                <h3 className="text-2xl font-bold text-softui-primary mb-4">Questions fréquentes</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-softxl shadow-softxl border border-softui-border">
                    <thead>
                      <tr className="bg-softui-accent text-softui-secondary text-sm font-semibold uppercase tracking-wider">
                        <th className="px-6 py-3 text-left text-xs font-medium">Question</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Réponse</th>
                        <th className="px-6 py-3 text-left text-xs font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {faqItems.map(item => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-softui-secondary">{item.question}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-softui-secondary">{item.answer}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button onClick={() => setFaqEditModal(item)} className="text-softui-primary hover:text-softui-primary/80">Modifier</button>
                            <button onClick={() => {
                              if (window.confirm('Supprimer cette question ?')) {
                                setFaqItems(items => items.filter(f => f.id !== item.id));
                              }
                            }} className="text-red-600 hover:text-red-700 ml-2">Supprimer</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}
        {ongletActif==='demandes' && (
          <section className="mb-16">
            <div className="bg-softui-card rounded-softxl shadow-softxl p-10 w-full text-center mb-8 animate-fade-in border border-softui-border">
              <h2 className="text-3xl font-extrabold text-softui-primary mb-4 tracking-tight flex items-center justify-center gap-2">Validation des demandes commerçants</h2>
              <p className="text-lg text-softui-secondary mb-8">Nombre de demandes en attente : <span className="font-bold text-softui-primary">{demandesCommercants.filter(d=>d.statut==='en_attente').length}</span></p>
              <div className="flex justify-end mb-4">
                <input
                  type="text"
                  placeholder="Rechercher par nom, email ou statut..."
                  className="px-4 py-2 rounded-soft border border-softui-border focus:outline-none focus:ring-2 focus:ring-softui-primary"
                  value={demandeSearch}
                  onChange={e => setDemandeSearch(e.target.value)}
                />
              </div>
              {demandeNotif && (
                <div className="mb-4 text-green-700 bg-green-100 rounded-soft px-4 py-2 font-semibold shadow-soft inline-block animate-fade-in">
                  {demandeNotif}
                </div>
              )}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-softui-border">
                  <thead className="bg-softui-accent">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-softui-secondary uppercase tracking-wider">Nom</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-softui-secondary uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-softui-secondary uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-softui-secondary uppercase tracking-wider">Statut</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-softui-secondary uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {demandesCommercants.filter(demande =>
                      demande.nom.toLowerCase().includes(demandeSearch.toLowerCase()) ||
                      demande.email.toLowerCase().includes(demandeSearch.toLowerCase()) ||
                      demande.statut.toLowerCase().includes(demandeSearch.toLowerCase())
                    ).map(demande => (
                      <tr key={demande.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-softui-secondary">{demande.nom}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-softui-secondary">{demande.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-softui-secondary">{demande.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {demande.statut === 'en_attente' && <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs font-semibold">En attente</span>}
                          {demande.statut === 'validé' && <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-semibold">Validé</span>}
                          {demande.statut === 'refusé' && <span className="px-2 py-1 rounded bg-red-100 text-red-700 text-xs font-semibold">Refusé</span>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                          <button
                            onClick={() => setDemandeDetailModal(demande)}
                            className="text-softui-primary hover:text-softui-primary/80 font-bold"
                          >Voir détail</button>
                          {demande.statut === 'en_attente' ? (
                            <>
                              <button
                                onClick={() => {
                                  setDemandesCommercants(demandesCommercants.map(d => d.id === demande.id ? { ...d, statut: 'validé' } : d));
                                  setDemandeNotif('Demande validée avec succès !');
                                  setTimeout(() => setDemandeNotif(''), 2000);
                                }}
                                className="text-green-600 hover:text-green-700 mr-2 font-bold"
                              >Valider</button>
                              <button
                                onClick={() => {
                                  setDemandesCommercants(demandesCommercants.map(d => d.id === demande.id ? { ...d, statut: 'refusé' } : d));
                                  setDemandeNotif('Demande refusée.');
                                  setTimeout(() => setDemandeNotif(''), 2000);
                                }}
                                className="text-red-600 hover:text-red-700 font-bold"
                              >Refuser</button>
                            </>
                          ) : (
                            <span className="text-softui-secondary">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Modal de détail de la demande */}
              {demandeDetailModal && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                  <div className="bg-white rounded-softxl shadow-softxl p-8 w-full max-w-md relative animate-fade-in">
                    <button
                      className="absolute top-4 right-4 text-softui-secondary hover:text-softui-primary text-2xl"
                      onClick={() => setDemandeDetailModal(null)}
                    >×</button>
                    <h3 className="text-2xl font-bold mb-4 text-softui-primary">Détail de la demande</h3>
                    <div className="text-left space-y-2">
                      <div><span className="font-semibold">Nom :</span> {demandeDetailModal.nom}</div>
                      <div><span className="font-semibold">Email :</span> {demandeDetailModal.email}</div>
                      <div><span className="font-semibold">Date :</span> {demandeDetailModal.date}</div>
                      <div><span className="font-semibold">Statut :</span> {demandeDetailModal.statut}</div>
                      <div><span className="font-semibold">Message :</span> {demandeDetailModal.message}</div>
                      <div><span className="font-semibold">Justificatif :</span> <a href="#" className="text-softui-primary underline" download>{demandeDetailModal.justificatif}</a></div>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                      {demandeDetailModal.statut === 'en_attente' && (
                        <>
                          <button
                            onClick={() => {
                              setDemandesCommercants(demandesCommercants.map(d => d.id === demandeDetailModal.id ? { ...d, statut: 'validé' } : d));
                              setDemandeNotif('Demande validée avec succès !');
                              setDemandeDetailModal(null);
                              setTimeout(() => setDemandeNotif(''), 2000);
                            }}
                            className="px-4 py-2 rounded-soft font-semibold bg-green-600 text-white hover:bg-green-700 transition shadow-soft"
                          >Valider</button>
                          <button
                            onClick={() => {
                              setDemandesCommercants(demandesCommercants.map(d => d.id === demandeDetailModal.id ? { ...d, statut: 'refusé' } : d));
                              setDemandeNotif('Demande refusée.');
                              setDemandeDetailModal(null);
                              setTimeout(() => setDemandeNotif(''), 2000);
                            }}
                            className="px-4 py-2 rounded-soft font-semibold bg-red-600 text-white hover:bg-red-700 transition shadow-soft"
                          >Refuser</button>
                        </>
                      )}
                      <button
                        onClick={() => setDemandeDetailModal(null)}
                        className="px-4 py-2 rounded-soft font-semibold bg-softui-accent text-softui-primary hover:bg-softui-primary/10 transition shadow-soft"
                      >Fermer</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
      {/* Modal d'édition FAQ */}
      {faqEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-softui-border animate-fade-in">
            <h3 className="text-xl font-bold mb-4 text-softui-primary">Modifier la question</h3>
            <form onSubmit={e => {
              e.preventDefault();
              setFaqItems(items => items.map(f => f.id === faqEditModal.id ? { ...faqEditModal } : f));
              setFaqEditModal(null);
            }} className="flex flex-col gap-4">
              <input type="text" name="question" placeholder="Question" className="px-4 py-2 rounded-soft border border-softui-border" required value={faqEditModal.question} onChange={e => setFaqEditModal(f => ({ ...f, question: e.target.value }))} />
              <textarea name="answer" placeholder="Réponse" className="px-4 py-2 rounded-soft border border-softui-border" rows={4} required value={faqEditModal.answer} onChange={e => setFaqEditModal(f => ({ ...f, answer: e.target.value }))}></textarea>
              <div className="flex gap-2 mt-2">
                <button type="submit" className="px-6 py-2 rounded-soft font-semibold bg-softui-primary text-white hover:bg-softui-primary/90 transition shadow-soft">Enregistrer</button>
                <button type="button" onClick={() => setFaqEditModal(null)} className="px-6 py-2 rounded-soft font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition">Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard; 