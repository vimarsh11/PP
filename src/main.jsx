import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowDownRight, ArrowRight, Bot, BriefcaseBusiness, CheckCircle2, ChevronUp,
  Code2, Download, ExternalLink, FileText, Github, GraduationCap, Heart,
  Linkedin, Mail, MapPin, Menu, Moon, Paperclip, Send, Sparkles, Trophy,
  Twitter, UserRound, X, Wrench, Zap
} from 'lucide-react';
import './styles.css';

const profile = {
  name: 'Vimarsh Jaiswal',
  email: 'jaiswaldesh16@gmail.com',
  linkedin: 'https://www.linkedin.com/in/vimarshjaiswal',
  twitter: 'https://twitter.com/jaiswal_vimarsh',
  github: 'https://github.com/vimarsh11',
  location: 'Lucknow, Uttar Pradesh',
};

const experiences = [
  { date: 'May 2023 — Jul 2023', title: 'AI-ML Virtual Internship', company: 'AICTE NEAT', detail: 'Amazon Web Services (AWS) · Machine Learning · Artificial Intelligence', icon: Code2 },
  { date: 'Aug 2023 — Present', title: 'Graphic Design Lead', company: 'CodeChef ABESEC Chapter', detail: 'Leading the graphics team and creating engaging creatives for events and social media.', icon: Sparkles },
  { date: 'Sep 2022 — Nov 2023', title: 'Coordinator', company: 'Ardema', detail: 'Solved graphics and technical problems while coordinating activities and events.', icon: BriefcaseBusiness },
];

const projects = [
  { title: 'FileSpeak', subtitle: 'AI-powered PDF assistant', tags: ['Python', 'Gemini', 'PDF', 'AI'], image: '/assets/1p.png', fallback: 'FILESPEAK', link: 'https://github.com/vimarsh11' },
  { title: 'Ink & Quill', subtitle: 'AI content generation platform', tags: ['Python', 'Streamlit', 'Gemini'], image: '/assets/2p.png', fallback: 'INK & QUILL', link: 'https://github.com/vimarsh11' },
  { title: 'PPT Tracking Controller', subtitle: 'Automate PPT tracking with ease', tags: ['Python', 'Automation', 'Productivity'], image: '/assets/3p.png', fallback: 'PPT TRACKING', link: 'https://github.com/vimarsh11' },
];

const skillGroups = [
  { title: 'Programming', icon: Code2, items: ['Python', 'C', 'C++', 'JavaScript'] },
  { title: 'Web Development', icon: Zap, items: ['HTML', 'CSS', 'React', 'Streamlit'] },
  { title: 'AI / ML', icon: Sparkles, items: ['Machine Learning', 'GenAI', 'NLP', 'Computer Vision'] },
  { title: 'Tools & Design', icon: Wrench, items: ['Git', 'GitHub', 'Figma', 'Canva', 'Bootstrap', 'Tailwind'] },
];

const achievements = [
  { title: 'Coding', description: '147+ LeetCode · 125+ GFG', icon: '🏅' },
  { title: 'Open Source', description: 'Frontend + DSA contributions', icon: '🟢' },
  { title: 'Hackathons', description: 'Participated in 5+ hackathons', icon: '🚀' },
  { title: 'Leadership', description: 'Graphic Design Lead · CodeChef ABESEC', icon: '⭐' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [dark, setDark] = useState(true);
  const [showTop, setShowTop] = useState(false);
  const [chatOpen, setChatOpen] = useState(true);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([{ role: 'bot', text: 'Ask me anything about my projects, skills, experience or resume!' }]);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 500);
      const ids = ['home', 'about', 'experience', 'projects', 'skills', 'achievements', 'contact'];
      const current = ids.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top <= 130 && r.bottom > 130;
      });
      if (current) setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = ['home', 'about', 'experience', 'projects', 'skills', 'achievements', 'contact'];
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const ask = () => {
    const q = question.trim();
    if (!q) return;
    const lower = q.toLowerCase();
    let answer = 'I can tell you about my background, projects, skills, experience, achievements, or how to contact me.';
    if (lower.includes('project')) answer = 'My featured projects are FileSpeak, Ink & Quill, and PPT Tracking Controller. You can open their GitHub links in the Projects section.';
    else if (lower.includes('skill') || lower.includes('tech')) answer = 'My toolkit includes Python, C/C++, JavaScript, React, HTML/CSS, Machine Learning, GenAI, NLP, Computer Vision, Git, GitHub, Figma, Canva, Bootstrap and Tailwind.';
    else if (lower.includes('experience')) answer = 'I have an AI/ML virtual internship with AICTE NEAT, experience as Graphic Design Lead at CodeChef ABESEC Chapter, and coordinator experience at Ardema.';
    else if (lower.includes('contact') || lower.includes('email')) answer = `The best way to reach me is ${profile.email}. You can also use the contact form below.`;
    else if (lower.includes('resume')) answer = 'My resume can be downloaded using the Resume button in the navigation or the contact area. Add your PDF as public/assets/WD Resume.pdf.';
    setMessages((m) => [...m, { role: 'user', text: q }, { role: 'bot', text: answer }]);
    setQuestion('');
  };

  return (
    <div className={dark ? 'app dark' : 'app light'}>
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <Header active={active} menuOpen={menuOpen} setMenuOpen={setMenuOpen} scrollTo={scrollTo} dark={dark} setDark={setDark} />
      <main>
        <Hero scrollTo={scrollTo} />
        <Stats />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <Chat open={chatOpen} setOpen={setChatOpen} question={question} setQuestion={setQuestion} messages={messages} ask={ask} />
      {showTop && <button className="to-top" onClick={() => scrollTo('home')} aria-label="Back to top"><ChevronUp size={20} /></button>}
    </div>
  );
}

function Header({ active, menuOpen, setMenuOpen, scrollTo, dark, setDark }) {
  return <header className="header"><div className="nav-shell">
    <button className="brand" onClick={() => scrollTo('home')}>VJ</button>
    <nav className={menuOpen ? 'nav mobile-open' : 'nav'}>{['home','about','experience','projects','skills','achievements','contact'].map((id) => <button key={id} className={active === id ? 'active' : ''} onClick={() => scrollTo(id)}>{id[0].toUpperCase()+id.slice(1)}</button>)}</nav>
    <div className="nav-actions"><button className="icon-button" onClick={() => setDark(!dark)} aria-label="Toggle theme">{dark ? <Moon size={17}/> : <Sparkles size={17}/>}</button><a className="resume-button" href="/assets/WD%20Resume.pdf" download><Download size={15}/> Download Resume</a><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">{menuOpen ? <X/> : <Menu/>}</button></div>
  </div></header>;
}

function Hero({ scrollTo }) { return <section id="home" className="hero section"><div className="container hero-grid">
  <motion.div className="hero-copy" initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{duration:.7}}>
    <div className="eyebrow">Hi, I'm</div><h1>Vimarsh <span>Jaiswal</span></h1><div className="headline">AI/ML Enthusiast <b>•</b> Full-Stack Developer <b>•</b> Creative Technologist</div>
    <p>Computer Science & Engineering student with a passion for building intelligent and user-focused applications. Exploring the intersection of AI, web development and design to create impactful solutions.</p>
    <div className="hero-cta"><button className="primary-button" onClick={() => scrollTo('projects')}>View Projects <ArrowRight size={18}/></button><button className="secondary-button" onClick={() => scrollTo('contact')}>Let's Connect <Send size={16}/></button></div>
    <div className="social-row"><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin/></a><a href={profile.github} target="_blank" rel="noreferrer"><Github/></a><a href={profile.twitter} target="_blank" rel="noreferrer"><Twitter/></a><a href={`mailto:${profile.email}`}><Mail/></a></div>
  </motion.div>
  <motion.div className="hero-art" initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} transition={{duration:.8,delay:.15}}>
    <div className="hero-orb"/><div className="profile-placeholder"><img src="/assets/vimport.png" alt="Vimarsh Jaiswal" onError={(e)=>{e.currentTarget.style.display='none'; e.currentTarget.nextSibling.style.display='flex';}}/><div className="initials">VJ</div></div>
    <div className="float-badge badge-ai"><Sparkles size={15}/> AI/ML</div><div className="float-badge badge-web"><Code2 size={15}/> Web Development</div><div className="float-badge badge-design"><Sparkles size={15}/> Graphic Design</div>
    <div className="scribble">Build<br/>Learn<br/>Innovate<br/>Repeat</div>
  </motion.div>
</div></section>; }

function Stats(){ return <div className="container stats-card">{[['5+','Projects',Code2],['147+','LeetCode',Trophy],['125+','GFG',Zap],['5+','Hackathons',UserRound]].map(([n,l,I])=><div className="stat" key={l}><div className="stat-icon"><I size={23}/></div><div><strong>{n}</strong><span>{l}</span></div></div>)}</div> }

function SectionHeading({icon:Icon,title,sub}){return <div className="section-heading"><div className="section-icon"><Icon size={22}/></div><div><h2>{title}</h2>{sub&&<p>{sub}</p>}</div></div>}

function About(){return <section id="about" className="section"><div className="container"><SectionHeading icon={UserRound} title="About Me"/><div className="about-grid"><div className="about-copy"><p>I'm a Computer Science & Engineering student at ABES Engineering College, Ghaziabad, specializing in AI & ML. I'm well-versed in C/C++, Python, and web development, and I also have a keen interest in graphic design.</p><p>I love exploring new technologies, building projects, and continuously learning to make a positive impact in the tech industry.</p></div><div className="info-card"><Info icon={UserRound} label="Name" value={profile.name}/><Info icon={GraduationCap} label="Education" value="B.Tech CSE (AI & ML), ABES EC"/><Info icon={MapPin} label="Location" value={profile.location}/><Info icon={Mail} label="Email" value={profile.email}/></div></div></div></section>}
function Info({icon:Icon,label,value}){return <div className="info-row"><Icon size={18}/><span>{label}</span><strong>{value}</strong></div>}

function Experience(){return <section id="experience" className="section"><div className="container"><SectionHeading icon={BriefcaseBusiness} title="Experience"/><div className="timeline">{experiences.map(({date,title,company,detail,icon:Icon},i)=><motion.div className="timeline-item" key={title} initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.08}}><div className="timeline-dot"><Icon size={15}/></div><div className="timeline-date">{date}</div><div className="timeline-content"><h3>{title}</h3><div className="company">{company}</div><p>{detail}</p></div></motion.div>)}</div></div></section>}

function Projects(){return <section id="projects" className="section"><div className="container"><div className="heading-line"><SectionHeading icon={Code2} title="Featured Projects"/><a href={profile.github} target="_blank" rel="noreferrer" className="view-all">View All <ArrowRight size={16}/></a></div><div className="project-grid">{projects.map((p,i)=><motion.article className="project-card" key={p.title} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.08}}><div className="project-thumb"><img src={p.image} alt="" onError={(e)=>{e.currentTarget.style.display='none';e.currentTarget.parentElement.classList.add('fallback')}}/><span>{p.fallback}</span></div><div className="project-body"><h3>{p.title}</h3><p>{p.subtitle}</p><div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div><div className="project-links"><a className="small-primary" href={p.link} target="_blank" rel="noreferrer"><Github size={14}/> GitHub</a><a className="small-secondary" href={p.link} target="_blank" rel="noreferrer">Details <ExternalLink size={13}/></a></div></div></motion.article>)}</div></div></section>}

function Skills(){return <section id="skills" className="section"><div className="container"><SectionHeading icon={Wrench} title="Skills"/><div className="skill-grid">{skillGroups.map(({title,icon:Icon,items})=><div className="skill-card" key={title}><div className="skill-title"><Icon size={21}/><h3>{title}</h3></div><div className="tags">{items.map(x=><span key={x}>{x}</span>)}</div></div>)}</div></div></section>}
function Achievements(){return <section id="achievements" className="section"><div className="container"><SectionHeading icon={Trophy} title="Achievements"/><div className="achievement-grid">{achievements.map(a=><div className="achievement-card" key={a.title}><div className="achievement-emoji">{a.icon}</div><div><h3>{a.title}</h3><p>{a.description}</p></div></div>)}</div></div></section>}

function Contact(){return <section id="contact" className="section contact-section"><div className="container"><SectionHeading icon={Mail} title="Let's Work Together" sub="Have a project, opportunity, or just want to say hello? I'd love to hear from you."/><div className="contact-grid"><form className="contact-form" action={`https://formsubmit.co/${profile.email}`} method="POST"><input type="hidden" name="_captcha" value="false"/><input type="hidden" name="_subject" value="New portfolio enquiry"/><div className="two-inputs"><input name="name" placeholder="Your Name" required/><input type="email" name="email" placeholder="Your Email" required/></div><textarea name="message" placeholder="Your Message" rows="6" required/><button className="primary-button" type="submit">Send Message <ArrowRight size={17}/></button></form><div className="contact-art"><div className="art-circle"><Code2 size={52}/></div><div className="art-bubble b1"><Paperclip/></div><div className="art-bubble b2"><Sparkles/></div><div className="art-bubble b3"><Zap/></div><div className="scribble contact-scribble">Good<br/>Ideas<br/>Build<br/>Great Things</div></div></div></div></section>}

function Chat({open,setOpen,question,setQuestion,messages,ask}){return <div className={open?'chat open':'chat'}><button className="chat-head" onClick={()=>setOpen(!open)}><span><Bot size={17}/> Ask VimAI</span><span>{open?'−':'+'}</span></button><AnimatePresence>{open&&<motion.div className="chat-body" initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}><div className="messages">{messages.slice(-5).map((m,i)=><div key={i} className={m.role==='bot'?'bot-message':'user-message'}>{m.text}</div>)}</div><div className="chat-input"><input value={question} onChange={e=>setQuestion(e.target.value)} onKeyDown={e=>e.key==='Enter'&&ask()} placeholder="Type your question..."/><button onClick={ask}><Send size={16}/></button></div></motion.div>}</AnimatePresence></div>}

function Footer(){return <footer><div className="container footer-inner"><div className="footer-brand">VJ</div><div>© 2026 Vimarsh Jaiswal. All rights reserved.</div><div className="footer-social"><a href={profile.linkedin}><Linkedin/></a><a href={profile.github}><Github/></a><a href={profile.twitter}><Twitter/></a><a href={`mailto:${profile.email}`}><Mail/></a></div><div>Made with <Heart size={14} fill="currentColor"/> using React</div></div></footer>}

createRoot(document.getElementById('root')).render(<App/>);
