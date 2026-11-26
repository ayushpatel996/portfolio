import { Shield, Zap } from 'lucide-react';

const financialAdvisoryOutcome = '25–30% improvement in API response times after introducing Redis caching';

export const experiences = [
  {
    company: 'HashedIn by Deloitte',
    role: 'Software Engineer 2',
    period: 'Oct 2025 - Present',
    location: 'Pune, MH',
    icon: Zap,
    outcome: financialAdvisoryOutcome,
    details: [
      'Led the migration of legacy financial workflows to microservices',
      'Implemented Apache Kafka for event-driven architecture',
      'Built and deployed services with Docker and Kubernetes',
    ],
  },
  {
    company: 'Infosys',
    role: 'Digital Specialist Engineer',
    period: 'Jun 2022 - Oct 2025',
    location: 'Bangalore, KA',
    icon: Shield,
    outcome: 'Reduced API latency by 20–25%',
    details: [
      'Built backend services for a large-scale identity platform',
      'Led UI development for admin workflows',
      'Diagnosed and resolved production incidents using the ELK stack during on-call rotations',
    ],
  },
];

export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link?: string;
  details?: string;
};

export const projects: Project[] = [
  {
    id: 'phx2',
    title: 'PHx2 Music Player',
    description: 'A collaborative music player where listeners vote in real time to control Spotify playback.',
    tech: ['Django', 'REST APIs', 'Spotify API', 'WebSockets'],
    link: 'https://phx2-app.onrender.com/',
  },
  {
    id: 'financial-advisory',
    title: 'Financial Advisory Modernization',
    description: `Helped move legacy financial workflows to microservices, with a ${financialAdvisoryOutcome}.`,
    tech: ['Java', 'Spring Boot', 'Apache Kafka', 'Redis'],
    details: 'Implemented Apache Kafka for event-driven communication and used Redis caching to improve API performance as part of the move to Java and Spring Boot services.',
  },
  {
    id: 'enterprise-identity',
    title: 'Enterprise Identity Platform',
    description: 'Built backend services and led UI development for admin workflows on an enterprise identity management platform.',
    tech: ['Java', 'Spring Boot', 'PostgreSQL', 'REST APIs'],
  },
];
