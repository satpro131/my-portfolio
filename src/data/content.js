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
      description: 'Personalised AI Learning Platform for JEE/NEET preparation. Features real-time behavior analytics tracking focus, time-per-question, and exam-day metrics.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=500&fit=crop',
      tags: ['Next.js', 'React', 'TypeScript', 'AI Core'],
    },
    {
      id: 2,
      title: 'Kaksha Digital Classroom',
      description: 'AI-Powered Personalised Digital Classroom featuring interactive whiteboard video lectures, real-time interruptions/Q&A flow, and assignment playgrounds.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
      tags: ['React', 'WebSocket', 'Tailwind', 'AI Video'],
    },
    {
      id: 3,
      title: 'MPL Desktop Poker',
      description: 'Multi-window Desktop Poker Electron application supporting 20+ tables concurrently. Built with a unified RTK WebSocket data layer and GPU optimization.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
      tags: ['Electron', 'Next.js', 'Redux Toolkit', 'WebSockets'],
    },
    {
      id: 4,
      title: 'Bountyverse Game SDK',
      description: 'High-performance JavaScript SDK and Admin Dashboard enabling rewards, leaderboards, and anti-cheat scoring across 15+ game integrations.',
      image: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=800&h=500&fit=crop',
      tags: ['JS SDK', 'React', 'Material UI', 'Storybook'],
    },
    {
      id: 5,
      title: 'Samsung Knox SDP',
      description: 'Sensitive Data Protection secure folder encryption feature shipped across flagship Samsung devices globally using Android system APIs.',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=500&fit=crop',
      tags: ['C/C++', 'Android SDK', 'Knox TEE', 'Security'],
    },
    {
      id: 6,
      title: 'Samsung Knox Dual DAR',
      description: 'Filesystem-level dual layer encryption implementation (fscrypt / Keymaster) for enterprise and government high-security deployments.',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=500&fit=crop',
      tags: ['fscrypt', 'Keymaster', 'Kernel Systems', 'Security'],
    },
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
      description: 'Designed and shipped Bountyverse SDK for real-money rewards. Built partner Admin Dashboard in Next.js/Material UI, reducing onboarding times from 3 weeks to 4 days. Managed dynamic themes and Storybook libraries.',
      tags: ['JavaScript SDK', 'React', 'Material UI', 'Storybook', 'CI/CD'],
    },
    {
      id: 4,
      role: 'Lead Engineer — Samsung Knox Security',
      company: 'Samsung R&D Institute',
      location: 'Noida, India',
      period: 'Jun 2017 – Mar 2022',
      description: 'Led Knox SDP (Sensitive Data Protection) and Dual DAR encryption implementation at file system level (fscrypt/Keymaster). Shipped across 500K+ enterprise/government deployments. Automated SELinux policy generation.',
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
      details: 'Focused on algorithms, systems engineering, cryptography, and network security.'
    }
  ],

  skills: {
    languages: ['TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3/SCSS', 'C/C++'],
    frontend: ['React.js', 'Next.js (SSR/SSG)', 'Redux Toolkit', 'TanStack Query', 'Electron', 'TailwindCSS'],
    systems: ['Android System APIs', 'fscrypt', 'Dual DAR', 'Linux Kernel Cryptography', 'SELinux Policies'],
    tools: ['Git', 'Webpack', 'Vite', 'Docker', 'Storybook', 'CI/CD Pipelines']
  },

  certifications: [
    {
      title: 'Samsung Advanced Cryptography Certification',
      issuer: 'Samsung R&D Institute',
      year: '2019'
    },
    {
      title: 'Certified Secure Software Lifecycle Professional (CSSLP) Prep',
      issuer: 'Samsung Security Center',
      year: '2021'
    }
  ],

  publications: [
    {
      title: 'Securing File System-level Cryptography in Enterprise Android Devices',
      venue: 'Samsung Technical Conference & R&D Journal',
      year: '2020',
      description: 'Discussed the integration of SDP (Sensitive Data Protection) with fscrypt drivers and hardware-backed Keymaster layers.'
    }
  ]
};

