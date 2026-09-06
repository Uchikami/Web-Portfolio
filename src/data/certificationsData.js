/**
 * =========================================================================
 * CERTIFICATIONS & CREDENTIALS DATA
 * =========================================================================
 * Add, edit, or remove certificates and credentials here!
 *
 * Each certificate supports:
 * - id: unique number
 * - name: certification title
 * - issuer: certifying authority / platform (e.g. 'TRY HACK ME', 'COMPTIA', 'OFFSEC')
 * - date: year or completion date
 * - image: certificate image preview path
 * - link (optional): verification URL or PDF certificate link
 * =========================================================================
 */

export const certificationsData = [
  {
    id: 1,
    name: 'Cyber Security 101 (SEC1)',
    issuer: 'TRY HACK ME',
    date: '2026',
    image: '/certs/Cyber Security 101 (SEC1) Certificate.jpg',
    link: 'https://assets.tryhackme.com/certification-certificate/69974832a981bfe768a733a4.pdf',
  },
  {
    id: 2,
    name: 'Certified Red Team Analyst (CRTA)',
    issuer: 'Cyberwarfare Labs',
    date: '2026',
    image: "/certs/Certified_Red_Team_Analyst_(CRTA).png",
    link: 'https://labs.cyberwarfare.live/credential/achievement/6a8c064865159096bad13710',
  },
];

export default certificationsData;
