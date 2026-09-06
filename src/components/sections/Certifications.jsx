import { useState, useEffect, useRef } from 'react';
import { certificationsData as certifications } from '../../data/certificationsData';
import './Certifications.css';

const ScrambleText = ({ targetText, isHovered, delay = 0 }) => {
  const [text, setText] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

  useEffect(() => {
    if (!isHovered) {
      setText('');
      return;
    }

    let iteration = 0;
    let interval = null;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setText(targetText
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return targetText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
        );

        if (iteration >= targetText.length) {
          clearInterval(interval);
        }

        iteration += 1 / 2;
      }, 30);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [isHovered, targetText, delay]);

  return <span>{text || ' '}</span>;
};

const CertCard = ({ cert, isDark }) => {
  const [isHovered, setIsHovered] = useState(false);
  const audioHoverRef = useRef(null);
  const audioLoopRef = useRef(null);
  const stopLoopTimer = useRef(null);

  useEffect(() => {
    const hoverAudio = new Audio('/assets/sound/cert_hover.mp3');
    hoverAudio.volume = 0.4;
    audioHoverRef.current = hoverAudio;

    const loopAudio = new Audio('/assets/sound/cert_loop.mp3');
    loopAudio.volume = 0.3; // Slightly quieter for background text effect
    audioLoopRef.current = loopAudio;

    return () => {
      hoverAudio.pause();
      loopAudio.pause();
      clearTimeout(stopLoopTimer.current);
    };
  }, []);

  return (
    <a
      href={cert.link || cert.image}
      target="_blank"
      rel="noopener noreferrer"
      className="cert-cyber-frame"
      onClick={() => {
        if (isDark) {
          const clickAudio = new Audio('/assets/sound/cert_click.mp3');
          clickAudio.volume = 0.6;
          clickAudio.play().catch(err => console.log(err));
        }
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        if (isDark) {
          if (audioHoverRef.current) {
            audioHoverRef.current.currentTime = 0;
            audioHoverRef.current.play().catch(e => console.log(e));
          }
          if (audioLoopRef.current) {
            // Play cert_loop from a random position
            let duration = audioLoopRef.current.duration;
            if (isNaN(duration) || duration < 3) duration = 15; // Fallback if not loaded
            const maxStart = Math.max(0, duration - 2.5);
            audioLoopRef.current.currentTime = Math.random() * maxStart;
            audioLoopRef.current.play().catch(e => console.log(e));

            // Stop the loop when text scramble animation finishes (~1950ms)
            clearTimeout(stopLoopTimer.current);
            stopLoopTimer.current = setTimeout(() => {
              if (audioLoopRef.current) {
                audioLoopRef.current.pause();
              }
            }, 1950);
          }
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (audioHoverRef.current) {
          audioHoverRef.current.pause();
          audioHoverRef.current.currentTime = 0;
        }
        if (audioLoopRef.current) {
          audioLoopRef.current.pause();
        }
        clearTimeout(stopLoopTimer.current);
      }}
    >
      <div className="cyber-frame-inner">
        {/* Glowing Corner Accents */}
        <div className="cyber-corner top-left"></div>
        <div className="cyber-corner bottom-right"></div>

        <div className="cyber-image-container">
          <img src={cert.image} alt={cert.name} className="cyber-image" />
          {isDark && (
            <div className="cyber-overlay">
              <div className="light-glow"></div>
              <div className="light-sweep"></div>

              <div className="fetch-sequence">
                <ScrambleText targetText="> DECRYPTING_FILE" isHovered={isHovered} delay={0} />
                <ScrambleText targetText="> BYPASSING_SEC_PROTOCOLS" isHovered={isHovered} delay={400} />
                <ScrambleText targetText="> PAYLOAD_EXTRACTED" isHovered={isHovered} delay={800} />
                {isHovered && <span className="blink-text" style={{ animationDelay: '1.2s' }}>&gt; [ CLICK_TO_EXECUTE ]</span>}
              </div>
            </div>
          )}
        </div>

        <div className="cyber-data">
          <h3 className="cyber-title">{cert.name}</h3>
          <div className="cyber-meta">
            <span className="cyber-issuer">{cert.issuer}</span>
            <span className="cyber-date">{cert.date}</span>
          </div>
          {cert.link && (
            <div className="cyber-verify-btn">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              Verify Credential
            </div>
          )}
        </div>
      </div>
    </a>
  );
};

const Certifications = ({ isDark = true }) => {
  return (
    <section id="certifications" className="certifications-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Clearance Levels</span>
          <h2 className="section-title">Credentials</h2>
          <div className="section-divider" />
        </div>

        <div className="certs-grid">
          {certifications.map((cert) => (
            <CertCard key={cert.id} cert={cert} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
