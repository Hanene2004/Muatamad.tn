import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, MapPin, HelpCircle, Users, Briefcase, Info, BookOpen } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const supportTypes = [
  { icon: Users, title: 'Support Consommateur', desc: 'Aide pour les utilisateurs' },
  { icon: Briefcase, title: 'Support Commerçant', desc: 'Assistance pour les commerçants' },
  { icon: Info, title: 'Questions Générales', desc: 'Informations sur la plateforme' },
  { icon: HelpCircle, title: 'Partenariats', desc: 'Collaborations et partenariats' },
];

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', category: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-tunisian-navy via-tunisian-red/10 to-tunisian-gold/10 py-10 px-2 md:px-0">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-tunisian-navy mb-2">Contactez Notre Équipe</h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">Nous sommes là pour vous aider. N'hésitez pas à nous contacter pour toute question ou assistance.</p>
        </div>
        {/* Tuiles infos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="flex flex-col items-center py-6 bg-tunisian-navy/5">
            <Phone className="w-8 h-8 text-tunisian-navy mb-2" />
            <div className="font-semibold text-tunisian-navy text-lg mb-1">Téléphone</div>
            <div className="text-gray-600 text-sm mb-1">Appelez-nous directement</div>
            <div className="text-tunisian-navy font-bold">+216 70 123 456</div>
          </Card>
          <Card className="flex flex-col items-center py-6 bg-tunisian-red/5">
            <Mail className="w-8 h-8 text-tunisian-red mb-2" />
            <div className="font-semibold text-tunisian-red text-lg mb-1">Email</div>
            <div className="text-gray-600 text-sm mb-1">Envoyez-nous un email</div>
            <div className="text-tunisian-red font-bold">contact@souqtunisia.tn</div>
          </Card>
          <Card className="flex flex-col items-center py-6 bg-tunisian-gold/10">
            <MessageCircle className="w-8 h-8 text-tunisian-gold mb-2" />
            <div className="font-semibold text-tunisian-gold text-lg mb-1">Chat en direct</div>
            <div className="text-gray-600 text-sm mb-1">Discutez avec notre équipe</div>
            <div className="text-tunisian-gold font-bold">Disponible 24/7</div>
          </Card>
          <Card className="flex flex-col items-center py-6 bg-tunisian-navy/5">
            <MapPin className="w-8 h-8 text-tunisian-navy mb-2" />
            <div className="font-semibold text-tunisian-navy text-lg mb-1">Adresse</div>
            <div className="text-gray-600 text-sm mb-1">Visitez nos bureaux</div>
            <div className="text-tunisian-red font-bold">Avenue Habib Bourguiba, Tunis</div>
          </Card>
        </div>
        {/* Formulaire + encarts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Formulaire */}
          <Card className="md:col-span-2 p-8 bg-white/90">
            <h2 className="text-2xl font-bold text-tunisian-navy mb-4">Envoyez-nous un message</h2>
            <p className="text-gray-600 mb-6">Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.</p>
            {submitted ? (
              <div className="text-green-600 text-xl font-semibold text-center py-12">Merci pour votre message !</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Nom complet *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Votre nom complet"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-tunisian-red bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="votre@email.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-tunisian-red bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Catégorie *</label>
                    <input
                      type="text"
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      required
                      placeholder="Catégorie"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-tunisian-red bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Sujet *</label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      placeholder="Sujet de votre message"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-tunisian-red bg-gray-50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Décrivez votre demande en détail..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-tunisian-red bg-gray-50"
                  />
                </div>
                <Button type="submit" size="lg" variant="primary" className="w-full flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 13V5a2 2 0 012-2h4a2 2 0 012 2v16" /></svg>
                  Envoyer le message
                </Button>
              </form>
            )}
          </Card>
          {/* Encarts d'aide */}
          <div className="flex flex-col gap-6">
            <Card className="p-6 bg-tunisian-navy/5">
              <h3 className="text-lg font-bold text-tunisian-navy mb-3">Types de Support</h3>
              <ul className="space-y-2">
                {supportTypes.map((type) => (
                  <li key={type.title} className="flex items-center gap-2 text-gray-700">
                    <type.icon className="w-5 h-5 text-tunisian-navy" />
                    <span className="font-medium">{type.title}</span>
                    <span className="text-xs text-gray-500 ml-2">{type.desc}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="p-6 bg-tunisian-gold/10">
              <h3 className="text-lg font-bold text-tunisian-gold mb-3">Horaires d'ouverture</h3>
              <ul className="text-gray-700 text-sm">
                <li><span className="font-medium">Lundi - Vendredi :</span> 8h00 - 18h00</li>
                <li><span className="font-medium">Samedi :</span> 9h00 - 16h00</li>
                <li><span className="font-medium">Dimanche :</span> Fermé</li>
              </ul>
            </Card>
            <Card className="p-6 bg-tunisian-red/5 flex flex-col items-start">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-tunisian-red" />
                <h3 className="text-lg font-bold text-tunisian-red">Questions Fréquentes</h3>
              </div>
              <p className="text-gray-700 text-sm mb-3">Consultez notre FAQ pour des réponses rapides aux questions courantes.</p>
              <Button variant="outline" size="sm" className="border-tunisian-red text-tunisian-red" type="button">Voir la FAQ</Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 