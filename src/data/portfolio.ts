import { Shield, Zap } from 'lucide-react';

const financialAdvisoryImprovement = '25–30%';

export const experiences = [
  {
    client: 'Edward Jones',
    company: 'HashedIn by Deloitte',
    role: 'Software Engineer 2',
    period: 'Oct 2025 - Present',
    location: 'Pune, MH',
    icon: Zap,
    tech: ['Java', 'Spring Boot', 'Thymeleaf', 'Apache Kafka', 'Redis', 'Docker', 'Kubernetes'],
    details: [
      'Led the migration of legacy financial advisory workflows to Java and Spring Boot microservices',
      'Used Apache Kafka for asynchronous communication between services',
      'Built backend services for broker and advisor transactions, with a focus on reliable processing and data consistency',
      'Built and deployed services with Docker and Kubernetes',
      `Improved API response times by ${financialAdvisoryImprovement} and reduced database load with Redis caching`,
    ],
  },
  {
    client: 'Cisco',
    company: 'Infosys',
    role: 'Digital Specialist Engineer',
    period: 'Jun 2022 - Oct 2025',
    location: 'Bangalore, KA',
    icon: Shield,
    tech: ['Java', 'Spring Boot', 'REST APIs', 'JavaScript', 'JSP', 'ELK Stack', 'ServiceNow'],
    details: [
      'Built Java and Spring Boot services and REST APIs for a large-scale enterprise identity platform',
      'Automated user profile management with the Virtual Profile feature in Control Hub',
      'Migrated legacy UCCX and CCP systems from 32-bit to 64-bit architecture to improve compatibility and scalability',
      'Led UI development for admin workflows',
      'Resolved production incidents using the ELK stack during on-call rotations and tracked incidents in ServiceNow',
      'Reduced API latency by 20–25% by optimizing enterprise identity APIs',
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
    description: `Helped move legacy financial workflows to microservices, with a ${financialAdvisoryImprovement} improvement in API response times after introducing Redis caching.`,
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
