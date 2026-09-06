import { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, Send, Terminal } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { contactData } from '../../data/contactData';
import './Contact.css';
import { playAudio } from '../../utils/audioManager';

const CyberInputOverlay = ({ value, isDark }) => {
  const [animations, setAnimations] = useState({});
  const prevValue = useRef(value);

  useEffect(() => {
    const prev = prevValue.current || '';
    const curr = value || '';
    
    if (curr.length > prev.length) {
      let diffIndex = -1;
      for (let i = 0; i < curr.length; i++) {
        if (curr[i] !== prev[i]) {
          diffIndex = i;
          break;
        }
      }
      
      if (diffIndex !== -1) {
        setAnimations(a => ({ ...a, [diffIndex]: true }));
        setTimeout(() => {
          setAnimations(a => {
            const next = { ...a };
            delete next[diffIndex];
            return next;
          });
        }, 250);
      }
    } else if (curr.length < prev.length) {
      setAnimations({});
    }
    prevValue.current = curr;
  }, [value]);

  if (!isDark || !value) return null;
  return (
    <div className="cyber-input-overlay" aria-hidden="true">
      {value.split('').map((char, index) => (
        <span key={index} className={animations[index] ? "pop-char" : ""}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

const Contact = ({ isDark }) => {
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [formData, setFormData] = useState({
    alias: '',
    address: '',
    payload: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Custom Validation
    let errors = {};
    if (!formData.alias.trim()) errors.alias = "ERROR: REQUIRED_FIELD";
    
    if (!formData.address.trim()) {
      errors.address = "ERROR: REQUIRED_FIELD";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.address)) {
      errors.address = "ERROR: INVALID_FORMAT";
    }
    
    if (!formData.payload.trim()) errors.payload = "ERROR: REQUIRED_FIELD";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      if (isDark) {
        playAudio('/assets/sound/error.mp3', 0.5);
      }
      return;
    }

    setIsEncrypting(true);
    
    if (isDark) {
      playAudio('/assets/sound/comm_btn.mp3', 0.5);
    }

    // Simulate encryption / transmit delay
    setTimeout(() => {
      setIsEncrypting(false);

      const subject = encodeURIComponent(`Secure Comms from: ${formData.alias}`);
      const body = encodeURIComponent(`SENDER ALIAS: ${formData.alias}\nRETURN ADDRESS: ${formData.address}\n\nPAYLOAD:\n${formData.payload}`);

      window.location.href = `mailto:${contactData.email}?subject=${subject}&body=${body}`;

      // Reset form
      setFormData({ alias: '', address: '', payload: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">System Comms</span>
          <h2 className="section-title">Secure Drop</h2>
          <div className="section-divider" />
        </div>

        <div className="contact-grid">
          {/* Left: Active Nodes */}
          <div className="contact-nodes-panel card" data-light-title="root@chanwit:~# ping server">
            <div className="panel-header">
              <Terminal size={18} />
              <span>ACTIVE_NODES.log</span>
            </div>
            <div className="panel-body">
              <p className="contact-intro">
                {contactData.intro.map((line, idx) => (
                  <span key={idx}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>

              <div className="nodes-list">
                <a href={`mailto:${contactData.email}`} className="node-item">
                  <div className="node-icon"><Mail size={20} /></div>
                  <div className="node-info">
                    <span className="node-id">NODE_01 // EMAIL</span>
                    <span className="node-val">{contactData.email}</span>
                  </div>
                </a>

                <div className="node-item non-link">
                  <div className="node-icon"><MapPin size={20} /></div>
                  <div className="node-info">
                    <span className="node-id">NODE_02 // LOCATION</span>
                    <span className="node-val">{contactData.location}</span>
                  </div>
                </div>

                <a href={contactData.github.url} target="_blank" rel="noopener noreferrer" className="node-item" onClick={() => {
                  if (isDark) playAudio('/assets/sound/comm_btn.mp3', 0.5);
                }}>
                  <div className="node-icon"><FaGithub size={20} /></div>
                  <div className="node-info">
                    <span className="node-id">NODE_03 // GITHUB</span>
                    <span className="node-val">{contactData.github.handle}</span>
                  </div>
                </a>

                <a href={contactData.linkedin.url} target="_blank" rel="noopener noreferrer" className="node-item" onClick={() => {
                  if (isDark) playAudio('/assets/sound/comm_btn.mp3', 0.5);
                }}>
                  <div className="node-icon"><FaLinkedin size={20} /></div>
                  <div className="node-info">
                    <span className="node-id">NODE_04 // LINKEDIN</span>
                    <span className="node-val">{contactData.linkedin.handle}</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Secure Transmission Form */}
          <div className="secure-form-panel card" data-light-title="root@chanwit:~# ./send_msg">
            <div className="panel-header">
              <Terminal size={18} />
              <span>TRANSMISSION_PROTOCOL.exe</span>
            </div>
            <div className="panel-body">
              <form onSubmit={handleSubmit} className="cyber-form" noValidate>

                <div className={`form-group ${formErrors.alias ? 'has-error' : ''}`}>
                  <label htmlFor="alias">&gt; TARGET_ALIAS:</label>
                  <div className="cyber-input-container">
                    <input
                      type="text"
                      id="alias"
                      name="alias"
                      required
                      autoComplete="off"
                      value={formData.alias}
                      onChange={handleChange}
                      placeholder="e.g. Neo"
                      className={isDark && formData.alias ? 'hide-text' : ''}
                    />
                    <CyberInputOverlay value={formData.alias} isDark={isDark} />
                  </div>
                  <div className="input-line"></div>
                  {formErrors.alias && <span className="cyber-error-text">&gt; {formErrors.alias}</span>}
                </div>

                <div className={`form-group ${formErrors.address ? 'has-error' : ''}`}>
                  <label htmlFor="address">&gt; ENTER_RETURN_ADDRESS:</label>
                  <div className="cyber-input-container">
                    <input
                      type="email"
                      id="address"
                      name="address"
                      required
                      autoComplete="off"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="e.g. neo@matrix.com"
                      className={isDark && formData.address ? 'hide-text' : ''}
                    />
                    <CyberInputOverlay value={formData.address} isDark={isDark} />
                  </div>
                  <div className="input-line"></div>
                  {formErrors.address && <span className="cyber-error-text">&gt; {formErrors.address}</span>}
                </div>

                <div className={`form-group ${formErrors.payload ? 'has-error' : ''}`}>
                  <label htmlFor="payload">&gt; INPUT_PAYLOAD:</label>
                  <div className="cyber-input-container">
                    <textarea
                      id="payload"
                      name="payload"
                      rows="5"
                      required
                      value={formData.payload}
                      onChange={handleChange}
                      placeholder="Enter your message..."
                      className={isDark && formData.payload ? 'hide-text' : ''}
                    ></textarea>
                    <CyberInputOverlay value={formData.payload} isDark={isDark} />
                  </div>
                  <div className="input-line"></div>
                  {formErrors.payload && <span className="cyber-error-text">&gt; {formErrors.payload}</span>}
                </div>

                <button
                  type="submit"
                  className={`cyber-submit-btn ${isEncrypting ? 'encrypting' : ''}`}
                  disabled={isEncrypting}
                >
                  {isEncrypting ? (
                    <span className="glitch-text" data-text="ENCRYPTING...">ENCRYPTING...</span>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>TRANSMIT_DATA</span>
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
