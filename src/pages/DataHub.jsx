import React from 'react';
import { Database, Sprout, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './DataHub.css';

const features = [
  {
    id: 'crop',
    title: 'Crop Recommendation',
    description: 'Enter your soil metrics (N, P, K, pH) and environmental conditions to get an AI-driven intelligent crop recommendation tailored to your specific parameters.',
    icon: Sprout,
    color: '#2ecc71',
    path: '/crop-prediction'
  },
  {
    id: 'fertilizer',
    title: 'Fertilizer Recommendation',
    description: 'Predict the ideal fertilizer to use given your soil nutrients and crop requirements. Generate precision nutrition guidance to improve your overall yield.',
    icon: Database,
    color: '#f59e0b',
    path: '/fertilizer-prediction'
  }
];

const DataHub = () => {
  return (
    <div className="data-hub-container animate-fade-in">
      <div className="data-hub-header">
        <h1 className="text-gradient">AI Predictors Hub</h1>
        <p>Directly access our intelligent machine learning recommendation systems for your smart farming needs.</p>
      </div>

      <div className="datasets-grid">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={feature.id} className={`dataset-card glass-panel stagger-${(index % 3) + 1}`}>
              <div className="card-icon" style={{ boxShadow: `0 0 20px ${feature.color}40` }}>
                <Icon size={32} color={feature.color} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className="card-actions">
                <Link to={feature.path} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Open Predictor <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DataHub;
