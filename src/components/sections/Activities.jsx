import { useEffect, useRef, useState, useCallback } from 'react';
import { Crosshair, ExternalLink, X } from 'lucide-react';
import { playAudio } from '../../utils/audioManager';
import { activitiesData as activities } from '../../data/activitiesData';
import './Activities.css';

const Activities = ({ isDark = true }) => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [selectedImage, setSelectedImage] = useState(null);
  const [isClosingModal, setIsClosingModal] = useState(false);
  const nodeRefs = useRef([]);

  const setRef = useCallback((el, index) => {
    nodeRefs.current[index] = el;
  }, []);

  const handleOpenImage = (img) => {
    setSelectedImage(img);
    setIsClosingModal(false);
  };

  const handleCloseImage = () => {
    setIsClosingModal(true);
    setTimeout(() => {
      setSelectedImage(null);
      setIsClosingModal(false);
    }, 280); // match css animation duration
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.getAttribute('data-id'));
            setVisibleItems(prev => {
              if (prev.has(id)) return prev;

              // Play fade-in sound with random pitch in dark mode
              if (isDark) {
                const randomPitch = 0.85 + Math.random() * 0.3;
                playAudio('/assets/sound/activis_fade-in.mp3', 0.5, null, false, randomPitch);
              }

              const newSet = new Set(prev);
              newSet.add(id);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = nodeRefs.current.filter(Boolean);
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
      observer.disconnect();
    };
  }, [isDark]);

  return (
    <section id="activities" className="activities-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Log History</span>
          <h2 className="section-title">Activities</h2>
          <div className="section-divider" />
        </div>

        <div className="timeline-container">
          <div className="timeline-traceroute"></div>
          
          {[...activities].sort((a, b) => parseInt(b.date) - parseInt(a.date)).map((act, index) => {
            const isVisible = visibleItems.has(act.id);
            const side = index % 2 === 0 ? 'left' : 'right';

            return (
              <div 
                key={act.id} 
                ref={(el) => setRef(el, index)}
                data-id={act.id}
                className={`timeline-node ${side} ${isVisible ? 'visible' : ''}`}
              >
                {/* Center marker */}
                <div className="timeline-marker">
                  <div className="marker-core">
                    <Crosshair size={16} />
                  </div>
                </div>

                {/* Content Block */}
                <div className="timeline-content card">
                  <div className="log-header">
                    <span className="log-id">OP_ID: {(index + 1).toString().padStart(2, '0')}</span>
                    <span className="log-date">[{act.date}]</span>
                  </div>
                  
                  <div className="log-image-wrapper" onClick={() => handleOpenImage(act.image)}>
                    <img src={act.image} alt={act.title} className="log-image" loading="lazy" />
                    <div className="scanline-overlay"></div>
                  </div>

                  <div className="log-data">
                    <div className="data-field">
                      <span className="field-label">TYPE:</span>
                      <span className="field-value highlight">{act.type}</span>
                    </div>
                    
                    <div className="data-field">
                      <span className="field-label">TARGET:</span>
                      <h4 className="field-value title">{act.title}</h4>
                    </div>

                    <div className="data-field block">
                      <span className="field-label">REPORT:</span>
                      <p className="field-value desc">{act.description}</p>
                    </div>

                    <div className="data-field">
                      <span className="field-label">STATUS:</span>
                      <span className="field-value status">{act.status}</span>
                    </div>

                    {act.verifyLink && (
                      <div className="data-field" style={{ marginTop: '10px' }}>
                        <a href={act.verifyLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '4px 12px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                          <ExternalLink size={14} /> VERIFY RECORD
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedImage && (
        <div className={`image-modal-overlay ${isClosingModal ? 'closing' : ''}`} onClick={handleCloseImage}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="image-modal-close" onClick={handleCloseImage}>
              <X size={24} />
            </button>
            <img src={selectedImage} alt="Full Size Preview" className="image-modal-img" />
          </div>
        </div>
      )}
    </section>
  );
};

export default Activities;
