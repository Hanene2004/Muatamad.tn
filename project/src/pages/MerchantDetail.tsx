import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Clock, 
  CheckCircle,
  Heart,
  Share2,
  MessageCircle,
  Star
} from 'lucide-react';
import { Merchant } from '../types';
import { mockMerchants, mockReviews } from '../data/mockData';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Rating from '../components/common/Rating';
import Badge from '../components/common/Badge';

const MerchantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const foundMerchant = mockMerchants.find(m => m.id === id);
    setMerchant(foundMerchant || null);
    setLoading(false);
  }, [id]);

  const merchantReviews = mockReviews.filter(review => review.merchantId === id);

  const isOpen = () => {
    if (!merchant) return false;
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const currentTime = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    
    const todayHours = merchant.workingHours[currentDay];
    if (!todayHours || todayHours.closed) return false;
    
    return currentTime >= todayHours.open && currentTime <= todayHours.close;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tunisian-red mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!merchant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Commerçant non trouvé</h2>
          <Link to="/merchants">
            <Button variant="primary">Retour aux commerçants</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/merchants" className="inline-flex items-center text-tunisian-red hover:text-tunisian-navy">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour aux commerçants
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="p-0 overflow-hidden">
              <div className="relative h-96">
                <img
                  src={merchant.images[activeImageIndex]}
                  alt={merchant.name}
                  className="w-full h-full object-cover"
                />
                {merchant.verified && (
                  <Badge
                    variant="success"
                    icon={CheckCircle}
                    className="absolute top-4 left-4 bg-white/90"
                  >
                    Vérifié
                  </Badge>
                )}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button variant="ghost" size="sm" icon={Heart} className="bg-white/80 hover:bg-white"> </Button>
                  <Button variant="ghost" size="sm" icon={Share2} className="bg-white/80 hover:bg-white"> </Button>
                </div>
              </div>
              {merchant.images.length > 1 && (
                <div className="p-4">
                  <div className="flex space-x-2 overflow-x-auto">
                    {merchant.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                          index === activeImageIndex ? 'border-tunisian-red' : 'border-gray-200'
                        }`}
                      >
                        <img src={image} alt={`${merchant.name} ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Basic Info */}
            <Card>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{merchant.name}</h1>
                  <div className="flex items-center space-x-4 mb-4">
                    <Badge variant="secondary">{merchant.category}</Badge>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${isOpen() ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className={`text-sm font-medium ${isOpen() ? 'text-green-600' : 'text-red-600'}`}>
                        {isOpen() ? 'Ouvert maintenant' : 'Fermé'}
                      </span>
                    </div>
                  </div>
                  <Rating rating={merchant.rating} size="lg" className="mb-4" />
                  <p className="text-gray-600 leading-relaxed">{merchant.description}</p>
                </div>
              </div>

              {/* Services */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Services</h3>
                <div className="flex flex-wrap gap-2">
                  {merchant.services.map((service, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-tunisian-red/10 text-tunisian-red text-sm rounded-full"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Working Hours */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Horaires d'ouverture</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Object.entries(merchant.workingHours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="capitalize font-medium text-gray-700">
                        {day === 'monday' ? 'Lundi' :
                         day === 'tuesday' ? 'Mardi' :
                         day === 'wednesday' ? 'Mercredi' :
                         day === 'thursday' ? 'Jeudi' :
                         day === 'friday' ? 'Vendredi' :
                         day === 'saturday' ? 'Samedi' : 'Dimanche'}
                      </span>
                      <span className="text-gray-600">
                        {hours.closed ? 'Fermé' : `${hours.open} - ${hours.close}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Reviews */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Avis clients ({merchant.reviewCount})
              </h3>
              <div className="space-y-4">
                {merchantReviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">{review.userName}</span>
                          {review.verified && (
                            <CheckCircle className="w-4 h-4 text-tunisian-green" />
                          )}
                        </div>
                        <Rating rating={review.rating} size="sm" showValue={false} />
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-tunisian-red" />
                  <span className="text-gray-700">{merchant.contact.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-tunisian-red" />
                  <span className="text-gray-700">{merchant.contact.email}</span>
                </div>
                {merchant.contact.website && (
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-tunisian-red" />
                    <a href={merchant.contact.website} className="text-tunisian-red hover:text-tunisian-navy">
                      {merchant.contact.website}
                    </a>
                  </div>
                )}
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-tunisian-red mt-1" />
                  <span className="text-gray-700">{merchant.location.address}</span>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <Card>
              <div className="space-y-3">
                <Button variant="primary" size="lg" icon={Phone} className="w-full">
                  Appeler
                </Button>
                <Button variant="outline" size="lg" icon={MessageCircle} className="w-full">
                  Envoyer un message
                </Button>
                <Button variant="outline" size="lg" icon={MapPin} className="w-full">
                  Voir sur la carte
                </Button>
              </div>
            </Card>

            {/* Verification */}
            {merchant.verified && (
              <Card>
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 text-tunisian-green mx-auto mb-3" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Commerçant Vérifié
                  </h4>
                  <p className="text-sm text-gray-600">
                    Ce commerçant a été vérifié par notre équipe avec ses documents officiels.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Numéro fiscal: {merchant.fiscalNumber}
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantDetail;