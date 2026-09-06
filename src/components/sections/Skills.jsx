import { useState, useEffect, useRef, useMemo } from 'react';
import { skillsData, normalizeSkills } from '../../data/skillsData';
import './Skills.css';

const getBadgeClass = (level) => {
  if (!level) return '';
  const l = level.toLowerCase();
  if (l.includes('native') || l.includes('advanced')) return 'ts-advanced';
  if (l.includes('intermediate') || l.includes('b1')) return 'ts-intermediate';
  if (l.includes('beginner')) return 'ts-beginner';
  return 'ts-intermediate';
};

const SkillItem = ({ skill, isDark, isRevealed }) => {
  const [displayText, setDisplayText] = useState(skill.name);
  const [isHovered, setIsHovered] = useState(false);
  const [isSecured, setIsSecured] = useState(false);
  const [isBreaking, setIsBreaking] = useState(false);
  
  const audio1Ref = useRef(null);
  const audio2Ref = useRef(null);
  const activeAudioRef = useRef(1);
  const loopTimerRef = useRef(null);

  useEffect(() => {
    audio1Ref.current = new Audio('/assets/sound/skill_shake.mp3');
    audio2Ref.current = new Audio('/assets/sound/skill_shake.mp3');
    audio1Ref.current.volume = 0.4;
    audio2Ref.current.volume = 0.4;
    return () => {
      audio1Ref.current?.pause();
      audio2Ref.current?.pause();
      clearInterval(loopTimerRef.current);
    };
  }, []);

  const playSeamlessShake = () => {
    if (!audio1Ref.current || !audio2Ref.current) return;
    
    // Play first track
    audio1Ref.current.currentTime = 0.03;
    audio1Ref.current.play().catch(e => console.log(e));
    activeAudioRef.current = 1;

    // Alternate tracks every 1.9 seconds for a gapless loop
    loopTimerRef.current = setInterval(() => {
      if (activeAudioRef.current === 1) {
        audio2Ref.current.currentTime = 0.03;
        audio2Ref.current.play().catch(e => console.log(e));
        activeAudioRef.current = 2;
      } else {
        audio1Ref.current.currentTime = 0.03;
        audio1Ref.current.play().catch(e => console.log(e));
        activeAudioRef.current = 1;
      }
    }, 1900); // 1.9s loop time covers the 2s audio seamlessly
  };

  const stopSeamlessShake = () => {
    clearInterval(loopTimerRef.current);
    if (audio1Ref.current) {
      audio1Ref.current.pause();
      audio1Ref.current.currentTime = 0;
    }
    if (audio2Ref.current) {
      audio2Ref.current.pause();
      audio2Ref.current.currentTime = 0;
    }
  };

  useEffect(() => {
    if (!isRevealed) return;

    // Scramble if hovered, dark mode, not secured, and not currently breaking
    if (isHovered && isDark && !isSecured && !isBreaking) {
      let iterations = 0;
      const chars = '!@#$%^&*<>/?0123456789';
      const interval = setInterval(() => {
        setDisplayText(skill.name.split('').map((char) => char === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]).join(''));
        iterations++;
        if (iterations > 6) {
          clearInterval(interval);
          setDisplayText(skill.name);
        }
      }, 50);
      return () => {
        clearInterval(interval);
        setDisplayText(skill.name);
      };
    } else {
      setDisplayText(skill.name);
    }
  }, [isHovered, isDark, skill.name, isRevealed, isSecured, isBreaking]);

  if (!isRevealed) {
    return <div className="terminal-skill-line hidden-skill"></div>;
  }

  const handleFix = () => {
    if (isDark && isHovered && !isSecured && !isBreaking) {
      stopSeamlessShake();

      const audioPatch = new Audio('/assets/sound/patch_clicked.mp3');
      audioPatch.volume = 0.6;
      audioPatch.play().catch(e => console.log(e));

      setIsBreaking(true);
      setDisplayText(skill.name); // Stop scrambling text immediately

      // After animation finishes, mark as secured
      setTimeout(() => {
        setIsBreaking(false);
        setIsSecured(true);
      }, 600);
    }
  };

  return (
    <div
      className={`terminal-skill-line ${isSecured ? 'ts-secured' : ''} ${isBreaking ? 'ts-breaking' : ''}`}
      onMouseEnter={() => {
        setIsHovered(true);
        if (isDark && !isSecured && !isBreaking) {
          playSeamlessShake();
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        stopSeamlessShake();
      }}
      onClick={isDark ? handleFix : undefined}
      style={{ cursor: isHovered && isDark && !isSecured && !isBreaking ? 'crosshair' : 'default' }}
    >
      {isDark && <span className="ts-prefix">[+] Installing: </span>}
      <span className={`ts-name ${isHovered && isDark && !isSecured && !isBreaking ? 'ts-name-glitch' : ''}`}>
        {displayText}
      </span>
      <span className="ts-dots"></span>
      <span
        className={`ts-badge ${getBadgeClass(skill.level)} ${
          isHovered && isDark && !isSecured && !isBreaking ? 'ts-glitch' : ''
        }`}
      >
        {isBreaking ? (
          <span className="badge-secured-anim">[PATCHED]</span>
        ) : isHovered && isDark && !isSecured ? (
          '[VULNERABLE]'
        ) : isSecured && isDark ? (
          <span className="badge-secured-anim">[PATCHED]</span>
        ) : skill.level ? (
          skill.level
        ) : null}
      </span>
    </div>
  );
};

const Skills = ({ isDark }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const sectionRef = useRef(null);

  const { processedData, totalSkills } = useMemo(() => normalizeSkills(skillsData), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 } // trigger when 20% visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && isDark) {
      let count = 0;
      setRevealedCount(0);
      const interval = setInterval(() => {
        count++;
        setRevealedCount(count);
        
        if (count <= totalSkills) {
          const popAudio = new Audio('/assets/sound/skill_pop.mp3');
          popAudio.volume = 0.3;
          popAudio.playbackRate = 0.9 + Math.random() * 0.2;
          popAudio.play().catch(e => console.log(e));
        }

        if (count >= totalSkills) clearInterval(interval);
      }, 80); // Speed of packet install
      return () => clearInterval(interval);
    } else {
      setRevealedCount(totalSkills); // Show all instantly in light mode or when initially loading
    }
  }, [isVisible, isDark, totalSkills]);

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Expertise</span>
          <h2 className="section-title">Technical Skills</h2>
          <div className="section-divider" />
        </div>

        <div className="skills-grid">
          {processedData.map((group, i) => (
            <div
              key={i}
              className="skills-group card"
              data-title={isDark ? group.category : undefined}
            >
              {!isDark && (
                <h3 className="skills-group-title">
                  {group.category}
                </h3>
              )}
              <div className="skills-list terminal-list">
                {group.items.map((skill, j) => (
                  <SkillItem
                    key={j}
                    skill={skill}
                    isDark={isDark}
                    isRevealed={skill.globalIndex < revealedCount}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
