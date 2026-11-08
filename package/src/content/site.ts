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
  honors: ["WINNER — CODEQUEST 2025", "Claude Hackathon Winner, 2026"],
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
    "Author, Hacker, Software Developer.",
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
  intro:
    "Four things I keep coming back to — the wire, the metal, the build, the page. I hold them loosely and test them often.",
  lines: [
    {
      text: "Security is the first way I look at anything. I read every packet as if someone built it against me, then go find out whether they did.",
      note: "i. on the wire",
    },
    {
      text: "I'm happiest close to the metal. Registers, syscalls, cache lines — the bottom of the stack is where the truth lives, and I'd rather understand it than abstract it away.",
      note: "ii. on the metal",
    },
    {
      text: "Building is how I think. I'd rather ship something small and honest than describe something grand — the work teaches me what the docs never could.",
      note: "iii. on the build",
    },
    {
      text: "I write to make sense of my own experience. Essays, notes, half-finished drafts — the page is where the noise turns into something I actually learned.",
      note: "iv. on the page",
    },
  ],
};

export const craft = {
  intro:
    "How the work actually gets made: read the system, break the parts worth breaking, then build something that survives the wire. Principles first, instruments second — in that order on purpose.",
  principles: [
    {
      title: "Understand before using.",
      body: "A black box is a future bug. I read the source, the syscall, the packet — whatever it takes to know what the thing actually does.",
    },
    {
      title: "Read the logs nobody opens.",
      body: "Threat intel is a habit, not a product. The interesting story is usually in the line everyone else scrolled past.",
    },
    {
      title: "Break it to understand it.",
      body: "Reversing is just reading with more friction. gdb, Ghidra, radare2 — I want to know what a binary does before it tells me.",
    },
    {
      title: "Automate the boring.",
      body: "Did it twice? It's a script now. Python and Bash keep my hands free for the parts that actually need me.",
    },
    {
      title: "Touch the metal.",
      body: "C, C++, Rust, registers and cache lines. The hardware does not care about your abstractions — that is exactly why I trust it.",
    },
    {
      title: "Learn from failure.",
      body: "Core dumps are honest feedback. I'd rather have a crash I can read than a bug that hides.",
    },
  ],
  instruments: [
    { name: "C & C++", role: "the bare metal" },
    { name: "Rust", role: "the scalpel" },
    { name: "Go", role: "the workhorse" },
    { name: "Python & Bash", role: "the duct tape" },
    { name: "Java & Spring", role: "the freight line" },
    { name: "TypeScript & Node", role: "the web layer" },
    { name: "Arch Linux", role: "the territory" },
    { name: "gdb · strace", role: "the microscope" },
    { name: "Ghidra · radare2 · objdump", role: "the dissecting table" },
    { name: "Wireshark · tcpdump", role: "the wiretap" },
    { name: "Fuzzers · sanitizers", role: "the chaos engine" },
    { name: "PostgreSQL & MongoDB", role: "the memory" },
    { name: "Apache Kafka", role: "the firehose" },
    { name: "Nginx · Docker · K8s", role: "the shipping lane" },
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
