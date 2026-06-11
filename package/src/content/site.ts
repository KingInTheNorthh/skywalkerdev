/**
 * Single source of truth for every word on the site.
 * Edit this file, not the components.
 */

export const identity = {
  surname: "PETERSON",
  fullName: "Lawrence Seyram Peterson",
  initials: "L.S.P.",
  alias: "SKYWALKER",
  role: "Backend · Systems · Security · Embedded",
  honor: "WINNER — CODEQUEST 2025",
  location: "Kumasi / Accra, Ghana",
  coordinates: "6°41′N 1°37′W",
  email: "lspeterson@st.knust.edu.gh",
  github: "https://github.com/KingInTheNorthh",
  established: "EST. 2020",
};

export const sections = [
  { id: "opening", number: "00", title: "Opening" },
  { id: "philosophy", number: "01", title: "Philosophy" },
  { id: "craft", number: "02", title: "Craft" },
  { id: "work", number: "03", title: "Work" },
  { id: "experiments", number: "04", title: "Experiments" },
  { id: "timeline", number: "05", title: "Timeline" },
  { id: "contact", number: "06", title: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

export const opening = {
  kicker: "A WORKING ARCHIVE — PORTFOLIO N°01",
  statement:
    "No flashy projects — just a ton of systems-level, backend work. I build the layer everything else stands on.",
  marquee: [
    "BACKEND SYSTEMS",
    "SYSTEMS PROGRAMMING",
    "CYBERSECURITY",
    "EMBEDDED",
    "DISTRIBUTED THINGS",
    "PROTOCOLS & PACKETS",
  ],
};

export const philosophy = {
  intro: "Four working beliefs, held loosely and tested often.",
  lines: [
    {
      text: "It is not turtles all the way down. Somebody has to understand the bottom — I'd rather it be me.",
      note: "i. on the stack",
    },
    {
      text: "Trust is a budget, not a default. Every byte off the wire is a stranger until it proves otherwise.",
      note: "ii. on trust",
    },
    {
      text: "The best systems are boring at 3 a.m. Boring is engineered, and it is worth every hour it costs.",
      note: "iii. on production",
    },
    {
      text: "Slow is smooth, smooth is fast. Shipping is a side effect of understanding.",
      note: "iv. on pace",
    },
  ],
};

export const craft = {
  intro:
    "How the work actually gets made. Principles first, instruments second — in that order on purpose.",
  principles: [
    {
      title: "Read first, write second.",
      body: "I read a system before I change it. Most bugs are biographies; the fix is in the history.",
    },
    {
      title: "Trust nothing on the wire.",
      body: "Parse defensively, validate at the boundary, and assume the packet was crafted by someone clever and bored.",
    },
    {
      title: "Boring at 3 a.m.",
      body: "Logs a stranger could read, failure modes chosen on purpose, alerts that mean something.",
    },
    {
      title: "Touch the metal.",
      body: "Embedded work keeps you honest — the hardware does not care about your abstractions.",
    },
  ],
  instruments: [
    { name: "Rust", role: "the scalpel" },
    { name: "C & C++", role: "the bare metal" },
    { name: "Go", role: "the workhorse" },
    { name: "Java & Spring", role: "the freight line" },
    { name: "Python & Bash", role: "the duct tape" },
    { name: "Apache Kafka", role: "the firehose" },
    { name: "PostgreSQL & MongoDB", role: "the memory" },
    { name: "Linux · Nginx · K8s", role: "the territory" },
  ],
};

export type Project = {
  index: string;
  slug: string;
  title: string;
  year: string;
  role: string;
  stack: string[];
  summary: string;
  challenge: string;
  approach: string;
  result: string;
  art: "ledger" | "contour" | "weave" | "packet";
  link: string;
};

export const projects: Project[] = [
  {
    index: "01",
    slug: "millenium-dns",
    title: "Millenium DNS",
    year: "2025",
    role: "Systems / Networking",
    stack: ["Rust", "UDP / TCP", "RFC 1035", "Zero-copy parsing"],
    summary:
      "A personal DNS server, written from the wire up in Rust — because nothing teaches a protocol like implementing it.",
    challenge:
      "DNS is forty years of accumulated sharp edges, and a resolver's job is to parse hostile bytes from strangers at line speed. That is exactly where memory bugs live.",
    approach:
      "Rust with zero-copy parsing and strict bounds at every layer. Malformed packets are a first-class test suite — the fuzzer is a user too.",
    result:
      "Resolves real queries: recursion, caching, the lot. Now the reference I reach for whenever “it's always DNS” turns out, again, to be DNS.",
    art: "packet",
    link: "https://github.com/KingInTheNorthh/millenium_dns",
  },
  {
    index: "02",
    slug: "phantom",
    title: "Phantom",
    year: "2025",
    role: "Systems Tooling",
    stack: ["Rust", "ptrace", "procfs", "Terminal UI"],
    summary:
      "A personal Linux process monitor and debugger — a scalpel for the moments when top is a blunt instrument.",
    challenge:
      "Most observability tools either drown you in everything or sample so hard they lie. Debugging needs a narrow, honest view of one process at a time.",
    approach:
      "Built directly on procfs and ptrace: low-overhead polling, syscall-level tracing on demand, and a terminal UI that reports what the kernel actually said.",
    result:
      "A daily driver. It has since caught leaks and runaway threads in my own services — the tool found bugs in the toolmaker.",
    art: "contour",
    link: "https://github.com/KingInTheNorthh/phantom",
  },
  {
    index: "03",
    slug: "the-pos-project",
    title: "The POS Project",
    year: "2024",
    role: "Backend Engineering",
    stack: ["TypeScript", "Node.js", "PostgreSQL", "Idempotency keys"],
    summary:
      "Point-of-sale plumbing for real shops — where a lost sale is money and a doubled one is worse.",
    challenge:
      "Power and network both blink mid-transaction here. The books must never lose a sale, never double one, and never make the cashier wait.",
    approach:
      "Transactional outbox, idempotency keys on every mutation, and reconciliation that treats the terminal — not the server — as the source of truth.",
    result:
      "Survives the failure drill: pull the plug mid-sale, restart, and the ledger still balances to the cedi.",
    art: "ledger",
    link: "https://github.com/KingInTheNorthh/the-pos-project",
  },
];

export const experiments = {
  intro:
    "Repos, tools and dead ends — kept public because the misses teach more than the hits.",
  items: [
    {
      year: "2026",
      name: "this-site",
      note: "The page you're reading. A systems guy's one concession to the frontend.",
      url: "https://github.com/KingInTheNorthh/skywalkerdev",
    },
    {
      year: "2025",
      name: "prod_log",
      note: "Structured production logging in Rust — greppable at 3 a.m., by design.",
      url: "https://github.com/KingInTheNorthh/prod_log",
    },
    {
      year: "2024",
      name: "resa_backend",
      note: "A reservations backend in Spring — freight-line Java, no surprises.",
      url: "https://github.com/KingInTheNorthh/resa_backend",
    },
    {
      year: "2024",
      name: "Automate360",
      note: "Automation scripts, beginner to advanced — the duct-tape archive.",
      url: "https://github.com/KingInTheNorthh/Automate360",
    },
    {
      year: "2023",
      name: "chatWesteros",
      note: "A chat app for the realm. The North remembers your messages.",
      url: "https://github.com/KingInTheNorthh/chatWesteros",
    },
  ],
};

export const timeline = [
  {
    year: "2020",
    title: "First program",
    body: "A Python script in a Jupyter notebook that generated Mad Libs. Silly on purpose — and the hook that never let go.",
  },
  {
    year: "2024",
    title: "KNUST, Kumasi",
    body: "Enrolled in Computer Science. Picked up robotics fast, and with it a love for low-level programming — the closer to the metal, the better.",
  },
  {
    year: "2025",
    title: "CodeQuest champion",
    body: "Spent the year intrigued by the inner workings of mobile apps — and won CodeQuest 2025.",
  },
  {
    year: "2026",
    title: "Claude Hackathon, runner-up",
    body: "Learned to organize a team while the clock burned, and emerged runner-up at the Claude Hackathon 2026. More amazing stuff loading.",
  },
];

export const contact = {
  heading: "Ping.",
  body: "Lawrence answers. Skywalker also answers. Backend roles, systems problems, security questions, embedded oddities — send the first packet.",
  colophon:
    "Set in Fraunces, Space Grotesk & JetBrains Mono. Built with Next.js, GSAP and a systems engineer's suspicion of the frontend. No templates were harmed.",
  hint: "P.S. — try typing P-I-N-G.",
};
