export interface Project {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  summary: string;
  image: string;
  tags: string[];
  content: ProjectContent;
}

export type MediaType = "image" | "video" | "pdf";

export interface MediaItem {
  type: MediaType;
  src: string;
  label: string;
  description?: string;
}

export interface ProjectContent {
  introduction?: string;
  objective?: string;
  innovation?: string;
  methodology?: string;
  results?: string;
  materials?: string[];
  citations?: string[];
  abstract?: string;
  background?: string;
  subProjects?: SubProject[];
  media?: MediaItem[];
  hardwareGroups?: HardwareGroup[];
  comparisons?: ComparisonStage[];
  contentFlow?: ContentFlowItem[];
}

export interface HardwareGroup {
  title: string;
  items: string[];
}

export interface ComparisonStage {
  title: string;
  note?: string;
  hardwareComponents: string[];
  functions: string[];
}

export interface ContentFlowItem {
  mediaIndex: number;
  title: string;
  subtitle?: string;
  text: string;
  bullets?: string[];
}

export interface SubProject {
  title: string;
  description: string;
}

export const skills = [
  "Robotics (Arduino/ESP32)",
  "IoT automation",
  "ML pipelines",
  "Geospatial modeling (Python/ANSYS/MATLAB)",
  "Sensor integration",
  "3D CAD & fabrication",
  "Data visualization",
  "Research writing",
  "Leadership & ops",
  "STEM outreach",
  "Web dashboards",
  "Field testing",
];

export const projects: Project[] = [
  {
    id: "beetlebot",
    title: "Fire-Safety Quadruped (BeetleBot)",
    shortTitle: "BeetleBot Rescue",
    category: "Spotlight",
    summary:
      "Built RC+Wi-Fi quadruped with night vision and onboard audio; briefed DRDO & Naval Dockyard; earned Letter of Appreciation and FSAI talk to 200+ engineers.",
    image: "/projects/spider-bot/img1.jpeg",
    tags: ["Rescue robotics", "Night vision", "RC control", "Field demos"],
    content: {
      abstract:
        "Search-and-rescue quadruped with dual-mode (RC + Wi-Fi) control, IR night vision, and audio feed for confined-space response.",
      innovation:
        "Servo gait tuned for debris traversal; dual control path keeps operator link alive when Wi-Fi drops; payload-ready for gas/thermal sensing.",
      methodology:
        "Iterated Mark 1→2 after DRDO input; calibrated 12-servo gait, integrated RC receiver + ESP32 telemetry, mounted IR camera, validated maneuvering in clutter.",
      results:
        "Executed demos for DRDO Delhi and Naval Dockyard Mumbai; secured formal appreciation; recognized as Most Innovative Project at BIS Tech Fair 2025 and speaker slot at FSAI Mumbai (200+ audience).",
      hardwareGroups: [
        {
          title: "Core Stack",
          items: [
            "Arduino Nano + ESP32 control spine",
            "SunFounder PiCrawler chassis with metal servos",
            "RC Tx/Rx for long-range failsafe",
            "720p IR Wi-Fi camera with audio",
            "Dual 18650 pack + UBEC power",
          ],
        },
      ],
      contentFlow: [
        {
          mediaIndex: 0,
          title: "Traversal Ready",
          subtitle: "Aluminum chassis + calibrated gait",
          text: "12-servo IK tuned for forward/side pivots; wiring contained for debris contact.",
          bullets: [
            "Dual-mode control keeps operator link live.",
            "IR vision covers low-light entries.",
            "Audio feed surfaces trapped-victim cues.",
          ],
        },
        {
          mediaIndex: 2,
          title: "Field Demo Loop",
          subtitle: "Night vision + telemetry",
          text: "Live camera stream and RC inputs validated in cluttered spaces before DRDO review.",
          bullets: [
            "RC primary with Wi-Fi fallback.",
            "Operator sees + hears environment in real time.",
          ],
        },
      ],
      citations: [
        "https://researchinestonia.eu/2024/05/14/spider-inspired-robots/",
        "https://sdgs.un.org/goals/goal3",
      ],
      media: [
        {
          type: "image",
          src: "/projects/spider-bot/img1.jpeg",
          label: "BeetleBot pose",
          description: "Quadruped ready for rescue entry.",
        },
        {
          type: "image",
          src: "/projects/spider-bot/img4.jpeg",
          label: "BeetleBot in motion",
        },
        {
          type: "image",
          src: "/projects/spider-bot/img5.jpeg",
          label: "IR night run",
        },
        {
          type: "video",
          src: "/projects/spider-bot/Spider_Bot_video.mp4",
          label: "BeetleBot demo",
          description: "Click to watch traversal and telemetry.",
        },
      ],
    },
  },
  {
    id: "smart-compost",
    title: "Smart Compost System (IoT + ML)",
    shortTitle: "Smart Compost",
    category: "Spotlight",
    summary:
      "Built dual-function reactor with NPK/ammonia/temp/moisture sensing, ESP32 automation, and ML Compost Quality Score; cut cycle time 20–25% and costs 40–50%.",
    image: "/projects/compost/compost-bin-01.jpeg",
    tags: ["IoT automation", "ESP32", "Agri-ML", "Sustainability"],
    content: {
      abstract:
        "Low-cost compost reactor that monitors nutrients and automates aeration, heating, and moisture control while scoring quality via ML dashboard.",
      innovation:
        "Combines sensor validation (±10% accuracy) with bilingual UI and CQS scoring so smallholder farmers can trust output before field use.",
      methodology:
        "Ran 15-day trials across five compost mixes; validated NPK, MQ137, DS18B20, DHT11; automated pump/heater/fan triggers; logged to cloud dashboard and ML model.",
      results:
        "Achieved 45–55 day maturation (20–25% faster); reduced per-kg cost 40–50%; stabilized moisture 50–60% and trimmed ammonia peaks ~20%.",
      materials: [
        "ESP32 + cloud dashboard",
        "NPK, MQ137, DS18B20, DHT11 sensors",
        "PTC heater, pump, exhaust fan",
        "LCD + bilingual UI",
        "CQS ML model",
      ],
      media: [
        { type: "image", src: "/projects/compost/compost-bin-01.jpeg", label: "Sensor deck" },
        { type: "image", src: "/projects/compost/compost-bin-02.jpeg", label: "Aeration setup" },
        { type: "image", src: "/projects/compost/compost-bin-05.jpeg", label: "Control view" },
        {
          type: "video",
          src: "/projects/compost/videos/Khadify_DemoVideo_2025.mp4",
          label: "Khadify Demo 2025",
          description: "Latest end-to-end demo of the smart compost system (automation + dashboard).",
        },
        {
          type: "pdf",
          src: "/docs/Khadify_PPT_Submission.pdf",
          label: "Khadify Project Deck",
        },
      ],
    },
  },
  {
    id: "coastal-erosion",
    title: "Coastal Erosion Modeling (Mangroves)",
    shortTitle: "Coastal Modeling",
    category: "Spotlight",
    summary:
      "Modeled mangrove root-density effects on wave attenuation using Hansen Global Forest data, Python GIS, ANSYS/MATLAB shoreline simulations, and long-term land-loss scenarios to guide coastal resilience.",
    image: "/projects/compost/compost-bin-01.jpeg",
    tags: ["Geospatial", "Simulation", "Climate resilience"],
    content: {
      abstract:
        "Independent study quantifying mangrove density vs. shoreline stability using remote-sensing datasets and simulation to prioritize coastal buffers.",
      methodology:
        "Processed Hansen Global Forest layers; built Python geospatial pipeline; simulated root drag and wave energy in ANSYS/MATLAB; mapped erosion risk bands.",
      results:
        "Identified high-loss segments needing reforestation; produced policy-ready visuals to guide buffer planting and monitoring.",
      media: [
        {
          type: "image",
          src: "/projects/compost/compost-bin-01.jpeg",
          label: "Field instrumentation for validation",
          description: "Real-world hardware setup used for sensor validation and soil sampling; avoids AI imagery while illustrating hands-on workflow.",
        },
      ],
    },
  },
  {
    id: "research-innovation",
    title: "Research & Engineering Innovation",
    shortTitle: "Innovation Awards",
    category: "Research & Entrepreneurship",
    summary:
      "Captured CREST Gold (materials science enamel study) and Hippo Technotex internship delivering cost/thermal analysis for Cool Roof panels.",
    image: "/projects/spider-bot/img2.jpeg",
    tags: ["Materials", "Thermal analysis", "Research"],
    content: {
      subProjects: [
        {
          title: "CREST Gold Award",
          description:
            "Co-authored pH–erosion study using eggshell enamel analogues; paired microscopy with corrosion scoring.",
        },
        {
          title: "Hippo Technotex Internship (2025–present)",
          description:
            "Benchmarked Cool Roof sandwich panels vs. conventional roofing; modeled thermal + structural loads and drafted scalable design guidance.",
        },
      ],
    },
  },
  {
    id: "robotics-leadership",
    title: "Robotics, Competitions & Club Leadership",
    shortTitle: "Robotics & Leadership",
    category: "Competitions & Leadership",
    summary:
      "Led FTC G-Force CAD, founded AI Club, ran Engineering Club build labs, and served Tech Secretary for BIS Tech Fest with AV + web ops.",
    image: "/projects/spider-bot/img3.jpeg",
    tags: ["FTC", "Club leadership", "Workshops"],
    content: {
      subProjects: [
        {
          title: "FIRST Tech Challenge (G-Force)",
          description:
            "3D-CAD lead; team earned Think Award (Kazakhstan Nationals) and Inspire Award + 2nd overall (India Nationals).",
        },
        {
          title: "Founder, AI Club",
          description:
            "Built school AI program with Coding & More; authored curriculum and workshops; grew cross-grade membership.",
        },
        {
          title: "President, Engineering Club(s)",
          description:
            "Ran prototyping, 3D design, drone-building modules; mentored juniors in CAD/circuits/mechanics.",
        },
        {
          title: "Tech Secretary",
          description:
            "Produced BIS Tech Fest “Tech for All”; built tech escape room, expert panels, AV systems, and website updates.",
        },
      ],
    },
  },
  {
    id: "stem-olympiads",
    title: "STEM Olympiads & Academic Achievements",
    shortTitle: "STEM Honors",
    category: "Competitions & Leadership",
    summary:
      "IGCSE World Topper (Additional Math 2025); SASMO Gold; HKISO Silver; Waterloo Pascal Distinction; AP Microeconomics 5 (self-study).",
    image: "/placeholder.svg",
    tags: ["Olympiads", "Math", "Self-study"],
    content: {
      subProjects: [
        { title: "IGCSE World Topper", description: "Additional Mathematics (2025)." },
        { title: "SASMO Gold & HKISO Silver", description: "International STEM Olympiads." },
        { title: "Waterloo Pascal Distinction", description: "Problem-solving recognition." },
        { title: "AP Microeconomics 5", description: "Self-studied advanced quantitative econ." },
      ],
    },
  },
  {
    id: "tech-fairs-outreach",
    title: "Tech Fairs, Outreach & Applied STEM",
    shortTitle: "Tech Outreach",
    category: "Outreach & Fairs",
    summary:
      "Captured BIS Tech Fair honors (Most Creative 2024, Most Innovative 2025) and led STEM workshops, compost demos, and robotics/AI sessions.",
    image: "/projects/compost/compost-bin-03.jpeg",
    tags: ["STEM outreach", "UI/UX", "Education"],
    content: {
      subProjects: [
        {
          title: "Most Creative Project (2024)",
          description: "Cyberbullying-awareness website with interactive UI/UX for social impact.",
        },
        {
          title: "Most Innovative Project (2025)",
          description: "BeetleBot showcase at BIS Tech Fair.",
        },
        {
          title: "STEM Outreach",
          description: "Workshops and demos on compost-tech and robotics/AI for students.",
        },
      ],
    },
  },
  {
    id: "cyber-advocacy",
    title: "Cyber-Bullying Advocacy & Social Impact",
    shortTitle: "Cyber Advocacy",
    category: "Community",
    summary:
      "Founded cyberbullying awareness portal; ran 1,000+ participant seminars; secured 1,300+ signature petition with Dept. of Education endorsement.",
    image: "/projects/compost/compost-bin-01.jpeg",
    tags: ["Advocacy", "Policy", "Digital safety"],
    content: {
      media: [
        {
          type: "pdf",
          src: "/docs/Cyberbullying Awareness and Prevention in India.pdf",
          label: "Cyberbullying Awareness (English)",
        },
        {
          type: "pdf",
          src: "/docs/Hindi_Cyberbullying Awareness and Prevention in India.pdf",
          label: "Cyberbullying Awareness (Hindi)",
        },
        {
          type: "pdf",
          src: "/docs/Cyberbullying Prevention Infographic.pdf",
          label: "Cyberbullying Infographic",
        },
        {
          type: "pdf",
          src: "/docs/Message_DharmendraPradhan_CyberDost.pdf",
          label: "Message from Minister Pradhan",
        },
      ],
      subProjects: [
        {
          title: "Awareness Platform",
          description:
            "Built bilingual portal on psychological/legal/policy aspects; pitched for 100-school adoption.",
        },
        {
          title: "Community Campaigns",
          description:
            "Art exhibit with Brush of Hope; schoolwide expert panel; pamphlet distribution to all staff.",
        },
        {
          title: "Mass Training",
          description: "Recurring online seminars for 1,000+ students/teachers on reporting and digital citizenship.",
        },
        {
          title: "Policy Push",
          description:
            "Legislation petition with 1,300+ signatures; endorsed by Maharashtra Dept. of Education.",
        },
      ],
    },
  },
  {
    id: "leadership-community",
    title: "Service & Expeditions",
    shortTitle: "Leadership & Grit",
    category: "Service & Expeditions",
    summary:
      "Head Boy 2024–25; launched BIS Beholder film festival; executed school events; completed NOLS 65-mile expedition and multiple treks; advanced skier and scuba certified.",
    image: "/hero-banner.jpg",
    tags: ["Leadership", "Operations", "Expeditions"],
    content: {
      subProjects: [
        {
          title: "Head Boy & Event Ops",
          description:
            "Ran elections, investiture, NGO fair, showcases, and AV coordination; liaison across faculty, students, and parents.",
        },
        {
          title: "BIS Beholder Festival",
          description: "Created and directed the school’s first interschool short-film festival.",
        },
        {
          title: "Outdoor Leadership",
          description:
            "NOLS NH backpacking (65 miles/15 days, ~20 kg packs); Sandakphu–Phalut 50-mile trek (Most Spirited Trekker); Uluru–Kata Tjuta 10-mile cultural trek; built simple nav app for trail safety.",
        },
        {
          title: "Athletics & Discipline",
          description: "Advanced alpine skier (Black Diamond), open-water scuba diver, regular badminton athlete.",
        },
      ],
    },
  },
];

export const aboutData = {
  name: "Aaryamann Goenka",
  title: "STEM Generalist | Robotics & IoT Builder | Outreach Lead",
  bio: "Designs rescue robots, IoT + ML systems, and geospatial models; leads clubs, competitions, and outreach with a bias for measurable impact.",
  technicalBackground: [
    "Robotics control: Arduino, ESP32, RC + Wi-Fi failsafes",
    "IoT + ML dashboards for sensing and automation",
    "Geospatial + simulation: Python GIS, ANSYS, MATLAB",
    "3D CAD, rapid prototyping, PCB and soldering",
    "Field testing, sensor validation, and iteration loops",
  ],
  achievements: [
    "BeetleBot demos to DRDO/Naval Dockyard + FSAI talk (200+ audience)",
    "Smart Compost: 20–25% faster cycles, 40–50% cheaper output",
    "Coastal erosion modeling to map mangrove impact",
    "CREST Gold (materials science) + Hippo Technotex internship",
    "FTC Think Award + Inspire Award; AI/Engineering club leadership",
    "IGCSE World Topper (Add-Math) + SASMO Gold + HKISO Silver",
  ],
  education: {
    school: "",
    graduation: "",
    grades: "",
  },
  courses: [],
  leadership: [
    "Head Boy, Bombay International School (2024–Present)",
    "Tech Secretary (2023–2024)",
    "Founder, AI Club",
    "President, Engineering Club",
  ],
};

export const contactData = {
  email: "aaryamann.2771@bis.edu.in",
  phone: "+91 8291817701",
  location: "Mumbai, India",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
};
