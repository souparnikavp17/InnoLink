/* ==========================================================================
   InnoLink Seed Data & Constants
   All data clearly designated as fictional sample data for prototype testing.
   ========================================================================== */

export const CATEGORIES = [
  "All",
  "Healthcare & Accessibility",
  "Campus & Academic Life",
  "Urban & Civic Tech",
  "Everyday Living",
  "Workplace & Productivity",
  "Environmental Sustainability"
];

export const STATUS_LABELS = {
  OPEN: "Open",
  SOLUTION_PROPOSED: "Solution Proposed",
  IN_DEVELOPMENT: "In Development",
  SOLVED: "Solved"
};

export const PERSONAS = [
  { id: "poster", label: "Problem Poster", description: "Sharing recurring challenges from daily life, campus, or workplace" },
  { id: "solver", label: "Problem-solver / Innovator", description: "Exploring real-world problems to design and test viable solutions" },
  { id: "expert", label: "Expert / Validator", description: "Reviewing technical claims, safety, and mentorship feasibility" },
  { id: "sponsor", label: "Organization / Sponsor", description: "Funding targeted innovation challenges and rewarding solutions" }
];

export const VALIDATION_TASKS = [
  { id: 1, title: "Explain what InnoLink does after viewing the landing page." },
  { id: 2, title: "Find a problem relevant to you using the feed, search, or filters." },
  { id: 3, title: "Post a sample problem using the creation form." },
  { id: 4, title: "Find where you would submit a solution to an existing problem." },
  { id: 5, title: "Explain how you tell if a solution is community-voted vs expert-validated." }
];

export const SPONSORED_CHALLENGES = [
  {
    id: "sc-1",
    title: "Non-Invasive Continuous Hydration Monitoring for Outdoor Agricultural Workers",
    sponsorName: "AgriHealth Global Foundation",
    sponsorType: "Health & Labor NGO",
    sponsorAvatar: "AG",
    bountyAmount: "$12,000 USD",
    bountyNote: "1st: $8,000 • 2nd: $3,000 • 3rd: $1,000",
    deadline: "December 15, 2026",
    daysLeft: 56,
    category: "Healthcare & Accessibility",
    problemSummary: "Farmworkers and outdoor construction laborers suffer severe heat stress and chronic kidney damage due to lack of accessible, real-time warning indicators before dehydration becomes dangerous.",
    details: "In hot agricultural valleys, seasonal workers regularly experience dangerous heat exhaustion. Current clinical hydration tests require invasive blood draws or laboratory urine analysis, which are impossible during harvesting shifts. We challenge innovators to create a non-invasive, wearable or field-ready indicator that alerts workers to rehydrate before physiological danger thresholds are reached.",
    requirements: [
      "Working low-cost hardware prototype or wearable sensor concept + open firmware",
      "Bill of materials (BOM) target strictly under $15 per worker unit at scale",
      "Minimum 14 hours battery endurance under direct sunlight and high ambient temperature (up to 45°C / 113°F)",
      "Sweat, dust, and vibration resistant (IP67 or equivalent mechanical enclosure)",
      "Immediate intuitive visual/haptic alert without requiring smartphone pairing"
    ],
    evaluationCriteria: [
      { label: "Biometric Correlation & Accuracy", weight: "30%" },
      { label: "Affordability & Manufacturability (<$15 BOM)", weight: "25%" },
      { label: "Harsh Environment Durability (dust/sweat)", weight: "25%" },
      { label: "Ergonomics & Worker Usability", weight: "20%" }
    ],
    eligibility: "Open to student engineering teams, independent researchers, medical device startups, and multidisciplinary problem-solvers worldwide."
  },
  {
    id: "sc-2",
    title: "Low-Cost Acoustic Sensor for Early Water Micro-Leak Detection in Municipal & Campus Pipes",
    sponsorName: "Metro Urban Infrastructure Lab",
    sponsorType: "Civic Public-Private Research Lab",
    sponsorAvatar: "MU",
    bountyAmount: "$20,000 USD",
    bountyNote: "Direct research & prototyping grant",
    deadline: "January 30, 2027",
    daysLeft: 102,
    category: "Urban & Civic Tech",
    problemSummary: "Subterranean water pipe pinhole leaks waste over 30% of treated municipal water across university campuses and older municipal districts before surface damage appears.",
    details: "Aging buried distribution mains suffer slow pressure micro-fractures that remain hidden underground for months, eroding roadbeds and wasting millions of gallons of clean drinking water. Traditional acoustic correlation gear costs upwards of $10,000 per field unit, restricting regular inspection. We seek an ultra-affordable edge sensor array that attaches non-invasively to surface hydrant valves or accessible pipe junctions.",
    requirements: [
      "Acoustic frequency analysis between 20 Hz – 2.5 kHz capable of pinpointing high-pressure turbulence",
      "On-device edge filtering algorithm to reject vehicle street noise and construction false positives",
      "Component cost under $65 per monitoring node",
      "Mesh or LoRaWAN wireless telemetry support for remote data transmission",
      "Open API / data schema for municipal GIS mapping integration"
    ],
    evaluationCriteria: [
      { label: "Leak Detection Sensitivity (>85% recall on pinholes)", weight: "35%" },
      { label: "False Positive Rejection (street/traffic noise)", weight: "30%" },
      { label: "Deployment & Unit Hardware Cost", weight: "20%" },
      { label: "Documentation & Open Telemetry API", weight: "15%" }
    ],
    eligibility: "Engineering students, IoT hardware developers, civic hackers, and municipal utility specialists."
  },
  {
    id: "sc-3",
    title: "Accessible Real-Time Tactile & Haptic Navigation Interface for Visually Impaired Commuters",
    sponsorName: "TransitAccess Initiative",
    sponsorType: "Civic Non-Profit & Accessibility Council",
    sponsorAvatar: "TA",
    bountyAmount: "$8,500 USD",
    bountyNote: "Pilot deployment fellowship + prize",
    deadline: "November 28, 2026",
    daysLeft: 39,
    category: "Healthcare & Accessibility",
    problemSummary: "Multi-level transit stations and temporary construction detours leave blind and low-vision passengers stranded without reliable, real-time spatial orientation.",
    details: "When metro stations undergo renovation or temporary platform diversions, visual detour signage is useless for visually impaired commuters. GPS also fails underground in multi-tiered subway complexes. This challenge invites solutions that provide tactile, spatial audio, or haptic directional guidance to help travelers navigate complex platforms and transfers with autonomy.",
    requirements: [
      "Prototype mobile or wearable haptic guide (e.g. handheld wand, smartphone haptic feedback pattern, or smart cane attachment)",
      "Must not obstruct ambient hearing (ears must remain open to safety announcements)",
      "Strict compliance with WCAG 2.2 AAA accessibility guidelines",
      "Dynamic rerouting response time under 1.5 seconds when an unexpected barricade is detected",
      "Co-designed or validated with at least two visually impaired testers"
    ],
    evaluationCriteria: [
      { label: "Empirical Feedback from Visually Impaired Testers", weight: "40%" },
      { label: "Underground Routing Precision & Low Latency", weight: "30%" },
      { label: "Ease of Adoption & Zero Audio Interference", weight: "30%" }
    ],
    eligibility: "Human-computer interaction (HCI) researchers, accessibility advocates, mobile app developers, and assistive technology creators."
  }
];

export const SAMPLE_PROBLEMS = [
  {
    id: "prob-1",
    title: "Dangerous pedestrian blind-spot at university transit hub corner",
    category: "Urban & Civic Tech",
    status: STATUS_LABELS.SOLUTION_PROPOSED,
    frequency: "Daily",
    impactLevel: "Critical",
    description: "Pedestrians walking from the central campus bus stop to the science complex must cross a blind 90-degree service delivery ramp. Delivery vans and electric campus shuttles frequently round the corner at speeds exceeding 25 km/h, resulting in at least four documented near-misses this academic term.",
    context: "The service road has high hedges and concrete retaining walls on both sides that block line-of-sight until a pedestrian is already stepping onto the tarmac. Flashing mirrors installed 2 years ago are frequently dirty, foggy in morning dampness, or misaligned.",
    author: {
      name: "Maya Lin",
      role: "Graduate Student & Campus Safety Rep",
      avatar: "ML"
    },
    createdAt: "2026-10-12",
    supportedByCount: 84,
    comments: [
      {
        id: "c-101",
        author: "Devon Reed (Civil Eng)",
        text: "I witnessed a student drop their laptop jumping out of the way of a food delivery van here last Tuesday. A mirror simply doesn't give enough reaction time in morning fog.",
        timestamp: "5 days ago"
      },
      {
        id: "c-102",
        author: "Prof. Sarah Jenkins (Urban Systems)",
        text: "The geometry of that intersection was designed in 1978 for 500 students; the hub now handles over 8,000 pedestrian movements each day.",
        timestamp: "3 days ago"
      }
    ],
    solutions: [
      {
        id: "sol-101",
        title: "Smart Solar LIDAR Curvature Alert & In-Pavement LED Warning Strip",
        author: {
          name: "Liam O'Connor & Team Apex",
          role: "Robotics Undergrad Team"
        },
        approach: "Install a self-contained, solar-powered dual ultrasonic/LIDAR sensor package 20 meters before the corner on the vehicle side. When approaching vehicle speed > 10 km/h is detected, an embedded high-visibility red LED warning line embedded in the pedestrian sidewalk curb pulses, giving pedestrians 4 seconds of proactive visual warning before the vehicle emerges.",
        evidenceUrl: "https://github.com/apex-robotics/campus-pedestrian-radar-demo",
        status: "Prototype Tested on Benchtop",
        isExpertReviewed: false,
        communityVotes: {
          helpful: 47,
          needsWork: 3,
          canBuild: 8
        }
      }
    ]
  },
  {
    id: "prob-2",
    title: "Overwhelming auditory alarms in hospital recovery wards causing severe sensory fatigue",
    category: "Healthcare & Accessibility",
    status: STATUS_LABELS.OPEN,
    frequency: "Daily",
    impactLevel: "High",
    description: "Post-operative surgical wards have dozens of medical monitors (infusion pumps, pulse oximeters, ECGs) emitting high-pitched beeps simultaneously. Over 85% of these alarms are non-actionable false alarms or routine status alerts, leading to severe nurse alarm fatigue and preventing patients from achieving deep healing sleep.",
    context: "Nurses report desensitization from hearing 350+ alarms per shift. Patients with neurological sensitivity or post-anesthesia confusion experience delirium, elevated cortisol levels, and heightened distress.",
    author: {
      name: "Nurse Rachel Adams, RN",
      role: "Acute Care Nurse",
      avatar: "RA"
    },
    createdAt: "2026-10-14",
    supportedByCount: 112,
    comments: [
      {
        id: "c-201",
        author: "Dr. K. Thorne (ICU Director)",
        text: "Alarm fatigue is a recognized Joint Commission National Patient Safety Goal. Solutions need to integrate without violating medical device regulatory alarm requirements.",
        timestamp: "4 days ago"
      }
    ],
    solutions: []
  },
  {
    id: "prob-3",
    title: "Unused high-end laboratory equipment sitting idle while student research groups lack access",
    category: "Campus & Academic Life",
    status: STATUS_LABELS.IN_DEVELOPMENT,
    frequency: "Weekly",
    impactLevel: "Moderate",
    description: "Specialized equipment like spectrophotometers, 3D laser scanners, and centrifuge arrays in funded departments sit idle 70% of the week, while undergraduate capstone groups and unfunded research scholars wait months or pay external fees for access.",
    context: "Departments maintain separate booking spreadsheets or paper logbooks. There is no unified discovery layer or peer-training verification to allow safe, cross-departmental booking with supervisor sign-off.",
    author: {
      name: "Tariq Mansour",
      role: "Biochemistry Honors Student",
      avatar: "TM"
    },
    createdAt: "2026-10-08",
    supportedByCount: 65,
    comments: [
      {
        id: "c-301",
        author: "Dr. Lisa Vance (Lab Manager)",
        text: "The main hesitation from lab PIs is liability: who pays if a student from another department breaks a $40,000 laser objective? Any system must include micro-credential training checks.",
        timestamp: "1 week ago"
      }
    ],
    solutions: [
      {
        id: "sol-301",
        title: "CampusEquipmentLink: Decentralized Shared Inventory with Training Verification Badges",
        author: {
          name: "OpenCampus Lab Coalition",
          role: "Graduate Student Collective"
        },
        approach: "A web platform connecting university asset management APIs with digital student training credentials. PI labs set available idle slots; students earn digitized safety badges to unlock self-service booking with insurance backstop guarantees.",
        evidenceUrl: "https://zenodo.org/record/sample-shared-research-infrastructure",
        status: "Pilot Trial at University BioHub",
        isExpertReviewed: true,
        expertNotes: "Reviewed by University Research Infrastructure Committee: technically viable, safety protocol matches institutional ISO standards.",
        communityVotes: {
          helpful: 52,
          needsWork: 2,
          canBuild: 11
        }
      }
    ]
  },
  {
    id: "prob-4",
    title: "High elderly medication mix-ups due to visually identical generic pill packaging",
    category: "Everyday Living",
    status: STATUS_LABELS.SOLUTION_PROPOSED,
    frequency: "Daily",
    impactLevel: "Critical",
    description: "Elderly patients with mild cognitive impairment or macular degeneration frequently mistake blood pressure medication for anticoagulant pills because generic pharmaceutical blister packs share identical silver foil, tiny 6pt font, and similar capsule shapes.",
    context: "Community pharmacists report multiple emergency room visits every month caused by double-dosing or missed heart medication. Existing pill organizer boxes require tedious weekly manual sorting by caregivers who are not always available.",
    author: {
      name: "Elena Rostova",
      role: "Geriatric Care Coordinator",
      avatar: "ER"
    },
    createdAt: "2026-10-15",
    supportedByCount: 97,
    comments: [
      {
        id: "c-401",
        author: "Julian Chen (PharmD)",
        text: "Look-alike, sound-alike (LASA) medications are a massive problem in community outpatient care. Simple color bands or tactile blister foils would save thousands of hospital admissions.",
        timestamp: "2 days ago"
      }
    ],
    solutions: [
      {
        id: "sol-401",
        title: "Tactile Silicone Clip Sleeves with High-Contrast Braille & NFC Audio Verification",
        author: {
          name: "InclusiveDesign Lab",
          role: "Assistive Tech Designers"
        },
        approach: "Reusable color-coded silicone snap-sleeves that clamp securely onto standard pharmacy pill bottles. Each sleeve has distinct tactile geometric shapes (triangle = morning heart, circle = evening) and a passive NFC chip that reads dosage instructions out loud through any standard tap-enabled phone.",
        evidenceUrl: "https://inclusive-hardware.org/nfc-prescription-sleeves-case-study",
        status: "Prototype Tested with 12 Senior Volunteers",
        isExpertReviewed: false,
        communityVotes: {
          helpful: 68,
          needsWork: 4,
          canBuild: 15
        }
      }
    ]
  },
  {
    id: "prob-5",
    title: "Remote team burnout caused by fragmented async documentation across multiple tools",
    category: "Workplace & Productivity",
    status: STATUS_LABELS.OPEN,
    frequency: "Daily",
    impactLevel: "Moderate",
    description: "Distributed research and tech workers lose an estimated 6 hours every week searching for decisions scattered across Slack threads, Google Docs, Notion, Jira tickets, and meeting recordings, resulting in duplicate work and constant context switching.",
    context: "Information silos grow faster than companies can maintain central wikis. Searching for 'the latest API contract' often returns 4 contradictory specifications with no clear source of truth.",
    author: {
      name: "Kenji Sato",
      role: "Remote Software Architect",
      avatar: "KS"
    },
    createdAt: "2026-10-16",
    supportedByCount: 53,
    comments: [],
    solutions: []
  },
  {
    id: "prob-6",
    title: "Excessive single-use plastic labware waste in undergraduate biology practical classes",
    category: "Environmental Sustainability",
    status: STATUS_LABELS.SOLVED,
    frequency: "Weekly",
    impactLevel: "Moderate",
    description: "A single introductory biology course uses over 40,000 plastic pipette tips, 3,000 petri dishes, and micro-tubes every semester. Virtually all of it is incinerated or landfilled as biohazard waste despite containing zero infectious agents during simple plant cell or enzyme kinetics labs.",
    context: "Universities talk about carbon neutrality, yet practical lab classes discard tons of virgin polypropylene every term because certified autoclaving recycling processes haven't been vetted for educational protocols.",
    author: {
      name: "Amara Okonjo",
      role: "Green Campus Student Representative",
      avatar: "AO"
    },
    createdAt: "2026-09-28",
    supportedByCount: 140,
    comments: [
      {
        id: "c-601",
        author: "Prof. H. Miller (Microbiology)",
        text: "The student-led washing protocol validated last month reduced our department's non-hazardous plastic waste by 72% without any contamination in enzyme kinetics experiments.",
        timestamp: "3 weeks ago"
      }
    ],
    solutions: [
      {
        id: "sol-601",
        title: "Standardized Tip-Wash & Non-Hazardous Autoclave Re-racking Protocol",
        author: {
          name: "Amara Okonjo & Campus Sustainability Team",
          role: "Student Researchers"
        },
        approach: "Designed a 3D-printable ultrasonic tip-washing basket and validated a 2-stage deionized rinse and autoclave cycle that allows pipette tips in non-pathogenic labs to be safely reused up to 5 times. Open-sourced the protocol and wash station CAD files.",
        evidenceUrl: "https://open-labware-protocols.org/verified-tip-reuse-v2",
        status: "Adopted by 3 University Departments",
        isExpertReviewed: true,
        expertNotes: "Validated by Biosafety Committee: spectrophotometric blank readings showed zero residual enzyme cross-contamination.",
        communityVotes: {
          helpful: 128,
          needsWork: 1,
          canBuild: 24
        }
      }
    ]
  }
];

