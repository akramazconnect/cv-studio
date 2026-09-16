import type { LangContent } from './schema'

export const fr: LangContent = {
  personal: {
    firstName: 'Akram',
    lastName: 'AZ',
    email: 'wasslconnect@gmail.com',
    phone: '+212 6 00 00 00 00',
    location: 'Casablanca, Maroc',
    website: '',
    linkedin: 'linkedin.com/in/akram-az',
    github: 'github.com/akram-az',
  },
  education: [
    {
      degree: 'Technicien Spécialisé en Développement Informatique',
      school: 'ISTA / OFPPT',
      location: 'Casablanca',
      start: '2021',
      end: '2023',
      note: 'Réseaux, systèmes, programmation, bases de données',
    },
    {
      degree: 'Baccalauréat Sciences Physiques',
      school: 'Lycée',
      location: 'Casablanca',
      start: '2020',
      end: '2021',
      note: '',
    },
  ],
  languages: [
    { name: 'Arabe', level: 'Langue maternelle' },
    { name: 'Français', level: 'Courant' },
    { name: 'Anglais', level: 'Professionnel' },
  ],
  variants: {
    corporate: {
      title: 'Technicien IT — Réseaux & Développement',
      summary:
        'Technicien IT polyvalent, à l’aise aussi bien sur l’administration réseau et le support utilisateurs que sur le développement d’outils internes. J’automatise les tâches répétitives, je fiabilise les flux (e-mailing, suivi d’expéditions, intégrations API) et je livre vite grâce au développement assisté par IA, tout en gardant un code propre et maintenable.',
      experiences: [
        {
          role: 'Technicien Support & Réseaux',
          company: 'Société de logistique et messagerie',
          location: 'Casablanca',
          start: '2023',
          end: 'Présent',
          bullets: [
            'Administration du réseau (VLAN, Wi-Fi, VPN site à site) et du parc de 60+ postes, imprimantes et scanners d’agences.',
            'Support N1/N2 sur Windows, Microsoft 365 et outils métier ; réduction de 35 % du délai moyen de résolution grâce à une base de connaissances.',
            'Développement d’un tableau de bord de suivi des expéditions (Python + API transporteurs) utilisé quotidiennement par le service client.',
            'Automatisation des campagnes e-mailing et des relances (scripts, modèles, délivrabilité SPF/DKIM).',
          ],
        },
        {
          role: 'Stagiaire IT',
          company: 'PME de services',
          location: 'Casablanca',
          start: '2022',
          end: '2023',
          bullets: [
            'Installation et configuration de postes, d’imprimantes réseau et de comptes Active Directory.',
            'Mise en place d’un système de sauvegarde automatisé et documentation des procédures.',
          ],
        },
      ],
      skillGroups: [
        { name: 'Réseaux', skills: ['TCP/IP', 'VLAN', 'VPN', 'Wi-Fi', 'Cisco / MikroTik', 'Pare-feu'] },
        { name: 'Systèmes', skills: ['Windows Server', 'Active Directory', 'Linux', 'Microsoft 365', 'Virtualisation'] },
        { name: 'Développement', skills: ['Python', 'JavaScript', 'SQL', 'API REST', 'Automatisation', 'Dév. assisté par IA'] },
        { name: 'Outils', skills: ['GLPI', 'Zabbix', 'Git', 'Excel avancé', 'Power BI'] },
      ],
      projects: [
        {
          name: 'Suivi d’expéditions',
          description: 'Tableau de bord temps réel agrégeant les statuts de plusieurs transporteurs, avec alertes automatiques.',
          link: '',
          tags: ['Python', 'API', 'SQL'],
        },
        {
          name: 'Automatisation e-mailing',
          description: 'Pipeline d’envoi et de relance avec modèles dynamiques et suivi des ouvertures.',
          link: '',
          tags: ['Node.js', 'SMTP', 'Cron'],
        },
      ],
      certifications: [
        { name: 'CCNA — Introduction to Networks', issuer: 'Cisco Networking Academy', year: '2023' },
        { name: 'Microsoft 365 Fundamentals (MS-900)', issuer: 'Microsoft', year: '2024' },
      ],
      interests: ['Automatisation', 'Nouvelles technologies', 'Football'],
    },
    tech: {
      title: 'Technicien Infrastructure IT — Réseaux, Systèmes & Monétique',
      summary:
        'Technicien infrastructure orienté terrain et support N2 : réseaux, systèmes Windows/Linux, supervision et intervention sur équipements critiques. Rigoureux, méthodique et habitué aux procédures ITIL, je m’intéresse particulièrement aux environnements monétiques (GAB/ATM, TPE) où disponibilité et sécurité sont prioritaires.',
      experiences: [
        {
          role: 'Technicien Infrastructure & Support N2',
          company: 'Prestataire de services IT',
          location: 'Casablanca',
          start: '2023',
          end: 'Présent',
          bullets: [
            'Administration de serveurs Windows Server / Linux, Active Directory, GPO, DHCP/DNS et sauvegardes.',
            'Configuration et maintenance d’équipements réseau (switchs, routeurs, pare-feu) sur plusieurs sites distants.',
            'Supervision Zabbix : mise en place des sondes, seuils d’alerte et astreinte ; taux de disponibilité maintenu à 99,8 %.',
            'Interventions sur site et à distance, gestion des tickets et rédaction des rapports d’incident.',
          ],
        },
        {
          role: 'Technicien Support IT (stage)',
          company: 'Banque / Établissement financier',
          location: 'Casablanca',
          start: '2022',
          end: '2023',
          bullets: [
            'Support aux agences : postes, imprimantes, périphériques et applicatifs métier.',
            'Participation aux opérations de maintenance préventive et au suivi du parc.',
          ],
        },
      ],
      skillGroups: [
        { name: 'Réseaux', skills: ['TCP/IP', 'Routage & Switching', 'VLAN', 'VPN IPsec', 'Cisco', 'Fortinet'] },
        { name: 'Systèmes', skills: ['Windows Server', 'Active Directory / GPO', 'Linux (Debian, RHEL)', 'VMware / Hyper-V', 'Sauvegardes'] },
        { name: 'Monétique & Terrain', skills: ['GAB / ATM', 'TPE', 'Maintenance préventive', 'Diagnostic matériel', 'Intervention sur site'] },
        { name: 'Supervision & Sécurité', skills: ['Zabbix', 'PRTG', 'Pare-feu', 'Antivirus / EDR', 'ITIL'] },
        { name: 'Scripting', skills: ['PowerShell', 'Bash', 'Python', 'SQL'] },
      ],
      projects: [
        {
          name: 'Supervision multi-sites',
          description: 'Déploiement de Zabbix sur 12 sites avec cartographie réseau, alertes SMS et tableaux de bord de disponibilité.',
          link: '',
          tags: ['Zabbix', 'SNMP', 'Linux'],
        },
        {
          name: 'Déploiement automatisé',
          description: 'Scripts PowerShell de préparation de postes (jonction au domaine, logiciels, sécurité) réduisant le temps de mise en service de 2 h à 20 min.',
          link: '',
          tags: ['PowerShell', 'AD', 'GPO'],
        },
      ],
      certifications: [
        { name: 'CCNA — Introduction to Networks', issuer: 'Cisco Networking Academy', year: '2023' },
        { name: 'CompTIA Network+ (en cours)', issuer: 'CompTIA', year: '2025' },
        { name: 'ITIL 4 Foundation', issuer: 'PeopleCert', year: '2024' },
      ],
      interests: ['Cybersécurité', 'Homelab', 'Électronique'],
    },
    creative: {
      title: 'Designer Graphique & Web Designer',
      summary:
        'Designer graphique et web designer avec un œil pour les compositions épurées et les identités visuelles cohérentes, du logo à la signalétique en passant par le site vitrine. Je combine sens du détail, maîtrise des outils Adobe / Figma et compétences en intégration web pour livrer des supports print et digitaux prêts à produire.',
      experiences: [
        {
          role: 'Designer Graphique & Web (freelance)',
          company: 'Clients PME, commerces et associations',
          location: 'Casablanca',
          start: '2023',
          end: 'Présent',
          bullets: [
            'Création d’identités visuelles complètes : logo, charte graphique, papeterie et déclinaisons réseaux sociaux.',
            'Conception de supports print (affiches, flyers, enseignes, PLV, habillage de véhicules) avec fichiers prêts pour l’impression.',
            'Design et intégration de sites vitrines responsives (Figma → WordPress / HTML-CSS) pour 8+ clients.',
            'Retouche photo, mockups et visuels publicitaires pour campagnes digitales.',
          ],
        },
        {
          role: 'Stagiaire Infographiste',
          company: 'Agence de communication',
          location: 'Casablanca',
          start: '2022',
          end: '2023',
          bullets: [
            'Déclinaison de chartes graphiques sur supports print et web, préparation des fichiers pour l’imprimeur.',
            'Participation aux séances de brief client et aux présentations créatives.',
          ],
        },
      ],
      skillGroups: [
        { name: 'Design', skills: ['Identité visuelle', 'Typographie', 'Mise en page', 'Direction artistique', 'UI design'] },
        { name: 'Logiciels', skills: ['Figma', 'Illustrator', 'Photoshop', 'InDesign', 'After Effects', 'Canva'] },
        { name: 'Print & Signalétique', skills: ['Enseignes', 'PLV', 'Affiches', 'Préparation impression', 'Pantone / CMJN'] },
        { name: 'Web', skills: ['HTML / CSS', 'Tailwind', 'WordPress', 'Webflow', 'Responsive', 'Bases JavaScript'] },
      ],
      projects: [
        {
          name: 'Identité visuelle — Café concept',
          description: 'Logo, palette, typographie, menus, enseigne et signalétique intérieure. Livraison d’un guide de marque de 24 pages.',
          link: '',
          tags: ['Branding', 'Print', 'Signalétique'],
        },
        {
          name: 'Site vitrine — Cabinet d’architecture',
          description: 'Maquettes Figma puis intégration responsive, galerie de projets et formulaire de contact.',
          link: '',
          tags: ['Figma', 'WordPress', 'UI'],
        },
        {
          name: 'Campagne affichage — Événement local',
          description: 'Série d’affiches et visuels réseaux sociaux déclinés en 3 formats, imprimés en 4×3 m.',
          link: '',
          tags: ['Affiche', 'Social media'],
        },
      ],
      certifications: [
        { name: 'Adobe Certified Professional — Graphic Design', issuer: 'Adobe', year: '2024' },
        { name: 'Google UX Design', issuer: 'Google / Coursera', year: '2023' },
      ],
      interests: ['Photographie', 'Typographie', 'Architecture'],
    },
    startup: {
      title: 'Développeur Full-Stack & Builder IA',
      summary:
        'Développeur full-stack qui transforme une idée en produit fonctionnel en quelques jours. Je construis des MVP web complets (React / Next.js, Node, Supabase) en m’appuyant sur les outils d’IA générative (Claude Code, Cursor) pour aller vite sans sacrifier la qualité : tests, revue de code et déploiement continu font partie du flux.',
      experiences: [
        {
          role: 'Développeur Full-Stack (freelance)',
          company: 'Startups & porteurs de projets',
          location: 'Remote / Casablanca',
          start: '2023',
          end: 'Présent',
          bullets: [
            'Conception et livraison de 6 MVP SaaS (authentification, paiement, tableau de bord) en moyenne en 3 semaines.',
            'Automatisation de processus métier avec n8n et des API (CRM, e-mail, WhatsApp) — plus de 40 h/mois économisées chez un client.',
            'Mise en place de pipelines CI/CD (GitHub Actions, Vercel) et de suivi d’erreurs.',
            'Intégration de modèles de langage (chat, extraction de données, agents) dans des produits en production.',
          ],
        },
        {
          role: 'Technicien IT & Développeur interne',
          company: 'PME',
          location: 'Casablanca',
          start: '2022',
          end: '2023',
          bullets: [
            'Développement d’outils internes (suivi, reporting) ayant remplacé des fichiers Excel partagés.',
            'Administration réseau et support utilisateurs en parallèle du développement.',
          ],
        },
      ],
      skillGroups: [
        { name: 'Front-end', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite'] },
        { name: 'Back-end', skills: ['Node.js', 'Supabase', 'PostgreSQL', 'Prisma', 'API REST'] },
        { name: 'IA & Automatisation', skills: ['Claude Code', 'Cursor', 'API Anthropic / OpenAI', 'n8n', 'Prompt engineering'] },
        { name: 'DevOps', skills: ['Git / GitHub', 'Vercel', 'Docker', 'GitHub Actions', 'Linux'] },
      ],
      projects: [
        {
          name: 'Générateur de CV multilingue',
          description: 'Application web de création de CV (FR / EN / AR) avec aperçu temps réel, thèmes et export PDF.',
          link: '',
          tags: ['React', 'TypeScript', 'Tailwind'],
        },
        {
          name: 'Assistant WhatsApp pour commerçants',
          description: 'Bot de prise de commandes connecté à un back-office, avec résumé quotidien automatique.',
          link: '',
          tags: ['Node.js', 'n8n', 'LLM'],
        },
        {
          name: 'Tableau de bord analytique',
          description: 'SaaS de reporting connecté à Google Sheets et Stripe, avec authentification et abonnement.',
          link: '',
          tags: ['Next.js', 'Supabase', 'Stripe'],
        },
      ],
      certifications: [
        { name: 'Meta Front-End Developer', issuer: 'Meta / Coursera', year: '2024' },
        { name: 'Supabase Bootcamp', issuer: 'Supabase', year: '2024' },
      ],
      interests: ['Produit & UX', 'Open source', 'Veille IA'],
    },
  },
}
