export interface TimelineEvent {
  year: string
  title: string
  description: string
  image?: string
  source?: string
}

export const MAINFRAME_HISTORY_INTRO = {
  title: 'COBOL & The Mainframe Evolution',
  description:
    "Welcome to the history of COBOL! To truly understand COBOL, you must understand the hardware it was built to run on. COBOL isn't just a programming language; it is the bedrock of the global financial system, and its history is inextricably linked with the evolution of the IBM Mainframe.",
}

export const MAINFRAME_TIMELINE: TimelineEvent[] = [
  {
    year: '1950s',
    title: 'The Origins',
    description:
      "The late 1950s were a 'wild west' of proprietary hardware and fragmented programming languages. The US Department of Defense realized they desperately needed a Common Business-Oriented Language that could be ported across different operating systems and hardware environments. In 1959, CODASYL was formed, drafting the first COBOL specifications in just six months based heavily on Dr. Grace Hopper's FLOW-MATIC.",
    image: 'https://time.graphics/uploadedFiles/500/da/c6/dac6d56943493fda56cf8e6f59ba4d1d.jpg',
    source: 'Time Graphics',
  },
  {
    year: '1960',
    title: 'The Genesis (COBOL-60)',
    description:
      'The first version of the language, COBOL-60, is officially released. Though originally intended as a stopgap measure, the Department of Defense quickly mandated its use, cementing its survival.',
    image: 'https://miro.medium.com/1*4KEYbVW7F7TuagCSmRXOtQ.jpeg',
    source: 'Medium',
  },
  {
    year: '1964',
    title: 'System/360 Changes Everything',
    description:
      'IBM announces the System/360. For the first time, hardware is standardized across an entire family of computers, and OS/360 becomes the definitive home for COBOL batch processing.',
    image: 'https://static.righto.com/images/ibm-360/Supercomputer_NSA-IBM360_85-w400.jpg',
    source: 'Righto',
  },
  {
    year: '1968',
    title: 'The First ANSI Standard',
    description:
      'COBOL is officially approved by the American National Standards Institute (ANSI), creating the ANSI-68 or COBOL-68 standard.',
    image: 'https://ihri.ph/product/ansi/',
    source: 'Ihri PH',
  },
  {
    year: '1970s',
    title: 'System/370 & COBOL-74',
    description:
      'IBM introduces the System/370 with virtual memory hardware. Simultaneously, COBOL is revised into COBOL-74.',
    image: 'https://i.ytimg.com/vi/xCYeVgUKje8/hqdefault.jpg',
    source: 'YT Images',
  },
  {
    year: '1985',
    title: 'COBOL-85 (The Golden Era)',
    description:
      'The ANSI COBOL-85 standard is released. It introduces explicit scope terminators (END-IF, END-PERFORM), changing how developers write logic and paving the way for structured programming. Most legacy COBOL running today is based on this standard!',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaUjtVplhvBdcE4jZXMXCujy_cY4AOqgN1o5DzlX8ThOLAzFgAHGwoN6M&s=10',
    source: 'Google',
  },
  {
    year: '1990s',
    title: 'System/390 & The Y2K Crisis',
    description:
      "As IBM transitions to the System/390 architecture, the world realizes COBOL's memory-saving 2-digit date fields (PIC 9(2)) will break in the year 2000. A massive, global effort begins to update billions of lines of COBOL code.",
    image: 'https://i.ytimg.com/vi/oL-YhoEgaoA/maxresdefault.jpg',
    source: 'YT Images',
  },
  {
    year: '2000 - 2002',
    title: 'z/OS & Object-Orientation',
    description:
      "IBM rebrands the mainframe OS to z/OS (the 'z' stands for Zero Downtime). The COBOL 2002 standard is published, introducing Object-Oriented programming (CLASS, METHOD) and pointers to make the language more compatible with modern software practices.",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Nnsow2LDK4GZJpZkkEq0txtKRqpIWo9wUoSyOOVoJghKVSRseAJ3V_0&s=10',
    source: 'Google',
  },
  {
    year: '2014 - 2023',
    title: 'The Modern Era',
    description:
      'COBOL continues to evolve! COBOL 2014 introduces IEEE 754 floating-point math data types. COBOL 2023 adds asynchronous messaging (SEND/RECEIVE) and transaction processing (COMMIT/ROLLBACK) to easily interface with modern cloud architectures.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShfcNoNWeA1CqzwO29IxCY-gaAMBsF2Dcfo2tXw2Y6ArpJKBOAxdYaq-U&s=10',
    source: 'Google',
  },
]

export const MAINFRAME_HISTORY_OUTRO = {
  title: 'Why It Refuses to Die',
  description:
    "Despite being over 60 years old, COBOL still quietly runs the economy. It is estimated that more than 80% of all daily business transactions are processed using COBOL. But why hasn't it been replaced?",
  points: [
    {
      title: 'Unmatched Reliability',
      desc: 'Mainframes offer near-100% uptime, ensuring mission-critical applications (like banking and healthcare) never go offline.',
    },
    {
      title: 'Batch Processing Power',
      desc: 'COBOL is exceptionally well-suited for processing vast amounts of sequential transaction data efficiently.',
    },
    {
      title: 'Fixed-Point Math',
      desc: "Unlike modern languages that can suffer from floating-point rounding errors, COBOL's packed decimal (COMP-3) handles money flawlessly.",
    },
    {
      title: 'Data Gravity',
      desc: 'Moving decades of finely-tuned, highly complex business logic to the cloud is incredibly risky and expensive.',
    },
  ],
  conclusion:
    'Today, the challenge is a retiring workforce of COBOL experts. Instead of manual rewrites, companies like IBM are heavily investing in AI-driven modernization—using artificial intelligence to automatically convert legacy COBOL code into Java, breathing new life into these resilient mainframe systems.',
}
