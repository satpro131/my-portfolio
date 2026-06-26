import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { buildContext } from '../lib/contextBuilder';
import { sendMessage } from '../lib/geminiChat';

const SYSTEM_LOGS_INIT = `Connecting to Satya Prakash Profile Core...
Loading Context Database (Resume PDF, LinkedIn Profile)...
Please wait a moment...`;

const HELP_RESPONSE = `Available commands:
  /projects     - Learn about systems Satya built (MPL, Knox, Xamine)
  /experience   - View Satya's work history timeline
  /skills       - Output technical stack and core competencies
  /education    - View academic qualifications and university details
  /certs        - View professional certifications
  /publications - View research work and publication records
  /clear        - Clear terminal logs`;

export default function AIAgentPage() {
  const [logs, setLogs] = useState([
    { type: 'system', text: SYSTEM_LOGS_INIT }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [contextReady, setContextReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const contextRef = useRef(null);
  const bodyRef = useRef(null);
  const location = useLocation();
  const initialQueryExecuted = useRef(false);

  // Build Context on Mount
  useEffect(() => {
    buildContext()
      .then((ctx) => {
        contextRef.current = ctx;
        setContextReady(true);
        setLogs((prev) => [
          ...prev,
          {
            type: 'system',
            text: 'System Online. Context Database loaded successfully.\nType your query or choose a shortcut command below. Type /help for available shortcuts.'
          }
        ]);
      })
      .catch((err) => {
        console.error(err);
        setLogs((prev) => [
          ...prev,
          {
            type: 'system',
            text: 'WARNING: Failed to load complete context database (Resume or LinkedIn files). Gemini answers will rely on available page content.'
          }
        ]);
        setContextReady(true);
      });
  }, []);

  useEffect(() => {
    // Scroll to bottom of terminal whenever logs change
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = async (cmd) => {
    const text = cmd.trim();
    if (!text) return;

    const cleanCmd = text.toLowerCase();

    // Clear log handler
    if (cleanCmd === '/clear') {
      setLogs([{ type: 'system', text: 'Terminal logs cleared.' }]);
      return;
    }

    setLogs((prev) => [...prev, { type: 'user', text }]);

    // /help command handler
    if (cleanCmd === '/help') {
      setLogs((prev) => [...prev, { type: 'ai', text: HELP_RESPONSE }]);
      return;
    }

    if (!contextReady) {
      setLogs((prev) => [
        ...prev,
        { type: 'system', text: 'System is initializing database. Please wait...' }
      ]);
      return;
    }

    // Check if API key is configured
    const key = import.meta.env.VITE_GEMINI_API_KEY;
    if (!key || key === 'your_gemini_key_here') {
      setLogs((prev) => [
        ...prev,
        {
          type: 'ai',
          text: 'WARNING: Gemini API Key (`VITE_GEMINI_API_KEY`) is not configured. Please create a `.env` file at the root of the project with a valid Gemini API Key from Google AI Studio.'
        }
      ]);
      return;
    }

    setLoading(true);

    try {
      // Map shortcut commands to normal conversational queries for Gemini
      let queryText = text;
      if (cleanCmd === '/projects') {
        queryText = 'List and summarize all of Satya Prakash\'s projects.';
      } else if (cleanCmd === '/experience') {
        queryText = 'Summarize Satya Prakash\'s professional experience timeline.';
      } else if (cleanCmd === '/skills') {
        queryText = 'What are Satya Prakash\'s core technical stack and skills?';
      } else if (cleanCmd === '/education') {
        queryText = 'Where did Satya Prakash go to college and what did he study?';
      } else if (cleanCmd === '/certs') {
        queryText = 'What professional certifications does Satya Prakash hold?';
      } else if (cleanCmd === '/publications') {
        queryText = 'What papers or publications has Satya Prakash written?';
      }

      const reply = await sendMessage(queryText, contextRef.current);
      setLogs((prev) => [...prev, { type: 'ai', text: reply }]);
    } catch (err) {
      console.error(err);
      setLogs((prev) => [
        ...prev,
        { type: 'ai', text: err.message || 'Something went wrong. Please try again.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.state?.initialQuery && !initialQueryExecuted.current) {
      initialQueryExecuted.current = true;
      handleCommand(location.state.initialQuery);
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || loading) return;
    handleCommand(inputValue);
    setInputValue('');
  };

  return (
    <div className="page-content">
      <div className="ai-agent-page">
        {/* Full Width Terminal Window Panel */}
        <div className="terminal-panel full-width">
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
                  <span className="terminal-ai-output">
                    <ReactMarkdown>{log.text}</ReactMarkdown>
                  </span>
                )}
              </div>
            ))}
            {loading && (
              <div className="terminal-log-row">
                <span className="terminal-system-output blink">THINKING...</span>
              </div>
            )}
          </div>

          <form className="terminal-prompt-line" onSubmit={handleSubmit}>
            <span className="terminal-prompt-symbol">satpro-chat$</span>
            <input
              type="text"
              className="terminal-input-field"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={contextReady ? "Ask about my experience, or type /help..." : "Initializing database..."}
              autoFocus
              disabled={!contextReady || loading}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
