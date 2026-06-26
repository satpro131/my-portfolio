// Portfolio content data — all text/content in one place for easy editing later
export const siteData = {
  name: 'PRAKASH',
  nameOutline: 'SATYA',
  title: 'Satya Prakash — Senior & Lead Frontend Engineer',
  description: 'Satya Prakash — Senior / Lead Frontend Engineer with 8+ years of experience. Founder of Xamine.ai, ex-MPL, ex-Samsung Knox.',
  navLeftText: 'SATPRO',
  role: 'Senior / Lead Frontend Engineer',
  
  sideLeft: {
    text: 'PROJECTS',
    number: '01',
  },
  sideRight: {
    text: 'EXPERIENCE',
    number: '02',
  },

  statusBar: {
    left: 'SYS.OK',
    center: '© 2026 SATYA PRAKASH',
    right: 'CH-01',
  },

  projects: [
    {
      id: 1,
      title: 'Xamine.ai Learning Platform',
      headline: 'AI that adapts to every learner\'s cognitive pace.',
      eyebrow: 'EDTECH • COGNITIVE AI',
      accentColor: '#00d2ff',
      description: 'Personalised AI Learning Platform for JEE/NEET preparation. Features real-time behavior analytics tracking focus, time-per-question, and exam-day metrics.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=500&fit=crop',
      tags: ['Next.js', 'React', 'TypeScript', 'AI Core'],
      highlights: [
        { label: 'Real-time analytics', value: 'Focus Tracking' },
        { label: 'Response latency', value: '< 100ms' },
        { label: 'Curriculum scale', value: 'JEE / NEET' }
      ]
    },
    {
      id: 2,
      title: 'Kaksha Digital Classroom',
      headline: 'The digital blackboard, supercharged by AI.',
      eyebrow: 'VIRTUAL CLASSROOM • REAL-TIME',
      accentColor: '#00ff87',
      description: 'AI-Powered Personalised Digital Classroom featuring interactive whiteboard video lectures, real-time interruptions/Q&A flow, and assignment playgrounds.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
      tags: ['React', 'WebSocket', 'Tailwind', 'AI Video'],
      highlights: [
        { label: 'Whiteboard engine', value: 'Interactive' },
        { label: 'Engagement flow', value: 'Instant Q&A' },
        { label: 'Synced data channel', value: 'WebSocket' }
      ]
    },
    {
      id: 3,
      title: 'MPL Desktop Poker',
      headline: 'Ultra-low latency desktop gaming at scale.',
      eyebrow: 'DESKTOP ENGINE • ELECTRON',
      accentColor: '#ff007f',
      description: 'Multi-window Desktop Poker Electron application supporting 20+ tables concurrently. Built with a unified RTK WebSocket data layer and GPU optimization.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
      tags: ['Electron', 'Next.js', 'Redux Toolkit', 'WebSockets'],
      highlights: [
        { label: 'Concurrent gameplay', value: '20+ Tables' },
        { label: 'GPU optimization', value: '40% Less CPU' },
        { label: 'State updates', value: '< 100ms Sync' }
      ]
    },
    {
      id: 4,
      title: 'Bountyverse Game SDK',
      headline: 'Seamless tournament rewards for any game.',
      eyebrow: 'JS SDK • GAMING INFRASTRUCTURE',
      accentColor: '#ffaa00',
      description: 'High-performance JavaScript SDK and Admin Dashboard enabling rewards, leaderboards, and anti-cheat scoring across 15+ game integrations.',
      image: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=800&h=500&fit=crop',
      tags: ['JS SDK', 'React', 'Material UI', 'Storybook'],
      highlights: [
        { label: 'Live integrations', value: '15+ Games' },
        { label: 'Partner onboarding', value: '4 Days' },
        { label: 'Scoring engine', value: 'Anti-Cheat' }
      ]
    },
    {
      id: 5,
      title: 'Samsung Knox Security',
      headline: 'Defense-grade Sensitive Data Protection & Dual DAR.',
      eyebrow: 'SYSTEM SECURITY • OS KERNEL',
      accentColor: '#3d5afe',
      description: 'Led implementation of Sensitive Data Protection (SDP) and Dual DAR encryption drivers (fscrypt/Keymaster) shipped globally on Samsung flagship devices.',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=500&fit=crop',
      tags: ['C/C++', 'fscrypt', 'Keymaster', 'Android Systems', 'Security Core'],
      highlights: [
        { label: 'SDP Team Size', value: '4 Engineers' },
        { label: 'Deployments', value: 'Govt Grade' },
        { label: 'Security Level', value: 'Dual DAR' }
      ]
    }
  ],

  experience: [
    {
      id: 1,
      role: 'Founder & Lead Frontend Engineer',
      company: 'Xamine.ai & Kaksha.xamine.ai',
      location: 'Bengaluru, India',
      period: 'Oct 2025 – Present',
      description: 'Architected and launched two live AI-powered EdTech platforms from scratch. Implemented exam analytics tracking student stress/focus indicators, diagnostic dashboards, adaptive practice engines, and dynamic whiteboard-style classrooms.',
      tags: ['Next.js', 'React.js', 'TypeScript', 'WebSockets', 'AI Integration'],
    },
    {
      id: 2,
      role: 'Senior Frontend Engineer',
      company: 'MPL (Mobile Premier League)',
      location: 'Bengaluru, India',
      period: 'Sep 2024 – Oct 2025',
      description: 'Architected multi-window Desktop Poker Electron app. Built unified Redux WebSocket data layer achieving <100ms synchronization across renderer processes. Reduced system resource consumption by 40% using GPU acceleration.',
      tags: ['Electron', 'Next.js', 'Redux / RTK', 'Module Federation', 'Performance'],
    },
    {
      id: 3,
      role: 'Lead Frontend Engineer — Founding Engineer',
      company: 'Cloudfeather Games',
      location: 'Bengaluru, India',
      period: 'Mar 2022 – Sep 2024',
      description: 'Designed and shipped Bountyverse SDK for competitive format on casual gaming. Built partner Admin Dashboard in Next.js/Material UI, reducing onboarding times from 3 weeks to 4 days. Managed dynamic themes and Storybook libraries.',
      tags: ['JavaScript SDK', 'React', 'Material UI', 'Storybook', 'CI/CD'],
    },
    {
      id: 4,
      role: 'Lead Engineer — Samsung Knox Security',
      company: 'Samsung R&D Institute',
      location: 'Noida, India',
      period: 'Jun 2017 – Mar 2022',
      description: '• Sensitive Data Protection (SDP): Led a team of 4 engineers to implement Samsung Knox SDP — secure folder encryption feature shipped across all Samsung devices — using C/C++ and Android system APIs\n• Dual Data-at-Rest (Dual DAR): Implemented Dual DAR encryption at the file system level (fscrypt / Keymaster) exclusively for flagship Samsung devices, adding a second encryption layer to meet enterprise and government security mandates\n• Cross-device porting: Ported Dual DAR and SDP implementation code across multiple flagship device variants, ensuring compatibility across OS versions and device-specific kernel differences\n• Enterprise Partition Manager migration: Ported the Knox Enterprise Partition Manager from legacy ext4 to fscrypt, enabling per-file/per-directory encryption and hardware-backed key management',
      tags: ['C/C++', 'Android Systems', 'fscrypt', 'Dual DAR', 'SELinux Automation'],
    },
  ],

  contact: [
    { label: 'Email', value: 'satya.prakash.roy01@gmail.com', href: 'mailto:satya.prakash.roy01@gmail.com', icon: 'mail' },
    { label: 'LinkedIn', value: 'linkedin.com/in/satpro', href: 'https://linkedin.com/in/satpro', icon: 'linkedin' },
    { label: 'Phone', value: '+91 7754941918', href: 'tel:+917754941918', icon: 'phone' },
    { label: 'Resume', value: 'Download PDF', href: '/Satya_Prakash_Resume.pdf', icon: 'file' },
  ],

  education: [
    {
      degree: 'B.Tech in Computer Science and Engineering',
      institution: 'IIT (BHU) Varanasi',
      period: '2013 – 2017',
      details: 'Focused on data structure and algorithms, software engineering, system design and networking.'
    }
  ],

  skills: [
    {
      category: 'Languages',
      items: ['TypeScript (Expert)', 'JavaScript (ES6+/ES2023)', 'HTML5', 'CSS3', 'SASS', 'C/C++', 'Python']
    },
    {
      category: 'Frameworks & State',
      items: ['React.js', 'Next.js (SSR/SSG/ISR)', 'Electron (multi-window, IPC)', 'Redux / RTK', 'RTK Query', 'React Query (TanStack)', 'Context API', 'WebSocket', 'Socket.io']
    },
    {
      category: 'UI & Styling',
      items: ['Material UI', 'Styled Components', 'Emotion (CSS-in-JS)', 'Tailwind CSS', 'Storybook']
    },
    {
      category: 'Micro-frontends & Architecture',
      items: ['Module Federation', 'Component Integration', 'Micro-frontends']
    },
    {
      category: 'Performance & Optimization',
      items: ['Core Web Vitals (LCP/CLS/INP)', 'Google Lighthouse', 'Webpack Bundle Analyzer', 'React Profiler', 'GPU Acceleration', 'Code Splitting', 'Memory Leak Detection']
    },
    {
      category: 'Testing & Quality',
      items: ['Jest', 'React Testing Library', 'Cypress', 'Playwright (E2E, multi-window)']
    },
    {
      category: 'Build & Tooling',
      items: ['Webpack', 'Vite', 'Babel', 'npm/yarn', 'Git', 'ESLint', 'Prettier']
    },
    {
      category: 'CI/CD & Cloud',
      items: ['GitHub Actions', 'Jenkins', 'Docker', 'AWS S3/CloudFront']
    },
    {
      category: 'Security & Auth',
      items: ['OAuth 2.0', 'SSO', 'WCAG 2.1', 'Data-at-Rest encryption', 'Samsung Knox', 'TEE', 'fscrypt']
    },
    {
      category: 'AI-Assisted Dev',
      items: ['Cursor', 'Antigravity', 'GitHub Copilot', 'LLM Prompt Engineering']
    },
    {
      category: 'Process & Methodologies',
      items: ['Agile/Scrum', 'Design Systems', 'Figma-to-Code', 'JIRA', 'Tech Roadmap Planning']
    }
  ],

  certifications: [
    {
      title: 'Advanced Learning Algorithms',
      issuer: 'DeepLearning.AI / Stanford University',
      year: 'May 2024'
    },
    {
      title: 'Supervised Machine Learning: Regression and Classification',
      issuer: 'DeepLearning.AI / Stanford University',
      year: 'Apr 2024'
    }
  ],

  publications: [
    {
      title: 'Energy Efficient Scheduling of Independent Tasks on Multicore Processors with Software Controlled Dynamic Voltage Scaling — International Conference on Parallel and Distributed Processing Techniques and Applications',
      venue: "The 23rd Int'l Conf on Parallel and Distributed Processing Techniques and Applications at Las Vegas, Nevada, USA",
      year: '2017',
      description: 'Modified Energy-Efficient Task Scheduling Algorithm (EETSA) for multicore processors that schedules independent tasks within a common deadline in two phases, successfully outperforming the original EETSA and OPT algorithms in both scheduling time and energy consumption without increasing computational complexity'
    }
  ]
};

