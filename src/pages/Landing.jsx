import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sprout, ShieldCheck, Cpu, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

import './Landing.css';

const Landing = () => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <div className="landing-container animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button onClick={toggleLanguage} className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px' }}>
          <Globe size={18} />
          {language === 'en' ? 'मराठी' : 'English'}
        </button>
      </div>
      <div className="hero-section glass-panel">
        <div className="hero-content">
          <h1 className="hero-title stagger-1">
            {t('heroTitle')} <span className="text-gradient">{t('heroTitleHighlight')}</span>
          </h1>
          <p className="hero-subtitle stagger-2">
            {t('heroSubtitle')}
          </p>
          <div className="hero-actions stagger-3">
            <Link to="/crop-prediction" className="btn-primary">
              {t('getStarted')} <ArrowRight size={18} />
            </Link>
            <Link to="/disease-detection" className="btn-outline">
              {t('exploreTools')}
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-circle">
             <img src="/agro_hero.png" alt="Smart Farming Interface" className="hero-image" />
          </div>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card glass-panel stagger-1">
          <div className="feature-icon"><Sprout color="#2ecc71" size={32} /></div>
          <h3>{t('feature1Title')}</h3>
          <p>{t('feature1Desc')}</p>
        </div>
        <div className="feature-card glass-panel stagger-2">
          <div className="feature-icon"><ShieldCheck color="#06b6d4" size={32} /></div>
          <h3>{t('feature2Title')}</h3>
          <p>{t('feature2Desc')}</p>
        </div>
        <div className="feature-card glass-panel stagger-3">
          <div className="feature-icon"><Cpu color="#8b5cf6" size={32} /></div>
          <h3>{t('feature3Title')}</h3>
          <p>{t('feature3Desc')}</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
