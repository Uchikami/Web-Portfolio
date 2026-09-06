/**
 * =========================================================================
 * ABOUT CONFIGURATION DATA
 * =========================================================================
 * Easily edit your bio, origin story, objective, and dossier highlights here!
 * For education milestones (degrees, GPA, schools), see educationData.js!
 * =========================================================================
 */

import { educationData } from './educationData';

export const aboutData = {
  // Bio paragraphs (used in Hacker Mode)
  hackerBio: [
    'I am a 4th year Computer Science student with a strong passion and dedication for Cybersecurity. My journey began when I participated in a CTF (Capture The Flag) competition, which opened my eyes and greatly challenged my problem-solving skills.',
    'The thrill of solving those challenges inspired me to seriously study and develop my security skills, ranging from Web Exploitation to Network Analysis.',
    'My ultimate goal is to apply my knowledge in a real-world working environment and grow into a Cybersecurity expert in the future.',
  ],

  // Structured Dossier Sections (used in Light Mode)
  // You can use <span class="keyword-badge">Word</span> to highlight special skills!
  dossier: [
    {
      header: '[SUBJECT_PROFILE]',
      paragraphs: [
        'I am a 4th year Computer Science student with a strong passion and dedication for <span class="keyword-badge">Cybersecurity</span>.',
      ],
    },
    {
      header: '[ORIGIN_STORY]',
      paragraphs: [
        'My journey began when I participated in a <span class="keyword-badge">CTF (Capture The Flag)</span> competition, which opened my eyes and greatly challenged my problem-solving skills.',
        'The thrill of solving those challenges inspired me to seriously study and develop my security skills, ranging from <span class="keyword-badge">Web Exploitation</span> to <span class="keyword-badge">Network Analysis</span>.',
      ],
    },
    {
      header: '[OBJECTIVE]',
      paragraphs: [
        'My ultimate goal is to apply my knowledge in a real-world working environment and grow into a Cybersecurity expert in the future.',
      ],
    },
  ],

  // Education Timeline History (linked from educationData.js)
  education: educationData,

  // Background Terminal Logs (Hacker Mode decorative terminal stream)
  scrollingLogs: [
    '[SYS] Initialization sequence complete...',
    '[SYS] Scanning network interfaces...',
    '[OK] eth0: 192.168.1.100',
    '[WARN] Unauthorized access attempt detected on port 22...',
    '[INFO] Firewall rule updated...',
    '[SYS] Analyzing traffic patterns...',
    '[OK] Connection secure...',
    '[SYS] Loading profile: Chanwit Loeyos...',
    '[OK] Profile loaded successfully.',
  ],
};

export { educationData };
export default aboutData;
