export const MOCK_PROJECTS = [
  {
    id: "p1",
    title: "Restaurant Website",
    budget: "₹5,000",
    duration: "7 Days",
    category: "Web Development",
    skills: ["React", "Tailwind", "Responsive Design"],
    deadline: "2024-05-15",
    company: "Spice Villa",
    remote: true,
    description: "Looking for a student to build a modern, responsive website for our restaurant. The site should include a menu, contact form, and gallery.",
    deliverables: ["Responsive UI", "Menu Page", "Contact Form Integration"],
    aboutClient: "Spice Villa is a fine dining restaurant in Mumbai known for its authentic Indian cuisine.",
    applicants: 12
  },
  {
    id: "p2",
    title: "Instagram Reels Editor",
    budget: "₹3,000",
    duration: "14 Days",
    category: "Video Editing",
    skills: ["Premiere Pro", "After Effects", "Social Media"],
    deadline: "2024-05-20",
    company: "FitLife Gym",
    remote: true,
    description: "Need an editor to create engaging Instagram reels from our gym workout footages. Looking for energetic cuts and trendy text overlays.",
    deliverables: ["10 Reels (30-60s)", "Source files", "Captions"],
    aboutClient: "FitLife is a modern fitness center focusing on high-intensity training.",
    applicants: 8
  },
  {
    id: "p3",
    title: "Landing Page Design",
    budget: "₹2,500",
    duration: "5 Days",
    category: "Design",
    skills: ["Figma", "UI/UX", "Web Design"],
    deadline: "2024-05-10",
    company: "TechNova Solutions",
    remote: true,
    description: "Design a high-converting landing page for our new SaaS product targeting small businesses.",
    deliverables: ["Figma File", "Mobile & Desktop versions", "Assets"],
    aboutClient: "TechNova builds productivity tools for remote teams.",
    applicants: 25
  },
  {
    id: "p4",
    title: "Product Description Writer",
    budget: "₹1,500",
    duration: "3 Days",
    category: "Writing",
    skills: ["Copywriting", "SEO", "English"],
    deadline: "2024-05-12",
    company: "EcoStyle Apparel",
    remote: true,
    description: "Write catchy and SEO-optimized product descriptions for 20 new clothing items.",
    deliverables: ["20 Product Descriptions", "SEO Keywords used"],
    aboutClient: "EcoStyle is a sustainable fashion brand.",
    applicants: 5
  },
  {
    id: "p5",
    title: "Logo Design for Startup",
    budget: "₹4,000",
    duration: "10 Days",
    category: "Design",
    skills: ["Illustrator", "Brand Identity", "Vector"],
    deadline: "2024-05-25",
    company: "NextGen AI",
    remote: true,
    description: "Create a minimal and modern logo for our AI startup. Should look professional and trustworthy.",
    deliverables: ["Logo in multiple formats", "Brand guidelines (Colors/Fonts)"],
    aboutClient: "NextGen AI is building tools for automated customer support.",
    applicants: 30
  },
  {
    id: "p6",
    title: "Data Entry & Clean up",
    budget: "₹2,000",
    duration: "5 Days",
    category: "Admin",
    skills: ["Excel", "Attention to Detail", "Data Entry"],
    deadline: "2024-05-18",
    company: "Local Market Research",
    remote: true,
    description: "Clean up a messy Excel spreadsheet with 1000 rows of contact information. Remove duplicates and format correctly.",
    deliverables: ["Cleaned Excel File"],
    aboutClient: "We conduct market research for local businesses.",
    applicants: 42
  }
];

export const MOCK_USER = {
  name: "Arjun Mehta",
  college: "Indian Institute of Technology, Delhi",
  avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  bio: "Computer Science junior passionate about building beautiful web applications. Looking to gain real-world experience and help startups grow.",
  skills: ["React", "TypeScript", "Node.js", "Figma", "Tailwind CSS"],
  portfolio: [
    { title: "E-commerce UI", link: "https://example.com/ecom" },
    { title: "Weather App", link: "https://example.com/weather" }
  ],
  stats: {
    completion: 75,
    totalEarnings: 18500,
    appliedProjects: 23,
    activeProjects: 4,
    rating: 4.8
  },
  projectsCompleted: 8,
  achievements: ["Top Performer", "Fast Delivery", "Verified Portfolio"]
};

export const MOCK_APPLICATIONS = [
  { id: "a1", projectTitle: "Restaurant Website", company: "Spice Villa", status: "Reviewed", appliedOn: "2024-05-01" },
  { id: "a2", projectTitle: "Landing Page Design", company: "TechNova", status: "Pending", appliedOn: "2024-05-03" },
  { id: "a3", projectTitle: "React Native Bug Fix", company: "AppWorks", status: "Accepted", appliedOn: "2024-04-28" },
  { id: "a4", projectTitle: "Logo Design", company: "StartupX", status: "Rejected", appliedOn: "2024-04-25" },
];

export const MOCK_NOTIFICATIONS = [
  { id: "n1", title: "Application Accepted!", message: "AppWorks accepted your application for 'React Native Bug Fix'.", time: "2 hours ago", read: false },
  { id: "n2", title: "New Message", message: "Spice Villa sent you a message regarding your proposal.", time: "5 hours ago", read: false },
  { id: "n3", title: "Project Recommendation", message: "We found 3 new projects matching your skills.", time: "1 day ago", read: true },
];

export const MOCK_REVIEWS = [
  { id: "r1", client: "AppWorks", rating: 5, text: "Arjun was fantastic to work with. Delivered the bug fixes ahead of schedule and the code quality was excellent.", date: "2024-04-20" },
  { id: "r2", client: "Local Shop", rating: 4.5, text: "Great communication and very responsive to feedback. Built a solid inventory tracker for us.", date: "2024-03-15" }
];

export const MOCK_MESSAGES = [
  { id: "m1", sender: "Spice Villa", text: "Hi Arjun, we loved your portfolio. Can you share an example of a restaurant site you've built?", time: "10:30 AM", isMe: false },
  { id: "m2", sender: "Arjun Mehta", text: "Hello! Thank you. I haven't built a restaurant site specifically, but I've built an e-commerce site with similar menu/ordering flows. Here is the link: example.com/ecom", time: "10:35 AM", isMe: true },
  { id: "m3", sender: "Spice Villa", text: "That looks great. Are you available for a quick call tomorrow to discuss the requirements?", time: "11:00 AM", isMe: false },
];
