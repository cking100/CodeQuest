export interface LearningPathModule {
  title: string;
  description: string;
  youtubeLink?: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description:string;
  modules: LearningPathModule[];
}

export const learningPaths: LearningPath[] = [
  {
    id: 'mern-stack',
    title: 'MERN Stack Developer',
    description: 'Master the MERN (MongoDB, Express, React, Node.js) stack to build full-featured web applications.',
    modules: [
      {
        title: 'Module 1: Frontend Fundamentals',
        description: 'Start with the basics of web development: HTML, CSS, and JavaScript. Understand how the web works and build a solid foundation.',
        youtubeLink: 'https://www.youtube.com/watch?v=G3e-cpL7ofc',
      },
      {
        title: 'Module 2: React & Modern Frontend',
        description: 'Dive deep into React.js. Learn about components, state, props, hooks, and the context API. Build dynamic user interfaces.',
        youtubeLink: 'https://www.youtube.com/watch?v=SqcY0GlETPk',
      },
      {
        title: 'Module 3: Backend with Node.js & Express',
        description: 'Build robust server-side applications with Node.js and the Express framework. Learn to create RESTful APIs.',
        youtubeLink: 'https://www.youtube.com/watch?v=f2EqECiTBL8',
      },
      {
        title: 'Module 4: MongoDB for Data Persistence',
        description: 'Learn to use MongoDB, a NoSQL database, to store and manage your application data effectively with Mongoose.',
        youtubeLink: 'https://www.youtube.com/watch?v=Www6c_g4a3I',
      },
      {
        title: 'Module 5: Full Stack Integration',
        description: 'Connect your React frontend with your Node.js backend. Handle user authentication, state management, and deployment.',
        youtubeLink: 'https://www.youtube.com/watch?v=k3Vfj-e1Ma4',
      },
    ],
  },
  {
    id: 'java-full-stack',
    title: 'Java Full Stack Developer',
    description: 'Become a versatile developer by learning to build both frontend and backend applications with Java and popular frameworks like Spring and Angular/React.',
    modules: [
        {
            title: 'Module 1: Core Java',
            description: 'Strengthen your foundation with core Java concepts, including object-oriented programming, data structures, and algorithms.',
            youtubeLink: 'https://www.youtube.com/watch?v=grEKMHGYyns'
        },
        {
            title: 'Module 2: Backend with Spring Boot',
            description: 'Learn the Spring Framework and Spring Boot to build powerful, enterprise-level backend services and REST APIs.',
            youtubeLink: 'https://www.youtube.com/watch?v=vtPkZShrvXQ'
        },
        {
            title: 'Module 3: Databases & JPA/Hibernate',
            description: 'Understand how to work with SQL databases and integrate them into your Java applications using JPA and Hibernate.',
            youtubeLink: 'https://www.youtube.com/watch?v=0K_eZ2A-YkI'
        },
        {
            title: 'Module 4: Frontend Development (React or Angular)',
            description: 'Choose a modern frontend framework like React or Angular to build the user interface for your full-stack application.',
            youtubeLink: 'https://www.youtube.com/watch?v=SqcY0GlETPk'
        },
        {
            title: 'Module 5: Deployment and DevOps Basics',
            description: 'Learn to containerize your application with Docker and deploy it to cloud services like AWS or Heroku.',
            youtubeLink: 'https://www.youtube.com/watch?v=3c-iBn73dDE'
        }
    ]
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Analyst',
    description: 'Learn the skills to protect computer systems and networks from cyber threats. This path covers networking, security principles, and ethical hacking.',
    modules: [
        {
            title: 'Module 1: Networking Fundamentals',
            description: 'Understand the core concepts of computer networking, including TCP/IP, DNS, and HTTP, which are essential for cybersecurity.',
            youtubeLink: 'https://www.youtube.com/watch?v=IPvYjXCsTg8'
        },
        {
            title: 'Module 2: Security Principles',
            description: 'Learn about the CIA triad (Confidentiality, Integrity, Availability), risk management, and common security models.',
            youtubeLink: 'https://www.youtube.com/watch?v=inWWhr5tnEA'
        },
        {
            title: 'Module 3: Ethical Hacking & Penetration Testing',
            description: 'Discover vulnerabilities and learn how to perform ethical hacks to test and secure systems. Tools like Metasploit and Nmap are covered.',
            youtubeLink: 'https://www.youtube.com/watch?v=3Kq1MIfTz5o'
        },
        {
            title: 'Module 4: Cryptography',
            description: 'Dive into the world of encryption, hashing, and digital signatures to understand how data is protected at rest and in transit.',
            youtubeLink: 'https://www.youtube.com/watch?v=inWWhr5tnEA'
        },
        {
            title: 'Module 5: Incident Response & Digital Forensics',
            description: 'Learn the process for responding to security incidents and how to conduct digital forensics to investigate breaches.',
            youtubeLink: 'https://www.youtube.com/watch?v=a5zn3a-H4kI'
        },
    ]
  },
  {
    id: 'devops',
    title: 'DevOps Engineer',
    description: 'Master the culture, practices, and tools of DevOps to improve collaboration between development and operations teams and automate the software delivery lifecycle.',
    modules: [
        {
            title: 'Module 1: Linux & Scripting',
            description: 'Gain proficiency in the Linux command line and shell scripting (Bash), a fundamental skill for any DevOps engineer.',
            youtubeLink: 'https://www.youtube.com/watch?v=sWbUDq4S6Y8'
        },
        {
            title: 'Module 2: CI/CD Pipelines',
            description: 'Learn to build Continuous Integration and Continuous Delivery pipelines using tools like Jenkins, GitLab CI, or GitHub Actions.',
            youtubeLink: 'https://www.youtube.com/watch?v=62N8UiWUd_A'
        },
        {
            title: 'Module 3: Infrastructure as Code (IaC)',
            description: 'Automate your infrastructure provisioning with tools like Terraform and Ansible.',
            youtubeLink: 'https://www.youtube.com/watch?v=l5k1ai_GBDE'
        },
        {
            title: 'Module 4: Containerization with Docker & Kubernetes',
            description: 'Master Docker for containerizing applications and Kubernetes for orchestrating them at scale.',
            youtubeLink: 'https://www.youtube.com/watch?v=X48VuDVv0do'
        },
        {
            title: 'Module 5: Monitoring & Observability',
            description: 'Learn to monitor your applications and infrastructure using tools like Prometheus, Grafana, and the ELK Stack.',
            youtubeLink: 'https://www.youtube.com/watch?v=5-3py1d-R_M'
        }
    ]
  }
];
