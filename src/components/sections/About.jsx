import { GraduationCap } from 'lucide-react';
import { aboutData } from '../../data/aboutData';
import { educationData } from '../../data/educationData';
import './About.css';

const About = ({ isDark }) => {
  const { hackerBio, dossier, scrollingLogs } = aboutData;
  const education = educationData;

  return (
    <section id="about" style={{ position: 'relative', overflow: 'hidden' }}>
      {isDark && (
        <div className="about-hacker-bg">
          <div className="circuit-nodes"></div>
          <div className="scrolling-logs">
            {/* Repeated twice to enable seamless infinite vertical scrolling */}
            {[...scrollingLogs, ...scrollingLogs].map((log, idx) => (
              <span key={idx}>
                {log}
                <br />
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header">
          <span className="section-label">Background</span>
          <h2 className="section-title">About Me</h2>
          <div className="section-divider" />
        </div>

        <div className="about-layout">
          {/* Bio paragraph */}
          {isDark ? (
            <div className="about-bio card">
              {hackerBio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          ) : (
            <div className="light-about-container">
              <div className="dossier-content about-bio card">
                {dossier.map((section, i) => (
                  <div key={i} className="dossier-section">
                    <h4 className="dossier-header">{section.header}</h4>
                    {section.paragraphs.map((para, j) => (
                      <p
                        key={j}
                        dangerouslySetInnerHTML={{ __html: `&gt; ${para}` }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          <div className="about-section">
            <div className="about-section-title">
              <GraduationCap size={18} />
              <h3>Education</h3>
            </div>
            <div className="timeline">
              {education.map((item, i) => (
                <div key={i} className="timeline-item card">
                  <div className="timeline-period">{item.period}</div>
                  <div className="timeline-body">
                    <h4 className="timeline-title">{item.degree}</h4>
                    <p className="timeline-sub">{item.school}</p>
                    {item.detail && <p className="timeline-detail">{item.detail}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
