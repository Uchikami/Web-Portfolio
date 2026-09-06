import { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ExternalLink, X, Unlock, ShieldAlert, Folder, FileCode2, Terminal } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { playAudio, stopAudio } from '../../utils/audioManager';
import { projectsData as projects } from '../../data/projectsData';
import './Projects.css';

const Projects = ({ isDark = true }) => {
  const [isBreached, setIsBreached] = useState(false);
  const effectivelyBreached = !isDark || isBreached;
  const [isBreaching, setIsBreaching] = useState(false);
  const [breachProgress, setBreachProgress] = useState(0);
  const [breachLogs, setBreachLogs] = useState([]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [isClosingPanel, setIsClosingPanel] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Group projects by type (Memoized to prevent unnecessary recalculations on re-renders)
  const groupedProjects = useMemo(() => {
    return projects.reduce((acc, proj) => {
      if (!acc[proj.type]) acc[proj.type] = [];
      acc[proj.type].push(proj);
      return acc;
    }, {});
  }, []);

  // Handle body scroll lock on mobile when modal is open
  useEffect(() => {
    if (selectedProject && window.innerWidth <= 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProject]);

  const breachAudioRef = useRef(null);
  const breachIntervalRef = useRef(null);

  // Cleanup breach audio and interval on unmount
  useEffect(() => {
    return () => {
      if (breachIntervalRef.current) clearInterval(breachIntervalRef.current);
      if (breachAudioRef.current) stopAudio(breachAudioRef.current);
    };
  }, []);

  const handleBreach = () => {
    setIsBreaching(true);
    
    if (isDark) {
      breachAudioRef.current = playAudio('/assets/sound/breaching.mp3', 0.5);
    }

    const logs = [
      "> INITIATING BRUTE FORCE...",
      "> BYPASSING FIREWALL...",
      "> DECRYPTING PAYLOADS...",
      "> EXTRACTING NODE DATA...",
      "> ACCESS GRANTED."
    ];
    let logIndex = 0;
    let currentProgress = 0;

    breachIntervalRef.current = setInterval(() => {
      currentProgress += (50 / 2500) * 100; // Simulate 2.5s duration since Web Audio doesn't expose currentTime easily
      
      if (currentProgress >= 100) currentProgress = 100;

      setBreachProgress(currentProgress);

      if (currentProgress > (logIndex + 1) * 18 && logIndex < logs.length) {
        setBreachLogs(prev => [...prev, logs[logIndex]]);
        logIndex++;
      }

      if (currentProgress >= 100) {
        clearInterval(breachIntervalRef.current);
        breachIntervalRef.current = null;
        if (breachAudioRef.current) stopAudio(breachAudioRef.current);
        breachAudioRef.current = null;

        setBreachProgress(100);
        setTimeout(() => {
          if (isDark) playAudio('/assets/sound/breaching_done.mp3', 0.6);
          setIsBreaching(false);
          setIsBreached(true);
        }, 100);
      }
    }, 50);
  };

  const handleClosePanel = () => {
    if (isDark) playAudio('/assets/sound/windows_close.mp3', 0.5);

    setIsClosingPanel(true);
    setTimeout(() => {
      setSelectedProject(null);
      setIsClosingPanel(false);
    }, 250);
  };

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Work</span>
          <h2 className="section-title">Projects</h2>
          <div className="section-divider" />
        </div>

        {!isDark ? (
          <div className="projects-light-grid">
            {projects.map((proj) => (
              <div key={proj.id} className="project-light-card">
                <img src={proj.image} alt={proj.title} className="light-card-image" loading="lazy" />
                <div className="light-card-content">
                  <div>
                    <div className="light-card-header">
                      <span className="light-card-type">{proj.type}</span>
                      {proj.status && <span className="light-card-status">{proj.status}</span>}
                    </div>
                    <h3 className="light-card-title">{proj.title}</h3>
                  </div>
                  
                  <p className="light-card-desc">{proj.description}</p>
                  
                  <div className="light-card-role">Role: {proj.role}</div>
                  
                  <div className="light-card-tech">
                    <span className="light-card-subtitle">Tech Stack:</span>
                    <div className="light-card-tags">
                      {proj.tags.map((tag, i) => (
                        <span key={i} className="light-card-tag">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="light-card-actions">
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="light-action-btn">
                        <FaGithub size={16} /> Source
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="light-action-btn">
                        <ExternalLink size={16} /> View Work
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="projects-tree-container">
            {!effectivelyBreached ? (
            <div 
              className={`encrypted-archive card ${isBreaching ? 'breaching' : ''}`} 
              data-title="root@chanwit:~# ./crack_archive" 
              data-light-title="root@chanwit:~# ./crack_archive"
              onMouseEnter={() => {
                if (isDark) playAudio('/assets/sound/breach_hover_on.mp3', 0.5);
              }}
              onMouseLeave={() => {
                if (isDark) playAudio('/assets/sound/breach_hover_out.mp3', 0.5);
              }}
            >
              <div className="archive-inner">
                <ShieldAlert size={64} className="archive-icon" />
                <h3 className="archive-title">[ RESTRICTED_ARCHIVE.tar.gz ]</h3>
                <p className="archive-status">STATUS: ENCRYPTED (AES-256)</p>

                {!isBreaching ? (
                  <button className="breach-btn" onClick={handleBreach}>
                    <Unlock size={18} /> INITIATE BREACH
                  </button>
                ) : (
                  <div className="breach-progress-container">
                    <div className="breach-bar-bg">
                      <div className="breach-bar-fill" style={{ width: `${breachProgress}%` }}></div>
                    </div>
                    <div className="breach-terminal">
                      {breachLogs.map((log, idx) => (
                        <div key={idx} className="log-line">{log}</div>
                      ))}
                      <span className="cursor">_</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="directory-view card" data-title="root@chanwit:~# tree ./projects" data-light-title="root@chanwit:~# tree ./projects">
              <div className="tree-container">
                <div className="tree-root">
                  <Terminal size={18} className="tree-icon root-icon" />
                  <span>/root/projects/archive</span>
                </div>

                {Object.entries(groupedProjects).map(([type, projs], groupIndex, groupArray) => {
                  const isLastGroup = groupIndex === groupArray.length - 1;
                  const groupPrefix = isLastGroup ? '└── ' : '├── ';
                  const childIndent = isLastGroup ? '    ' : '│   ';

                  return (
                    <div key={type} className="tree-group">
                      <div className="tree-node folder-node">
                        <span className="tree-line">{groupPrefix}</span>
                        <Folder size={16} className="tree-icon folder-icon" />
                        <span className="folder-name">{type}/</span>
                      </div>

                      <div className="tree-children">
                        {projs.map((proj, projIndex) => {
                          const isLastProj = projIndex === projs.length - 1;
                          const projPrefix = isLastProj ? '└── ' : '├── ';
                          const isSelected = selectedProject?.id === proj.id;

                          return (
                            <div 
                              key={proj.id} 
                              className={`tree-node file-node ${isSelected ? 'selected' : ''}`}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  if (isDark) playAudio('/assets/sound/windows_pop.mp3', 0.4);
                                  setIsClosingPanel(false);
                                  setSelectedProject(proj);
                                }
                              }}
                              onClick={() => {
                                if (isDark) playAudio('/assets/sound/windows_pop.mp3', 0.4);
                                setIsClosingPanel(false);
                                setSelectedProject(proj);
                              }}
                            >
                              <div className="file-node-main">
                                <span className="tree-line">{childIndent}{projPrefix}</span>
                                <FileCode2 size={16} className="tree-icon file-icon" />
                                <span className="file-name">{proj.title.replace(/\s+/g, '_')}.exe</span>
                              </div>
                              {isSelected && <span className="file-status">[ ACTIVE ]</span>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* SIDE PANEL (Desktop: inline, Mobile: portal) */}
              {!isMobile && selectedProject && (
                <div className={`project-side-panel card ${isClosingPanel ? 'closing' : ''}`} key={selectedProject.id}>
                  <div className="panel-header">
                    <span className="panel-header-title">root@chanwit:~# cat {selectedProject.title.replace(/\s+/g, '_')}.info</span>
                    <button className="close-panel-btn" onClick={handleClosePanel}>
                      <X size={18} />
                    </button>
                  </div>

                  <div className="panel-content">
                    <div className="panel-image-wrapper">
                      <div className="panel-image-container">
                        <img src={selectedProject.image} alt={selectedProject.title} className="panel-image" loading="lazy" />
                      </div>
                    </div>

                    <div className="panel-data">
                      <div className="data-row">
                        <span className="data-label">TYPE:</span>
                        <span className="data-value highlight">{selectedProject.type}</span>
                      </div>

                      {selectedProject.status && (
                        <div className="data-row">
                          <span className="data-label">STATUS:</span>
                          <span className="data-value highlight blink-text" style={{ color: '#fbbf24', textShadow: '0 0 5px rgba(251, 191, 36, 0.5)' }}>[{selectedProject.status}]</span>
                        </div>
                      )}

                      <div className="data-row">
                        <span className="data-label">TITLE:</span>
                        <h3 className="data-value title">{selectedProject.title}</h3>
                      </div>

                      <div className="data-row block">
                        <span className="data-label">DESC:</span>
                        <p className="data-value desc">{selectedProject.description}</p>
                      </div>

                      <div className="data-row block">
                        <span className="data-label">ROLE:</span>
                        <span className="data-value role-value">{selectedProject.role}</span>
                      </div>

                      <div className="data-row block">
                        <span className="data-label">TECH STACK:</span>
                        <ul className="panel-tech-list">
                          {selectedProject.tags.map((tag, i) => (
                            <li key={i} className="panel-tech-item">&gt; {tag}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="data-row block">
                        <span className="data-label">EXECUTE:</span>
                        <div className="panel-actions">
                          {selectedProject.githubUrl && (
                            <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="panel-action-btn" aria-label="GitHub">
                              <FaGithub size={16} /> <span>SOURCE</span>
                            </a>
                          )}
                          {selectedProject.liveUrl && (
                            <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="panel-action-btn" aria-label="Live Demo">
                              <ExternalLink size={16} /> <span>VIEW_DATA</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          </div>
        )}
      </div>
      
      {/* Mobile Portal for Side Panel */}
      {isDark && isMobile && selectedProject && createPortal(
        <div className="mobile-modal-overlay" onClick={handleClosePanel}>
          <div className={`project-side-panel card ${isClosingPanel ? 'closing' : ''}`} key={selectedProject.id} onClick={(e) => e.stopPropagation()}>
            <div className="panel-header">
              <span className="panel-header-title">root@chanwit:~# cat {selectedProject.title.replace(/\s+/g, '_')}.info</span>
              <button className="close-panel-btn" onClick={handleClosePanel}>
                <X size={18} />
              </button>
            </div>

            <div className="panel-content">
              <div className="panel-image-wrapper">
                <div className="panel-image-container">
                  <img src={selectedProject.image} alt={selectedProject.title} className="panel-image" loading="lazy" />
                </div>
              </div>

              <div className="panel-data">
                <div className="data-row">
                  <span className="data-label">TYPE:</span>
                  <span className="data-value highlight">{selectedProject.type}</span>
                </div>

                {selectedProject.status && (
                  <div className="data-row">
                    <span className="data-label">STATUS:</span>
                    <span className="data-value highlight blink-text" style={{ color: '#fbbf24', textShadow: '0 0 5px rgba(251, 191, 36, 0.5)' }}>[{selectedProject.status}]</span>
                  </div>
                )}

                <div className="data-row">
                  <span className="data-label">TITLE:</span>
                  <h3 className="data-value title">{selectedProject.title}</h3>
                </div>

                <div className="data-row block">
                  <span className="data-label">DESC:</span>
                  <p className="data-value desc">{selectedProject.description}</p>
                </div>

                <div className="data-row block">
                  <span className="data-label">ROLE:</span>
                  <span className="data-value role-value">{selectedProject.role}</span>
                </div>

                <div className="data-row block">
                  <span className="data-label">TECH STACK:</span>
                  <ul className="panel-tech-list">
                    {selectedProject.tags.map((tag, i) => (
                      <li key={i} className="panel-tech-item">&gt; {tag}</li>
                    ))}
                  </ul>
                </div>

                <div className="data-row block">
                  <span className="data-label">EXECUTE:</span>
                  <div className="panel-actions">
                    {selectedProject.githubUrl && (
                      <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="panel-action-btn" aria-label="GitHub">
                        <FaGithub size={16} /> <span>SOURCE</span>
                      </a>
                    )}
                    {selectedProject.liveUrl && (
                      <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="panel-action-btn" aria-label="Live Demo">
                        <ExternalLink size={16} /> <span>VIEW_DATA</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default Projects;
