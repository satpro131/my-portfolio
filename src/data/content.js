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
      role: 'Co-Founder & Lead Frontend Engineer',
      company: 'Xamine Tech Labs Pvt Ltd.',
      location: 'Bengaluru, India',
      period: 'Oct 2025 – Present',
      description: 'Delivered two live production-grade AI-powered EdTech platforms (Xamine.ai & Kaksha) from scratch.\n• Xamine.ai: Engineered cognitive AI analytics for JEE/NEET prep, capturing 20+ real-time client-side student metrics (including response latency, time-per-question, and attention levels).\n• Kaksha Classroom: Developed an AI-powered virtual classroom featuring interactive blackboards, dynamic interrupt Q&A flow, and real-time multiplayer whiteboard synchronization.\n• Video Optimization: Architected local memory caching and buffer storage optimization layers to achieve fast-paced, zero-lag classroom video streaming and delivery on low bandwidths.',
      tags: ['Next.js', 'React.js', 'TypeScript', 'WebSockets', 'AI Integration'],
      metrics: [
        { label: 'PRODUCTS SHIPPED', value: '2 LIVE' },
        { label: 'CLIENT METRICS', value: '20+' }
      ]
    },
    {
      id: 2,
      role: 'Senior Frontend Engineer',
      company: 'MPL (Mobile Premier League)',
      location: 'Bengaluru, India',
      period: 'Sep 2024 – Oct 2025',
      description: 'Architected and shipped multi-window Desktop Poker Electron app, delivering seamless gaming performance under heavy concurrent usage.\n• Scale & Optimization: Optimized the system to support 20+ concurrent poker game tables, reducing system resource consumption by 40% using GPU acceleration.\n• Data Sync: Accelerated state synchronization to sub-100ms updates across multi-window processes by engineering a unified data layer over a single WebSocket feed.\n• Hardware Compatibility: Optimized core engine load and layout interactions to run smoothly on low-end hardware with minimal frame drops.\n• Micro-Frontend Architecture: Collaborated with multiple cross-functional teams to integrate gameplay components using Module Federation.\n• Technical Leadership: Mentored and guided a team of 6 frontend engineers on poker client architecture, state management, and real-time synchronization layers.',
      tags: ['Electron', 'Next.js', 'Redux / RTK', 'Module Federation', 'Performance'],
      metrics: [
        { label: 'CONCURRENT TABLES', value: '20+' },
        { label: 'RESOURCE LOAD CUT', value: '-40%' },
        { label: 'ENGINEERS LED', value: '6 ENG' }
      ]
    },
    {
      id: 3,
      role: 'Lead Frontend Engineer — Founding Engineer',
      company: 'Cloudfeather Games',
      location: 'Bengaluru, India',
      period: 'Mar 2022 – Sep 2024',
      description: 'Designed and shipped Bountyverse SDK for competitive formats on casual gaming, successfully integrating the system with 15+ game studio partners.\n• Onboarding Reductions: Reduced developer onboarding time to less than a week (from 3 weeks down to 4 days) by engineering custom dashboard tooling and client-configured UI elements.\n• Team Growth: Maintained responsibility for hiring, building, and scaling a team of 4 frontend engineers.\n• Engineering Guidance: Guided the engineering team on SDK feature development, partner game integration workflows, and admin dashboard architecture.',
      tags: ['JavaScript SDK', 'React', 'Material UI', 'Storybook', 'CI/CD'],
      metrics: [
        { label: 'STUDIO PARTNERS', value: '15+' },
        { label: 'ONBOARDING TIME', value: '< 1 WEEK' },
        { label: 'ENGINEERS HIRED', value: '4 ENG' }
      ]
    },
    {
      id: 4,
      role: 'Lead Engineer — Samsung Knox Security',
      company: 'Samsung R&D Institute',
      location: 'Noida, India',
      period: 'Jun 2017 – Mar 2022',
      description: 'Promoted from Corporate Associate Engineer to Lead Engineer for contributions to flagship security features.\n• Core Dual DAR Development: Worked in South Korea as part of the core flagship team that developed Dual Data-at-Rest (Dual DAR) encryption.\n• Encryption Migration & Porting: Directed the transition of the Knox Enterprise Partition Manager from legacy ecryptfs to hardware-backed fscrypt encryption, porting it across 20+ flagship Samsung device models.\n• Team Leadership: Mentored and guided a team of 4 engineers on security driver integration and Knox system APIs.\n• Testing Pipeline Automation: Developed an automated kernel-level test automation pipeline using custom shell test suites and device automation scripts, reducing system regression validation cycles by 70%.',
      tags: ['C/C++', 'Android Systems', 'fscrypt', 'Dual DAR', 'SELinux Automation'],
      metrics: [
        { label: 'DEVICES PORTED', value: '20+ MODELS' },
        { label: 'TEST REGRESSIONS', value: '-70% CYCLE' },
        { label: 'TEAM LEADERSHIP', value: '4 ENG' }
      ]
    },
    {
      id: 5,
      role: 'Co-Founder & Frontend Lead',
      company: 'Infistart Solutions',
      location: 'Bengaluru, India',
      period: 'Sep 2016 – Jun 2017',
      description: 'Co-founded software startup during IIT (BHU) college days, leading frontend architecture and product interface design.\n• Educational ERP: Engineered a comprehensive ERP system for coaching institutes using AngularJS, reducing administrative manual work by 80%.\n• Digital Exam Platform: Developed a web-based examination system delivering detailed post-exam insight diagnostics and performance dashboards.\n• Attendance Tracking: Designed and shipped an intuitive digital attendance tracking system tailored for educational institutions.',
      tags: ['AngularJS', 'JavaScript', 'ERP Systems', 'Dashboard Analytics', 'HTML5/CSS3'],
      metrics: [
        { label: 'MANUAL WORK CUT', value: '-80%' },
        { label: 'SYSTEMS BUILT', value: '3 PLATFORMS' }
      ]
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

