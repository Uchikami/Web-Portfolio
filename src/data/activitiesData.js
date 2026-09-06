/**
 * =========================================================================
 * ACTIVITIES & CTF COMPETITION LOGS
 * =========================================================================
 * Easily add, edit, or remove activity entries here!
 *
 * Each activity object supports:
 * - id: unique number
 * - type: 'EVENT' | 'AWARD' | 'COMPETITION' | 'CERTIFICATION' | 'TRAINING'
 * - title: activity title
 * - date: year or date string (used for sorting)
 * - status: 'COMPLETED' | 'ACHIEVED' | 'ACQUIRED' | etc.
 * - description: summary of the activity/achievement
 * - image: path to certificate or event photo (e.g. '/certs/...', '/activities/...')
 * - verifyLink (optional): URL to verify credential or certificate
 * =========================================================================
 */

export const activitiesData = [
  {
    id: 0,
    type: 'EVENT',
    title: 'Cyber Apocalypse CTF 2026: The Salt Crown',
    date: '2026',
    status: 'COMPLETED',
    description:
      'Participated in the Cyber Apocalypse CTF 2026: The Salt Crown, a globally recognized cybersecurity competition. Engaged in intensive challenges involving Cryptography, Reverse Engineering, and Forensics, applying advanced problem-solving skills to overcome complex constraint systems and secure critical flags.',
    image: '/certs/Certificate-Akkaradej.jpg',
  },
  {
    id: 1,
    type: 'AWARD',
    title: 'IT Empowering Day Award',
    date: '2026',
    status: 'ACHIEVED',
    description:
      'Received an award at the university\'s IT Empowering Day for the "COSI: Skywarden Acoustic Anti-Drone" project. Successfully presented the deep learning-based acoustic detection model to academic panels and industry professionals, demonstrating its real-world application in defense technology.',
    image: '/activities/IMG_3373.jpg',
  },
  {
    id: 2,
    type: 'COMPETITION',
    title: 'BU Mini CTF',
    date: '2026',
    status: 'COMPLETED',
    description:
      'Participated in the BU Mini CTF competition organized by the faculty. Engaged in solving practical cybersecurity challenges, applying analytical thinking to tackle various categories such as web exploitation, cryptography, and reverse engineering. This hands-on experience sparked a deep interest and served as the starting point for my journey into the cybersecurity field.',
    image: '/activities/bu_mini_ctf.jpg',
  },
  {
    id: 3,
    type: 'CERTIFICATION',
    title: 'Pre Security Certificate',
    date: '2026',
    status: 'ACQUIRED',
    description:
      'Successfully completed the TryHackMe Pre Security learning path, gaining foundational knowledge in cybersecurity, networking, and web mechanics.',
    image: '/certs/Pre Security Certificate.png',
    verifyLink: 'https://tryhackme.com/certificate/THM-FC1YEUACMM',
  },
  {
    id: 4,
    type: 'CERTIFICATION',
    title: 'Cyber Security 101',
    date: '2026',
    status: 'ACQUIRED',
    description:
      'Completed the Cyber Security 101 certification, mastering core security concepts and threat landscape fundamentals.',
    image: '/certs/Cyber Security 101 Certificate.png',
    verifyLink: 'https://tryhackme.com/certificate/THM-KBAFHETJ7S',
  },
  {
    id: 5,
    type: 'CERTIFICATION',
    title: 'Linux 100 Fundamentals',
    date: '2025',
    status: 'ACQUIRED',
    description:
      'Achieved proficiency in Linux operating system operations, including command-line navigation, file permissions, and system administration.',
    image: '/certs/Linux 100 Fundamentals.jpg',
  },
  {
    id: 6,
    type: 'COMPETITION',
    title: 'Thailand Cyber Top Talent 2023',
    date: '2023',
    status: 'COMPLETED',
    description:
      'Competed against top cybersecurity talents across Thailand in a rigorous national CTF competition, solving complex security challenges.',
    image: '/certs/Thailand Cyber Top Talent 2023.jpg',
  },
  {
    id: 7,
    type: 'COMPETITION',
    title: 'Thailand Cyber Top Talent 2025',
    date: '2025',
    status: 'COMPLETED',
    description:
      'Returned to compete in the national-level Thailand Cyber Top Talent CTF, applying advanced offensive and defensive techniques under pressure.',
    image: '/certs/Thailand Cyber Top Talent 2025.jpg',
  },
  {
    id: 8,
    type: 'TRAINING',
    title: 'Cyber Security Forensics',
    date: '2026',
    status: 'COMPLETED',
    description:
      'Participated in an intensive digital forensics workshop, learning how to analyze cyber incidents, acquire evidence, and trace malicious activities.',
    image: '/certs/cyber-security-forensics.jpg',
  },
];

export default activitiesData;
