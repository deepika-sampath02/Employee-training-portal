// Central source of truth for all course + module data.
// In a real app this would come from an API; here it's a plain JS array
// so the whole flow (My Courses → Course Details → Lesson) works without a backend.

import pythonBanner from "../assets/python_banner.png";
import reactBanner from "../assets/react_banner.png";
import sqlBanner from "../assets/sql_banner.png";
import communicationBanner from "../assets/communication_banner.png";
import excelBanner from "../assets/excel_banner.png";
import timeBanner from "../assets/time_banner.png";
import leadershipBanner from "../assets/leadership_banner.svg";
import presentationBanner from "../assets/presentation_banner.svg";

const coursesData = [
  {
    id: "python-fundamentals",
    title: "Python Fundamentals",
    trainer: "Mr. Aravind",
    duration: "8 Weeks",
    meta: "8 Modules · 6h 30m",
    banner: pythonBanner,
    bannerIcon: "🐍",
    rating: "4.8",
    level: "Beginner",
    certificate: "Available",
    description: "Learn Python programming from the ground up. This course covers variables, loops, functions, object-oriented programming, and file handling through practical examples and assignments.",
    modules: [
      { 
        id: "m1", 
        title: "Introduction", 
        description: "Configure your local environment and write your first lines of code. Understand the Python ecosystem and compile syntax basic rules.",
        status: "completed", 
        videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw", 
        notes: "Module 1 notes: intro to Python, setup, and running your first script.", 
        assignment: {
          title: "Install & Setup",
          description: "Install Python on your system and set up a local workspace. Create a script that:",
          tasks: ["Prints 'Hello, World!' to the console", "Saves output in a file named hello.py", "Runs successfully from the terminal"],
          estimatedTime: "15 mins",
          dueDate: "15 July",
          difficulty: "Easy"
        },
        estimatedTime: "25 mins",
        difficulty: "Beginner",
        objectives: ["Understand Python ecosystem & syntax", "Configure local development environment", "Write and execute your first script"],
        notesSize: "1.2 MB",
        deadline: "15 July"
      },
      { 
        id: "m2", 
        title: "Variables", 
        description: "Master string manipulations, integer computations, and floating numbers. Differentiate core structures and handle console inputs.",
        status: "completed", 
        videoUrl: "https://www.youtube.com/embed/cQT33yu9pY8", 
        notes: "Module 2 notes: variables, data types, and basic operators.", 
        assignment: {
          title: "Identity Cards",
          description: "Create an identity card generator program in Python that:",
          tasks: ["Asks user for name, age, and role inputs", "Stores input into typed variables", "Formats output using print f-strings"],
          estimatedTime: "20 mins",
          dueDate: "18 July",
          difficulty: "Easy"
        },
        estimatedTime: "30 mins",
        difficulty: "Beginner",
        objectives: ["Declare dynamic variables", "Differentiate core data types", "Use mathematical operators"],
        notesSize: "1.5 MB",
        deadline: "18 July"
      },
      { 
        id: "m3", 
        title: "Loops", 
        description: "Learn how to automate repetitive tasks using for loops, while loops, nested loops, and loop control statements like break and continue.",
        status: "current", 
        videoUrl: "https://www.youtube.com/embed/94UHCEmprCY", 
        notes: "Module 3 notes: for loops, while loops, and loop control statements.", 
        assignment: {
          title: "Loop Practice",
          description: "Write a Python program using iteration loops that:",
          tasks: ["Prints numbers 1-10 sequentially", "Prints first 10 even numbers", "Uses a while loop structure"],
          estimatedTime: "20 mins",
          dueDate: "20 July",
          difficulty: "Easy"
        },
        estimatedTime: "40 mins",
        difficulty: "Beginner",
        objectives: ["Construct 'for' and 'while' loops", "Control loop execution with break & continue", "Avoid infinite execution loops"],
        notesSize: "2.4 MB",
        deadline: "20 July"
      },
      { 
        id: "m4", 
        title: "Functions", 
        description: "Structure modular programming code blocks. Understand positional arguments, scope definitions, and returning multiple properties.",
        status: "locked", 
        videoUrl: "https://www.youtube.com/embed/9Os0o3wzS_I", 
        notes: "Module 4 notes: defining functions, parameters, and return values.", 
        assignment: {
          title: "Summation Calculations",
          description: "Create a modular calculation helper script that:",
          tasks: ["Defines sum, subtract, and multiply functions", "Accepts variable arguments length", "Returns computed totals dynamically"],
          estimatedTime: "30 mins",
          dueDate: "24 July",
          difficulty: "Medium"
        },
        estimatedTime: "35 mins",
        difficulty: "Intermediate",
        objectives: ["Define reusable functions", "Pass parameters & positional arguments", "Return values from functions"],
        notesSize: "1.8 MB",
        deadline: "24 July"
      },
      { 
        id: "m5", 
        title: "OOP", 
        description: "Build custom classes, instantiate object modules, and understand fundamental inheritance designs.",
        status: "locked", 
        videoUrl: "https://www.youtube.com/embed/JeznW_7DlB0", 
        notes: "Module 5 notes: classes, objects, and basic OOP concepts.", 
        assignment: {
          title: "Student Database OOP",
          description: "Establish a student directory class structure that:",
          tasks: ["Defines Student class with name and roll number properties", "Encapsulates grade editing behaviors", "Instantiates multiple student objects"],
          estimatedTime: "40 mins",
          dueDate: "28 July",
          difficulty: "Medium"
        },
        estimatedTime: "50 mins",
        difficulty: "Intermediate",
        objectives: ["Create custom classes and objects", "Apply core encapsulation & inheritance", "Understand variable scopes"],
        notesSize: "3.1 MB",
        deadline: "28 July"
      },
    ],
  },
  {
    id: "react-development",
    title: "React Development",
    trainer: "Ms. Priya",
    duration: "6 Weeks",
    meta: "6 Modules · 7h 15m",
    banner: reactBanner,
    bannerIcon: "⚛️",
    rating: "4.9",
    level: "Intermediate",
    certificate: "Available",
    description: "Master React Development by building responsive single-page applications. Learn modern hooks, state management, component cycles, and clean routing architectures.",
    modules: [
      { 
        id: "m1", 
        title: "Introduction to React", 
        description: "Learn how the virtual DOM works, compile initial packages using Vite, and write functional JSX templates.",
        status: "completed", 
        videoUrl: "https://www.youtube.com/embed/w7ejDZ8SWv8", 
        notes: "Module 1 notes: what React is and why it's used.", 
        assignment: {
          title: "Vite App Setup",
          description: "Initialize your first react workspace. Make sure to:",
          tasks: ["Scaffold app using Vite builder", "Clear placeholder components files", "Insert a Custom Header tag in App.jsx"],
          estimatedTime: "30 mins",
          dueDate: "15 July",
          difficulty: "Easy"
        },
        estimatedTime: "30 mins",
        difficulty: "Beginner",
        objectives: ["Understand Virtual DOM", "Configure scaffolding via Vite", "Deploy basic JSX markup"],
        notesSize: "1.6 MB",
        deadline: "15 July"
      },
      { 
        id: "m2", 
        title: "Components & Props", 
        description: "Build robust, reusable functional UI elements and pass configuration details dynamically using standard props.",
        status: "current", 
        videoUrl: "https://www.youtube.com/embed/PHAcAg1lgg8", 
        notes: "Module 2 notes: building reusable components and passing props.", 
        assignment: {
          title: "User Profile Cards",
          description: "Build reusable info cards components that:",
          tasks: ["Accept title, avatar URL, and bio description props", "Render inside a responsive CSS grid", "Apply modern shadow card overlays"],
          estimatedTime: "40 mins",
          dueDate: "20 July",
          difficulty: "Easy"
        },
        estimatedTime: "45 mins",
        difficulty: "Beginner",
        objectives: ["Create functional React components", "Pass immutable data via props", "Render list elements dynamically"],
        notesSize: "2.1 MB",
        deadline: "20 July"
      },
      { 
        id: "m3", 
        title: "State & Events", 
        description: "Handle mouse events, manage live input text fields, and hook up responsive page states using standard React variables.",
        status: "locked", 
        videoUrl: "https://www.youtube.com/embed/O6P86uwfdR0", 
        notes: "Module 3 notes: useState and handling events.", 
        assignment: {
          title: "Interactive Counter",
          description: "Form a state-controlled calculations widget. Include:",
          tasks: ["Increment and decrement actions buttons", "Live validation range checks (e.g. no negative counts)", "A Reset value function handler"],
          estimatedTime: "35 mins",
          dueDate: "25 July",
          difficulty: "Medium"
        },
        estimatedTime: "45 mins",
        difficulty: "Intermediate",
        objectives: ["Manage reactive state with useState", "Hook up click & input form events", "Apply state lifecycles"],
        notesSize: "1.9 MB",
        deadline: "25 July"
      },
      { 
        id: "m4", 
        title: "Hooks", 
        description: "Connect external APIs, manage lifecycle updates, and optimize side-effects using common hook functions.",
        status: "locked", 
        videoUrl: "https://www.youtube.com/embed/TNhaISOUy6Q", 
        notes: "Module 4 notes: useEffect and other common hooks.", 
        assignment: {
          title: "API Dashboard Fetch",
          description: "Construct a dynamic details loader that:",
          tasks: ["Fetches sample data from a public REST API on mount", "Displays a Loading... indicator skeleton block", "Handles network exceptions elegantly"],
          estimatedTime: "50 mins",
          dueDate: "30 July",
          difficulty: "Advanced"
        },
        estimatedTime: "60 mins",
        difficulty: "Advanced",
        objectives: ["Control side-effects using useEffect", "Manage cleanup operations", "Create custom hooks"],
        notesSize: "2.8 MB",
        deadline: "30 July"
      },
    ],
  },
  {
    id: "sql-fundamentals",
    title: "SQL Fundamentals",
    trainer: "Mr. Karthik",
    duration: "5 Weeks",
    meta: "6 Modules · 5h 20m",
    banner: sqlBanner,
    bannerIcon: "🗄️",
    rating: "4.7",
    level: "Beginner",
    certificate: "Available",
    description: "Learn how to store, query, update, and manage relational databases using SQL. Start with simple filters and work up to multi-table joins and data groupings.",
    modules: [
      { 
        id: "m1", 
        title: "Introduction to SQL", 
        description: "Explore table rows and columns. Learn to query and filter tables with SELECT and WHERE operators.",
        status: "completed", 
        videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY", 
        notes: "Module 1 notes: relational databases and SQL basics.", 
        assignment: {
          title: "Query Customer List",
          description: "Write SELECT commands that perform database searches to:",
          tasks: ["Retrieve names and emails of all active clients", "Filter rows where status equals Active", "Alias columns for readability"],
          estimatedTime: "15 mins",
          dueDate: "12 July",
          difficulty: "Easy"
        },
        estimatedTime: "20 mins",
        difficulty: "Beginner",
        objectives: ["Understand database schemas", "Write SELECT & FROM operations", "Filter text columns"],
        notesSize: "1.1 MB",
        deadline: "12 July"
      },
      { 
        id: "m2", 
        title: "Filtering & Sorting", 
        description: "Sort records with ORDER BY, search ranges with BETWEEN, and limit search records.",
        status: "completed", 
        videoUrl: "https://www.youtube.com/embed/9ylj9NR0Lcg", 
        notes: "Module 2 notes: WHERE, ORDER BY, and LIMIT.", 
        assignment: {
          title: "Product Range Filter",
          description: "Develop sorting queries that:",
          tasks: ["Select product details priced between $10 and $50", "Sort output price descending", "Limit returned count to top 5 values"],
          estimatedTime: "20 mins",
          dueDate: "16 July",
          difficulty: "Easy"
        },
        estimatedTime: "30 mins",
        difficulty: "Beginner",
        objectives: ["Apply operators like AND, OR, NOT", "Sort databases with ORDER BY", "Limit row counts"],
        notesSize: "1.4 MB",
        deadline: "16 July"
      },
      { 
        id: "m3", 
        title: "Joins", 
        description: "Merge multiple relational tables using primary and foreign key mapping definitions.",
        status: "completed", 
        videoUrl: "https://www.youtube.com/embed/9yeOJ0ZMUYw", 
        notes: "Module 3 notes: INNER JOIN, LEFT JOIN, and combining tables.", 
        assignment: {
          title: "Multi-Table Invoicing",
          description: "Write join logic queries that:",
          tasks: ["Link Orders table with Customers details", "Retrieve customer addresses for matching orders", "Include records without orders via LEFT JOIN"],
          estimatedTime: "30 mins",
          dueDate: "20 July",
          difficulty: "Medium"
        },
        estimatedTime: "40 mins",
        difficulty: "Intermediate",
        objectives: ["Form primary to foreign keys", "Merge columns with INNER & LEFT JOIN", "Differentiate table merge types"],
        notesSize: "2.0 MB",
        deadline: "20 July"
      },
    ],
  },
  {
    id: "communication-skills",
    title: "Communication Skills",
    trainer: "Ms. Devika",
    duration: "3 Weeks",
    meta: "5 Modules · 4h 10m",
    banner: communicationBanner,
    bannerIcon: "💬",
    rating: "4.6",
    level: "Beginner",
    certificate: "Available",
    description: "Develop the skills to speak clearly, listen actively, and compose professional written communications. Crucial for career advancement in team environments.",
    modules: [
      { 
        id: "m1", 
        title: "Active Listening", 
        description: "Examine common conversational boundaries and discover affirmation speaking techniques.",
        status: "completed", 
        videoUrl: "https://www.youtube.com/embed/rzsVh8YwZEQ", 
        notes: "Module 1 notes: the fundamentals of active listening.", 
        assignment: {
          title: "Conversational Logs",
          description: "Write a text review log analyzing active dialogs. Ensure to:",
          tasks: ["Note down 3 conversational boundaries encountered", "Suggest paraphrasing solutions for each", "Draft response follow-ups"],
          estimatedTime: "25 mins",
          dueDate: "10 July",
          difficulty: "Easy"
        },
        estimatedTime: "25 mins",
        difficulty: "Beginner",
        objectives: ["Understand listening barriers", "Apply verbal affirmations", "Engage with paraphrased statements"],
        notesSize: "1.0 MB",
        deadline: "10 July"
      },
      { 
        id: "m2", 
        title: "Clear Speaking", 
        description: "Structure spoken explanations with logical progressions and eliminate conversational fillers.",
        status: "current", 
        videoUrl: "https://www.youtube.com/embed/HAnw168huqA", 
        notes: "Module 2 notes: structuring what you say for clarity.", 
        assignment: {
          title: "Spoken Pitch Recording",
          description: "Prepare and practice a clear topic pitch. Steps required:",
          tasks: ["Outline a topic using Intro-Body-Conclusion blocks", "Record yourself presenting for 2 minutes", "Verify speaking rate falls under 140 words/min"],
          estimatedTime: "30 mins",
          dueDate: "15 July",
          difficulty: "Easy"
        },
        estimatedTime: "30 mins",
        difficulty: "Beginner",
        objectives: ["Structure ideas using introduction, body, and conclusion", "Improve vocabulary pacing", "Reduce filler word usage"],
        notesSize: "1.3 MB",
        deadline: "15 July"
      },
      { 
        id: "m3", 
        title: "Email Etiquette", 
        description: "Compose clear subject titles and write requests that get read and resolved quickly.",
        status: "locked", 
        videoUrl: "https://www.youtube.com/embed/UwYkPu-Qq0M", 
        notes: "Module 3 notes: writing clear, professional emails.", 
        assignment: {
          title: "Request Drafts",
          description: "Draft 2 professional email messages targeting:",
          tasks: ["A request for timeline extension on a project", "A schedule adjustment check with stakeholders", "Use clear action subject headers"],
          estimatedTime: "30 mins",
          dueDate: "20 July",
          difficulty: "Medium"
        },
        estimatedTime: "35 mins",
        difficulty: "Intermediate",
        objectives: ["Format clear corporate subject lines", "Adopt polite greetings & clear signatures", "State requests succinctly"],
        notesSize: "1.7 MB",
        deadline: "20 July"
      },
    ],
  },
  {
    id: "excel-analysis",
    title: "Data Analysis with Excel",
    trainer: "Ms. Rupa",
    duration: "4 Weeks",
    meta: "4 Modules · 3h 45m",
    banner: excelBanner,
    bannerIcon: "📊",
    rating: "4.8",
    level: "Beginner",
    certificate: "Available",
    description: "Unlock business data analysis secrets using Microsoft Excel. Build functional dashboards, write robust formulas, and master VLOOKUP, XLOOKUP, and Pivot Tables.",
    modules: [
      { 
        id: "m1", 
        title: "Spreadsheet Basics", 
        description: "Navigate cells, input numeric records, apply color fills, and organize simple sums operations.",
        status: "current", 
        videoUrl: "https://www.youtube.com/embed/rwbho0CgEAE", 
        notes: "Learn formatting, values, basic formulas.", 
        assignment: {
          title: "Spreadsheet Budget",
          description: "Build an Excel spreadsheet log that:",
          tasks: ["Lists 10 monthly item expenses", "Sums category totals using basic arithmetic", "Applies accounting cell formats"],
          estimatedTime: "40 mins",
          dueDate: "18 July",
          difficulty: "Easy"
        },
        estimatedTime: "40 mins",
        difficulty: "Beginner",
        objectives: ["Organize rows and columns", "Format integers and currencies", "Sum and average ranges"],
        notesSize: "1.9 MB",
        deadline: "18 July"
      },
      { 
        id: "m2", 
        title: "VLOOKUP & XLOOKUP", 
        description: "Link sheets and match customer list IDs to order tables dynamically.",
        status: "locked", 
        videoUrl: "https://www.youtube.com/embed/O7kZ8Z6q1wA", 
        notes: "Master index lookup and data references.", 
        assignment: {
          title: "Inventory Lookup",
          description: "Establish product lookup references that:",
          tasks: ["Reference prices from an inventory catalog sheet", "Handle missing SKU matches gracefully using XLOOKUP", "Return matching units count"],
          estimatedTime: "45 mins",
          dueDate: "22 July",
          difficulty: "Medium"
        },
        estimatedTime: "50 mins",
        difficulty: "Intermediate",
        objectives: ["Match rows dynamically", "Handle missing values #N/A", "Configure direct references"],
        notesSize: "2.3 MB",
        deadline: "22 July"
      }
    ]
  },
  {
    id: "time-management",
    title: "Time Management",
    trainer: "Mr. Raj",
    duration: "3 Weeks",
    meta: "3 Modules · 2h 30m",
    banner: timeBanner,
    bannerIcon: "⏳",
    rating: "4.7",
    level: "Beginner",
    certificate: "Available",
    description: "Reclaim your schedule and achieve career outcomes. Learn prioritization tools like Eisenhower, interval focus like Pomodoro, and long-term OKRs setting.",
    modules: [
      { 
        id: "m1", 
        title: "Eisenhower Matrix", 
        description: "Sort tasks between urgency and importance. Master delegation techniques.",
        status: "completed", 
        videoUrl: "https://www.youtube.com/embed/tT89OZ7TNwc", 
        notes: "Prioritize urgent vs important tasks.", 
        assignment: {
          title: "Quadrant Sorting",
          description: "Perform quadrant categorization on 12 weekly goals. Steps:",
          tasks: ["List tasks into Eisenhower quadrants", "Identify 3 items for delegation", "Outline 2 items for deletion"],
          estimatedTime: "30 mins",
          dueDate: "10 July",
          difficulty: "Easy"
        },
        estimatedTime: "30 mins",
        difficulty: "Beginner",
        objectives: ["Distinguish Urgency and Importance", "Delegate low-priority items", "Eliminate distractions"],
        notesSize: "1.4 MB",
        deadline: "10 July"
      },
      { 
        id: "m2", 
        title: "Pomodoro Technique", 
        description: "Adopt focused working intervals and regulate brief break schedules.",
        status: "completed", 
        videoUrl: "https://www.youtube.com/embed/mNBmG24djoY", 
        notes: "Learn interval focus and breaking down work.", 
        assignment: {
          title: "Interval Sprint Logs",
          description: "Track 4 Pomodoro cycle runs. Logs should detail:",
          tasks: ["Tasks set for each interval", "Distraction points logged", "Break activities conducted"],
          estimatedTime: "25 mins",
          dueDate: "14 July",
          difficulty: "Easy"
        },
        estimatedTime: "25 mins",
        difficulty: "Beginner",
        objectives: ["Implement 25-minute sprints", "Manage break times and routines", "Track focused cycles"],
        notesSize: "1.1 MB",
        deadline: "14 July"
      },
      { 
        id: "m3", 
        title: "Goal Setting & OKRs", 
        description: "Adopt organizational planning tools and formulate quarterly key results.",
        status: "current", 
        videoUrl: "https://www.youtube.com/embed/M_P5m8JspFA", 
        notes: "Define quarterly key results and metrics.", 
        assignment: {
          title: "Quarterly OKR Draft",
          description: "Create an OKR sheet for personal development. Make sure to:",
          tasks: ["Draft 3 objective statements", "Formulate 3 key results for each objective", "Design metrics checkpoints"],
          estimatedTime: "30 mins",
          dueDate: "20 July",
          difficulty: "Medium"
        },
        estimatedTime: "40 mins",
        difficulty: "Intermediate",
        objectives: ["Draft Objectives & Key Results", "Benchmark goal outcomes", "Review targets weekly"],
        notesSize: "1.7 MB",
        deadline: "20 July"
      }
    ]
  },
  {
    id: "leadership-essentials",
    title: "Leadership Essentials",
    trainer: "Mr. Thomas",
    duration: "5 Weeks",
    meta: "5 Modules · 4h 30m",
    banner: leadershipBanner,
    bannerIcon: "🤝",
    rating: "4.8",
    level: "Intermediate",
    certificate: "Available",
    description: "Transition from manager to inspiring leader. Understand situational coaching styles, active feedback mechanisms, and organizational vision-casting.",
    modules: [
      { 
        id: "m1", 
        title: "Situational Leadership", 
        description: "Assess team maturities and adapt leadership styles from coaching to delegating.",
        status: "current", 
        videoUrl: "https://www.youtube.com/embed/b5Z354q5m6c", 
        notes: "Adapting leadership styles to team maturity levels.", 
        assignment: {
          title: "Leadership Profiles",
          description: "Perform leader matching profiling for 4 team members. Steps:",
          tasks: ["Log task maturity ranks for each member", "Assign coaching or delegating profiles", "Detail feedback schedules"],
          estimatedTime: "45 mins",
          dueDate: "18 July",
          difficulty: "Medium"
        },
        estimatedTime: "45 mins",
        difficulty: "Intermediate",
        objectives: ["Analyze team maturity metrics", "Toggle between directing, coaching, supporting, delegating", "Build trust scales"],
        notesSize: "2.1 MB",
        deadline: "18 July"
      }
    ]
  },
  {
    id: "presentation-skills",
    title: "Presentation Skills",
    trainer: "Ms. Shalini",
    duration: "4 Weeks",
    meta: "4 Modules · 3h 0m",
    banner: presentationBanner,
    bannerIcon: "📢",
    rating: "4.9",
    level: "Intermediate",
    certificate: "Available",
    description: "Design slides that hold attention, conquer public speaking anxiety, pace yourself, and handle tough corporate Q&A panels smoothly.",
    modules: [
      { 
        id: "m1", 
        title: "Slide Design", 
        description: "Optimize slide text spacing and use clean modular patterns.",
        status: "completed", 
        videoUrl: "https://www.youtube.com/embed/Hp7Id3Yb9yQ", 
        notes: "Creating minimal slides, visual hierarchy, avoiding walls of text.", 
        assignment: {
          title: "Scaffolding Pitch Slides",
          description: "Design a slide outline of 5 pages. Include:",
          tasks: ["A headline banner slide", "A problem description list", "A visual metrics dashboard mock representation"],
          estimatedTime: "40 mins",
          dueDate: "10 July",
          difficulty: "Easy"
        },
        estimatedTime: "40 mins",
        difficulty: "Beginner",
        objectives: ["Select modern typeface pairings", "Establish visual focal points", "Limit lists to 3 core bullets"],
        notesSize: "2.0 MB",
        deadline: "10 July"
      },
      { 
        id: "m2", 
        title: "Public Speaking Presence", 
        description: "Adopt pacing models and master posture control during high-pressure keynotes.",
        status: "completed", 
        videoUrl: "https://www.youtube.com/embed/i5mYphUoOCs", 
        notes: "Voice modulation, body language, and pacing.", 
        assignment: {
          title: "Speaking Pacing Recording",
          description: "Submit a practice video review. Make sure to:",
          tasks: ["Record 3 minutes of slide presentation", "Incorporate strategic pauses", "Maintain open posture positioning"],
          estimatedTime: "35 mins",
          dueDate: "15 July",
          difficulty: "Easy"
        },
        estimatedTime: "35 mins",
        difficulty: "Intermediate",
        objectives: ["Apply strategic silence and pauses", "Project voice without strain", "Engage with eye sweeps"],
        notesSize: "1.6 MB",
        deadline: "15 July"
      },
      { 
        id: "m3", 
        title: "Handling QA Sessions", 
        description: "Manage timeline constraints during follow-ups and reply with composure.",
        status: "completed", 
        videoUrl: "https://www.youtube.com/embed/d3W47z9A814", 
        notes: "Dealing with difficult questions, maintaining composure.", 
        assignment: {
          title: "Q&A Responses Draft",
          description: "Draft answers addressing common stakeholder criticisms. Detail responses to:",
          tasks: ["Budget scaling concerns", "Timeline buffer requests", "Quality metric exceptions"],
          estimatedTime: "40 mins",
          dueDate: "22 July",
          difficulty: "Advanced"
        },
        estimatedTime: "40 mins",
        difficulty: "Advanced",
        objectives: ["De-escalate aggressive query phrasings", "Defer unanswered checks politely", "Maintain positive posture"],
        notesSize: "1.8 MB",
        deadline: "22 July"
      }
    ]
  }
];

export default coursesData;
