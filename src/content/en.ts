import type { LangContent } from './schema'

/** Sample content, English — same modest, interview-safe positioning as the French version. */

const internship = {
  role: 'Technical internship (end of training)',
  company: 'Internship host organisation',
  location: 'City',
  start: 'Year',
  end: 'Year',
  bullets: [
    'Installed and configured workstations, printers and peripherals.',
    'Helped users with everyday issues: software, printing, network connection.',
    'Followed internal procedures and organised digital files and documents.',
  ],
}

const creativePractice = {
  role: 'Graphic and web creation (independent practice)',
  company: 'Personal and occasional projects',
  location: '',
  start: '2019',
  end: 'Present',
  bullets: [
    'Produced visuals, layouts and material for social media and the web.',
    'Designed and improved simple web pages: structure, content, presentation.',
    'Used AI assistants (Claude, ChatGPT) to speed up creation and fix problems.',
  ],
}

export const en: LangContent = {
  personal: {
    firstName: 'First',
    lastName: 'Last',
    email: 'first.last@email.com',
    phone: '+212 6 00 00 00 00',
    location: 'City, Morocco',
    website: '',
    linkedin: '',
    github: '',
  },
  education: [
    {
      degree: 'Specialised Technician in Computer Networks',
      school: 'Vocational training institute',
      location: 'City',
      start: 'Year',
      end: 'Year',
      note: 'About two years of training: networks, Windows environment, maintenance, support',
    },
    { degree: 'Baccalauréat in Physical Sciences (high-school diploma)', school: '', location: '', start: '', end: 'Year', note: '' },
  ],
  languages: [
    { name: 'Arabic', level: 'Native' },
    { name: 'French', level: 'Fluent' },
    { name: 'English', level: 'Intermediate' },
  ],
  variants: {
    corporate: {
      title: 'IT Technician — Operations & email marketing',
      summary:
        'Specialised technician in computer networks, comfortable with long hours of computer-based work, file handling and email marketing tools: autoresponders, email sequences, forms, hosting. Rigorous and organised: I follow procedures, check my work and learn internal software quickly.',
      experiences: [],
      skillGroups: [
        { name: 'Office & data', skills: ['Windows', 'Microsoft Office / Google Workspace', 'Excel: sorting, filters, CSV files', 'Data entry and checking', 'File and document organisation'] },
        { name: 'Email marketing & automation', skills: ['Autoresponders', 'Email sequences', 'Contact lists and segmentation (basics)', 'Sign-up forms', 'Landing pages', 'Email templates'] },
        { name: 'Web & hosting', skills: ['Hosting and domain names', 'DNS configuration (basics)', 'Publishing and testing pages', 'HTML / CSS basics'] },
        { name: 'IT', skills: ['Software installation and configuration', 'Basic troubleshooting', 'Network basics (TCP/IP, LAN)', 'User support'] },
        { name: 'Way of working', skills: ['Following procedures', 'Accuracy', 'Sustained computer work', 'Fast learning of internal software', 'AI assistants (Claude, ChatGPT)'] },
      ],
      projects: [],
      certifications: [],
      interests: ['Digital tools', 'Automation', 'Technology & AI'],
    },
    tech: {
      title: 'Computer Networks Technician — Support & maintenance',
      summary:
        'Specialised technician in computer networks (about two years of training), with solid basics in Windows environments, hardware / software troubleshooting and networking concepts. Methodical and patient: I like understanding the root of a problem and following procedures. Able to learn proprietary systems quickly. Additional skills in web creation and digital tools.',
      experiences: [
        internship,
        {
          ...creativePractice,
          bullets: [
            'Designed simple web pages and visuals; published them with hosting and a domain name.',
            'Solved technical problems with the help of AI assistants (Claude, ChatGPT).',
          ],
        },
      ],
      skillGroups: [
        { name: 'Networks (training)', skills: ['TCP/IP fundamentals', 'IP addressing', 'Local networks (LAN)', 'Basic router / switch configuration', 'Connection diagnostics'] },
        { name: 'Systems & hardware', skills: ['Windows: installation, configuration', 'Hardware and software troubleshooting', 'Software and driver installation', 'Peripherals and printers', 'Preventive maintenance'] },
        { name: 'Support', skills: ['User assistance', 'Following procedures', 'Simple documentation', 'Learning proprietary systems'] },
        { name: 'Additional', skills: ['HTML / CSS basics', 'Basic Git / GitHub', 'AI assistants (Claude, ChatGPT)'] },
      ],
      projects: [
        {
          name: 'Personal web project',
          description: 'Set up a website: local environment (XAMPP), hosting, domain name, testing and fixes with the help of AI tools.',
          link: '',
          tags: ['Hosting', 'Domain', 'XAMPP'],
        },
      ],
      certifications: [],
      interests: ['Technology', 'Networks', 'AI tools'],
    },
    creative: {
      title: 'Self-taught Graphic & Web Designer — Technical background',
      summary:
        'Self-taught graphic and web designer since 2019, with technical training in computer networks. I design visuals, layouts and simple web interfaces with care for typography, spacing, hierarchy and colour. I use generative AI tools to prototype faster and improve my projects. A profile that is creative and comfortable with the technical side.',
      experiences: [
        {
          role: 'Graphic & web designer (independent practice)',
          company: 'Personal and occasional projects',
          location: '',
          start: '2019',
          end: 'Present',
          bullets: [
            'Created visuals: social media, banners, presentation material, web images.',
            'Layouts and visual identity concepts: logo, colours, typography.',
            'Designed simple interfaces and web pages: landing pages, product pages.',
            'Prepared images and kept visual consistency across materials.',
          ],
        },
        { ...internship, bullets: internship.bullets.slice(0, 2) },
      ],
      skillGroups: [
        { name: 'Design', skills: ['Layout', 'Typography', 'Colour and visual hierarchy', 'Visual identity concepts', 'Social media visuals', 'UI / UX awareness'] },
        { name: 'Tools', skills: ['Photoshop', 'Illustrator', 'Figma', 'Canva'] },
        { name: 'Web', skills: ['HTML / CSS basics', 'Landing pages and forms', 'Site structure and navigation', 'SEO basics'] },
        { name: 'AI & method', skills: ['AI assistants (Claude, ChatGPT)', 'Fast prototyping', 'Iteration and testing'] },
      ],
      projects: [
        {
          name: 'Personal web project — content site',
          description: 'Page design, product pages, landing pages, navigation and visual consistency; improved step by step from testing.',
          link: '',
          tags: ['UI', 'Landing page', 'Content'],
        },
        {
          name: 'Social media visuals and material',
          description: 'Consistent visual series (formats, colours, typography) for posts and presentations.',
          link: '',
          tags: ['Social media', 'Layout'],
        },
      ],
      certifications: [],
      interests: ['Design', 'Visual culture', 'Creative AI'],
    },
    startup: {
      title: 'Versatile Digital Profile — Web, content & AI tools',
      summary:
        'Hybrid profile: training in computer networks, hands-on graphic and web design, and daily use of generative AI tools (Claude, ChatGPT) to build, debug and improve digital projects. I built a personal web project end to end: pages, digital products, forms, basic SEO, hosting. I can understand, adapt and test code produced with AI assistance.',
      experiences: [
        {
          role: 'Personal web project — creation and management',
          company: 'Independent project',
          location: '',
          start: 'Year',
          end: 'Present',
          bullets: [
            'Site structure, page creation, product pages, landing pages and forms.',
            'Content organisation, SEO basics, reading search and traffic statistics.',
            'Affiliate product integration; email marketing and funnel concepts.',
            'Hosting, domain name, local environment, GitHub repository at a practical level.',
            'AI-assisted development: generating, understanding, adapting and testing code.',
          ],
        },
        creativePractice,
      ],
      skillGroups: [
        { name: 'Web & digital', skills: ['Site structure and navigation', 'Landing pages and forms', 'SEO basics', 'Hosting and domains', 'Local environment (XAMPP)'] },
        { name: 'Code (practical level)', skills: ['HTML / CSS basics', 'Familiarity with JavaScript / PHP', 'Exposure to databases (SQL)', 'Basic Git / GitHub'] },
        { name: 'AI', skills: ['Claude', 'ChatGPT', 'Assisted prototyping', 'Assisted debugging', 'Solution research'] },
        { name: 'Digital marketing (basics)', skills: ['Content', 'Email marketing (concepts)', 'Affiliation', 'Simple performance analysis'] },
      ],
      projects: [
        {
          name: 'Landing pages and simple funnels',
          description: 'Landing pages, forms and simple journeys to present digital products.',
          link: '',
          tags: ['Landing page', 'Forms', 'Affiliation'],
        },
        {
          name: 'AI-assisted prototypes',
          description: 'Small tools and interfaces created, adapted and tested with Claude / ChatGPT for my own needs.',
          link: '',
          tags: ['Claude', 'ChatGPT', 'Prototyping'],
        },
      ],
      certifications: [],
      interests: ['Digital products', 'Generative AI', 'Design'],
    },
  },
}
