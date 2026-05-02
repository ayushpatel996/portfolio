import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal, Code2, Database, Cloud, Wrench, Award,
  Briefcase, Mail, Github, Linkedin, ExternalLink,
  ChevronRight, Zap, Shield, Cpu, Layers, Star, MapPin, Phone
} from 'lucide-react';

// Particle Background Component
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 136, ${p.opacity})`;
        ctx.fill();

        // Connect particles
        particles.forEach((p2, j) => {
          if (i !== j) {
            const dist = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
            if (dist < 150) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(0, 255, 136, ${0.1 * (1 - dist / 150)})`;
              ctx.stroke();
            }
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />;
};

// Navigation Dots
const NavigationDots = () => {
  const sections = ['hero', 'experience', 'stats', 'skills', 'achievements', 'projects', 'contact'];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {sections.map((section, i) => (
        <button
          key={section}
          onClick={() => scrollToSection(section)}
          className="group relative"
        >
          <div className="w-3 h-3 rounded-full border-2 border-[#00ff88] transition-all duration-300 hover:bg-[#00ff88] hover:scale-125" />
          <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono whitespace-nowrap bg-[#1a1a2e] px-2 py-1 rounded">
            {section.toUpperCase()}
          </span>
        </button>
      ))}
    </div>
  );
};

// Typing Animation Component
const TypingText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }, delay);
  }, [text, delay]);

  return <span className="font-mono">{displayed}<span className="animate-pulse">|</span></span>;
};

// XP Progress Bar
const XPBar = () => {
  const [progress, setProgress] = useState(0);
  const xpToSenior = 60; // Years to senior

  useEffect(() => {
    setTimeout(() => setProgress(62), 500);
  }, []);

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between text-sm font-mono mb-2">
        <span className="text-[#00ff88]">LEVEL 5</span>
        <span className="text-[#888]">Software Engineer 2</span>
      </div>
      <div className="h-4 bg-[#1a1a2e] rounded-full overflow-hidden border border-[#333]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-[#00ff88] to-[#00cc6a] relative"
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] animate-pulse" />
        </motion.div>
      </div>
      <div className="flex justify-between text-xs font-mono mt-1 text-[#888]">
        <span>4 YRS EXP</span>
        <span>{progress}% to SENIOR</span>
      </div>
    </div>
  );
};

// Stats Card Component
const StatCard = ({ icon: Icon, value, label, targetId }: { icon: any; value: string; label: string; targetId?: string }) => {
  const handleClick = () => {
    if (targetId) {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 255, 136, 0.3)' }}
      className="bg-[#1a1a2e] border border-[#333] rounded-xl p-6 flex flex-col items-center gap-3 cursor-pointer transition-all duration-300 relative group"
    >
      <Icon className="w-8 h-8 text-[#00ff88]" />
      <div className="text-3xl font-bold font-mono text-white">{value}</div>
      <div className="text-sm text-[#888] flex items-center gap-1">
        {label}
        {targetId && <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#00ff88] -mr-5" />}
      </div>
    </motion.div>
  );
};

// Skill Tree Component
const SkillTree = () => {
  const skillCategories = [
    {
      name: 'Languages',
      icon: Code2,
      color: '#00ff88',
      skills: ['Java', 'SQL', 'Python']
    },
    {
      name: 'Backend',
      icon: Layers,
      color: '#ff6b35',
      skills: ['Spring Boot', 'REST APIs', 'Microservices', 'Hibernate', 'JPA']
    },
    {
      name: 'Distributed',
      icon: Database,
      color: '#a855f7',
      skills: ['Apache Kafka', 'Redis', 'Event Streaming']
    },
    {
      name: 'DevOps',
      icon: Cloud,
      color: '#3b82f6',
      skills: ['Docker', 'Kubernetes', 'Jenkins', 'CI/CD']
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {skillCategories.map((category, i) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          viewport={{ once: true }}
          className="bg-[#1a1a2e] border border-[#333] rounded-xl p-6 hover:border-[#00ff88] transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <category.icon className="w-6 h-6" style={{ color: category.color }} />
            <h3 className="font-mono font-bold text-lg">{category.name}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill, j) => (
              <motion.span
                key={skill}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: i * 0.1 + j * 0.05 }}
                viewport={{ once: true }}
                className="px-3 py-1 rounded-full text-sm font-medium border"
                style={{
                  borderColor: category.color,
                  color: category.color,
                  backgroundColor: 'transparent'
                }}
                whileHover={{
                  backgroundColor: category.color,
                  color: '#0a0a0f'
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Achievement Badge Component
const AchievementBadge = ({ icon: Icon, title, description, color }: { icon: any; title: string; description: string; color: string }) => (
  <motion.div
    whileHover={{ scale: 1.05, rotateY: 10 }}
    className="relative group bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] border border-[#333] rounded-2xl p-6 flex flex-col items-center gap-4"
  >
    <div
      className="w-16 h-16 rounded-full flex items-center justify-center"
      style={{ backgroundColor: `${color}20`, border: `2px solid ${color}` }}
    >
      <Icon className="w-8 h-8" style={{ color }} />
    </div>
    <div className="text-center">
      <h4 className="font-mono font-bold text-white">{title}</h4>
      <p className="text-sm text-[#888] mt-1">{description}</p>
    </div>
    <div
      className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
      style={{ backgroundColor: color }}
    >
      <Star className="w-3 h-3 text-[#0a0a0f]" fill="currentColor" />
    </div>
  </motion.div>
);

// Experience Timeline Component
const ExperienceTimeline = () => {
  const experiences = [
    {
      company: 'HashedIn by Deloitte',
      role: 'Software Engineer 2',
      period: 'Oct 2025 - Present',
      location: 'Pune, MH',
      color: '#00ff88',
      icon: Zap,
      achievements: [
        'Modernized legacy financial systems to microservices',
        'Implemented Apache Kafka for event-driven architecture',
        'Achieved 25-30% improvement in API response times with Redis'
      ]
    },
    {
      company: 'Infosys',
      role: 'Digital Specialist Engineer',
      period: 'Jun 2022 - Oct 2025',
      location: 'Bangalore, KA',
      color: '#ff6b35',
      icon: Shield,
      achievements: [
        'Built backend services for large-scale identity platform',
        'Reduced API latency by 20-25%',
        'Led UI development for admin workflows'
      ]
    }
  ];

  return (
    <div className="relative">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00ff88] via-[#a855f7] to-[#ff6b35]" />

      {experiences.map((exp, i) => (
        <motion.div
          key={exp.company}
          initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
            i % 2 === 0 ? 'md:flex-row-reverse' : ''
          }`}
        >
          <div className={`flex-1 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
            <div className="bg-[#1a1a2e] border border-[#333] rounded-xl p-6 hover:border-[#00ff88] transition-all">
              <div className="flex items-center gap-3 mb-3">
                <exp.icon className="w-6 h-6" style={{ color: exp.color }} />
                <h3 className="font-mono font-bold text-lg text-white">{exp.role}</h3>
              </div>
              <div className="flex flex-wrap gap-2 items-center mb-4">
                <span className="text-[#00ff88] font-mono text-sm">{exp.company}</span>
                <span className="text-[#888] text-sm">• {exp.period}</span>
              </div>
              <ul className="space-y-2">
                {exp.achievements.map((ach, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-[#ccc]">
                    <ChevronRight className="w-4 h-4 text-[#00ff88] flex-shrink-0 mt-0.5" />
                    {ach}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: exp.color, boxShadow: `0 0 20px ${exp.color}` }}
          >
            <exp.icon className="w-4 h-4 text-[#0a0a0f]" />
          </div>

          <div className="hidden md:block flex-1" />
        </motion.div>
      ))}
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ title, description, tech, color }: { title: string; description: string; tech: string[]; color: string }) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -5 }}
    className="bg-[#1a1a2e] border border-[#333] rounded-xl overflow-hidden group hover:border-[#00ff88] transition-all duration-300"
  >
    <div className="h-2 bg-gradient-to-r from-[#00ff88] to-[#a855f7]" />
    <div className="p-6">
      <h3 className="font-mono font-bold text-xl text-white mb-3">{title}</h3>
      <p className="text-[#888] text-sm mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tech.map((t, i) => (
          <span
            key={t}
            className="px-2 py-1 bg-[#0a0a0f] border border-[#333] rounded text-xs font-mono"
            style={{ borderColor: color }}
          >
            {t}
          </span>
        ))}
      </div>
      <button className="flex items-center gap-2 text-[#00ff88] text-sm font-mono group-hover:gap-3 transition-all">
        View Project <ExternalLink className="w-4 h-4" />
      </button>
    </div>
  </motion.div>
);

// Main App Component
function App() {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  const terminalText = [
    '> Initializing Ayush Patel.exe...',
    '> Loading skills database...',
    '> Syncing experience points...',
    '> System ready. Welcome.'
  ];

  useEffect(() => {
    setTerminalLines([]);
    const timeouts = terminalText.map((line, i) => {
      return setTimeout(() => {
        setTerminalLines(prev => {
          const newLines = [...prev];
          newLines[i] = line;
          return newLines;
        });
      }, i * 400);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <ParticleBackground />
      <NavigationDots />

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl flex flex-col items-center w-full">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative flex-shrink-0"
            >
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#1a1a2e] shadow-[0_0_40px_rgba(0,255,136,0.3)] transition-transform hover:scale-105 duration-300">
                <img src="./photo.jpg" alt="Ayush Patel" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-2 right-2 bg-[#1a1a2e] border border-[#00ff88] rounded-full p-3 animate-bounce shadow-lg shadow-[#00ff88]/20">
                <Code2 className="w-6 h-6 text-[#00ff88]" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              <div className="inline-block px-4 py-2 bg-[#1a1a2e] border border-[#00ff88] rounded-full mb-6">
                <span className="font-mono text-sm text-[#00ff88]">// Software Engineer 2</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold font-mono text-white mb-4 tracking-tight whitespace-nowrap">
                AYUSH PATEL
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-4 text-[#888] font-mono">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-[#00ff88]" /> Pune, MH</span>
                <span className="w-1.5 h-1.5 bg-[#ff6b35] rounded-full" />
                <span>4+ Years Experience</span>
              </div>
            </motion.div>
          </div>

          {/* Terminal Intro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-[#0d0d15] border border-[#333] rounded-xl p-6 text-left max-w-2xl mx-auto mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
              <span className="text-xs text-[#888] ml-2 font-mono">ayush@portfolio:~</span>
            </div>
            <div className="font-mono text-sm space-y-1">
              {terminalLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-[#00ff88]"
                >
                  {line}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <XPBar />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            <a href="#contact" className="px-6 py-3 bg-[#00ff88] text-[#0a0a0f] font-mono font-bold rounded-lg hover:bg-[#00cc6a] transition-colors">
              HIRE ME
            </a>
            <a href="https://drive.google.com/file/d/1IkEwcC6rfWROk8N-kVH3YtydH3_LshXI/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-[#00ff88] text-[#00ff88] font-mono font-bold rounded-lg hover:bg-[#00ff88] hover:text-[#0a0a0f] transition-colors">
              RESUME
            </a>
            <a href="#projects" className="px-6 py-3 border border-[#00ff88] text-[#00ff88] font-mono font-bold rounded-lg hover:bg-[#00ff88] hover:text-[#0a0a0f] transition-colors">
              VIEW WORK
            </a>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-mono font-bold text-center mb-12"
          >
            <span className="text-[#888]">// </span>
            <span className="text-white">QUEST LOG</span>
          </motion.h2>

          <ExperienceTimeline />
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-mono font-bold text-center mb-12"
          >
            <span className="text-[#888]">// </span>
            <span className="text-white">CHARACTER STATS</span>
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={Briefcase} value="2" label="Companies" targetId="experience" />
            <StatCard icon={Code2} value="4+" label="Years Coding" targetId="experience" />
            <StatCard icon={Cpu} value="15+" label="Technologies" targetId="skills" />
            <StatCard icon={Award} value="5" label="Achievements" targetId="achievements" />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-mono font-bold text-center mb-12"
          >
            <span className="text-[#888]">// </span>
            <span className="text-white">SKILL TREE</span>
          </motion.h2>

          <SkillTree />
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 px-6 bg-[#0d0d15]">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-mono font-bold text-center mb-12"
          >
            <span className="text-[#888]">// </span>
            <span className="text-white">ACHIEVEMENTS</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AchievementBadge
              icon={Zap}
              title="System Architect"
              description="Led microservices migration"
              color="#00ff88"
            />
            <AchievementBadge
              icon={Cpu}
              title="Performance Master"
              description="25-30% API improvement"
              color="#ff6b35"
            />
            <AchievementBadge
              icon={Cloud}
              title="Cloud Native"
              description="Docker/Kubernetes deployment"
              color="#3b82f6"
            />
            <AchievementBadge
              icon={Layers}
              title="Kafka Expert"
              description="Event-driven architecture"
              color="#a855f7"
            />
            <AchievementBadge
              icon={Shield}
              title="Bug Slayer"
              description="Production incident resolution"
              color="#f59e0b"
            />
            <AchievementBadge
              icon={Database}
              title="Data Handler"
              description="Multi-database expertise"
              color="#ec4899"
            />
          </div>
        </div>
      </section>


      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-[#0d0d15]">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-mono font-bold text-center mb-12"
          >
            <span className="text-[#888]">// </span>
            <span className="text-white">PROJECTS</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectCard
              title="PHx2 Music Player"
              description="Collaborative music streaming platform with real-time voting-based playback control, integrating Spotify API."
              tech={['Django', 'REST APIs', 'Spotify API', 'WebSockets']}
              color="#00ff88"
            />
            <ProjectCard
              title="Financial Advisory Modernization"
              description="Transformed legacy systems into scalable microservices architecture with event-driven design."
              tech={['Java', 'Spring Boot', 'Apache Kafka', 'Redis']}
              color="#ff6b35"
            />
            <ProjectCard
              title="Enterprise Identity Platform"
              description="Large-scale identity management system supporting high-volume enterprise workflows."
              tech={['Java', 'Spring Boot', 'PostgreSQL', 'REST APIs']}
              color="#a855f7"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-mono font-bold mb-8"
          >
            <span className="text-[#888]">// </span>
            <span className="text-white">GET IN TOUCH</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#888] mb-12"
          >
            Ready to level up your team? Let's connect and discuss how I can contribute to your next project.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <a
              href="mailto:ayush.patel.996@gmail.com"
              className="flex items-center gap-3 px-6 py-3 bg-[#1a1a2e] border border-[#333] rounded-xl hover:border-[#00ff88] hover:bg-[#00ff88] hover:text-[#0a0a0f] transition-all group"
            >
              <Mail className="w-5 h-5 text-[#00ff88] group-hover:text-[#0a0a0f]" />
              <span className="font-mono">ayush.patel.996@gmail.com</span>
            </a>
            <a
              href="tel:+917987351889"
              className="flex items-center gap-3 px-6 py-3 bg-[#1a1a2e] border border-[#333] rounded-xl hover:border-[#00ff88] hover:bg-[#00ff88] hover:text-[#0a0a0f] transition-all group"
            >
              <Phone className="w-5 h-5 text-[#00ff88] group-hover:text-[#0a0a0f]" />
              <span className="font-mono">+91 7987351889</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center gap-6 mt-12"
          >
            <a
              href="https://github.com/ayushpatel996"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center border border-[#333] rounded-xl hover:border-[#00ff88] hover:bg-[#00ff88] group transition-all"
            >
              <Github className="w-5 h-5 text-[#888] group-hover:text-[#0a0a0f]" />
            </a>
            <a
              href="https://www.linkedin.com/in/ayushpatel1312/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center border border-[#333] rounded-xl hover:border-[#00ff88] hover:bg-[#00ff88] group transition-all"
            >
              <Linkedin className="w-5 h-5 text-[#888] group-hover:text-[#0a0a0f]" />
            </a>
          </motion.div>

          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-16 text-[#555] text-sm font-mono"
          >
            <p>© 2026 Ayush Patel. All systems operational.</p>
          </motion.footer>
        </div>
      </section>
    </div>
  );
}

export default App;