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
  img?: string;
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
    intro: 'From generating datasets to shipping features to machine learning research to developing and testing trading strategies.',
    roles: [
      { dates: 'Jan 2026 – Present', place: 'Baltimore, MD', role: 'Founding Engineer', org: 'EligioAI', orgDesc: 'AI platform for patient triage & clinician scheduling',
        summary: 'Built a healthcare platform from the ground up that makes patient triage more efficient. Built the RAG workflow to read, analyze and suggest the best clinician for the incoming patient.' },
      { dates: 'Jan 2026 – May 2026', place: 'Baltimore, MD', role: 'Data Scientist', org: 'Campbell', orgDesc: 'Quant firm — systematic futures & equities',
        summary: 'Developed and tested trading strategies using LLMs on years of oil-market news and pricing data, and built the data pipeline that fed them.' },
      { dates: 'Dec 2024 – Jan 2025', place: 'Baltimore, MD', role: 'Data Science Intern', org: 'Costac', orgDesc: 'Financial analytics platform for SMEs',
        summary: 'Built predictive models that helped small businesses forecast revenue and understand customer behavior from historical data.' },
      { dates: 'Feb 2024 – May 2024', place: 'Chennai, India', role: 'Research Intern', org: 'IIT Madras', orgDesc: 'AR/VR visualization research',
        summary: 'Researched and built AR/VR visualization tools to test whether immersive 3D environments helped researchers explore complex, multi-dimensional data more effectively than traditional displays.' },
      { dates: 'Jun 2022 – Jun 2023', place: 'Bengaluru, India', role: 'Software Developer', org: 'Teachmint', orgDesc: 'EdTech SaaS platform',
        summary: 'Revamped the data collection, processing, and storage module for the platform, making it faster and easier to maintain as the company grew.' },
      { dates: 'Jun 2021 – Jul 2021', place: 'Charlotte, NC', role: 'Software Intern', org: 'Jobsage.ai', orgDesc: 'Job Recommendation Platform',
        summary: 'Automated job postings from recruiter emails and wrote scripts to keep promotional offers accurate and up to date.' },
      { dates: 'Apr 2020 – Jun 2020', place: 'Mumbai, India', role: 'Machine Learning Intern', org: 'Sustlabs', orgDesc: 'Energy Analytics Platform',
        summary: 'Built, generated the data to train and deployed models that predicted household energy use in real time across thousands of homes.' },
      { dates: 'Dec 2019 – Jan 2020', place: 'Mumbai, India', role: 'Data Science Intern', org: 'Floww', orgDesc: 'SaaS ops platform for startups & MSMEs',
        summary: 'Wrote scripts to scrape vehicle data and built models to predict fuel efficiency for a startup analytics tool.' },
      { dates: 'Oct 2018 – Dec 2019', place: 'Mumbai, India', role: 'Member, Software Subsystem', org: 'Rakshak — IITB UAV Team', orgDesc: 'Drones for disaster response',
        summary: 'Trained vision models that helped disaster-response drones recognize people and terrain from aerial footage.' },
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
    title: 'Converting ambiguious problems into executive recommendations.',
    intro: 'Case engagements which included sizing markets, building revenue models, and shaping go-to-market strategy for startups.',
    roles: [
      { dates: 'Aug 2025 – May 2026', place: 'Johns Hopkins', role: 'Co-President', org: 'JHU Consulting Club', orgDesc: 'Case prep, business training & firm networking',
        summary: 'Co-led the consulting club, expanded the club to graduate students, organized recruiting events with top firms and launched the school’s first case competition between universities.' },
      { dates: 'Jan – May 2026', place: 'Johns Hopkins', role: 'Consultant', org: 'Assistive-Speech Tech Startup', orgDesc: 'Case prep, business training & firm networking',
        summary: 'Led a student team researching the U.S. market for an assistive-speech technology company, sizing the opportunity and identifying which patient groups it should focus on first.' },
      { dates: 'Aug – Dec 2025', place: 'Johns Hopkins', role: 'Consultant', org: 'Sustainable Concrete Startup', orgDesc: 'Climate tech — permeable concrete & stormwater',
        summary: 'Built a pricing and go-to-market strategy for a sustainable concrete startup to improve its profitability and win early municipal customers.' },
      { dates: 'Jan – May 2026', place: 'Johns Hopkins', role: 'Consultant', org: 'AI Waste-Management Startup', orgDesc: 'AI computer-vision waste sorting',
        summary: 'Rebuilt the market research and growth projections for an AI-powered waste-sorting company to make its case more credible to investors.' },
      { dates: 'Aug 2025 – May 2026', place: 'Johns Hopkins', role: 'Partner, Data Analytics', org: 'Breezwei', orgDesc: 'Pro-bono advisory to sustainability startups',
        summary: 'Led the research and data work that helps early-stage sustainability startups get ready to pitch investors.' },
      { dates: 'Aug – Dec 2025', place: 'Johns Hopkins', role: 'Director', org: 'AR/VR Startup', orgDesc: 'PM skills through projects & events',
        summary: 'Led a student team that built a full business strategy, including competitor and pricing research, for an AR/VR startup.' },
    ],
  } satisfies ConsultingContent,

  leadership: {
    kicker: '03 — Leadership & Community',
    title: 'Building, running, leading and expanding multiple organizations.',
    intro: 'Leadership experiences across technical, design, marketing, consulting and more.',
    roles: [
      { dates: 'Aug 2025 – May 2026', place: 'Johns Hopkins', role: 'Executive Board Member', org: 'Graduate Representative Organization', orgDesc: 'Governance body for 2,500+ grad students',
        summary: 'Helped lead the university’s main graduate student government, planning large campus events and representing student interests to the administration.' },
      { dates: 'Aug 2025 – May 2026', place: 'Johns Hopkins', role: 'Co-President', org: 'JHU Consulting Club', orgDesc: 'Career prep & recruiter engagement',
        summary: 'Co-led the graduate consulting club, organizing recruiting events with top firms and launching the school’s first case competition between universities.' },
      { dates: 'Aug 2025 – May 2026', place: 'Johns Hopkins', role: 'Lead Consultant', org: 'Startup Consulting Engagements', orgDesc: 'Market sizing & GTM strategy for startups',
        summary: 'Led multiple concurrent consulting engagements for early-stage startups, managing student teams through market research, pricing, and go-to-market strategy work.' },
      { dates: 'Aug 2025 – Dec 2025', place: 'Johns Hopkins', role: 'Director of Outreach', org: 'Johns Hopkins Product Management Club', orgDesc: 'PM community, workshops & recruiting',
        summary: 'Led outreach for the Product Management Club, building relationships with other teams and clubs to grow engagement.' },
      { dates: 'Apr 2025 – May 2026', place: 'Johns Hopkins', role: 'Event & Social Chair', org: 'Stand Up Comedy Club', orgDesc: 'We do stand-up. Or at least try to.',
        summary: 'Grew the comedy club’s community by organizing shows, workshops and collaboration with other performing arts groups. Secured a grant to showcase South Asian culture in arts.' },
      { dates: 'Jan – Apr 2025', place: 'Johns Hopkins', role: 'Director, Design & Marketing', org: 'Culture Show', orgDesc: 'Hopkins’ flagship cultural showcase',
        summary: 'Led the design and marketing for the university’s biggest cultural showcase, coordinating a team and volunteers to put on a smooth live event.' },
      { dates: 'Oct 2024 – May 2026', place: 'Johns Hopkins', role: 'Student Ambassador', org: 'International Students at Hopkins', orgDesc: 'Community & cultural integration',
        summary: 'Organized events and outings to help incoming international students settle in and build community.' },
      { dates: 'Jan 2025 – May 2026', place: 'Johns Hopkins', role: 'Team Lead', org: 'Sustainable Hopkins Innovative Projects', orgDesc: 'Campus sustainability initiatives',
        summary: 'Organized clothing drives and food-donation efforts to support campus sustainability. Built the team leading food recovery initiatives.' },
      { dates: 'Feb 2024 – May 2024', place: 'Chennai, India', role: 'Project Management Intern', org: 'IIT Madras', orgDesc: 'AR/VR visualization research',
        summary: 'Led and coordinated student researchers across two labs, managing timelines and cross-team collaboration on ongoing visualization projects.' },
      { dates: 'Aug 2019 – Feb 2020', place: 'IIT Bombay', role: 'Media & PR Coordinator', org: 'Abhyuday', orgDesc: 'India’s largest student-run social org',
        summary: 'Coordinated a large network of student volunteers across India and helped secure funding for the organization’s flagship event.' },
    ],
  } satisfies LeadershipContent,

  reading: {
    kicker: '04 — Off the Clock',
    title: 'Who and what I keep coming back to.',
    intro: 'A rotating, slightly chaotic list of the comedians, authors, films, and books I’m currently obsessed with.',
    readingSections: [
      { name: 'Comedians I love', items: [
        { title: 'Anthony Jeselnik', by: 'Comedian', note: 'Comedy writer with surgery level precision.',
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Anthony_Jeselnik_in_2012.jpg/330px-Anthony_Jeselnik_in_2012.jpg' },
        { title: 'Bill Burr', by: 'Comedian', note: 'Might be the best ranter out there.',
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bill_Burr_by_Gage_Skidmore.jpg/330px-Bill_Burr_by_Gage_Skidmore.jpg' },
        { title: 'Jimmy Carr', by: 'Comedian', note: 'Razor-sharp wit.',
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Jimmy_Carr_2024_%28cropped%29.png/330px-Jimmy_Carr_2024_%28cropped%29.png' },
        { title: 'Dave Chappelle', by: 'Comedian', note: 'Still the standard everyone else is graded on.',
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Dave_Chappelle_at_Preamiere_of_%22Dave_Chappelle_In_Real_Life%22_%282%29_%28cropped_2%29.jpg/330px-Dave_Chappelle_at_Preamiere_of_%22Dave_Chappelle_In_Real_Life%22_%282%29_%28cropped_2%29.jpg' },
      ]},
      { name: 'Favorite authors', items: [
        { title: 'Malcolm Gladwell', by: 'Author', note: 'Master at beaking down complex ideas.',
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Malcolm_Gladwell%2C_author%2C_at_SXSW_2025_02_%28cropped%29.jpg/330px-Malcolm_Gladwell%2C_author%2C_at_SXSW_2025_02_%28cropped%29.jpg' },
        { title: 'Gabriel García Márquez', by: 'Author', note: 'A literary giant.',
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Gabriel_Garcia_Marquez.jpg/330px-Gabriel_Garcia_Marquez.jpg' },
        { title: 'Chinua Achebe', by: 'Author', note: 'Lots of things fall apart, but his work stands. (Pun Intended.)',
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Chinua_Achebe%2C_1966.jpg/330px-Chinua_Achebe%2C_1966.jpg' },
        { title: 'Franz Kafka', by: 'Author', note: 'A fan of Kafka is my friend without introduction.',
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Franz_Kafka%2C_1923.jpg/330px-Franz_Kafka%2C_1923.jpg' },
        { title: 'நா. முத்துக்குமார்', by: 'Na. Muthukumar — Author', note: 'Well, it\'s Tamil lyrics and poetry. It doesn\'t get any better than that.',
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Na_Muthukumar_at_Touring_Talkies_Audio_Launch_%28cropped%29.jpg/330px-Na_Muthukumar_at_Touring_Talkies_Audio_Launch_%28cropped%29.jpg' },
      ]},
      { name: 'Next on my watch list', items: [
        { title: 'Ran', by: 'Akira Kurosawa', note: 'Huge fan of Seven Samurai. Ran is next on the list.',
          img: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Kuroran.jpg' },
        { title: 'Fallen Angels', by: 'Wong Kar-wai', note: 'Heard a lot about it, just need the time.',
          img: 'https://upload.wikimedia.org/wikipedia/en/0/04/Fallen-Angels-Poster.jpg' },
        { title: 'A Hidden Life', by: 'Terrence Malick', note: 'Would be my first film of Malick.',
          img: 'https://upload.wikimedia.org/wikipedia/en/2/2d/HiddenLifePoster.jpeg' },
        { title: 'Dude', by: 'Keerthiswaran', note: 'The announcing of the superstar of Tamil cinema.',
          img: 'https://upload.wikimedia.org/wikipedia/en/d/de/Dude_%282025%29_Poster.jpeg' },
      ]},
      { name: 'Next on my reading list', items: [
        { title: 'White Nights', by: 'Fyodor Dostoevsky', note: 'Lonley guy has a crush, me too Doestoevsky, me too.',
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Dostoyevski_-_White_Nights_%281865%29.jpg/330px-Dostoyevski_-_White_Nights_%281865%29.jpg' },
        { title: 'Poor Economics', by: 'Abhijit Banerjee & Esther Duflo', note: 'Wanting to learn economics.',
          img: 'https://upload.wikimedia.org/wikipedia/en/1/1a/Poor_Economics.jpg' },
        { title: 'The Remains of the Day', by: 'Kazuo Ishiguro', note: "Read half of it, very unique work.",
          img: 'https://upload.wikimedia.org/wikipedia/en/c/c7/KazuoIshiguro_TheRemainsOfTheDay.jpg' },
      ]},
    ],
  } satisfies ReadingContent,
};

export const TECH_HASHES = ['a1f4c02', '7e9b31d', 'c4d88a0', '2b6f159', '9ac3e77', '04e1b6f', 'f38d0a2', '6c72e94', 'e5109bd'];
export const LEADERSHIP_ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
export const READING_PALETTE = ['#ff3b6b', '#2d5bff', '#ffcf2e', '#19c37d', '#a855f7'];
export const READING_ROTS = ['-2deg', '1.6deg', '-1deg', '2deg', '-1.4deg', '1deg'];
