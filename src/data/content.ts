export interface Role {
  dates: string;
  place: string;
  role: string;
  org: string;
  orgDesc: string;
  summary: string;
}

export interface Project {
  name: string;
  meta: string;
  summary: string;
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
  roles: Role[];
  projects: Project[];
  skillsTech: string[];
  skillsDomain: string[];
}

export interface ConsultingContent {
  kicker: string;
  title: string;
  intro: string;
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
    roles: [
      { dates: 'Jan 2026 – Present', place: 'Baltimore, MD', role: 'Founding Engineer', org: 'EligioAI', orgDesc: 'AI platform for patient triage & clinician scheduling',
        summary: 'Built a healthcare platform from the ground up that reads incoming patient referral documents, pulls out the key medical details automatically, and routes patients to the right care team.' },
      { dates: 'Jan 2026 – May 2026', place: 'Baltimore, MD', role: 'Data Scientist', org: 'Campbell', orgDesc: 'Quant firm — systematic futures & equities',
        summary: 'Analyzed years of oil-market news and pricing data to help a trading firm better anticipate crude-oil price movements.' },
      { dates: 'Dec 2024 – Jan 2025', place: 'Baltimore, MD', role: 'Data Science Intern', org: 'Costac', orgDesc: 'Analytics for SME finance & customer behavior',
        summary: 'Built predictive models that helped small businesses forecast revenue and understand customer behavior from historical data.' },
      { dates: 'Feb 2024 – May 2024', place: 'Chennai, India', role: 'Research Intern', org: 'IIT Madras', orgDesc: 'AR/VR visualization research',
        summary: 'Researched and built virtual-reality demos that made complex, multi-dimensional data easier for researchers to explore and understand.' },
      { dates: 'Jun 2022 – Jun 2023', place: 'Bengaluru, India', role: 'Software Developer', org: 'Teachmint', orgDesc: 'EdTech platform',
        summary: 'Rebuilt core parts of an education platform to make it noticeably faster and easier to maintain as the company grew.' },
      { dates: 'Jun 2021 – Jul 2021', place: 'Charlotte, NC', role: 'Software Intern', org: 'Jobsage.ai', orgDesc: 'AI recruitment & job recommendation',
        summary: 'Automated how a recruiting platform pulled job postings from emails and kept its promotional offers accurate and up to date.' },
      { dates: 'Apr 2020 – Jun 2020', place: 'Mumbai, India', role: 'Machine Learning Intern', org: 'Sustlabs', orgDesc: 'Residential energy analytics',
        summary: 'Built and deployed models that predicted household energy use in real time across thousands of homes.' },
      { dates: 'Dec 2019 – Jan 2020', place: 'Mumbai, India', role: 'Data Science Intern', org: 'Floww', orgDesc: 'SaaS ops platform for startups & MSMEs',
        summary: 'Collected vehicle data from the web and built models to predict fuel efficiency for a startup analytics tool.' },
      { dates: 'Oct 2018 – Dec 2019', place: 'Mumbai, India', role: 'Member, Software Subsystem', org: 'Rakshak — IITB UAV Team', orgDesc: 'Drones for disaster response',
        summary: 'Trained computer-vision models that helped disaster-response drones recognize people and terrain from aerial footage.' },
    ],
    projects: [
      { name: 'Vector DB vs Knowledge Graph', meta: 'RAG · LangChain · ChromaDB · GPT-4 · 2025',
        summary: 'Compared two different ways of helping an AI assistant search and retrieve information, to see which gave more accurate answers.' },
      { name: 'Multi-Modal Lip Reading', meta: 'PyTorch · Fusion · 2025',
        summary: 'Built a system that reads lips by combining audio, video, and language context to understand speech more accurately.' },
      { name: 'AI Water-Quality Modeling', meta: 'CNN/GRU/LSTM · IITB · 2023',
        summary: 'Built models that forecast water quality from historical environmental data.' },
      { name: 'Fantasy T20 Cricket Optimizer', meta: 'Genetic Algorithm · IITB · 2023',
        summary: 'Built an algorithm that picks the best possible fantasy cricket lineup based on player performance history.' },
      { name: 'Composite Structures Analysis', meta: 'ML Regression · IITB · 2020',
        summary: 'Used machine learning to predict how different material combinations hold up under stress.' },
      { name: 'IPL Data Analysis', meta: 'EDA · IITB · 2019',
        summary: 'Analyzed years of cricket match data to uncover trends in player and team performance.' },
      { name: 'React Sales Dashboard', meta: 'React · Supabase · Chart.js',
        summary: 'Built a live sales dashboard that updates instantly as new orders come in.' },
      { name: 'Minimal Social Platform', meta: 'Firebase · Firestore · Auth',
        summary: 'Built a simple social app with account sign-in and a live, scrolling feed of posts.' },
      { name: 'E-commerce PMS', meta: 'Express · SQLite',
        summary: 'Built an inventory management tool for an online store, letting staff track and search products easily.' },
    ],
    skillsTech: ['Python', 'JavaScript', 'SQL', 'PyTorch', 'TensorFlow', 'Pandas', 'Scikit-Learn', 'Git', 'Linux', 'Google Cloud', 'Excel'],
    skillsDomain: ['Deep Learning', 'Machine Learning', 'NLP', 'Frontend', 'Backend', 'Databases', 'Data Analysis', 'Optimization'],
  } satisfies TechContent,

  consulting: {
    kicker: '02 — Strategy & Consulting',
    title: 'I turn ambiguity into a defensible market case.',
    intro: 'Case engagements sizing markets, building revenue models, and shaping go-to-market strategy for startups and climate tech.',
    roles: [
      { dates: 'Jan – May 2026', place: 'Johns Hopkins', role: 'Consultant', org: 'JHU Graduate Consulting Club — Voiceitt 2.0', orgDesc: 'Case prep, business training & firm networking',
        summary: 'Led a student team researching the U.S. market for an assistive-speech technology company, sizing the opportunity and identifying which patient groups it should focus on first.' },
      { dates: 'Aug – Dec 2025', place: 'Johns Hopkins', role: 'Consultant', org: 'AquiPor (via Breezwei)', orgDesc: 'Climate tech — permeable concrete & stormwater',
        summary: 'Built a pricing and go-to-market strategy for a sustainable concrete startup to improve its profitability and win early municipal customers.' },
      { dates: 'Jan – May 2026', place: 'Johns Hopkins', role: 'Consultant', org: 'DWaste (via Breezwei)', orgDesc: 'AI computer-vision waste sorting',
        summary: 'Rebuilt the market research and growth projections for an AI-powered waste-sorting company to make its case more credible to investors.' },
      { dates: 'Aug 2025 – May 2026', place: 'Johns Hopkins', role: 'Partner, Data Analytics', org: 'Breezwei', orgDesc: 'Pro-bono advisory to sustainability startups',
        summary: 'Led the research and data work that helps early-stage sustainability startups get ready to pitch investors.' },
      { dates: 'Aug – Dec 2025', place: 'Johns Hopkins', role: 'Director', org: 'JHU Product Management Club', orgDesc: 'PM skills through projects & events',
        summary: 'Led a student team that built a full business strategy, including competitor and pricing research, for an AR/VR startup.' },
    ],
  } satisfies ConsultingContent,

  leadership: {
    kicker: '03 — Leadership & Community',
    title: 'I build organizations and the events that fill them.',
    intro: 'From governing 2,500+ graduate students to launching an intercollegiate case competition, I lead teams that ship real experiences.',
    roles: [
      { dates: 'Aug 2025 – May 2026', place: 'Johns Hopkins', role: 'Executive Board Member', org: 'Graduate Representative Organization', orgDesc: 'Governance body for 2,500+ grad students',
        summary: 'Helped lead the university’s main graduate student government, planning large campus events and representing student interests to the administration.' },
      { dates: 'Aug 2025 – May 2026', place: 'Johns Hopkins', role: 'Co-President', org: 'JHU Consulting Club', orgDesc: 'Career prep & recruiter engagement',
        summary: 'Co-led the graduate consulting club, organizing recruiting events with top firms and launching the school’s first case competition between universities.' },
      { dates: 'Apr 2025 – May 2026', place: 'Johns Hopkins', role: 'Event & Social Chair', org: 'Stand Up Comedy Club', orgDesc: 'We do stand-up. Or at least try to.',
        summary: 'Grew the comedy club’s community by organizing shows and workshops, and secured a grant to put on a show blending comedy and dance.' },
      { dates: 'Jan – Apr 2025', place: 'Johns Hopkins', role: 'Director, Design & Marketing', org: 'Culture Show', orgDesc: 'Hopkins’ flagship cultural showcase',
        summary: 'Led the design and marketing for the university’s biggest cultural showcase, coordinating a team and volunteers to put on a smooth live event.' },
      { dates: 'Oct 2024 – May 2026', place: 'Johns Hopkins', role: 'Student Ambassador', org: 'International Students at Hopkins', orgDesc: 'Community & cultural integration',
        summary: 'Organized events and outings to help incoming international students settle in and build community.' },
      { dates: 'Jan 2025 – May 2026', place: 'Johns Hopkins', role: 'Member', org: 'Sustainable Hopkins Innovative Projects', orgDesc: 'Campus sustainability initiatives',
        summary: 'Organized clothing drives and food-donation efforts to support campus sustainability.' },
      { dates: 'Aug 2019 – Feb 2020', place: 'IIT Bombay', role: 'Media & PR Coordinator', org: 'Abhyuday', orgDesc: 'India’s largest student-run social org',
        summary: 'Coordinated a large network of student volunteers across India and helped secure funding for the organization’s flagship event.' },
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
