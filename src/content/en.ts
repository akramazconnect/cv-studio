import type { LangContent } from './schema'

export const en: LangContent = {
  personal: {
    firstName: 'Akram',
    lastName: 'AZ',
    email: 'wasslconnect@gmail.com',
    phone: '+212 6 00 00 00 00',
    location: 'Casablanca, Morocco',
    website: '',
    linkedin: 'linkedin.com/in/akram-az',
    github: 'github.com/akram-az',
  },
  education: [
    {
      degree: 'Specialized Technician Diploma in Software Development',
      school: 'ISTA / OFPPT',
      location: 'Casablanca',
      start: '2021',
      end: '2023',
      note: 'Networks, systems, programming, databases',
    },
    {
      degree: 'High School Diploma — Physical Sciences',
      school: 'High School',
      location: 'Casablanca',
      start: '2020',
      end: '2021',
      note: '',
    },
  ],
  languages: [
    { name: 'Arabic', level: 'Native' },
    { name: 'French', level: 'Fluent' },
    { name: 'English', level: 'Professional' },
  ],
  variants: {
    corporate: {
      title: 'IT Technician — Networks & Development',
      summary:
        'Versatile IT technician, equally comfortable administering networks and supporting users as building internal tools. I automate repetitive tasks, make flows reliable (email campaigns, shipment tracking, API integrations) and ship fast with AI-assisted development while keeping the code clean and maintainable.',
      experiences: [
        {
          role: 'Support & Network Technician',
          company: 'Logistics & courier company',
          location: 'Casablanca',
          start: '2023',
          end: 'Present',
          bullets: [
            'Administered the network (VLANs, Wi-Fi, site-to-site VPN) and a fleet of 60+ workstations, printers and branch scanners.',
            'L1/L2 support on Windows, Microsoft 365 and business apps; cut average resolution time by 35% with an internal knowledge base.',
            'Built a shipment-tracking dashboard (Python + carrier APIs) used daily by the customer service team.',
            'Automated email campaigns and follow-ups (scripts, templates, SPF/DKIM deliverability).',
          ],
        },
        {
          role: 'IT Intern',
          company: 'Services SME',
          location: 'Casablanca',
          start: '2022',
          end: '2023',
          bullets: [
            'Installed and configured workstations, network printers and Active Directory accounts.',
            'Set up an automated backup system and documented procedures.',
          ],
        },
      ],
      skillGroups: [
        { name: 'Networks', skills: ['TCP/IP', 'VLAN', 'VPN', 'Wi-Fi', 'Cisco / MikroTik', 'Firewalls'] },
        { name: 'Systems', skills: ['Windows Server', 'Active Directory', 'Linux', 'Microsoft 365', 'Virtualization'] },
        { name: 'Development', skills: ['Python', 'JavaScript', 'SQL', 'REST APIs', 'Automation', 'AI-assisted dev'] },
        { name: 'Tools', skills: ['GLPI', 'Zabbix', 'Git', 'Advanced Excel', 'Power BI'] },
      ],
      projects: [
        {
          name: 'Shipment tracking',
          description: 'Real-time dashboard aggregating statuses from several carriers, with automatic alerts.',
          link: '',
          tags: ['Python', 'API', 'SQL'],
        },
        {
          name: 'Email automation',
          description: 'Sending and follow-up pipeline with dynamic templates and open tracking.',
          link: '',
          tags: ['Node.js', 'SMTP', 'Cron'],
        },
      ],
      certifications: [
        { name: 'CCNA — Introduction to Networks', issuer: 'Cisco Networking Academy', year: '2023' },
        { name: 'Microsoft 365 Fundamentals (MS-900)', issuer: 'Microsoft', year: '2024' },
      ],
      interests: ['Automation', 'New technologies', 'Football'],
    },
    tech: {
      title: 'IT Infrastructure Technician — Networks, Systems & Payment Devices',
      summary:
        'Hands-on infrastructure technician focused on L2 support: networks, Windows/Linux systems, monitoring and interventions on critical equipment. Rigorous, methodical and used to ITIL processes, with a strong interest in payment environments (ATMs, POS terminals) where availability and security come first.',
      experiences: [
        {
          role: 'Infrastructure & L2 Support Technician',
          company: 'IT services provider',
          location: 'Casablanca',
          start: '2023',
          end: 'Present',
          bullets: [
            'Administered Windows Server / Linux servers, Active Directory, GPOs, DHCP/DNS and backups.',
            'Configured and maintained network equipment (switches, routers, firewalls) across several remote sites.',
            'Deployed Zabbix monitoring: probes, alert thresholds and on-call rotation; uptime kept at 99.8%.',
            'On-site and remote interventions, ticket handling and incident reports.',
          ],
        },
        {
          role: 'IT Support Technician (internship)',
          company: 'Bank / Financial institution',
          location: 'Casablanca',
          start: '2022',
          end: '2023',
          bullets: [
            'Branch support: workstations, printers, peripherals and core business applications.',
            'Took part in preventive maintenance operations and asset tracking.',
          ],
        },
      ],
      skillGroups: [
        { name: 'Networks', skills: ['TCP/IP', 'Routing & Switching', 'VLAN', 'IPsec VPN', 'Cisco', 'Fortinet'] },
        { name: 'Systems', skills: ['Windows Server', 'Active Directory / GPO', 'Linux (Debian, RHEL)', 'VMware / Hyper-V', 'Backups'] },
        { name: 'Payments & Field', skills: ['ATM / GAB', 'POS terminals', 'Preventive maintenance', 'Hardware diagnostics', 'On-site intervention'] },
        { name: 'Monitoring & Security', skills: ['Zabbix', 'PRTG', 'Firewalls', 'Antivirus / EDR', 'ITIL'] },
        { name: 'Scripting', skills: ['PowerShell', 'Bash', 'Python', 'SQL'] },
      ],
      projects: [
        {
          name: 'Multi-site monitoring',
          description: 'Rolled out Zabbix across 12 sites with network maps, SMS alerts and availability dashboards.',
          link: '',
          tags: ['Zabbix', 'SNMP', 'Linux'],
        },
        {
          name: 'Automated provisioning',
          description: 'PowerShell scripts for workstation setup (domain join, software, hardening), cutting provisioning time from 2 h to 20 min.',
          link: '',
          tags: ['PowerShell', 'AD', 'GPO'],
        },
      ],
      certifications: [
        { name: 'CCNA — Introduction to Networks', issuer: 'Cisco Networking Academy', year: '2023' },
        { name: 'CompTIA Network+ (in progress)', issuer: 'CompTIA', year: '2025' },
        { name: 'ITIL 4 Foundation', issuer: 'PeopleCert', year: '2024' },
      ],
      interests: ['Cybersecurity', 'Homelab', 'Electronics'],
    },
    creative: {
      title: 'Graphic Designer & Web Designer',
      summary:
        'Graphic and web designer with an eye for clean compositions and coherent visual identities — from logo to signage to showcase websites. I combine attention to detail, Adobe / Figma mastery and front-end integration skills to deliver print and digital assets that are ready for production.',
      experiences: [
        {
          role: 'Graphic & Web Designer (freelance)',
          company: 'SMEs, retail and non-profit clients',
          location: 'Casablanca',
          start: '2023',
          end: 'Present',
          bullets: [
            'Created full visual identities: logo, brand guidelines, stationery and social media variations.',
            'Designed print materials (posters, flyers, signage, POS displays, vehicle wraps) with print-ready files.',
            'Designed and built responsive showcase websites (Figma → WordPress / HTML-CSS) for 8+ clients.',
            'Photo retouching, mockups and ad visuals for digital campaigns.',
          ],
        },
        {
          role: 'Graphic Design Intern',
          company: 'Communication agency',
          location: 'Casablanca',
          start: '2022',
          end: '2023',
          bullets: [
            'Adapted brand guidelines across print and web materials; prepared files for the printer.',
            'Took part in client briefs and creative presentations.',
          ],
        },
      ],
      skillGroups: [
        { name: 'Design', skills: ['Visual identity', 'Typography', 'Layout', 'Art direction', 'UI design'] },
        { name: 'Software', skills: ['Figma', 'Illustrator', 'Photoshop', 'InDesign', 'After Effects', 'Canva'] },
        { name: 'Print & Signage', skills: ['Signage', 'POS displays', 'Posters', 'Prepress', 'Pantone / CMYK'] },
        { name: 'Web', skills: ['HTML / CSS', 'Tailwind', 'WordPress', 'Webflow', 'Responsive', 'JavaScript basics'] },
      ],
      projects: [
        {
          name: 'Visual identity — Concept café',
          description: 'Logo, palette, typography, menus, storefront sign and interior signage. Delivered a 24-page brand guide.',
          link: '',
          tags: ['Branding', 'Print', 'Signage'],
        },
        {
          name: 'Showcase website — Architecture firm',
          description: 'Figma mockups then responsive integration, project gallery and contact form.',
          link: '',
          tags: ['Figma', 'WordPress', 'UI'],
        },
        {
          name: 'Poster campaign — Local event',
          description: 'Poster series and social visuals in 3 formats, printed up to 4×3 m.',
          link: '',
          tags: ['Poster', 'Social media'],
        },
      ],
      certifications: [
        { name: 'Adobe Certified Professional — Graphic Design', issuer: 'Adobe', year: '2024' },
        { name: 'Google UX Design', issuer: 'Google / Coursera', year: '2023' },
      ],
      interests: ['Photography', 'Typography', 'Architecture'],
    },
    startup: {
      title: 'Full-Stack Developer & AI Builder',
      summary:
        'Full-stack developer who turns an idea into a working product in days. I build complete web MVPs (React / Next.js, Node, Supabase) and lean on generative AI tools (Claude Code, Cursor) to move fast without sacrificing quality — tests, code review and continuous deployment are part of the flow.',
      experiences: [
        {
          role: 'Full-Stack Developer (freelance)',
          company: 'Startups & founders',
          location: 'Remote / Casablanca',
          start: '2023',
          end: 'Present',
          bullets: [
            'Designed and shipped 6 SaaS MVPs (auth, payments, dashboards) in 3 weeks on average.',
            'Automated business processes with n8n and APIs (CRM, email, WhatsApp) — 40+ hours/month saved for one client.',
            'Set up CI/CD pipelines (GitHub Actions, Vercel) and error monitoring.',
            'Integrated language models (chat, data extraction, agents) into production products.',
          ],
        },
        {
          role: 'IT Technician & In-house Developer',
          company: 'SME',
          location: 'Casablanca',
          start: '2022',
          end: '2023',
          bullets: [
            'Built internal tools (tracking, reporting) that replaced shared Excel files.',
            'Handled network administration and user support alongside development.',
          ],
        },
      ],
      skillGroups: [
        { name: 'Front-end', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite'] },
        { name: 'Back-end', skills: ['Node.js', 'Supabase', 'PostgreSQL', 'Prisma', 'REST APIs'] },
        { name: 'AI & Automation', skills: ['Claude Code', 'Cursor', 'Anthropic / OpenAI APIs', 'n8n', 'Prompt engineering'] },
        { name: 'DevOps', skills: ['Git / GitHub', 'Vercel', 'Docker', 'GitHub Actions', 'Linux'] },
      ],
      projects: [
        {
          name: 'Multilingual CV builder',
          description: 'Web app to create CVs (FR / EN / AR) with live preview, themes and PDF export.',
          link: '',
          tags: ['React', 'TypeScript', 'Tailwind'],
        },
        {
          name: 'WhatsApp assistant for merchants',
          description: 'Order-taking bot connected to a back office, with an automatic daily summary.',
          link: '',
          tags: ['Node.js', 'n8n', 'LLM'],
        },
        {
          name: 'Analytics dashboard',
          description: 'Reporting SaaS connected to Google Sheets and Stripe, with auth and subscriptions.',
          link: '',
          tags: ['Next.js', 'Supabase', 'Stripe'],
        },
      ],
      certifications: [
        { name: 'Meta Front-End Developer', issuer: 'Meta / Coursera', year: '2024' },
        { name: 'Supabase Bootcamp', issuer: 'Supabase', year: '2024' },
      ],
      interests: ['Product & UX', 'Open source', 'AI news'],
    },
  },
}
