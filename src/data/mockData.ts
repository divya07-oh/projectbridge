export interface User {
  id: string;
  name: string;
  email: string;
  type: 'student' | 'business';
  company?: string;
  college?: string;
  avatar?: string;
  skills: string[];
  bio: string;
  portfolio: { title: string; link: string }[];
  projectsCompleted: number;
  stats: {
    rating: number;
    completion: number;
    totalEarnings?: number;
    appliedProjects?: number;
    activeProjects?: number;
  };
  achievements: string[];
}

export const MOCK_USER: User = {
  id: "u1",
  name: "Arjun Mehta",
  email: "arjun@example.com",
  type: "student",
  college: "Delhi Technological University",
  avatar: "https://i.pravatar.cc/150?u=arjun",
  skills: ["React", "TypeScript", "Node.js", "Figma", "Tailwind CSS"],
  bio: "Full-stack developer passionate about building scalable web applications. I specialize in the MERN stack and have a strong eye for UI/UX design. Looking forward to helping startups build their MVPs.",
  portfolio: [
    { title: "E-Commerce Dashboard UI", link: "https://github.com/arjunmehta/ecommerce-dashboard" },
    { title: "Task Management App", link: "https://github.com/arjunmehta/task-app" }
  ],
  projectsCompleted: 12,
  stats: {
    rating: 4.8,
    completion: 98,
    totalEarnings: 45000,
    appliedProjects: 15,
    activeProjects: 3
  },
  achievements: ["Top Rated Freelancer", "Fast Responder", "5 Projects in a month"]
};

export const MOCK_PROJECTS = [
  {
    id: "p1",
    title: "Build a landing page for my bakery",
    company: "Sweet Delights Bakery",
    budget: "₹5,000",
    duration: "1 Week",
    category: "Web Development",
    skills: ["HTML", "CSS", "React"],
    deadline: "2024-06-30",
    remote: true,
    description: "We are a local bakery looking to establish our online presence. We need a simple, elegant landing page that showcases our menu, location, and allows customers to contact us for custom cake orders.",
    deliverables: ["Fully responsive React landing page", "Source code on GitHub"],
    aboutClient: "Local bakery operating for 5 years.",
    applicants: 12
  },
  {
    id: "p2",
    title: "Design a logo for a tech startup",
    company: "TechNova Inc.",
    budget: "₹3,000",
    duration: "3 Days",
    category: "Design",
    skills: ["Graphic Design", "Illustrator", "Logo Design"],
    deadline: "2024-06-25",
    remote: true,
    description: "We are building an AI-powered analytics tool and need a modern, sleek logo that reflects innovation and trust.",
    deliverables: ["Vector files (AI, EPS)", "PNG/JPEG formats in high res", "Brand color codes"],
    aboutClient: "Early stage AI startup.",
    applicants: 8
  },
  {
    id: "p3",
    title: "Write blog posts about personal finance",
    company: "WealthyHabits Blog",
    budget: "₹2,500",
    duration: "2 Weeks",
    category: "Writing",
    skills: ["Content Writing", "SEO", "Finance"],
    deadline: "2024-07-05",
    remote: true,
    description: "Looking for a student who can write 5 well-researched blog posts (800 words each) on basic personal finance topics geared towards college students.",
    deliverables: ["5 Blog posts in Word/Google Docs format"],
    aboutClient: "Popular personal finance blog targeting Gen Z.",
    applicants: 4
  },
  {
    id: "p4",
    title: "Edit promotional video for social media",
    company: "FitLife Gym",
    budget: "₹4,000",
    duration: "1 Week",
    category: "Video Editing",
    skills: ["Premiere Pro", "After Effects", "Social Media"],
    deadline: "2024-06-28",
    remote: false,
    description: "We have raw footage from our recent gym event and need an exciting 60-second reel for Instagram and TikTok.",
    deliverables: ["60s MP4 video optimized for reels", "Project files"],
    aboutClient: "Local fitness center.",
    applicants: 15
  },
  {
    id: "p5",
    title: "Create a React Native mobile app MVP",
    company: "QuickDelivery",
    budget: "₹15,000",
    duration: "1 Month",
    category: "Mobile Dev",
    skills: ["React Native", "Firebase", "Mobile UI"],
    deadline: "2024-07-20",
    remote: true,
    description: "Looking for an experienced student developer to build a simple MVP for a local delivery service. It should have user login, a list of items, and a checkout cart.",
    deliverables: ["React Native source code", "APK file for testing"],
    aboutClient: "Logistics startup.",
    applicants: 25
  },
  {
    id: "p6",
    title: "Manage Instagram account for a month",
    company: "Aesthetic Apparel",
    budget: "₹6,000",
    duration: "1 Month",
    category: "Marketing",
    skills: ["Social Media Management", "Content Strategy", "Canva"],
    deadline: "2024-07-30",
    remote: true,
    description: "Need someone creative to plan, create, and post 3 times a week on our clothing brand's Instagram.",
    deliverables: ["12 posts with captions and hashtags", "Weekly performance report"],
    aboutClient: "Online clothing boutique.",
    applicants: 30
  },
  {
    id: "p7",
    title: "Develop a Discord Bot for community",
    company: "GamerGuild",
    budget: "₹3,500",
    duration: "2 Weeks",
    category: "Programming",
    skills: ["Node.js", "Discord.js", "API Integration"],
    deadline: "2024-07-10",
    remote: true,
    description: "Looking for a developer to build a custom Discord bot with moderation commands, an economy system, and role assignments.",
    deliverables: ["Bot source code", "Instructions on how to host"],
    aboutClient: "Gaming community with 5k members.",
    applicants: 18
  },
  {
    id: "p8",
    title: "Translate document from English to Hindi",
    company: "EduTech Solutions",
    budget: "₹2,000",
    duration: "3 Days",
    category: "Translation",
    skills: ["English", "Hindi", "Translation"],
    deadline: "2024-06-22",
    remote: true,
    description: "Need a 10-page educational document translated accurately from English to Hindi.",
    deliverables: ["Translated document in Word format"],
    aboutClient: "Educational technology company.",
    applicants: 6
  },
  {
    id: "p9",
    title: "Design UI for a SaaS Dashboard",
    company: "CloudMetrics",
    budget: "₹8,000",
    duration: "2 Weeks",
    category: "Design",
    skills: ["Figma", "UI/UX", "Prototyping"],
    deadline: "2024-07-15",
    remote: true,
    description: "We need a modern and clean UI design for our new analytics dashboard. It should include light and dark modes.",
    deliverables: ["Figma file with 5 screens", "Interactive prototype"],
    aboutClient: "B2B SaaS Analytics company.",
    applicants: 22
  },
  {
    id: "p10",
    title: "Write an SEO optimized article on AI",
    company: "TechTrends Magazine",
    budget: "₹1,500",
    duration: "4 Days",
    category: "Writing",
    skills: ["Content Writing", "Tech", "SEO"],
    deadline: "2024-06-25",
    remote: true,
    description: "Write a 1200-word article on the future of AI in healthcare, optimized for specific keywords.",
    deliverables: ["Word document with keyword density report"],
    aboutClient: "Online technology publication.",
    applicants: 10
  },
  {
    id: "p11",
    title: "Fix responsive issues on my portfolio",
    company: "John Doe (Freelancer)",
    budget: "₹1,000",
    duration: "1 Day",
    category: "Web Development",
    skills: ["HTML", "CSS", "Tailwind"],
    deadline: "2024-06-20",
    remote: true,
    description: "My personal portfolio looks great on desktop but is broken on mobile. Need quick fixes.",
    deliverables: ["Updated CSS/HTML files"],
    aboutClient: "Independent freelancer.",
    applicants: 5
  },
  {
    id: "p12",
    title: "Create 3D animation for product reveal",
    company: "InnovateTech",
    budget: "₹12,000",
    duration: "3 Weeks",
    category: "Video Editing",
    skills: ["Blender", "3D Animation", "Rendering"],
    deadline: "2024-07-25",
    remote: true,
    description: "We are launching a new smart watch and need a 15-second 3D animation showcasing its features.",
    deliverables: ["1080p MP4 file", "Project source files"],
    aboutClient: "Consumer electronics company.",
    applicants: 14
  },
  {
    id: "p13",
    title: "Scrape data from real estate websites",
    company: "PropTech Analytics",
    budget: "₹5,000",
    duration: "1 Week",
    category: "Data Science",
    skills: ["Python", "Web Scraping", "BeautifulSoup"],
    deadline: "2024-07-02",
    remote: true,
    description: "Need a script to scrape property listings from specific URLs and save them into a clean CSV format.",
    deliverables: ["Python script", "CSV file with at least 1000 rows"],
    aboutClient: "Real estate analytics firm.",
    applicants: 20
  },
  {
    id: "p14",
    title: "Design social media templates in Canva",
    company: "Growth Agency",
    budget: "₹2,500",
    duration: "1 Week",
    category: "Design",
    skills: ["Canva", "Graphic Design"],
    deadline: "2024-06-28",
    remote: true,
    description: "Create 10 reusable Canva templates for quotes, tips, and promotional posts.",
    deliverables: ["Links to editable Canva templates"],
    aboutClient: "Digital marketing agency.",
    applicants: 35
  },
  {
    id: "p15",
    title: "Perform security audit for simple PHP site",
    company: "Local Biz",
    budget: "₹7,000",
    duration: "2 Weeks",
    category: "Cybersecurity",
    skills: ["PHP", "Security", "Penetration Testing"],
    deadline: "2024-07-15",
    remote: true,
    description: "We have an old PHP application and need someone to identify vulnerabilities and suggest fixes.",
    deliverables: ["Detailed PDF report with findings and remediation steps"],
    aboutClient: "Small local business.",
    applicants: 9
  },
  {
    id: "p16",
    title: "Voiceover for 2-minute explainer video",
    company: "LearnFast",
    budget: "₹1,500",
    duration: "3 Days",
    category: "Audio",
    skills: ["Voice Acting", "Audio Editing"],
    deadline: "2024-06-23",
    remote: true,
    description: "Need an energetic male or female voiceover for a short educational animation.",
    deliverables: ["High-quality WAV file"],
    aboutClient: "E-learning platform.",
    applicants: 11
  },
  {
    id: "p17",
    title: "Migrate database from MySQL to PostgreSQL",
    company: "DataSync",
    budget: "₹9,000",
    duration: "2 Weeks",
    category: "Database",
    skills: ["MySQL", "PostgreSQL", "Database Admin"],
    deadline: "2024-07-10",
    remote: true,
    description: "Help us safely migrate our user database to PostgreSQL with minimal downtime.",
    deliverables: ["Migration scripts", "Documentation"],
    aboutClient: "Software startup.",
    applicants: 7
  },
  {
    id: "p18",
    title: "Write copy for email marketing campaign",
    company: "EmailGenius",
    budget: "₹3,000",
    duration: "1 Week",
    category: "Marketing",
    skills: ["Copywriting", "Email Marketing"],
    deadline: "2024-06-30",
    remote: true,
    description: "Write a 5-email sequence for onboarding new users to our platform.",
    deliverables: ["Google Doc with 5 emails including subject lines"],
    aboutClient: "Marketing automation tool.",
    applicants: 16
  },
  {
    id: "p19",
    title: "Create a custom WordPress theme",
    company: "Creative Studio",
    budget: "₹10,000",
    duration: "3 Weeks",
    category: "Web Development",
    skills: ["WordPress", "PHP", "CSS"],
    deadline: "2024-07-20",
    remote: true,
    description: "Convert our Figma design into a fully functional, custom WordPress theme.",
    deliverables: ["Zipped theme folder", "Installation instructions"],
    aboutClient: "Creative design agency.",
    applicants: 19
  },
  {
    id: "p20",
    title: "Develop smart contract for token",
    company: "CryptoLaunch",
    budget: "₹15,000",
    duration: "2 Weeks",
    category: "Blockchain",
    skills: ["Solidity", "Web3", "Ethereum"],
    deadline: "2024-07-15",
    remote: true,
    description: "Write and test a standard ERC-20 smart contract for a new utility token.",
    deliverables: ["Source code", "Test coverage report"],
    aboutClient: "Web3 startup.",
    applicants: 13
  }
];

export const MOCK_APPLICATIONS = [
  { id: "app1", projectTitle: "Build a landing page for my bakery", company: "Sweet Delights Bakery", appliedOn: "2024-06-15", status: "Pending" },
  { id: "app2", projectTitle: "Design a logo for a tech startup", company: "TechNova Inc.", appliedOn: "2024-06-12", status: "Accepted" },
  { id: "app3", projectTitle: "Write blog posts about personal finance", company: "WealthyHabits Blog", appliedOn: "2024-06-10", status: "Rejected" },
  { id: "app4", projectTitle: "Edit promotional video for social media", company: "FitLife Gym", appliedOn: "2024-06-05", status: "Shortlisted" },
];

export const MOCK_NOTIFICATIONS = [
  { id: "n1", title: "Application Viewed", message: "Sweet Delights Bakery has viewed your application.", time: "2 hours ago", read: false },
  { id: "n2", title: "New Message", message: "You have a new message from TechNova Inc.", time: "5 hours ago", read: false },
  { id: "n3", title: "Application Accepted", message: "Congratulations! TechNova Inc. accepted your proposal.", time: "1 day ago", read: true },
];

export const MOCK_REVIEWS = [
  { id: "r1", project: "E-Commerce Website", client: "Tech Startup", rating: 5, comment: "Excellent work! Delivered on time and exceeded expectations.", date: "2024-05-15" },
  { id: "r2", project: "Logo Design", client: "Local Bakery", rating: 4.5, comment: "Very creative and responsive to feedback.", date: "2024-04-20" },
  { id: "r3", project: "Blog Articles", client: "Marketing Agency", rating: 5, comment: "High quality content, well-researched.", date: "2024-03-10" }
];

export const MOCK_MESSAGES = [
  {
    id: "c1",
    name: "TechNova Inc.",
    project: "Design a logo for a tech startup",
    unread: 2,
    online: true,
    lastUpdated: new Date().toISOString(),
    messages: [
      { id: "m1", sender: "TechNova Inc.", text: "Hi Arjun, thanks for applying!", time: "10:00 AM", isMe: false },
      { id: "m2", sender: "Arjun", text: "Hello! Excited to discuss the logo design.", time: "10:05 AM", isMe: true },
      { id: "m3", sender: "TechNova Inc.", text: "Do you have experience with tech branding?", time: "10:10 AM", isMe: false },
      { id: "m4", sender: "Arjun", text: "Yes, I've designed for 3 tech startups recently.", time: "10:12 AM", isMe: true },
      { id: "m5", sender: "TechNova Inc.", text: "Great, could you share the links?", time: "10:15 AM", isMe: false },
      { id: "m6", sender: "Arjun", text: "Sure, here is my portfolio link.", time: "10:18 AM", isMe: true },
      { id: "m7", sender: "TechNova Inc.", text: "Looks excellent. The style matches what we want.", time: "10:25 AM", isMe: false },
      { id: "m8", sender: "Arjun", text: "Awesome! What colors are you envisioning?", time: "10:30 AM", isMe: true },
      { id: "m9", sender: "TechNova Inc.", text: "We are thinking deep blue and electric green.", time: "11:00 AM", isMe: false },
      { id: "m10", sender: "TechNova Inc.", text: "Are you available for a quick call later?", time: "11:01 AM", isMe: false }
    ]
  },
  {
    id: "c2",
    name: "Sweet Delights Bakery",
    project: "Build a landing page",
    unread: 0,
    online: false,
    lastUpdated: new Date(Date.now() - 86400000).toISOString(),
    messages: [
      { id: "m1", sender: "Sweet Delights", text: "Hi, we received your proposal.", time: "Yesterday", isMe: false },
      { id: "m2", sender: "Arjun", text: "Hello! Let me know if you need any more info.", time: "Yesterday", isMe: true },
      { id: "m3", sender: "Sweet Delights", text: "Can you build it in React?", time: "Yesterday", isMe: false },
      { id: "m4", sender: "Arjun", text: "Yes, absolutely.", time: "Yesterday", isMe: true },
      { id: "m5", sender: "Sweet Delights", text: "How long will it take?", time: "Yesterday", isMe: false },
      { id: "m6", sender: "Arjun", text: "About 1 week for the first draft.", time: "Yesterday", isMe: true },
      { id: "m7", sender: "Sweet Delights", text: "We also need a contact form.", time: "Yesterday", isMe: false },
      { id: "m8", sender: "Arjun", text: "I can integrate EmailJS for that.", time: "Yesterday", isMe: true },
      { id: "m9", sender: "Sweet Delights", text: "Sounds perfect. We will review internally.", time: "Yesterday", isMe: false },
      { id: "m10", sender: "Arjun", text: "Great, standing by.", time: "Yesterday", isMe: true }
    ]
  },
  {
    id: "c3",
    name: "FitLife Gym",
    project: "Edit promotional video",
    unread: 1,
    online: true,
    lastUpdated: new Date().toISOString(),
    messages: [
      { id: "m1", sender: "FitLife", text: "Hey! Do you use Premiere Pro?", time: "09:00 AM", isMe: false },
      { id: "m2", sender: "Arjun", text: "Yes, I am proficient in Premiere and After Effects.", time: "09:05 AM", isMe: true },
      { id: "m3", sender: "FitLife", text: "Can you do fast-paced cuts with music sync?", time: "09:10 AM", isMe: false },
      { id: "m4", sender: "Arjun", text: "Definitely, that's my specialty.", time: "09:12 AM", isMe: true },
      { id: "m5", sender: "FitLife", text: "We have about 10GB of raw footage.", time: "09:15 AM", isMe: false },
      { id: "m6", sender: "Arjun", text: "You can share it via Google Drive or Dropbox.", time: "09:20 AM", isMe: true },
      { id: "m7", sender: "FitLife", text: "Okay, setting up the folder now.", time: "09:30 AM", isMe: false },
      { id: "m8", sender: "FitLife", text: "Folder is ready. Will send link shortly.", time: "09:45 AM", isMe: false },
      { id: "m9", sender: "Arjun", text: "Perfect, I'll review it today.", time: "09:50 AM", isMe: true },
      { id: "m10", sender: "FitLife", text: "Here is the link: drive.google.com/xyz", time: "10:00 AM", isMe: false }
    ]
  },
  {
    id: "c4",
    name: "WealthyHabits Blog",
    project: "Write blog posts",
    unread: 0,
    online: false,
    lastUpdated: new Date(Date.now() - 172800000).toISOString(),
    messages: [
      { id: "m1", sender: "WealthyHabits", text: "Thanks for applying. Have you written about finance before?", time: "Monday", isMe: false },
      { id: "m2", sender: "Arjun", text: "Yes, I run my own small finance blog.", time: "Monday", isMe: true },
      { id: "m3", sender: "WealthyHabits", text: "Can you send a sample?", time: "Monday", isMe: false },
      { id: "m4", sender: "Arjun", text: "Here is a link to my article on budgeting.", time: "Monday", isMe: true },
      { id: "m5", sender: "WealthyHabits", text: "Reading it now...", time: "Monday", isMe: false },
      { id: "m6", sender: "WealthyHabits", text: "It's well written. We need 5 posts though.", time: "Monday", isMe: false },
      { id: "m7", sender: "Arjun", text: "I can deliver 5 posts in 2 weeks.", time: "Monday", isMe: true },
      { id: "m8", sender: "WealthyHabits", text: "The budget is 2500 total.", time: "Monday", isMe: false },
      { id: "m9", sender: "Arjun", text: "That works for me.", time: "Monday", isMe: true },
      { id: "m10", sender: "WealthyHabits", text: "Unfortunately we went with someone else. Thanks anyway!", time: "Tuesday", isMe: false }
    ]
  },
  {
    id: "c5",
    name: "Local Biz",
    project: "Security audit",
    unread: 0,
    online: false,
    lastUpdated: new Date(Date.now() - 259200000).toISOString(),
    messages: [
      { id: "m1", sender: "Local Biz", text: "Hi Arjun, saw your profile.", time: "Sunday", isMe: false },
      { id: "m2", sender: "Arjun", text: "Hello! How can I help?", time: "Sunday", isMe: true },
      { id: "m3", sender: "Local Biz", text: "We have an old PHP site.", time: "Sunday", isMe: false },
      { id: "m4", sender: "Local Biz", text: "Need someone to check for SQL injection.", time: "Sunday", isMe: false },
      { id: "m5", sender: "Arjun", text: "I can run a full vulnerability scan.", time: "Sunday", isMe: true },
      { id: "m6", sender: "Local Biz", text: "Will you provide a report?", time: "Sunday", isMe: false },
      { id: "m7", sender: "Arjun", text: "Yes, a detailed PDF report with fixes.", time: "Sunday", isMe: true },
      { id: "m8", sender: "Local Biz", text: "Sounds good. Can you start tomorrow?", time: "Sunday", isMe: false },
      { id: "m9", sender: "Arjun", text: "Yes, I can start tomorrow morning.", time: "Sunday", isMe: true },
      { id: "m10", sender: "Local Biz", text: "Great, I'll send the details over email.", time: "Sunday", isMe: false }
    ]
  }
];
