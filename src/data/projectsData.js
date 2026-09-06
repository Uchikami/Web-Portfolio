/**
 * =========================================================================
 * PROJECTS ARCHIVE DATA
 * =========================================================================
 * Add, edit, or remove portfolio projects here!
 *
 * Each project supports:
 * - id: unique number
 * - title: project name
 * - description: detailed project summary
 * - tags: array of technology/tool badges
 * - role: your specific role in the project
 * - type: project category (e.g. 'Cybersecurity', 'AI & Defense Tech', 'Web Development')
 * - image: thumbnail / hero preview image URL
 * - status (optional): 'IN_DEVELOPMENT', 'COMPLETED', etc.
 * - githubUrl (optional): repository URL (or null)
 * - liveUrl (optional): live demo or report URL (or null)
 * =========================================================================
 */

export const projectsData = [
  {
    id: 1,
    title: 'OffSec Penetration Testing Report',
    description:
      'Conducted comprehensive penetration testing on three Offensive Security (OffSec) vulnerable machines: BBSCute, SunsetNoontide, and Blogger. The project involved deep enumeration, vulnerability assessment, exploitation, and privilege escalation. Documented the entire cyber kill chain—from initial access to root compromise—along with actionable remediation recommendations in a professional penetration testing report.',
    tags: ['Nmap', 'Burp Suite', 'Metasploit', 'Nessus', 'Privilege Escalation', 'Report Writing'],
    role: 'Penetration Tester and Documentation',
    githubUrl: null,
    liveUrl: 'https://drive.google.com/file/d/11-z53PYcdhGCRaq2h0yzqlhFl6aD4_7o/view?usp=sharing',
    type: 'Cybersecurity',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'COSI Skywarden Acoustic Anti-drone',
    description:
      'An industrial collaboration project with the Royal Thai Army focused on developing an advanced AI-powered acoustic drone detection system. Engineered a deep learning pipeline utilizing ResNet-50 CNN combined with Bi-directional LSTM to accurately isolate and classify drone audio signatures from environmental noise. Currently developing spatial audio processing to implement omnidirectional sound reception and real-time trajectory prediction of incoming drones.',
    tags: ['Python', 'ResNet-50', 'Bi-directional LSTM', 'Deep Learning', 'Audio Processing'],
    role: 'Project Developer and Researcher',
    status: 'IN_DEVELOPMENT',
    githubUrl: null,
    liveUrl: null,
    type: 'AI & Defense Tech',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Volunteer Hub',
    description:
      'A comprehensive volunteering web application developed as a 2nd-year final project. The platform facilitates event management, participant tracking, and precise location mapping. It incorporates gamification elements, including activity competitions, leaderboards, and a point-based reward redemption system to encourage user engagement.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Leaflet', 'Lucide React'],
    role: 'Developer',
    githubUrl: null,
    liveUrl: 'https://volunteer-hub-eight.vercel.app/',
    type: 'Web Development',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800&auto=format&fit=crop',
  },
];

export default projectsData;
