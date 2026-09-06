/**
 * =========================================================================
 * SKILLS CONFIGURATION DATA
 * =========================================================================
 * You can easily add, remove, rename, or reorder categories and skills here!
 *
 * HOW TO ADD OR EDIT SKILLS:
 * 1. Simple skill:
 *    'Python'
 *
 * 2. Skill with level/certificate (using ' — ' or ' - '):
 *    'English — B1 (Speexx Certified)'
 *    'Thai — Native'
 *
 * 3. Or using an object:
 *    { name: 'Python', level: 'Intermediate' }
 *
 * Categories and items automatically adjust in both Light Mode and Hacker Mode.
 * =========================================================================
 */

export const skillsData = [
  {
    category: 'Programming',
    items: [
      'Python',
      'SQL',
    ],
  },
  {
    category: 'Security Tools',
    items: [
      'Kali Linux',
      'Burp Suite',
      'Nmap',
      'NetExec',
      'BloodHound',
      'Impacket',
      'Ligolo-ng',
    ],
  },
  {
    category: 'Offensive Security',
    items: [
      'Active Directory',
      'Web Application Testing',
    ],
  },
  {
    category: 'Soft Skills',
    items: [
      'Problem Solving',
      'Critical Thinking',
      'Communication',
      'Teamwork',
      'Adaptability',
    ],
  },
  {
    category: 'Languages',
    items: [
      'English — B1 (Speexx Certified)',
      'Thai — Native',
    ],
  },
];

/**
 * Normalizes skills list into uniform objects: { name, level, globalIndex }
 * This allows simple string lists, string with " — Level", or objects.
 */
export const normalizeSkills = (categories = skillsData) => {
  let globalIndex = 0;
  const processedData = categories.map((group) => {
    const items = (group.items || []).map((item) => {
      let name = '';
      let level = undefined;

      if (typeof item === 'string') {
        name = item.trim();
      } else if (item && typeof item === 'object') {
        name = (item.name || '').trim();
        level = item.level ? item.level.trim() : undefined;
      }

      // Auto-separate name and level if formatted with " — " or " - "
      if (!level && name) {
        if (name.includes(' — ')) {
          const parts = name.split(' — ');
          name = parts[0].trim();
          level = parts.slice(1).join(' — ').trim();
        } else if (name.includes(' - ')) {
          const parts = name.split(' - ');
          name = parts[0].trim();
          level = parts.slice(1).join(' - ').trim();
        }
      }

      return {
        name,
        level,
        globalIndex: globalIndex++,
      };
    });

    return {
      ...group,
      items,
    };
  });

  return {
    processedData,
    totalSkills: globalIndex,
  };
};

export default skillsData;
