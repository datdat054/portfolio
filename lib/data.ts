// ============================================================
// lib/data.ts — All portfolio content as typed TypeScript constants
// ============================================================

// ─── Personal Info ───────────────────────────────────────────
export const personalInfo = {
  name: 'Luu Duc Dat',
  initials: 'LDD',
  role: 'Java Backend Developer',
  tagline: 'I build high-performance backend systems with Java & Spring Boot.',
  location: 'Ho Chi Minh City, Vietnam',
  email: 'tkqb0ducdat@gmail.com',
  github: 'datdat054',
  githubUrl: 'https://github.com/datdat054',
  university: 'Posts and Telecommunications Institute of Technology – HCMC Campus',
  major: 'Software Engineering (Information Technology)',
  gpa: '3.0 / 4.0',
  careerGoal: 'Become a Senior Backend Engineer within 3 years, specializing in distributed systems.',
  bio: "I'm a backend-focused developer studying Software Engineering at PTIT HCMC. My work centers on Java and the Spring ecosystem — building RESTful APIs, microservices architectures, and systems that handle real load.\n\nI care about writing clean, maintainable code and understanding the 'why' behind design decisions. My goal is to join a team where I can grow into a senior backend role within the next three years.",
  shortBio: 'Software Engineering student at PTIT HCMC · Focused on microservices & distributed systems',
} as const

// ─── Typing Roles (Hero animated typewriter) ──────────────────
export const typingRoles: string[] = [
  'Java Backend Developer',
  'Spring Boot Engineer',
  'System Architecture Enthusiast',
]

// ─── Stats ────────────────────────────────────────────────────
export interface Stat {
  value: number
  suffix: string
  label: string
}

export const stats: Stat[] = [
  { value: 2, suffix: '+', label: 'Years of coding' },
  { value: 4, suffix: '+', label: 'Projects shipped' },
  { value: 2, suffix: '', label: 'Hackathons competed' },
]

// ─── Skills ───────────────────────────────────────────────────
export type SkillTab = 'Backend' | 'Frontend' | 'DevOps' | 'Database'

export interface Skill {
  name: string
  level: number
  color?: string
}

export interface SkillCategory {
  tab: SkillTab
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    tab: 'Backend',
    skills: [
      { name: 'Java (Core / OOP)', level: 95 },
      { name: 'Spring Boot', level: 90 },
      { name: 'RESTful APIs', level: 90 },
      { name: 'Spring Data JPA / Hibernate', level: 85 },
      { name: 'Spring Security', level: 80 },
      { name: 'JWT Auth', level: 80 },
      { name: 'Microservices', level: 75 },
      { name: 'Spring Cloud', level: 70 },
    ],
  },
  {
    tab: 'Frontend',
    skills: [
      { name: 'HTML / CSS', level: 80 },
      { name: 'Tailwind CSS', level: 75 },
      { name: 'Next.js', level: 70 },
      { name: 'React', level: 72 },
      { name: 'TypeScript', level: 68 },
    ],
  },
  {
    tab: 'DevOps',
    skills: [
      { name: 'Postman', level: 88 },
      { name: 'Git / GitHub', level: 85 },
      { name: 'Swagger', level: 80 },
      { name: 'Linux CLI', level: 65 },
      { name: 'Docker', level: 60 },
    ],
  },
  {
    tab: 'Database',
    skills: [
      { name: 'MySQL', level: 85 },
      { name: 'PostgreSQL', level: 83 },
      { name: 'Microsoft SQL Server', level: 72 },
      { name: 'MongoDB', level: 70 },
    ],
  },
]

// ─── Projects ─────────────────────────────────────────────────
export interface Project {
  id: string
  name: string
  period: string
  role?: string
  description: string
  stack: string[]
  githubUrl?: string
  featured?: boolean
  variant: 'featured' | 'card2' | 'card3' | 'card4'
}

export const projects: Project[] = [
  {
    id: 'ecommerce-microservices',
    name: 'E-Commerce Microservices System',
    period: 'Jan 2026 – Apr 2026',
    role: 'Java Backend Developer (Personal/Academic project)',
    description:
      'Backend split into three independent services — Product, Order, and User. Uses Spring Cloud Eureka for service discovery and Gateway for routing. Each service manages its own database (MySQL/PostgreSQL). JWT handles authentication across all endpoints.',
    stack: ['Java', 'Spring Boot', 'Spring Cloud', 'Eureka', 'API Gateway', 'JPA', 'JWT', 'MySQL', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/datdat054',
    featured: true,
    variant: 'featured',
  },
  {
    id: 'course-management-api',
    name: 'Online Course Management RESTful API',
    period: 'Sep 2025 – Dec 2025',
    role: 'Java Backend Developer (Course project)',
    description:
      'RESTful API for course registration and lecture management. Built with Spring Boot and Hibernate for clean ORM and transaction handling. Includes service-layer unit tests and full Swagger documentation.',
    stack: ['Java', 'Spring Boot', 'Hibernate', 'REST API', 'Unit Testing', 'Postman', 'Swagger', 'MySQL'],
    githubUrl: 'https://github.com/datdat054',
    variant: 'card2',
  },
  {
    id: 'plant-management',
    name: 'Plant Management System',
    period: '2025',
    description:
      'REST API backend for tracking plant and crop data, supporting growth schedules and status monitoring.',
    stack: ['Spring Boot', 'PostgreSQL', 'REST API'],
    githubUrl: 'https://github.com/datdat054',
    variant: 'card3',
  },
  {
    id: 'drowsiness-detection',
    name: 'Driver Drowsiness Detection',
    period: '2025',
    description:
      'Embedded real-time detection system on ESP32-CAM using FreeRTOS for task scheduling and C++ for processing logic.',
    stack: ['ESP32', 'FreeRTOS', 'C++', 'Embedded'],
    githubUrl: 'https://github.com/datdat054',
    variant: 'card4',
  },
]

// ─── Experience / Timeline ────────────────────────────────────
export interface TimelineEvent {
  id: string
  date: string
  title: string
  subtitle: string
  description: string
  badge?: string
  badgeColor?: 'orange' | 'blue' | 'green' | 'purple'
  type: 'project' | 'hackathon' | 'education'
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'ecommerce-proj',
    date: 'Jan – Apr 2026',
    title: 'E-Commerce Microservices',
    subtitle: '',
    description: 'Personal backend project. Implemented Eureka, Gateway, and JWT from scratch.',
    badge: 'Project',
    badgeColor: 'orange',
    type: 'project',
  },
  {
    id: 'course-api-proj',
    date: 'Sep – Dec 2025',
    title: 'Course Management API',
    subtitle: '',
    description: 'Course project. Focused on clean REST design, Hibernate ORM, and Swagger docs.',
    badge: 'Project',
    badgeColor: 'orange',
    type: 'project',
  },
  {
    id: 'techsolve-hackathon',
    date: '2026',
    title: 'TechSolve Hackathon',
    subtitle: '',
    description: 'Competed in a 48h hackathon building a full-stack web application with a team.',
    badge: 'Hackathon',
    badgeColor: 'purple',
    type: 'hackathon',
  },
  {
    id: 'mockai-hackathon',
    date: '2025',
    title: 'MockAI Hackathon',
    subtitle: '',
    description: 'Built an AI-driven mock interview platform — React frontend, Node.js backend.',
    badge: 'Hackathon',
    badgeColor: 'purple',
    type: 'hackathon',
  },
  {
    id: 'ptit-education',
    date: 'Dec 2022 – Present',
    title: 'PTIT HCMC',
    subtitle: '',
    description: 'Software Engineering, GPA 3.0/4.0. Key subjects: OOP, DSA, System Design, Software Architecture.',
    badge: 'Education',
    badgeColor: 'blue',
    type: 'education',
  },
]

// ─── Navigation Links ─────────────────────────────────────────
export interface NavLink {
  label: string
  href: string
}

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]
