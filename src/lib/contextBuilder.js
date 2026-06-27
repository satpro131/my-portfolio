import * as pdfjsLib from 'pdfjs-dist';
import { siteData } from '../data/content';

// Point pdfjs to its worker file
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

let cachedContext = null;

export async function buildContext() {
  if (cachedContext) return cachedContext;

  const [resumeText, linkedinText, portfolioText, livePortfolioText] = await Promise.allSettled([
    extractPDF('/Satya_Prakash_Resume.pdf'),
    fetchTextFile('/data/linkedin.txt'),
    extractPortfolioDOM(),
    fetchLivePortfolio(),
  ]);

  cachedContext = `
=== RESUME ===
${resumeText.status === 'fulfilled' ? resumeText.value : 'Resume unavailable.'}

=== LINKEDIN PROFILE ===
${linkedinText.status === 'fulfilled' ? linkedinText.value : 'LinkedIn data unavailable.'}

=== PORTFOLIO STRUCTURED DATABASE (SITEDATA) ===
${JSON.stringify(siteData, null, 2)}

=== PORTFOLIO WEBSITE DOM ===
${portfolioText.status === 'fulfilled' ? portfolioText.value : 'Portfolio data unavailable.'}

=== LIVE PORTFOLIO WEBSITE (SATPRO131.VERCEL.APP) ===
${livePortfolioText.status === 'fulfilled' ? livePortfolioText.value : 'Live portfolio data unavailable.'}
  `.trim();

  return cachedContext;
}

async function extractPDF(url) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map(item => item.str).join(' ');
    fullText += pageText + '\n';
  }
  return fullText.trim();
}

async function fetchTextFile(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch ${url}`);
  return await response.text();
}

async function fetchLivePortfolio() {
  try {
    const response = await fetch('https://satpro131.vercel.app/');
    if (!response.ok) return '';
    const html = await response.text();
    
    // Strip script/style components to get raw text content
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const noise = doc.querySelectorAll('script, style, nav, footer, iframe, noscript');
    noise.forEach(el => el.remove());
    
    return doc.body.innerText.replace(/\s+/g, ' ').trim();
  } catch (err) {
    console.warn('Failed to query live portfolio due to network or CORS constraints:', err);
    return '';
  }
}

function extractPortfolioDOM() {
  // Remove noise elements from a cloned document to avoid disrupting the active page DOM
  const bodyClone = document.body.cloneNode(true);
  const noise = bodyClone.querySelectorAll('script, style, nav, footer, iframe, noscript');
  noise.forEach(el => el.remove());

  const text = bodyClone.innerText
    .replace(/\s+/g, ' ')
    .trim();

  return Promise.resolve(text);
}

export function resetContext() {
  cachedContext = null;
}
