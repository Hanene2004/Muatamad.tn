import React from 'react';
import { Briefcase, BarChart2, Activity, Star, PieChart, Package, User, TrendingUp, MessageCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const menu = [
  { key: 'ventes', label: 'Ventes & Performance', icon: BarChart2, color: 'text-blue-500' },
  { key: 'trafic', label: 'Trafic & Comportement', icon: Activity, color: 'text-orange-500' },
  { key: 'satisfaction', label: 'Satisfaction client', icon: Star, color: 'text-yellow-500' },
  { key: 'marketing', label: 'Marketing & Publicité', icon: PieChart, color: 'text-pink-500' },
  { key: 'stock', label: 'Stock & Logistique', icon: Package, color: 'text-green-500' },
  { key: 'clients', label: 'Analyse clients', icon: User, color: 'text-cyan-500' },
  { key: 'finances', label: 'Finances', icon: TrendingUp, color: 'text-purple-500' },
  { key: 'avis', label: 'Avis & Commentaires', icon: MessageCircle, color: 'text-red-500' },
];

const Sidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  // Responsive sidebar: overlay on mobile, fixed on desktop
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="h-screen w-64 bg-white shadow-lg flex-col text-gray-900 fixed left-0 top-0 z-40 border-r border-gray-200">
        <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-100">
          <Briefcase className="w-8 h-8 text-blue-600" />
          <span className="text-2xl font-extrabold tracking-wide text-blue-700">Admin Soft UI Dashboard</span>
        </div>
        <nav className="flex-1 py-6 px-2 space-y-2">
          {menu.map(item => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-200 text-base group
                ${activeTab === item.key ? 'bg-blue-100 text-blue-700 shadow' : 'hover:bg-gray-100'}
              `}
            >
              <item.icon className={`w-6 h-6 ${item.color} group-hover:scale-110 transition-transform`} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="mt-auto px-6 py-4 text-xs text-gray-400">&copy; 2024 Admin Soft UI Dashboard</div>
      </aside>
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex lg:hidden"
          >
            <div className="w-64 h-full bg-softui-light shadow-softxl rounded-r-softxl flex flex-col text-softui-dark relative border-r border-softui-border">
              <button className="absolute top-4 right-4 text-softui-secondary hover:text-softui-primary" onClick={() => setSidebarOpen(false)}>
                <X className="w-7 h-7" />
              </button>
              <div className="flex items-center gap-3 px-6 py-6 border-b border-softui-border">
                <div className="bg-softui-primary/10 rounded-full p-2">
                  <Briefcase className="w-8 h-8 text-softui-primary" />
                </div>
                <span className="text-2xl font-extrabold tracking-wide text-softui-primary">Soft UI Dashboard</span>
              </div>
              <nav className="flex-1 py-6 px-2 space-y-2">
                {menu.map(item => (
                  <button
                    key={item.key}
                    onClick={() => { setActiveTab(item.key); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-soft font-semibold transition-all duration-200 text-lg group shadow-soft
                      ${activeTab === item.key ? 'bg-softui-primary text-white shadow-softxl' : 'hover:bg-softui-accent hover:scale-105'}
                    `}
                  >
                    <span className={`w-9 h-9 flex items-center justify-center rounded-full bg-softui-primary/10 group-hover:bg-softui-primary/20 transition-all ${activeTab === item.key ? 'bg-softui-primary/80' : ''}`}>
                      <item.icon className={`w-6 h-6 ${activeTab === item.key ? 'text-white' : 'text-softui-primary'} group-hover:scale-110 transition-transform`} />
                    </span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
              <div className="mt-auto px-6 py-4">
                <div className="bg-softui-accent rounded-soft p-4 flex flex-col items-center shadow-soft">
                  <div className="text-softui-primary font-bold mb-2">Need help?</div>
                  <div className="text-xs text-softui-secondary mb-2 text-center">Please check our docs</div>
                  <button className="bg-softui-primary text-white rounded-soft px-4 py-2 font-semibold shadow-soft hover:bg-softui-dark transition">DOCUMENTATION</button>
                </div>
              </div>
              <div className="px-6 py-4 text-xs text-softui-secondary opacity-80">&copy; 2024 Soft UI Dashboard</div>
            </div>
            {/* Overlay background */}
            <div className="flex-1 bg-black/40" onClick={() => setSidebarOpen(false)} />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar; 