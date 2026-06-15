import { CareerAnalysisResult } from '../types';

export const mockDeveloperResult: CareerAnalysisResult = {
  profile: {
    name: "Alex Rivera",
    title: "Junior Frontend Developer",
    skills: ["HTML5", "CSS3", "JavaScript", "React", "TypeScript", "Git", "Tailwind CSS", "REST APIs"],
    education: ["B.S. in Computer Science - State University (2025)"],
    experience: [
      {
        role: "Frontend Engineering Intern",
        company: "PixelCraft Solutions",
        duration: "Jan 2025 - May 2025",
        highlights: [
          "Developed high-fidelity user interfaces utilizing React.js and Tailwind CSS, improving page speed optimization by 18%.",
          "Collaborated closely with visual designers to integrate smooth transition frames and interactive motion systems.",
          "Restructured legacy state management components down to modular context nodes."
        ]
      }
    ],
    certifications: ["React Developer Advanced Certification - Coursera (2024)", "SCRUM Fundamentals (2024)"],
    projects: [
      {
        name: "EcoTrack Dashboard",
        description: "A real-time carbon footprint visualizer using D3.js and custom graph algorithms.",
        technologies: ["React", "D3.js", "Tailwind CSS"]
      }
    ],
    achievements: ["Won 2nd place in Annual State Tech Hackathon out of 110 participants."]
  },
  scores: {
    careerReadiness: 72,
    employabilityIndex: 82,
    marketDemand: 91,
    resumeStrength: 78,
    interviewReadiness: 68
  },
  gapAnalysis: {
    overallGap: 28,
    currentSkills: ["HTML5", "CSS3", "JavaScript", "React", "TypeScript", "Git", "Tailwind CSS"],
    skillsBreakdown: [
      { skill: "React", category: "Core Frontend", relevance: 98, proficiency: 80, requiredLevel: 95 },
      { skill: "TypeScript", category: "Languages", relevance: 95, proficiency: 70, requiredLevel: 90 },
      { skill: "Next.js", category: "Core Frontend", relevance: 92, proficiency: 30, requiredLevel: 85 },
      { skill: "System Architecture", category: "Engineering", relevance: 85, proficiency: 25, requiredLevel: 75 },
      { skill: "Testing (Jest / Cypress)", category: "Quality Assurance", relevance: 80, proficiency: 15, requiredLevel: 80 },
      { skill: "SQL Databases", category: "Backend Hub", relevance: 75, proficiency: 40, requiredLevel: 70 },
      { skill: "Docker", category: "DevOps", relevance: 70, proficiency: 10, requiredLevel: 65 }
    ],
    missingSkills: [
      {
        name: "Next.js & SSR",
        demand: "High",
        priority: "Critical",
        description: "Server-side rendering, routing mechanisms, and static site generation used extensively in enterprise software.",
        resourceName: "Next.js App Router Foundations",
        resourceType: "Course",
        resourceLink: "https://nextjs.org/learn"
      },
      {
        name: "Automated Testing (Cypress / Playwright)",
        demand: "Medium",
        priority: "Important",
        description: "Implementing end-to-end integration boundaries and visual snapshot validations.",
        resourceName: "Testing JavaScript with Kent C. Dodds",
        resourceType: "Course",
        resourceLink: "https://testingjavascript.com/"
      },
      {
        name: "Docker Containers",
        demand: "Low",
        priority: "Optional",
        description: "Containerization concepts for microservices architecture and cloud-native workflows.",
        resourceName: "Docker for Web Developers",
        resourceType: "Project",
        resourceLink: "https://www.docker.com/"
      }
    ]
  },
  roadmap: {
    plan30Days: {
      title: "Immediate Foundations",
      duration: "Days 1 - 30",
      skillsToLearn: ["Next.js routing structures", "React Server Components model"],
      certifications: ["Meta Front-End Developer Capstone - Coursera"],
      projects: ["Build a multi-page dynamic portfolio utilizing server-side data fetching"],
      portfolioTasks: ["Deploy portfolio onto Cloudflare Pages / Vercel with optimal lighthouse scores"],
      networkingActions: ["Attend local Web Dev Meetups", "Post weekly technical insights on LinkedIn"],
      interviewPrep: ["Revise React lifecycle hooks", "Solve 15 Easy-Medium exercises on Array and String algorithms on LeetCode"]
    },
    plan60Days: {
      title: "Advanced Craft Integration",
      duration: "Days 31 - 60",
      skillsToLearn: ["TypeScript strict interfaces", "State synchronization across sub-routers"],
      certifications: ["Certified Kubernetes Application Developer (CKAD) introductory track"],
      projects: ["Develop a full-featured online reservation portal using Next.js and Prisma ORM"],
      portfolioTasks: ["Document complete database ERD diagrams inside the GitHub README portfolio"],
      networkingActions: ["Identify 5 engineering heads in target startups and express constructive interest in their work"],
      interviewPrep: ["Complete 2 mock technical evaluations with professional peers", "Review CSS grid, flex, and accessibility structures"]
    },
    plan90Days: {
      title: "Backend & Systems",
      duration: "Days 61 - 90",
      skillsToLearn: ["SQL database schema architecture", "Express API writing"],
      certifications: ["AWS Certified Developer - Associate"],
      projects: ["Create a distributed task scheduling center with real-time updates using WebSockets"],
      portfolioTasks: ["Write highly detailed test suites boasting >80% code coverage values"],
      networkingActions: ["Contribute a clean documentation patch/fix to popular frontend package GitHub"],
      interviewPrep: ["Practice system design fundamentals (load balancers, caching hierarchies)"]
    },
    plan6Months: {
      title: "Scale & Reliability",
      duration: "Months 4 - 6",
      skillsToLearn: ["Cypress end-to-end automation", "Continuous Deployment lines (CI/CD) with GitHub Actions"],
      certifications: ["Prisma Database Expert Practitioner"],
      projects: ["Launch an open-source library wrapper for state orchestration or animation utils"],
      portfolioTasks: ["Construct a microservices configuration blueprint standard in GitHub"],
      networkingActions: ["Apply to speak at a local tech meetup block or junior web roundtable"],
      interviewPrep: ["Behavioral behavioral review (STAR methods regarding team collaboration conflict, timeline blockages)"]
    },
    plan12Months: {
      title: "Full Autonomy",
      duration: "Months 7 - 12",
      skillsToLearn: ["Cloud orchestration", "Infrastructure as Code (Terraform essentials)"],
      certifications: ["Google Cloud Certified Professional Cloud Developer"],
      projects: ["Coordinate a production micro-app utilized by real active users with monitoring active"],
      portfolioTasks: ["Consolidate 4 cohesive projects into a unified corporate-ready portal"],
      networkingActions: ["Establish regular professional mentorship for 2 introductory web interns"],
      interviewPrep: ["Full algorithmic assessments covering depth-first searches, tree traversals, and complex database joins"]
    }
  },
  predictions: {
    "AI Engineer": {
      targetRole: "AI Engineer",
      currentReadiness: 34,
      futureReadiness: 85,
      successProbability: 60,
      estimatedTimeWeeks: 32,
      recommendedLearningPath: [
        "Python core programming & object models",
        "Introduction to neural networks & PyTorch parameters",
        "Fine-tuning generative AI models & utilizing Google Gemini SDK",
        "Vector databases (Pinecone, pgvector) for RAG context searching"
      ]
    },
    "Data Analyst": {
      targetRole: "Data Analyst",
      currentReadiness: 55,
      futureReadiness: 90,
      successProbability: 80,
      estimatedTimeWeeks: 12,
      recommendedLearningPath: [
        "SQL complex operations (JOINS, Window elements)",
        "D3.js integration inside interactive dashboards",
        "Python pandas data science modules"
      ]
    },
    "Product Manager": {
      targetRole: "Product Manager",
      currentReadiness: 45,
      futureReadiness: 82,
      successProbability: 70,
      estimatedTimeWeeks: 18,
      recommendedLearningPath: [
        "Product roadmap structures & metrics (AARRR frameworks)",
        "System architecture foundations for managers",
        "Agile & Scrum certified course"
      ]
    }
  },
  salaryForecast: {
    currentSalaryEstimate: 62000,
    futureSalaryEstimate: 115000,
    projections: [
      { year: "Current", baseSalary: 62000, upskilledSalary: 62000 },
      { year: "Year 1", baseSalary: 68000, upskilledSalary: 85000 },
      { year: "Year 3", baseSalary: 82000, upskilledSalary: 105000 },
      { year: "Year 5", baseSalary: 95000, upskilledSalary: 128000 }
    ]
  },
  futureProof: {
    futureProofScore: 88,
    emergingSkills: ["AI Prompt SDK usage", "Next.js Server Actions", "TypeScript structural typings"],
    decliningSkills: ["Legacy jQuery manipulation", "Vanilla CSS desktop-only writing", "Standard synchronous template rendering"],
    automationRisk: "Low",
    aiDisruptionRisk: "Medium",
    careerStabilityScore: 91,
    stabilityExplanation: "Web application development is undergoing rapid transformation with AI assisting code writing, but developer logic, visual orchestration, strict validation type setups, and system integrations remain in extremely high industrial demand."
  },
  interviewPrep: {
    confidenceScore: 74,
    behavioralQuestions: [
      {
        question: "Tell me about a time you had a difference of opinion with a designer concerning UX styling.",
        answerGuide: "Structure referencing a collaborative workspace. Mention you suggested an A/B benchmark test, compared visual weights objectively, and focused purely on user flow efficiency rather than personal stylistic pride.",
        starFrameworkTip: "Situation: EcoTrack development. Task: Page layout debate. Action: Programmed both variations to compare Lighthouse stats. Result: Secured 15% better feedback."
      },
      {
        question: "Describe a stressful timeline boundary and how you delivered with quality.",
        answerGuide: "Focus on scoping, transparency, item prioritization, and deploying robust MVP components while maintaining consistent automation checks.",
        starFrameworkTip: "Highlight using Scrum frameworks to partition a heavy design load into lightweight 48-hour functional iterations code-blocks."
      }
    ],
    technicalQuestions: [
      {
        question: "Explain the main differences between React Virtual DOM and standard DOM manipulation.",
        expectedAnswer: "Virtual DOM resides as a lightweight JavaScript object cache representing actual elements. Reconciliations are run inside memory nodes to aggregate changes, updating the browser viewport structure only when necessary in batched operations.",
        codingResource: "React official reconciliation models"
      },
      {
        question: "What is TypeScript's 'strict null checking' and why should developers enable it?",
        expectedAnswer: "It prevents variable bindings from hosting null or undefined types by default unless explicitly permitted (using unions like code | null). This forces safety boundaries during compilation, eliminating common 'undefined is not a function' runtime issues.",
        codingResource: "TypeScript strict compilations guidelines"
      }
    ],
    roleSpecificQuestions: [
      {
        question: "How would you optimize an extremely slow React application loading heavy image galleries?",
        scenarioContext: "Enterprise visual portfolio loading 80+ dynamic items simultaneously.",
        keyPointsToCover: ["Lazy loading images with native properties", "Implementing thumbnail CDN scaling", "Memoizing expensive components using useMemo and memo API wrappers", "Windowing viewport arrays via Virtual Scrollbars"]
      }
    ],
    mockFeedback: "Your core technical awareness of React structures is quite impressive. However, incorporating structured system architectural answers (e.g. system bottlenecks, bundle-splitting mechanisms, microservices workflows) will significantly boost your entry odds for Senior/Lead level positions."
  },
  jobMatches: [
    {
      id: "j1",
      title: "Frontend Engineer (Next.js focus)",
      company: "Stripe",
      location: "San Francisco, CA (Remote)",
      salary: "$110,000 - $135,000",
      matchScore: 84,
      strengthAreas: ["React proficient usage", "Tailwind CSS design crafting", "TypeScript fundamentals"],
      missingRequirements: ["Enterprise Next.js experience", "Advanced React state architectures"],
      improvementSuggestions: ["Build a production Next.js sandbox highlighting complex route layout parameters."]
    },
    {
      id: "j2",
      title: "Software Engineer - Web Platform",
      company: "Google",
      location: "Mountain View, CA (Hybrid)",
      salary: "$125,000 - $160,000",
      matchScore: 76,
      strengthAreas: ["B.S. in Computer Science", "Agile workspace foundations", "TypeScript integration"],
      missingRequirements: ["Complex systems telemetry", "Cypress automation testing"],
      improvementSuggestions: ["Acquire the CKAD / Cloud certification as highlighted on your roadmap."]
    }
  ]
};

// Next, let's export another mock profile for Data Analyst
export const mockDataAnalystResult: CareerAnalysisResult = {
  profile: {
    name: "Marcus Vance",
    title: "Data Analyst",
    skills: ["SQL", "Excel (VBA)", "Tableau", "Power BI", "Python (Pandas)", "Data Cleaning", "Statistics"],
    education: ["B.S. in Statistics - Tech Institute (2023)"],
    experience: [
      {
        role: "Data Analyst",
        company: "MarketMetrics Corp",
        duration: "Jun 2023 - Present",
        highlights: [
          "Built custom automated ETL pipelines reducing legacy spreadsheet manual operations by over 40 hours per month.",
          "Curated executive-level visual dashboards with Power BI tracking marketing conversion analytics with 10M+ rows.",
          "Run recurring statistical anomalies profiling to detect transaction compliance variations."
        ]
      }
    ],
    certifications: ["Google Data Analytics Professional Certificate (2023)", "Tableau Desktop Certified Associate"],
    projects: [
      {
        name: "COVID-19 Forecast Model",
        description: "Built statistical regression matrices using Python to predict hospitalization curves.",
        technologies: ["Python", "Pandas", "Scikit-Learn"]
      }
    ],
    achievements: ["Automated custom sales report yielding executive department commendation."]
  },
  scores: {
    careerReadiness: 81,
    employabilityIndex: 85,
    marketDemand: 88,
    resumeStrength: 82,
    interviewReadiness: 78
  },
  gapAnalysis: {
    overallGap: 22,
    currentSkills: ["SQL", "Excel", "Tableau", "Power BI", "Python (Pandas)", "Data Cleaning"],
    skillsBreakdown: [
      { skill: "SQL Databases", category: "Core Data", relevance: 98, proficiency: 85, requiredLevel: 95 },
      { skill: "Python (Pandas)", category: "Programming", relevance: 92, proficiency: 75, requiredLevel: 85 },
      { skill: "Data Visualization (Tableau)", category: "Reporting", relevance: 90, proficiency: 90, requiredLevel: 85 },
      { skill: "Machine Learning Foundations", category: "Advanced AI", relevance: 85, proficiency: 30, requiredLevel: 75 },
      { skill: "Cloud Data Warehouses (BigQuery)", category: "Infrastructure", relevance: 80, proficiency: 40, requiredLevel: 80 },
      { skill: "R Statistical Pack", category: "Languages", relevance: 60, proficiency: 20, requiredLevel: 60 }
    ],
    missingSkills: [
      {
        name: "Cloud Data Warehouses (Google BigQuery / Snowflake)",
        demand: "High",
        priority: "Critical",
        description: "Storing and analyzing massive, petabyte-scale data stores utilizing optimized columnar storage queries.",
        resourceName: "Snowflake Cloud Analytics Certificate",
        resourceType: "Certification",
        resourceLink: "https://www.snowflake.com/university"
      },
      {
        name: "Machine Learning (Scikit-Learn)",
        demand: "Medium",
        priority: "Important",
        description: "Unsupervised clustering and regression techniques to automate segment profiling and predictions.",
        resourceName: "Applied Data Science with Python Specialization",
        resourceType: "Course",
        resourceLink: "https://www.coursera.org/specializations/python-3-programming"
      }
    ]
  },
  roadmap: {
    plan30Days: {
      title: "Cloud Data Skills",
      duration: "Days 1 - 30",
      skillsToLearn: ["Google BigQuery SQL dialects", "Data partitioning patterns"],
      certifications: ["Google Cloud Certified Professional Data Engineer (Start track)"],
      projects: ["Extract and migrate 5GB historical weather telemetry into Snowflake cluster"],
      portfolioTasks: ["Write clean query execution logs demonstrating Snowflake cluster scaling variables"],
      networkingActions: ["Join local Data Science Meetup", "Share insights on LinkedIn mapping cloud integration costs"],
      interviewPrep: ["Practice advanced statistical distributions, normalizations, and windowing functions"]
    },
    plan60Days: {
      title: "Predictive Analytics",
      duration: "Days 31 - 60",
      skillsToLearn: ["Scikit-Learn Regression libraries", "Hyperparameter tuning"],
      certifications: ["IBM Data Science Professional Certificate - Coursera"],
      projects: ["Build a customer churn forecasting engine achieving >85% precision stats"],
      portfolioTasks: ["Publish model weights and statistical confusion matrices inside a clean Kaggle hub repository"],
      networkingActions: ["Conduct virtual informational chats with 3 active Senior Data Scientists"],
      interviewPrep: ["Practice SQL interview joins, CTE limits, and indexing optimization strategies"]
    },
    plan90Days: {
      title: "ETL & Streaming Pipelines",
      duration: "Days 61 - 90",
      skillsToLearn: ["Apache Airflow orchestration", "Python automated scripts pipeline scheduling"],
      certifications: ["dbt (Data Build Tool) Analytics Engineer Certification"],
      projects: ["Coordinate a serverless automated reporting flow executing hourly updates from external APIs"],
      portfolioTasks: ["Deploy an interactive Streamlit page hosting live analytical controls for users"],
      networkingActions: ["Participate in a regional dbt local meetup node"],
      interviewPrep: ["Demonstrate full scenario analytical breakdown processes (e.g., metric drops of 10% on payments)"]
    },
    plan6Months: {
      title: "Big Data Systems",
      duration: "Months 4 - 6",
      skillsToLearn: ["Apache Spark core setups", "PySpark distributed computation"],
      certifications: ["Databricks Certified Associate Developer for Apache Spark"],
      projects: ["Run massive scale text parsing logs utilizing distributed cluster configurations in AWS MapReduce"],
      portfolioTasks: ["Author a comprehensive comparative study on column vs row-oriented data access mechanisms"],
      networkingActions: ["Co-author a technical medium publication block regarding automated analytics architecture"],
      interviewPrep: ["Solve complex mock case-study assessments regarding enterprise resource decisions"]
    },
    plan12Months: {
      title: "AI Integration",
      duration: "Months 7 - 12",
      skillsToLearn: ["Natural Language Processing integrations", "Neural network frameworks (Keras basics)"],
      certifications: ["TensorFlow Developer Certificate"],
      projects: ["Build a sentiment trends analysis engine connected to live social APIs using Gemini SDK"],
      portfolioTasks: ["Expose models through safe, high-speed API endpoints utilizing FastAPI"],
      networkingActions: ["Organize a round-table talk on generative AI capabilities inside small operations"],
      interviewPrep: ["Complete full-length corporate-grade evaluations analyzing operational logs and marketing data sets"]
    }
  },
  predictions: {
    "AI Engineer": {
      targetRole: "AI Engineer",
      currentReadiness: 41,
      futureReadiness: 88,
      successProbability: 65,
      estimatedTimeWeeks: 28,
      recommendedLearningPath: [
        "Advanced deep learning math architectures",
        "Python Tensor and NumPy multi-dimensional array math",
        "Transformers architecture & fine-tuning custom models",
        "Vector indexing mechanisms"
      ]
    },
    "Data Analyst": {
      targetRole: "Data Analyst",
      currentReadiness: 95,
      futureReadiness: 98,
      successProbability: 95,
      estimatedTimeWeeks: 2,
      recommendedLearningPath: [
        "Continuous platform exposure to newer BI suites"
      ]
    },
    "Product Manager": {
      targetRole: "Product Manager",
      currentReadiness: 62,
      futureReadiness: 89,
      successProbability: 75,
      estimatedTimeWeeks: 14,
      recommendedLearningPath: [
        "A/B testing statistical parameters & sample sizing layouts",
        "Agile project scheduling",
        "Strategic business analysis frameworks"
      ]
    }
  },
  salaryForecast: {
    currentSalaryEstimate: 74000,
    futureSalaryEstimate: 125000,
    projections: [
      { year: "Current", baseSalary: 74000, upskilledSalary: 74000 },
      { year: "Year 1", baseSalary: 82000, upskilledSalary: 96000 },
      { year: "Year 3", baseSalary: 94000, upskilledSalary: 115000 },
      { year: "Year 5", baseSalary: 108000, upskilledSalary: 135000 }
    ]
  },
  futureProof: {
    futureProofScore: 84,
    emergingSkills: ["Google Cloud BigQuery Engineering", "Python automated ETL logic", "FastAPI setup"],
    decliningSkills: ["Manual daily Excel entries", "Static local-only PDF charts generation", "Basic file FTP transfers"],
    automationRisk: "Medium",
    aiDisruptionRisk: "Low",
    careerStabilityScore: 86,
    stabilityExplanation: "Standard reporting templates are increasingly accessible to automation tools, but professional statistical verification, data governance structures, custom ETL logic tuning, and dashboard business interpretations remain highly valuable corporate roles."
  },
  interviewPrep: {
    confidenceScore: 81,
    behavioralQuestions: [
      {
        question: "How would you handle a stakeholder who is convinced the metrics are wrong because they contradict their gut feeling?",
        answerGuide: "Listen, validate their operational background. Then walk them through the collection pipeline, highlight the statistical sample sizes, explain confidence intervals simply, and invite a collaborative review of data criteria.",
        starFrameworkTip: "Showcase how you addressed a 12% sales mismatch problem, aligning statistical rigor directly onto core department goals."
      }
    ],
    technicalQuestions: [
      {
        question: "Explain the difference between a WHERE and a HAVING statement in SQL queries.",
        expectedAnswer: "WHERE executes before rows are compressed under GROUP BY aggregation nodes, filtering separate table records directly. HAVING acts as a secondary filter executing strictly *after* GROUP BY consolidates aggregations.",
        codingResource: "SQL Standard aggregation pipelines"
      }
    ],
    roleSpecificQuestions: [
      {
        question: "What steps do you take to resolve and validate extremely dirty records with multiple missing values?",
        scenarioContext: "Customer profiles featuring blank postcodes, inaccurate dates, and corrupt emails.",
        keyPointsToCover: ["Profiling distributions to assess magnitude of loss", "Setting up programmatic rules (e.g., median filling or forward filling)", "Dropping corrupt nodes if completeness index is below 40%", "Cross-checking dates programmatically against database logs"]
      }
    ],
    mockFeedback: "Your SQL fluency is outstanding. Moving into a focus of Cloud Engineering and container logic workflows will comfortably position you for senior platform roles within tech scaleups."
  },
  jobMatches: [
    {
      id: "j3",
      title: "Senior Business Intelligence Specialist",
      company: "Coursera",
      location: "Mountain View, CA (Remote)",
      salary: "$115,000 - $140,000",
      matchScore: 91,
      strengthAreas: ["Power BI expert usage", "Pandas processing logic", "Statistics credentials"],
      missingRequirements: ["Apache Airflow scheduling expertise", "Cloud Data Lake warehouse exposure"],
      improvementSuggestions: ["Build a dbt automated analytical reporting node in sandbox repo."]
    }
  ]
};

// We will default use developer and data analyst mock profiles. All others can fallback dynamically or scale!
export const defaultMockResults: { [key: string]: CareerAnalysisResult } = {
  "Software Developer": mockDeveloperResult,
  "Data Analyst": mockDataAnalystResult
};
