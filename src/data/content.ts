export interface Metric {
  value: string;
  label: string;
}

export interface Role {
  dates: string;
  place: string;
  role: string;
  org: string;
  orgDesc: string;
  points: string[];
}

export interface Project {
  name: string;
  meta: string;
  points: string[];
}

export interface ReadingItem {
  title: string;
  by: string;
  note: string;
}

export interface ReadingSection {
  name: string;
  items: ReadingItem[];
}

export interface TechContent {
  kicker: string;
  title: string;
  intro: string;
  metrics: Metric[];
  roles: Role[];
  projects: Project[];
  skillsTech: string[];
  skillsDomain: string[];
}

export interface ConsultingContent {
  kicker: string;
  title: string;
  intro: string;
  metrics: Metric[];
  roles: Role[];
}

export interface LeadershipContent {
  kicker: string;
  title: string;
  intro: string;
  roles: Role[];
}

export interface ReadingContent {
  kicker: string;
  title: string;
  intro: string;
  readingSections: ReadingSection[];
}

export const content = {
  tech: {
    kicker: '01 — Engineering & Data Science',
    title: 'I build AI products end to end.',
    intro: 'From founding-engineer full-stack systems to systematic trading research — turning models into shipped software across nine roles.',
    metrics: [
      { value: '~0.90', label: 'Avg regression R² on LSTM trading models' },
      { value: '11.8K+', label: 'News articles processed for sentiment' },
      { value: '2M+', label: 'Time-series points engineered from 20K' },
      { value: '50%', label: 'Backend response-time reduction' },
    ],
    roles: [
      { dates: 'Jan 2026 – Present', place: 'Baltimore, MD', role: 'Founding Engineer', org: 'EligioAI', orgDesc: 'AI platform for patient triage & clinician scheduling', points: [
        'Architected a production, security-minded full-stack platform (React/Vite, Flask, PostgreSQL, Azure, OpenAI), replacing an unscalable no-code MVP.',
        'Built an AI medical-document pipeline: PDF validation, OCR fallback, and LLM structured extraction for referral summaries & triage profiles.',
        'Designed a knowledge-grounded clinical routing engine with deterministic fallbacks to cut manual referral review effort.',
      ]},
      { dates: 'Jan 2026 – May 2026', place: 'Baltimore, MD', role: 'Data Scientist', org: 'Campbell', orgDesc: 'Quant firm — systematic futures & equities', points: [
        'Built a crude-oil market-intelligence pipeline over 11.8K+ articles (FinBERT/CrudeBERT, PyTorch) with calibrated sentiment scoring.',
        'Engineered a 32-factor dataset (5.3K+ daily obs); LSTM models reached ~0.90 avg R².',
        'Designed an institutional alpha-validation & backtest framework (Newey-West, quintiles, transaction costs) across WTI & Brent.',
      ]},
      { dates: 'Dec 2024 – Jan 2025', place: 'Baltimore, MD', role: 'Data Science Intern', org: 'Costac', orgDesc: 'Analytics for SME finance & customer behavior', points: [
        'Built ML pipelines (PyTorch, scikit-learn) predicting revenue & behavior at R² 0.85, cutting MSE 25%.',
        'Implemented RNN/LSTM/GRU models for sequential time series, reaching 8.5% MAPE.',
      ]},
      { dates: 'Feb 2024 – May 2024', place: 'Chennai, India', role: 'Research Intern', org: 'IIT Madras', orgDesc: 'AR/VR visualization research', points: [
        'Reviewed 20+ papers on AR/VR visualization of high-dimensional data.',
        'Led a cross-lab team building AR/VR dimensionality-reduction demos in Unity for faculty & industry.',
      ]},
      { dates: 'Jun 2022 – Jun 2023', place: 'Bengaluru, India', role: 'Software Developer', org: 'Teachmint', orgDesc: 'EdTech platform', points: [
        'Rebuilt a Python backend module, cutting response times 50% via better algorithms & OOP.',
        'Unified disparate APIs into standard Flask (+60% efficiency); migrated 1M-point MongoDB collections (−20% latency).',
      ]},
      { dates: 'Jun 2021 – Jul 2021', place: 'Charlotte, NC', role: 'Software Intern', org: 'Jobsage.ai', orgDesc: 'AI recruitment & job recommendation', points: [
        'Automated hiring-data extraction from job-alert emails via Google Cloud, boosting throughput 80%.',
        'Built a Flask API + cron to keep promo-code validity in sync, ensuring 15% revenue savings.',
      ]},
      { dates: 'Apr 2020 – Jun 2020', place: 'Mumbai, India', role: 'Machine Learning Intern', org: 'Sustlabs', orgDesc: 'Residential energy analytics', points: [
        'Scaled a 20K → 2M-point time series; trained LSTM appliance-power models (R² > 0.8).',
        'Deployed models with Kafka for real-time predictions across 5K+ homes; visualized in Grafana/InfluxDB.',
      ]},
      { dates: 'Dec 2019 – Jan 2020', place: 'Mumbai, India', role: 'Data Science Intern', org: 'Floww', orgDesc: 'SaaS ops platform for startups & MSMEs', points: [
        'Scraped vehicle-spec data (BeautifulSoup) and benchmarked ML models to predict mileage.',
      ]},
      { dates: 'Oct 2018 – Dec 2019', place: 'Mumbai, India', role: 'Member, Software Subsystem', org: 'Rakshak — IITB UAV Team', orgDesc: 'Drones for disaster response', points: [
        'Built image datasets (OpenCV) and trained U-Net for semantic segmentation.',
      ]},
    ],
    projects: [
      { name: 'Vector DB vs Knowledge Graph', meta: 'RAG · LangChain · ChromaDB · GPT-4 · 2025', points: ['6 chunking strategies, +35% retrieval accuracy over 1000+ chunks.', 'GraphRAG entity search hitting 90% relevance on complex queries.'] },
      { name: 'Multi-Modal Lip Reading', meta: 'PyTorch · Fusion · 2025', points: ['Audio + video + SBERT triple-modality fusion.', '+37% absolute accuracy over unimodal baselines.'] },
      { name: 'AI Water-Quality Modeling', meta: 'CNN/GRU/LSTM · IITB · 2023', points: ['Ensemble + DL forecasting, +25% performance.', 'Genetic & Bayesian tuning for a further +10%.'] },
      { name: 'Fantasy T20 Cricket Optimizer', meta: 'Genetic Algorithm · IITB · 2023', points: ['Custom player metrics from 10+ factors.', 'Presented at NCMDAO, IIT Guwahati.'] },
      { name: 'Composite Structures Analysis', meta: 'ML Regression · IITB · 2020', points: ['Predicted Young’s modulus & fracture points.', 'Compared parameters across compositions.'] },
      { name: 'IPL Data Analysis', meta: 'EDA · IITB · 2019', points: ['Hypothesis testing on ball-by-ball data.', 'Trend visualization across players & venues.'] },
      { name: 'React Sales Dashboard', meta: 'React · Supabase · Chart.js', points: ['Real-time sync via Postgres subscriptions.', 'Aggregations across $50K+ quarterly sales.'] },
      { name: 'Minimal Social Platform', meta: 'Firebase · Firestore · Auth', points: ['Google OAuth + real-time listeners.', 'Time-based filtering over 500+ posts.'] },
      { name: 'E-commerce PMS', meta: 'Express · SQLite', points: ['Normalized schema, full CRUD for inventory.', 'RESTful search over 100+ records.'] },
    ],
    skillsTech: ['Python', 'JavaScript', 'SQL', 'PyTorch', 'TensorFlow', 'Pandas', 'Scikit-Learn', 'Git', 'Linux', 'Google Cloud', 'Excel'],
    skillsDomain: ['Deep Learning', 'Machine Learning', 'NLP', 'Frontend', 'Backend', 'Databases', 'Data Analysis', 'Optimization'],
  } satisfies TechContent,

  consulting: {
    kicker: '02 — Strategy & Consulting',
    title: 'I turn ambiguity into a defensible market case.',
    intro: 'Case engagements sizing markets, building revenue models, and shaping go-to-market strategy for startups and climate tech.',
    metrics: [
      { value: '$1.12B', label: 'U.S. TAM sized for Voiceitt 2.0' },
      { value: '$660M', label: 'Defensible TAM rebuilt for DWaste' },
      { value: '35→45%', label: 'Projected gross-margin lift for AquiPor' },
      { value: '23+', label: 'Third-party sources per market case' },
    ],
    roles: [
      { dates: 'Jan – May 2026', place: 'Johns Hopkins', role: 'Consultant', org: 'JHU Graduate Consulting Club — Voiceitt 2.0', orgDesc: 'Case prep, business training & firm networking', points: [
        'Led a 5-person team building a research-based market-sizing model: ~564K supported patients and a $1.12B U.S. TAM via disease-level epidemiology & severity stratification.',
        'Concentrated GTM on TBI (~$798M) and Parkinson’s (~$267M) as the largest scalable pools.',
        'Built a citation-backed 23-disease expansion pipeline to de-risk concentration beyond core cohorts.',
      ]},
      { dates: 'Aug – Dec 2025', place: 'Johns Hopkins', role: 'Consultant', org: 'AquiPor (via Breezwei)', orgDesc: 'Climate tech — permeable concrete & stormwater', points: [
        'Built pricing & market-entry strategy for a $10M opportunity; improved projected gross margin 35% → 45%.',
        'Modeled $25M Yr-5 revenue / $8M EBITDA across 3 segments to frame Series A decisions.',
        'Recommended a public-sector-first GTM into a $2.3B municipal stormwater market; secured 3 pilots.',
      ]},
      { dates: 'Jan – May 2026', place: 'Johns Hopkins', role: 'Consultant', org: 'DWaste (via Breezwei)', orgDesc: 'AI computer-vision waste sorting', points: [
        'Rebuilt the market case from 23+ verified sources: $660M TAM, $89M–$134M SAM across 4 segments.',
        'Built a 3-year GTM model ($42M Yr-3) that tightened prior forecasts to improve investor credibility.',
      ]},
      { dates: 'Aug 2025 – May 2026', place: 'Johns Hopkins', role: 'Partner, Data Analytics', org: 'Breezwei', orgDesc: 'Pro-bono advisory to sustainability startups', points: [
        'Lead the data-analytics workstream making ventures investment-ready for VC scrutiny.',
        'Formalized a sourcing pipeline with the incubator & Energy Research Institute to vet high-potential startups.',
      ]},
      { dates: 'Aug – Dec 2025', place: 'Johns Hopkins', role: 'Director', org: 'JHU Product Management Club', orgDesc: 'PM skills through projects & events', points: [
        'Led a team building a Business Model Canvas + GTM for an AR/VR startup, including competitor & pricing analysis.',
        'Drove a multi-channel outreach strategy that lifted club visibility 30%.',
      ]},
    ],
  } satisfies ConsultingContent,

  leadership: {
    kicker: '03 — Leadership & Community',
    title: 'I build organizations and the events that fill them.',
    intro: 'From governing 2,500+ graduate students to launching an intercollegiate case competition, I lead teams that ship real experiences.',
    roles: [
      { dates: 'Aug 2025 – May 2026', place: 'Johns Hopkins', role: 'Executive Board Member', org: 'Graduate Representative Organization', orgDesc: 'Governance body for 2,500+ grad students', points: [
        'Directed the university’s largest graduate organization and a cross-functional body of 35+ representatives.',
        'Ran high-impact events for 2,000+ attendees on a $40K+ budget, lifting engagement 20%.',
        'Synthesized student data into policy frameworks delivered to University Administration.',
      ]},
      { dates: 'Aug 2025 – May 2026', place: 'Johns Hopkins', role: 'Co-President', org: 'JHU Consulting Club', orgDesc: 'Career prep & recruiter engagement', points: [
        'Ran 6+ events and expanded reach to the grad community; partnered with Bain, BCG, Deloitte & Tuscany.',
        'Launched JHU’s inaugural Intercollegiate Case Competition — 25+ teams, 4+ universities, judges from Bain & Pfizer.',
      ]},
      { dates: 'Apr 2025 – May 2026', place: 'Johns Hopkins', role: 'Event & Social Chair', org: 'Stand Up Comedy Club', orgDesc: 'We do stand-up. Or at least try to.', points: [
        'Grew the performer base 300% and reached 500+ participants across workshops & shows.',
        'Secured a $10K Blue Jay Dialogue grant blending comedy & dance to explore cultural identity.',
      ]},
      { dates: 'Jan – Apr 2025', place: 'Johns Hopkins', role: 'Director, Design & Marketing', org: 'Culture Show', orgDesc: 'Hopkins’ flagship cultural showcase', points: [
        'Led creative direction & marketing for 15+ performance groups and 500+ attendees.',
        'Managed a design team and coordinated 10+ volunteers for a zero-delay 3-hour live program.',
      ]},
      { dates: 'Oct 2024 – May 2026', place: 'Johns Hopkins', role: 'Student Ambassador', org: 'International Students at Hopkins', orgDesc: 'Community & cultural integration', points: [
        'Led orientation, community-engagement and cultural-inclusion programming for international students.',
        'Ran movie nights & grocery trips (35+ attendees) that strengthened the support network.',
      ]},
      { dates: 'Jan 2025 – May 2026', place: 'Johns Hopkins', role: 'Member', org: 'Sustainable Hopkins Innovative Projects', orgDesc: 'Campus sustainability initiatives', points: [
        'Ran a 500+ item clothing drive, a pop-up thrift store, and food-recovery donations to local non-profits.',
      ]},
      { dates: 'Aug 2019 – Feb 2020', place: 'IIT Bombay', role: 'Media & PR Coordinator', org: 'Abhyuday', orgDesc: 'India’s largest student-run social org', points: [
        'Managed 35+ campus representatives across India for health workshops, cleanups & outreach.',
        'Drafted sponsorship proposals that secured funding for the flagship annual festival.',
      ]},
    ],
  } satisfies LeadershipContent,

  reading: {
    kicker: '04 — Off the Clock',
    title: 'What’s on my shelf and my screen.',
    intro: 'A rotating, slightly chaotic list of the books, films, and ideas I’m chewing on between projects.',
    readingSections: [
      { name: 'On the shelf', items: [
        { title: 'Thinking in Systems', by: 'Donella Meadows', note: 'Mental models I keep coming back to.' },
        { title: 'The Making of a Manager', by: 'Julie Zhuo', note: 'For every new leadership role.' },
        { title: 'Antifragile', by: 'Nassim Taleb', note: 'How to gain from disorder.' },
      ]},
      { name: 'On screen', items: [
        { title: 'Severance', by: 'Series', note: 'Work-life balance, taken literally.' },
        { title: 'Everything Everywhere All at Once', by: 'Film', note: 'Jack of many universes.' },
        { title: 'The Bear', by: 'Series', note: 'Chaos, teams, and shipping under pressure.' },
      ]},
      { name: 'In the feed', items: [
        { title: 'Paul Graham Essays', by: 'Longreads', note: 'Startups and clear thinking.' },
        { title: 'Stratechery', by: 'Ben Thompson', note: 'Business strategy, weekly.' },
        { title: 'Distill.pub', by: 'ML writing', note: 'ML explained beautifully.' },
      ]},
    ],
  } satisfies ReadingContent,
};

export const TECH_HASHES = ['a1f4c02', '7e9b31d', 'c4d88a0', '2b6f159', '9ac3e77', '04e1b6f', 'f38d0a2', '6c72e94', 'e5109bd'];
export const LEADERSHIP_ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
export const READING_PALETTE = ['#ff3b6b', '#2d5bff', '#ffcf2e', '#19c37d', '#a855f7'];
export const READING_ROTS = ['-2deg', '1.6deg', '-1deg', '2deg', '-1.4deg', '1deg'];
