import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Navigation, LayoutDashboard, Brain, TestTubeIcon, Database } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar glass-panel">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="brand-icon">
            <Leaf size={28} color="#2ecc71" />
          </div>
          <span className="brand-text text-gradient">{t('brand')}</span>
        </Link>
        <div className="navbar-links">
          <Link to="/" className={`nav-link ${isActive('/')}`}>
            <LayoutDashboard size={20} />
            {t('dashboard')}
          </Link>
          <Link to="/crop-prediction" className={`nav-link ${isActive('/crop-prediction')}`}>
            <Brain size={20} />
            {t('cropPredictor')}
          </Link>
          <Link to="/disease-detection" className={`nav-link ${isActive('/disease-detection')}`}>
            <TestTubeIcon size={20} />
            {t('diseaseAI')}
          </Link>
          <Link to="/data-hub" className={`nav-link ${isActive('/data-hub')}`}>
            <Database size={20} />
            {t('dataHub')}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
