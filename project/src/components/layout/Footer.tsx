import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Plateforme',
      links: [
        { name: 'À propos', href: '/about' },
        { name: 'Comment ça marche', href: '/how-it-works' },
        { name: 'Conditions d\'utilisation', href: '/terms' },
        { name: 'Politique de confidentialité', href: '/privacy' }
      ]
    },
    {
      title: 'Commerçants',
      links: [
        { name: 'Inscription commerçant', href: '/merchant-signup' },
        { name: 'Espace commerçant', href: '/merchant-dashboard' },
        { name: 'Aide aux commerçants', href: '/merchant-help' },
        { name: 'Tarification', href: '/pricing' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Centre d\'aide', href: '/help' },
        { name: 'Contact', href: '/contact' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Signaler un problème', href: '/report' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' }
  ];

  return (
    <footer className="bg-tunisian-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-tunisian-red to-tunisian-gold rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">Souq</span>
                <span className="text-xl font-bold text-tunisian-gold">Tunisia</span>
              </div>
            </Link>
            <p className="text-gray-300 text-sm">
              La plateforme nationale tunisienne de mise en relation entre commerçants et consommateurs.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-400 hover:text-tunisian-gold transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-lg font-semibold text-white">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-tunisian-gold transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-tunisian-gold" />
              <span className="text-gray-300">contact@souqtunisia.tn</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-tunisian-gold" />
              <span className="text-gray-300">+216 70 123 456</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-tunisian-gold" />
              <span className="text-gray-300">Tunis, Tunisie</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Souq Tunisia. Tous droits réservés. Plateforme développée pour promouvoir le commerce local tunisien.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;