import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const SYSTEM_LOGS = `Connecting to Satya Prakash Profile Core...
Mapping database index: SECURE_KNOX_SDP... OK
Mapping database index: WEBGL_FLUID_ENGINE... OK
Mapping database index: NEXTJS_MICRO_FRONTENDS... OK
Ready. Type your query or choose a shortcut command below.`;

const COMMAND_RESPONSES = {
  '/help': `Available commands:
  /projects     - Learn about systems Satya built (MPL, Knox, Xamine)
  /experience   - View Satya's work history timeline
  /skills       - Output technical stack and core competencies
  /education    - View academic qualifications and university details
  /certs        - View professional certifications
  /publications - View research work and publication records
  /knox         - Detailed security engineering at Samsung Knox
  /xamine       - Detailed founder overview of Xamine.ai EdTech
  /clear        - Clear terminal logs`,
  '/projects': `PROJECT OVERVIEW:
1. Xamine.ai & Kaksha: Personalised AI Learning Platforms built from scratch using React, Next.js, and TypeScript, featuring real-time biometric student behavior tracking.
2. MPL Desktop Poker client: High-performance multi-window Electron + Next.js desktop client with GPU offloading and WebSocket synchronization.
3. Bountyverse SDK: Modular game reward JavaScript SDK integrated across 15+ game titles at Cloudfeather Games.
4. Samsung Knox Security: Defense-grade Sensitive Data Protection (SDP) & Dual DAR file-system level encryption shipped globally on Samsung flagship devices.`,
  '/experience': `PROFESSIONAL SUMMARY:
- Founder & Lead Frontend Engineer | Xamine.ai (2025 - Present)
- Senior Frontend Engineer | MPL (Mobile Premier League) (2024 - 2025)
- Founding Lead Frontend Engineer | Cloudfeather Games (2022 - 2024)
- Lead Systems Engineer | Samsung R&D Institute (2017 - 2022)
- IIT (BHU) Varanasi CSE Graduate.`,
  '/skills': `CORE TECHNICAL STACK:
Languages: TypeScript (Expert), JavaScript (ES2023+), HTML5, CSS3, C/C++
Cyber Systems: Knox SDP, Dual DAR (fscrypt / Keymaster), SELinux Policies`,
  '/education': `EDUCATION:
- B.Tech in Computer Science and Engineering
  IIT (BHU) Varanasi (2013 - 2017)
  Focus areas: Algorithms, systems engineering, cryptography, and network security.`,
  '/certs': `CERTIFICATIONS:
1. Samsung Advanced Cryptography Certification (Samsung R&D Institute, 2019)
2. Certified Secure Software Lifecycle Professional (CSSLP) Prep (Samsung Security Center, 2021)`,
  '/publications': `PUBLICATIONS:
- "Securing File System-level Cryptography in Enterprise Android Devices"
  Samsung Technical Conference & R&D Journal (2020)
  Overview: Discussed the integration of SDP (Sensitive Data Protection) with fscrypt drivers and hardware-backed Keymaster layers.`,
  '/knox': `SAMSUNG KNOX SECURITY:
Lead Engineer (Samsung R&D Institute, 2017 - 2022).
Key Achievements:
• Sensitive Data Protection (SDP): Led a team of 4 engineers to implement Samsung Knox SDP — secure folder encryption feature shipped across all Samsung devices — using C/C++ and Android system APIs
• Dual Data-at-Rest (Dual DAR): Implemented Dual DAR encryption at the file system level (fscrypt / Keymaster) exclusively for flagship Samsung devices, adding a second encryption layer to meet enterprise and government security mandates
• Cross-device porting: Ported Dual DAR and SDP implementation code across multiple flagship device variants, ensuring compatibility across OS versions and device-specific kernel differences
• Enterprise Partition Manager migration: Ported the Knox Enterprise Partition Manager from legacy ext4 to fscrypt, enabling per-file/per-directory encryption and hardware-backed key management`,
  '/xamine': `XAMINE.AI & KAKSHA:
Founder. Designed and built two live AI JEE/NEET prep platforms. Kaksha provides custom whiteboard video lectures with dynamic teacher interruption, while Xamine tracks real-time exam indicators (guesswork, stress, distraction) to construct concept gap diagnostics.`,
};

export default function AIAgentPage() {
  const [logs, setLogs] = useState([
    { type: 'system', text: SYSTEM_LOGS }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [cpuUsage, setCpuUsage] = useState(24);
  const [memUsage, setMemUsage] = useState(48);
  const bodyRef = useRef(null);
  const location = useLocation();
  const initialQueryExecuted = useRef(false);

  useEffect(() => {
    // Scroll to bottom of terminal whenever logs change
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [logs]);

  // Simulate CPU/Memory variations
  useEffect(() => {
    const timer = setInterval(() => {
      setCpuUsage(Math.floor(20 + Math.random() * 15));
      setMemUsage(Math.floor(45 + Math.random() * 4));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleCommand = useCallback((cmd) => {
    const cleanCmd = cmd.trim().toLowerCase();
    
    setLogs((prevLogs) => {
      const newLogs = [...prevLogs, { type: 'user', text: cmd }];

      if (cleanCmd === '/clear') {
        return [{ type: 'system', text: 'Terminal logs cleared.' }];
      }

      // Lookup response
      let responseText = `Command not found: '${cmd}'. Type /help to view available commands.`;
      if (COMMAND_RESPONSES[cleanCmd]) {
        responseText = COMMAND_RESPONSES[cleanCmd];
      } else {
        // Basic natural language fallback matching
        if (cleanCmd.includes('project') || cleanCmd.includes('work') || cleanCmd.includes('portfolio')) {
          responseText = COMMAND_RESPONSES['/projects'];
        } else if (cleanCmd.includes('experience') || cleanCmd.includes('history') || cleanCmd.includes('jobs')) {
          responseText = COMMAND_RESPONSES['/experience'];
        } else if (cleanCmd.includes('skill') || cleanCmd.includes('tech') || cleanCmd.includes('code') || cleanCmd.includes('stack')) {
          responseText = COMMAND_RESPONSES['/skills'];
        } else if (cleanCmd.includes('education') || cleanCmd.includes('degree') || cleanCmd.includes('college') || cleanCmd.includes('university') || cleanCmd.includes('iit') || cleanCmd.includes('bhu')) {
          responseText = COMMAND_RESPONSES['/education'];
        } else if (cleanCmd.includes('cert') || cleanCmd.includes('credentials')) {
          responseText = COMMAND_RESPONSES['/certs'];
        } else if (cleanCmd.includes('publication') || cleanCmd.includes('paper') || cleanCmd.includes('journal') || cleanCmd.includes('write')) {
          responseText = COMMAND_RESPONSES['/publications'];
        } else if (cleanCmd.includes('knox') || cleanCmd.includes('samsung') || cleanCmd.includes('security')) {
          responseText = COMMAND_RESPONSES['/knox'];
        } else if (cleanCmd.includes('xamine') || cleanCmd.includes('kaksha') || cleanCmd.includes('ai')) {
          responseText = COMMAND_RESPONSES['/xamine'];
        }
      }

      return [...newLogs, { type: 'ai', text: responseText }];
    });
  }, []);

  useEffect(() => {
    if (location.state?.initialQuery && !initialQueryExecuted.current) {
      initialQueryExecuted.current = true;
      handleCommand(location.state.initialQuery);
    }
  }, [location.state, handleCommand]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    handleCommand(inputValue);
    setInputValue('');
  };

  const handleShortcutClick = (cmd) => {
    handleCommand(cmd);
  };

  return (
    <div className="page-content">
      <div className="ai-agent-page">
        {/* Left Side: Stats/Diagnostics Sidebar */}
        <aside className="ai-sidebar">
          <div className="ai-sidebar-group">
            <h3 className="ai-sidebar-title">SYSTEM STATUS</h3>
            <div className="ai-stat-group" style={{ marginTop: '14px' }}>
              <div className="ai-stat-row">
                <span>DATABASE STATUS</span>
                <span className="ai-stat-value">ONLINE</span>
              </div>
              <div className="ai-stat-row">
                <span>AI MODEL CORE</span>
                <span className="ai-stat-value">READY</span>
              </div>
              <div className="ai-stat-row">
                <span>CPU CORE LOAD</span>
                <span className="ai-stat-value">{cpuUsage}%</span>
              </div>
              <div className="ai-stat-row">
                <span>MEMORY ALLOC</span>
                <span className="ai-stat-value">{memUsage}%</span>
              </div>
              <div className="ai-stat-row">
                <span>LATENCY</span>
                <span className="ai-stat-value">~38ms</span>
              </div>
            </div>
          </div>

          <div className="ai-sidebar-group">
            <h3 className="ai-sidebar-title">QUICK COMMANDS</h3>
            <div className="ai-prompt-shortcuts" style={{ marginTop: '14px' }}>
              <button className="ai-shortcut-btn" onClick={() => handleShortcutClick('/projects')}>
                /projects
              </button>
              <button className="ai-shortcut-btn" onClick={() => handleShortcutClick('/experience')}>
                /experience
              </button>
              <button className="ai-shortcut-btn" onClick={() => handleShortcutClick('/skills')}>
                /skills
              </button>
              <button className="ai-shortcut-btn" onClick={() => handleShortcutClick('/education')}>
                /education
              </button>
              <button className="ai-shortcut-btn" onClick={() => handleShortcutClick('/certs')}>
                /certs
              </button>
              <button className="ai-shortcut-btn" onClick={() => handleShortcutClick('/publications')}>
                /publications
              </button>
            </div>
          </div>
        </aside>

        {/* Right Side: Terminal Window Panel */}
        <div className="terminal-panel">
          <header className="terminal-header">
            <div className="terminal-dots">
              <span className="terminal-dot-indicator" />
              <span className="terminal-dot-indicator" />
              <span className="terminal-dot-indicator" />
            </div>
            <div className="terminal-title">SATPRO_AI_CORE.SH</div>
            <div style={{ width: '42px' }} /> {/* Spacer */}
          </header>

          <div className="terminal-body" ref={bodyRef}>
            {logs.map((log, idx) => (
              <div key={idx} className="terminal-log-row">
                {log.type === 'user' ? (
                  <span className="terminal-user-input">{log.text}</span>
                ) : log.type === 'system' ? (
                  <span className="terminal-system-output">{log.text}</span>
                ) : (
                  <span className="terminal-ai-output">{log.text}</span>
                )}
              </div>
            ))}
          </div>

          <form className="terminal-prompt-line" onSubmit={handleSubmit}>
            <span className="terminal-prompt-symbol">satpro-chat$</span>
            <input
              type="text"
              className="terminal-input-field"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything about Satya, or type /help..."
              autoFocus
            />
          </form>
        </div>
      </div>
    </div>
  );
}
