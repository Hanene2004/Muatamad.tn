import { Merchant, Review } from '../types';

export const categories = [
  'Restaurant',
  'Café',
  'Artisanat',
  'Vêtements',
  'Électronique',
  'Alimentation',
  'Services',
  'Beauté',
  'Automobile',
  'Immobilier'
];

export const tunisianCities = [
  'Tunis',
  'Sfax',
  'Sousse',
  'Kairouan',
  'Bizerte',
  'Gabès',
  'Ariana',
  'Gafsa',
  'Monastir',
  'Ben Arous',
  'Kasserine',
  'Medenine',
  'Nabeul',
  'Tataouine',
  'Beja',
  'Jendouba',
  'Mahdia',
  'Sidi Bouzid',
  'Siliana',
  'Tozeur',
  'Manouba',
  'Kef',
  'Zaghouan',
  'Kebili'
];

export const mockMerchants: Merchant[] = [
  {
    id: '1',
    name: 'Restaurant Dar Zarrouk',
    category: 'Restaurant',
    location: {
      city: 'Tunis',
      region: 'Tunis',
      address: '15 Avenue Habib Bourguiba, Tunis',
      coordinates: { lat: 36.8065, lng: 10.1815 }
    },
    rating: 4.5,
    reviewCount: 127,
    images: [
      'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
      'https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg'
    ],
    description: 'Restaurant traditionnel tunisien servant des plats authentiques dans une ambiance chaleureuse.',
    services: ['Cuisine traditionnelle', 'Livraison', 'Terrasse', 'Événements'],
    contact: {
      phone: '+216 71 123 456',
      email: 'contact@darzarrouk.tn',
      website: 'www.darzarrouk.tn'
    },
    workingHours: {
      monday: { open: '11:00', close: '23:00' },
      tuesday: { open: '11:00', close: '23:00' },
      wednesday: { open: '11:00', close: '23:00' },
      thursday: { open: '11:00', close: '23:00' },
      friday: { open: '11:00', close: '23:00' },
      saturday: { open: '11:00', close: '23:00' },
      sunday: { open: '11:00', close: '22:00' }
    },
    verified: true,
    fiscalNumber: '1234567A',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Atelier Artisanat Sidi Bou Said',
    category: 'Artisanat',
    location: {
      city: 'Sidi Bou Said',
      region: 'Tunis',
      address: 'Rue Sidi Bou Said, Sidi Bou Said',
      coordinates: { lat: 36.8675, lng: 10.3469 }
    },
    rating: 4.8,
    reviewCount: 89,
    images: [
      'https://images.pexels.com/photos/1251861/pexels-photo-1251861.jpeg',
      'https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg'
    ],
    description: 'Atelier d\'artisanat traditionnel tunisien, céramique, poterie et objets décoratifs.',
    services: ['Céramique', 'Poterie', 'Objets décoratifs', 'Cours d\'artisanat'],
    contact: {
      phone: '+216 71 987 654',
      email: 'atelier@sidibousaid.tn'
    },
    workingHours: {
      monday: { open: '09:00', close: '18:00' },
      tuesday: { open: '09:00', close: '18:00' },
      wednesday: { open: '09:00', close: '18:00' },
      thursday: { open: '09:00', close: '18:00' },
      friday: { open: '09:00', close: '18:00' },
      saturday: { open: '09:00', close: '18:00' },
      sunday: { closed: true }
    },
    verified: true,
    fiscalNumber: '7654321B',
    createdAt: '2024-02-10'
  },
  {
    id: '3',
    name: 'Café des Nattes',
    category: 'Café',
    location: {
      city: 'Sidi Bou Said',
      region: 'Tunis',
      address: 'Place Sidi Bou Said, Sidi Bou Said',
      coordinates: { lat: 36.8689, lng: 10.3472 }
    },
    rating: 4.3,
    reviewCount: 203,
    images: [
      'https://images.pexels.com/photos/1002740/pexels-photo-1002740.jpeg',
      'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg'
    ],
    description: 'Café historique avec vue panoramique sur la mer Méditerranée.',
    services: ['Thé à la menthe', 'Café tunisien', 'Pâtisseries', 'Terrasse avec vue'],
    contact: {
      phone: '+216 71 456 789',
      email: 'info@cafedesnattes.tn'
    },
    workingHours: {
      monday: { open: '08:00', close: '24:00' },
      tuesday: { open: '08:00', close: '24:00' },
      wednesday: { open: '08:00', close: '24:00' },
      thursday: { open: '08:00', close: '24:00' },
      friday: { open: '08:00', close: '24:00' },
      saturday: { open: '08:00', close: '24:00' },
      sunday: { open: '08:00', close: '24:00' }
    },
    verified: true,
    fiscalNumber: '3456789C',
    createdAt: '2024-01-20'
  },
  {
    id: '4',
    name: 'Boutique El Medina',
    category: 'Vêtements',
    location: {
      city: 'Tunis',
      region: 'Tunis',
      address: 'Médina de Tunis, Tunis',
      coordinates: { lat: 36.7981, lng: 10.1713 }
    },
    rating: 4.2,
    reviewCount: 156,
    images: [
      'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg',
      'https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg'
    ],
    description: 'Boutique de vêtements traditionnels et modernes dans la médina historique.',
    services: ['Vêtements traditionnels', 'Mode moderne', 'Couture sur mesure', 'Accessoires'],
    contact: {
      phone: '+216 71 789 123',
      email: 'contact@elmedina.tn'
    },
    workingHours: {
      monday: { open: '10:00', close: '19:00' },
      tuesday: { open: '10:00', close: '19:00' },
      wednesday: { open: '10:00', close: '19:00' },
      thursday: { open: '10:00', close: '19:00' },
      friday: { open: '10:00', close: '19:00' },
      saturday: { open: '10:00', close: '19:00' },
      sunday: { open: '10:00', close: '18:00' }
    },
    verified: true,
    fiscalNumber: '9876543D',
    createdAt: '2024-03-05'
  },
  {
    id: '5',
    name: 'Épicerie Sousse Center',
    category: 'Alimentation',
    location: {
      city: 'Sousse',
      region: 'Sousse',
      address: 'Avenue Habib Bourguiba, Sousse',
      coordinates: { lat: 35.8245, lng: 10.6414 }
    },
    rating: 4.1,
    reviewCount: 98,
    images: [
      'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg',
      'https://images.pexels.com/photos/1005059/pexels-photo-1005059.jpeg'
    ],
    description: 'Épicerie moderne avec produits frais locaux et internationaux.',
    services: ['Produits frais', 'Épicerie fine', 'Livraison à domicile', 'Produits biologiques'],
    contact: {
      phone: '+216 73 123 456',
      email: 'info@soussecentre.tn'
    },
    workingHours: {
      monday: { open: '08:00', close: '22:00' },
      tuesday: { open: '08:00', close: '22:00' },
      wednesday: { open: '08:00', close: '22:00' },
      thursday: { open: '08:00', close: '22:00' },
      friday: { open: '08:00', close: '22:00' },
      saturday: { open: '08:00', close: '22:00' },
      sunday: { open: '09:00', close: '20:00' }
    },
    verified: false,
    fiscalNumber: '5432167E',
    createdAt: '2024-02-28'
  },
  {
    id: '6',
    name: 'Salon de Beauté Yasmine',
    category: 'Beauté',
    location: {
      city: 'Sfax',
      region: 'Sfax',
      address: 'Avenue Hedi Chaker, Sfax',
      coordinates: { lat: 34.7406, lng: 10.7603 }
    },
    rating: 4.6,
    reviewCount: 134,
    images: [
      'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg',
      'https://images.pexels.com/photos/3993450/pexels-photo-3993450.jpeg'
    ],
    description: 'Salon de beauté moderne offrant des services complets pour femmes et hommes.',
    services: ['Coiffure', 'Maquillage', 'Soins du visage', 'Manucure', 'Pédicure'],
    contact: {
      phone: '+216 74 456 789',
      email: 'contact@yasmine-beauty.tn'
    },
    workingHours: {
      monday: { open: '09:00', close: '19:00' },
      tuesday: { open: '09:00', close: '19:00' },
      wednesday: { open: '09:00', close: '19:00' },
      thursday: { open: '09:00', close: '19:00' },
      friday: { open: '09:00', close: '19:00' },
      saturday: { open: '09:00', close: '19:00' },
      sunday: { closed: true }
    },
    verified: true,
    fiscalNumber: '8765432F',
    createdAt: '2024-01-10'
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    merchantId: '1',
    userName: 'Ahmed Ben Salem',
    rating: 5,
    comment: 'Excellente cuisine traditionnelle, service impeccable et ambiance authentique. Je recommande vivement !',
    date: '2024-03-15',
    verified: true
  },
  {
    id: '2',
    merchantId: '1',
    userName: 'Fatima Trabelsi',
    rating: 4,
    comment: 'Très bon restaurant, plats savoureux. Petit bémol sur le temps d\'attente mais cela vaut le coup.',
    date: '2024-03-10',
    verified: true
  },
  {
    id: '3',
    merchantId: '2',
    userName: 'Mohamed Gharbi',
    rating: 5,
    comment: 'Artisanat de qualité exceptionnelle, travail minutieux et prix raisonnables. Bravo !',
    date: '2024-03-12',
    verified: true
  },
  {
    id: '4',
    merchantId: '3',
    userName: 'Leila Khelifi',
    rating: 4,
    comment: 'Café historique avec une vue magnifique. Thé à la menthe parfait !',
    date: '2024-03-14',
    verified: true
  },
  {
    id: '5',
    merchantId: '4',
    userName: 'Karim Bouaziz',
    rating: 4,
    comment: 'Belle collection de vêtements traditionnels, bon conseil de la part du vendeur.',
    date: '2024-03-11',
    verified: true
  },
  {
    id: '6',
    merchantId: '6',
    userName: 'Sonia Nasri',
    rating: 5,
    comment: 'Service professionnel et accueil chaleureux. Mon salon de beauté préféré à Sfax !',
    date: '2024-03-13',
    verified: true
  }
];