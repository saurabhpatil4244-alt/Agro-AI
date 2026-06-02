import React, { useState } from 'react';
import { Target, Droplets, Thermometer, FlaskConical, Sprout } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './FertilizerPrediction.css';

const FertilizerPrediction = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorous: '',
    potassium: '',
    ph: '',
    temperature: '',
    humidity: '',
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/datasets/fertilizer_prediction.csv');
      if (!response.ok) throw new Error('Dataset not found');
      const csvText = await response.text();
      
      const rows = csvText.trim().split('\n').slice(1);
      
      let bestCrop = 'Unknown';
      let minDistance = Infinity;

      const userN = parseFloat(formData.nitrogen);
      const userP = parseFloat(formData.phosphorous);
      const userK = parseFloat(formData.potassium);
      const userPh = parseFloat(formData.ph);
      const userTemp = parseFloat(formData.temperature);
      const userHum = parseFloat(formData.humidity);

      rows.forEach(row => {
        const cols = row.split(',');
        if (cols.length === 7) {
          const [n, p, k, ph, temp, hum, label] = cols;
          
          // Euclidean distance weighting
          const distance = Math.pow(userN - parseFloat(n), 2) +
                           Math.pow(userP - parseFloat(p), 2) +
                           Math.pow(userK - parseFloat(k), 2) +
                           Math.pow(userPh - parseFloat(ph), 2) * 100 + // Weight pH differently since its scale is small
                           Math.pow(userTemp - parseFloat(temp), 2) +
                           Math.pow(userHum - parseFloat(hum), 2);
           
           if (distance < minDistance) {
             minDistance = distance;
             bestCrop = label.trim();
           }
        }
      });

      // Simple heuristic for confidence score based on distance
      const confidenceScore = Math.max(70, 99.8 - (minDistance / 500)).toFixed(1);

      setTimeout(() => {
        const cropKey = bestCrop.toLowerCase().replace(/\s+/g, '_');
        setPrediction({
          crop: t(cropKey) || (bestCrop.charAt(0).toUpperCase() + bestCrop.slice(1)),
          confidence: `${confidenceScore}%`,
          insights: language === 'mr' 
            ? `डेटा-आधारित ML वापरून: डेटासेट तुमच्या जमिनीच्या आकडेवारीशी जुळला. ${t(cropKey)} तुमच्या मातीसाठी सर्वोत्तम आहे.`
            : `Using Data-Driven ML: The dataset points matched your coordinates. ${bestCrop.charAt(0).toUpperCase() + bestCrop.slice(1)} is optimal for your soil profile.`
        });
        setLoading(false);
      }, 800); // UI delay for feel

    } catch (error) {
      console.error('Error computing crop prediction:', error);
      setTimeout(() => {
        setPrediction({
          crop: t('wheat_fallback'),
          confidence: 'N/A',
          insights: language === 'mr' ? 'डेटासेट लोड होऊ शकला नाही.' : 'Dataset could not be loaded. Please ensure dataset is downloaded to public/datasets folder.'
        });
        setLoading(false);
      }, 800);
    }
  };

  return (
    <div className="prediction-container animate-fade-in">
      <div className="header-text">
        <h1 className="text-gradient">{t('intelligentFertPredictor')}</h1>
        <p>{t('fertPredictorDesc')}</p>
      </div>

      <div className="prediction-content">
        <div className="form-card glass-panel stagger-1">
          <form onSubmit={handleSubmit} className="prediction-form">
            <div className="input-grid">
              <div className="form-group">
                <label className="form-label"><FlaskConical size={16} /> {t('nitrogen')}</label>
                <input type="number" name="nitrogen" placeholder="Ratio of N content" className="form-input" required onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label"><FlaskConical size={16} /> {t('phosphorous')}</label>
                <input type="number" name="phosphorous" placeholder="Ratio of P content" className="form-input" required onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label"><FlaskConical size={16} /> {t('potassium')}</label>
                <input type="number" name="potassium" placeholder="Ratio of K content" className="form-input" required onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label"><Target size={16} /> {t('phLevel')}</label>
                <input type="number" name="ph" step="0.1" placeholder="Soil pH value (0-14)" className="form-input" required onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label"><Thermometer size={16} /> {t('temperature')}</label>
                <input type="number" name="temperature" step="0.1" placeholder="Avg Temperature" className="form-input" required onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label"><Droplets size={16} /> {t('humidity')}</label>
                <input type="number" name="humidity" step="0.1" placeholder="Relative Humidity" className="form-input" required onChange={handleChange} />
              </div>
            </div>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? t('analyzing') : <>{t('predictFertilizer')} <Sprout size={18} /></>}
            </button>
          </form>
        </div>

        <div className="result-card glass-panel stagger-2">
          {prediction ? (
            <div className="result-content animate-fade-in">
              <div className="success-icon"><Sprout color="#2ecc71" size={48} /></div>
              <h3>{t('recommendedFertilizer')}</h3>
              <h2 className="text-gradient prediction-text">{prediction.crop}</h2>
              <div className="confidence-pill">{t('aiConfidence')}: {prediction.confidence}</div>
              <p className="insight-text">{prediction.insights}</p>
              <button className="btn-outline m-t-1" onClick={() => setPrediction(null)}>{t('newPrediction')}</button>
            </div>
          ) : (
            <div className="empty-state">
              <Target color="var(--text-muted)" size={48} />
              <h3>{t('awaitingInput')}</h3>
              <p>{t('awaitingInputDesc')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FertilizerPrediction;
