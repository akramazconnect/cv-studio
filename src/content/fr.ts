import type { LangContent } from './schema'

/**
 * Sample content, French. Written to be modest and interview-safe: no company
 * names, no invented certifications or metrics, wording that a junior hybrid
 * IT / design profile can defend face to face.
 */

const stage = {
  role: 'Stage technique (fin de formation)',
  company: 'Structure d’accueil de stage',
  location: 'Ville',
  start: 'Année',
  end: 'Année',
  bullets: [
    'Installation et configuration de postes de travail, d’imprimantes et de périphériques.',
    'Aide aux utilisateurs pour les problèmes courants : logiciels, impression, connexion réseau.',
    'Suivi de procédures internes et organisation de fichiers et documents numériques.',
  ],
}

const pratiqueCreative = {
  role: 'Création graphique et web (pratique indépendante)',
  company: 'Projets personnels et occasionnels',
  location: '',
  start: '2019',
  end: 'Présent',
  bullets: [
    'Réalisation de visuels, mises en page et supports pour les réseaux sociaux et le web.',
    'Conception et amélioration de pages web simples : structure, contenu, présentation.',
    'Utilisation d’assistants IA (Claude, ChatGPT) pour accélérer la création et corriger les problèmes.',
  ],
}

export const fr: LangContent = {
  personal: {
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'prenom.nom@email.com',
    phone: '+212 6 00 00 00 00',
    location: 'Ville, Maroc',
    website: '',
    linkedin: '',
    github: '',
  },
  education: [
    {
      degree: 'Technicien Spécialisé en Réseaux Informatiques',
      school: 'Établissement de formation professionnelle',
      location: 'Ville',
      start: 'Année',
      end: 'Année',
      note: 'Formation d’environ deux ans : réseaux, environnement Windows, maintenance, support',
    },
    { degree: 'Baccalauréat Sciences Physiques', school: '', location: '', start: '', end: 'Année', note: '' },
  ],
  languages: [
    { name: 'Arabe', level: 'Langue maternelle' },
    { name: 'Français', level: 'Courant' },
    { name: 'Anglais', level: 'Intermédiaire' },
  ],
  variants: {
    corporate: {
      title: 'Technicien informatique — Opérations numériques & e-mailing',
      summary:
        'Technicien spécialisé en réseaux informatiques, à l’aise avec le travail sur ordinateur de longue durée, le traitement de fichiers et les outils d’e-mailing : autorépondeurs, séquences d’e-mails, formulaires, hébergement. Rigoureux et organisé, je suis les procédures, je vérifie mon travail et j’apprends rapidement un logiciel interne.',
      experiences: [],
      skillGroups: [
        { name: 'Bureautique & données', skills: ['Windows', 'Microsoft Office / Google Workspace', 'Excel : tri, filtres, fichiers CSV', 'Saisie et vérification de données', 'Classement de fichiers et de documents'] },
        { name: 'E-mailing & automatisation', skills: ['Autorépondeurs', 'Séquences d’e-mails', 'Listes de contacts et segmentation (bases)', 'Formulaires d’inscription', 'Landing pages', 'Modèles d’e-mails'] },
        { name: 'Web & hébergement', skills: ['Hébergement et noms de domaine', 'Configuration DNS (bases)', 'Mise en ligne et test de pages', 'Notions HTML / CSS'] },
        { name: 'Informatique', skills: ['Installation et configuration de logiciels', 'Dépannage de base', 'Notions réseau (TCP/IP, LAN)', 'Support utilisateurs'] },
        { name: 'Méthode', skills: ['Respect des procédures', 'Précision', 'Travail prolongé sur ordinateur', 'Apprentissage rapide de logiciels internes', 'Assistants IA (Claude, ChatGPT)'] },
      ],
      projects: [],
      certifications: [],
      interests: ['Outils numériques', 'Automatisation', 'Technologies & IA'],
    },
    tech: {
      title: 'Technicien Réseaux Informatiques — Support & maintenance',
      summary:
        'Technicien spécialisé en réseaux informatiques (formation d’environ deux ans), avec de bonnes bases en environnement Windows, dépannage matériel / logiciel et notions de réseau. Méthodique et patient, j’aime comprendre l’origine d’un problème et suivre des procédures. Capable d’apprendre rapidement des systèmes propriétaires. Compétences complémentaires en création web et outils numériques.',
      experiences: [
        stage,
        {
          ...pratiqueCreative,
          bullets: [
            'Conception de pages web simples et de visuels ; mise en ligne avec hébergement et nom de domaine.',
            'Résolution de problèmes techniques avec l’aide d’assistants IA (Claude, ChatGPT).',
          ],
        },
      ],
      skillGroups: [
        { name: 'Réseaux (formation)', skills: ['Fondamentaux TCP/IP', 'Adressage IP', 'Réseau local (LAN)', 'Configuration de base routeur / switch', 'Diagnostic de connexion'] },
        { name: 'Systèmes & matériel', skills: ['Windows : installation, configuration', 'Dépannage matériel et logiciel', 'Installation de logiciels et pilotes', 'Périphériques et imprimantes', 'Maintenance préventive'] },
        { name: 'Support', skills: ['Assistance utilisateurs', 'Suivi de procédures', 'Documentation simple', 'Apprentissage de systèmes propriétaires'] },
        { name: 'Complément', skills: ['Notions HTML / CSS', 'Bases Git / GitHub', 'Assistants IA (Claude, ChatGPT)'] },
      ],
      projects: [
        {
          name: 'Projet web personnel',
          description: 'Mise en place d’un site : environnement local (XAMPP), hébergement, nom de domaine, tests et corrections avec l’aide d’outils IA.',
          link: '',
          tags: ['Hébergement', 'Domaine', 'XAMPP'],
        },
      ],
      certifications: [],
      interests: ['Technologies', 'Réseaux', 'Outils IA'],
    },
    creative: {
      title: 'Graphiste & Web Designer autodidacte — Profil technique',
      summary:
        'Graphiste et web designer autodidacte depuis 2019, avec une formation technique en réseaux informatiques. Je conçois des visuels, des mises en page et des interfaces web simples en soignant la typographie, l’espacement, la hiérarchie et les couleurs. J’utilise les outils d’IA générative pour prototyper plus vite et améliorer mes projets. Profil à la fois créatif et à l’aise avec la technique.',
      experiences: [
        {
          role: 'Graphiste & web designer (pratique indépendante)',
          company: 'Projets personnels et occasionnels',
          location: '',
          start: '2019',
          end: 'Présent',
          bullets: [
            'Création de visuels : réseaux sociaux, bannières, supports de présentation, images pour le web.',
            'Mises en page et concepts d’identité visuelle : logo, couleurs, typographie.',
            'Conception d’interfaces et de pages web simples : landing pages, pages produit.',
            'Préparation d’images et cohérence visuelle entre les différents supports.',
          ],
        },
        { ...stage, bullets: stage.bullets.slice(0, 2) },
      ],
      skillGroups: [
        { name: 'Design', skills: ['Mise en page', 'Typographie', 'Couleurs et hiérarchie visuelle', 'Concepts d’identité visuelle', 'Visuels réseaux sociaux', 'Notions UI / UX'] },
        { name: 'Outils', skills: ['Photoshop', 'Illustrator', 'Figma', 'Canva'] },
        { name: 'Web', skills: ['Notions HTML / CSS', 'Landing pages et formulaires', 'Structure et navigation de site', 'Notions SEO'] },
        { name: 'IA & méthode', skills: ['Assistants IA (Claude, ChatGPT)', 'Prototypage rapide', 'Itérations et tests'] },
      ],
      projects: [
        {
          name: 'Projet web personnel — site de contenu',
          description: 'Design des pages, pages produit, landing pages, navigation et cohérence visuelle ; amélioration progressive à partir des tests.',
          link: '',
          tags: ['UI', 'Landing page', 'Contenu'],
        },
        {
          name: 'Visuels réseaux sociaux et supports',
          description: 'Séries de visuels cohérents (formats, couleurs, typographie) pour des publications et des présentations.',
          link: '',
          tags: ['Réseaux sociaux', 'Mise en page'],
        },
      ],
      certifications: [],
      interests: ['Design', 'Culture visuelle', 'IA créative'],
    },
    startup: {
      title: 'Profil numérique polyvalent — Web, contenu & outils IA',
      summary:
        'Profil hybride : formation en réseaux informatiques, pratique du design graphique et du web, et utilisation quotidienne d’outils d’IA générative (Claude, ChatGPT) pour créer, déboguer et améliorer des projets numériques. J’ai construit un projet web personnel de bout en bout : pages, produits numériques, formulaires, SEO de base, hébergement. Je comprends, adapte et teste le code produit avec assistance IA.',
      experiences: [
        {
          role: 'Projet web personnel — création et gestion',
          company: 'Projet indépendant',
          location: '',
          start: 'Année',
          end: 'Présent',
          bullets: [
            'Structure du site, création de pages, pages produit, landing pages et formulaires.',
            'Organisation du contenu, notions de SEO, lecture de statistiques de recherche et de trafic.',
            'Intégration de produits affiliés ; concepts d’e-mail marketing et de tunnels de conversion.',
            'Hébergement, nom de domaine, environnement local, dépôt GitHub au niveau pratique.',
            'Développement assisté par IA : génération, compréhension, adaptation et test du code.',
          ],
        },
        pratiqueCreative,
      ],
      skillGroups: [
        { name: 'Web & digital', skills: ['Structure de site et navigation', 'Landing pages et formulaires', 'Notions SEO', 'Hébergement et domaines', 'Environnement local (XAMPP)'] },
        { name: 'Code (niveau pratique)', skills: ['Notions HTML / CSS', 'Familiarité JavaScript / PHP', 'Exposition aux bases de données (SQL)', 'Bases Git / GitHub'] },
        { name: 'IA', skills: ['Claude', 'ChatGPT', 'Prototypage assisté', 'Débogage assisté', 'Recherche de solutions'] },
        { name: 'Marketing digital (bases)', skills: ['Contenu', 'E-mail marketing (concepts)', 'Affiliation', 'Analyse simple des performances'] },
      ],
      projects: [
        {
          name: 'Landing pages et tunnels simples',
          description: 'Pages d’atterrissage, formulaires et parcours simples pour présenter des produits numériques.',
          link: '',
          tags: ['Landing page', 'Formulaires', 'Affiliation'],
        },
        {
          name: 'Prototypes assistés par IA',
          description: 'Petits outils et interfaces créés, adaptés et testés avec Claude / ChatGPT selon mes besoins.',
          link: '',
          tags: ['Claude', 'ChatGPT', 'Prototypage'],
        },
      ],
      certifications: [],
      interests: ['Produits numériques', 'IA générative', 'Design'],
    },
  },
}
