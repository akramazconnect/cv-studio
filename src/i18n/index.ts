import type { Lang, VariantId } from '../types'

export const LANGS: { id: Lang; label: string; short: string }[] = [
  { id: 'fr', label: 'Français', short: 'FR' },
  { id: 'en', label: 'English', short: 'EN' },
  { id: 'ar', label: 'العربية', short: 'AR' },
]

export const isRTL = (lang: Lang) => lang === 'ar'

export type Dict = {
  app: string
  tagline: string
  export: string
  exportHint: string
  exportPdf: string
  exportDocx: string
  exportDocxHint: string
  generating: string
  exportError: string
  reset: string
  resetConfirm: string
  preview: string
  editor: string
  variants: Record<VariantId, { name: string; for: string; desc: string }>
  sections: {
    profile: string
    contact: string
    experience: string
    education: string
    skills: string
    projects: string
    certifications: string
    languages: string
    interests: string
  }
  editorGroups: {
    theme: string
    personal: string
    summary: string
    experience: string
    education: string
    skills: string
    projects: string
    certifications: string
    languages: string
    interests: string
  }
  fields: {
    firstName: string
    lastName: string
    title: string
    email: string
    phone: string
    location: string
    website: string
    linkedin: string
    github: string
    photo: string
    uploadPhoto: string
    removePhoto: string
    role: string
    company: string
    start: string
    end: string
    bullets: string
    bulletsHint: string
    degree: string
    school: string
    note: string
    groupName: string
    skillsList: string
    skillsHint: string
    projectName: string
    description: string
    link: string
    tags: string
    certName: string
    issuer: string
    year: string
    language: string
    level: string
    interestsHint: string
    accent: string
    showPhoto: string
    density: string
    densities: Record<'compact' | 'normal' | 'airy', string>
  }
  actions: {
    add: string
    remove: string
    up: string
    down: string
  }
  deploy: {
    button: string
    title: string
    intro: string
    save: string
    saved: string
    publish: string
    publishing: string
    branch: string
    remote: string
    noRemote: string
    remotePlaceholder: string
    createRepo: string
    lastCommit: string
    dirty: string
    clean: string
    openSite: string
    openRepo: string
    done: string
    failed: string
  }
  backup: {
    title: string
    export: string
    import: string
    imported: string
    invalid: string
  }
}

export const ui: Record<Lang, Dict> = {
  fr: {
    app: 'CV Studio',
    tagline: 'Quatre variantes · trois langues · un profil',
    export: 'Télécharger',
    exportHint: 'Dans la fenêtre d’impression, choisissez « Enregistrer au format PDF » comme destination.',
    exportPdf: 'PDF',
    exportDocx: 'Word / Google Docs',
    exportDocxHint: 'Fichier .docx — dans Google Docs : Fichier → Ouvrir → Importer.',
    generating: 'Génération…',
    exportError: 'La génération a échoué.',
    reset: 'Réinitialiser cette variante',
    resetConfirm: 'Restaurer le contenu par défaut de cette variante dans cette langue ?',
    preview: 'Aperçu',
    editor: 'Éditeur',
    variants: {
      corporate: { name: 'Polyvalent', for: 'ECM · E-Transit · Mailing', desc: 'IT réseau & développement, avec une touche de vibe coding.' },
      tech: { name: 'Infrastructure', for: 'Munisys · GAB / ATM · Monétique', desc: 'Profil 100 % IT : réseaux, systèmes, support N2.' },
      creative: { name: 'Créatif', for: 'Panneau Design · Agences', desc: 'Design graphique & web design, identité visuelle.' },
      startup: { name: 'Builder', for: 'Startups · Produit · IA', desc: 'Full-stack & développement assisté par IA.' },
    },
    sections: {
      profile: 'Profil',
      contact: 'Contact',
      experience: 'Expérience',
      education: 'Formation',
      skills: 'Compétences',
      projects: 'Projets',
      certifications: 'Certifications',
      languages: 'Langues',
      interests: 'Centres d’intérêt',
    },
    editorGroups: {
      theme: 'Apparence',
      personal: 'Informations personnelles',
      summary: 'Profil',
      experience: 'Expériences',
      education: 'Formation',
      skills: 'Compétences',
      projects: 'Projets',
      certifications: 'Certifications',
      languages: 'Langues',
      interests: 'Centres d’intérêt',
    },
    fields: {
      firstName: 'Prénom',
      lastName: 'Nom',
      title: 'Titre / Poste visé',
      email: 'E-mail',
      phone: 'Téléphone',
      location: 'Ville',
      website: 'Site web',
      linkedin: 'LinkedIn',
      github: 'GitHub / Portfolio',
      photo: 'Photo',
      uploadPhoto: 'Importer une photo',
      removePhoto: 'Retirer',
      role: 'Poste',
      company: 'Entreprise',
      start: 'Début',
      end: 'Fin',
      bullets: 'Réalisations',
      bulletsHint: 'Une réalisation par ligne',
      degree: 'Diplôme',
      school: 'École / Établissement',
      note: 'Mention / Détail',
      groupName: 'Catégorie',
      skillsList: 'Compétences',
      skillsHint: 'Séparées par des virgules',
      projectName: 'Nom du projet',
      description: 'Description',
      link: 'Lien',
      tags: 'Technologies',
      certName: 'Certification',
      issuer: 'Organisme',
      year: 'Année',
      language: 'Langue',
      level: 'Niveau',
      interestsHint: 'Séparés par des virgules',
      accent: 'Couleur d’accent',
      showPhoto: 'Afficher la photo',
      density: 'Densité',
      densities: { compact: 'Compacte', normal: 'Normale', airy: 'Aérée' },
    },
    actions: { add: 'Ajouter', remove: 'Supprimer', up: 'Monter', down: 'Descendre' },
    deploy: {
      button: 'Publier',
      title: 'Publier en ligne',
      intro: 'Publie l’application (code uniquement) sur GitHub ; vos informations personnelles ne quittent jamais cet ordinateur. GitHub Pages met le site à jour en ~1 min.',
      save: 'Garder mes infos sur ce PC',
      saved: 'Enregistré dans src/content/local.json (jamais publié)',
      publish: 'Publier sur GitHub',
      publishing: 'Publication…',
      branch: 'Branche',
      remote: 'Dépôt',
      noRemote: 'Aucun dépôt GitHub relié. Créez-le (public) puis collez son URL :',
      remotePlaceholder: 'https://github.com/akramazconnect/cv.git',
      createRepo: 'Créer le dépôt sur GitHub',
      lastCommit: 'Dernier commit',
      dirty: 'Modifications non publiées',
      clean: 'Tout est publié',
      openSite: 'Ouvrir le site',
      openRepo: 'Ouvrir le dépôt',
      done: 'Publié ! Le site sera à jour dans une minute.',
      failed: 'Échec — voir le journal ci-dessous.',
    },
    backup: {
      title: 'Sauvegarde',
      export: 'Exporter (JSON)',
      import: 'Importer',
      imported: 'Données importées.',
      invalid: 'Fichier invalide.',
    },
  },
  en: {
    app: 'CV Studio',
    tagline: 'Four variants · three languages · one profile',
    export: 'Download',
    exportHint: 'In the print window, choose “Save as PDF” as the destination.',
    exportPdf: 'PDF',
    exportDocx: 'Word / Google Docs',
    exportDocxHint: '.docx file — in Google Docs: File → Open → Upload.',
    generating: 'Generating…',
    exportError: 'Export failed.',
    reset: 'Reset this variant',
    resetConfirm: 'Restore the default content for this variant in this language?',
    preview: 'Preview',
    editor: 'Editor',
    variants: {
      corporate: { name: 'Versatile', for: 'ECM · E-Transit · Mailing', desc: 'IT network & development, with a touch of vibe coding.' },
      tech: { name: 'Infrastructure', for: 'Munisys · ATM / GAB · Payments', desc: 'Pure IT profile: networks, systems, L2 support.' },
      creative: { name: 'Creative', for: 'Panneau Design · Agencies', desc: 'Graphic & web design, visual identity.' },
      startup: { name: 'Builder', for: 'Startups · Product · AI', desc: 'Full-stack & AI-assisted development.' },
    },
    sections: {
      profile: 'Profile',
      contact: 'Contact',
      experience: 'Experience',
      education: 'Education',
      skills: 'Skills',
      projects: 'Projects',
      certifications: 'Certifications',
      languages: 'Languages',
      interests: 'Interests',
    },
    editorGroups: {
      theme: 'Appearance',
      personal: 'Personal details',
      summary: 'Profile',
      experience: 'Experience',
      education: 'Education',
      skills: 'Skills',
      projects: 'Projects',
      certifications: 'Certifications',
      languages: 'Languages',
      interests: 'Interests',
    },
    fields: {
      firstName: 'First name',
      lastName: 'Last name',
      title: 'Headline / Target role',
      email: 'Email',
      phone: 'Phone',
      location: 'City',
      website: 'Website',
      linkedin: 'LinkedIn',
      github: 'GitHub / Portfolio',
      photo: 'Photo',
      uploadPhoto: 'Upload photo',
      removePhoto: 'Remove',
      role: 'Role',
      company: 'Company',
      start: 'Start',
      end: 'End',
      bullets: 'Achievements',
      bulletsHint: 'One achievement per line',
      degree: 'Degree',
      school: 'School / Institution',
      note: 'Honors / Detail',
      groupName: 'Category',
      skillsList: 'Skills',
      skillsHint: 'Comma-separated',
      projectName: 'Project name',
      description: 'Description',
      link: 'Link',
      tags: 'Technologies',
      certName: 'Certification',
      issuer: 'Issuer',
      year: 'Year',
      language: 'Language',
      level: 'Level',
      interestsHint: 'Comma-separated',
      accent: 'Accent color',
      showPhoto: 'Show photo',
      density: 'Density',
      densities: { compact: 'Compact', normal: 'Normal', airy: 'Airy' },
    },
    actions: { add: 'Add', remove: 'Remove', up: 'Move up', down: 'Move down' },
    deploy: {
      button: 'Publish',
      title: 'Publish online',
      intro: 'Publishes the app (code only) to GitHub; your personal details never leave this computer. GitHub Pages updates the site in ~1 min.',
      save: 'Keep my details on this PC',
      saved: 'Saved to src/content/local.json (never published)',
      publish: 'Publish to GitHub',
      publishing: 'Publishing…',
      branch: 'Branch',
      remote: 'Repository',
      noRemote: 'No GitHub repository linked yet. Create it (public) then paste its URL:',
      remotePlaceholder: 'https://github.com/akramazconnect/cv.git',
      createRepo: 'Create the repository on GitHub',
      lastCommit: 'Last commit',
      dirty: 'Unpublished changes',
      clean: 'Everything is published',
      openSite: 'Open site',
      openRepo: 'Open repository',
      done: 'Published! The site will be live in about a minute.',
      failed: 'Failed — see the log below.',
    },
    backup: {
      title: 'Backup',
      export: 'Export (JSON)',
      import: 'Import',
      imported: 'Data imported.',
      invalid: 'Invalid file.',
    },
  },
  ar: {
    app: 'CV Studio',
    tagline: 'أربع نسخ · ثلاث لغات · ملف واحد',
    export: 'تحميل',
    exportHint: 'في نافذة الطباعة، اختر «حفظ بصيغة PDF» كوجهة.',
    exportPdf: 'PDF',
    exportDocx: 'Word / Google Docs',
    exportDocxHint: 'ملف ‎.docx — في Google Docs: ملف ← فتح ← رفع.',
    generating: 'جارٍ الإنشاء…',
    exportError: 'فشل التصدير.',
    reset: 'إعادة ضبط هذه النسخة',
    resetConfirm: 'هل تريد استعادة المحتوى الافتراضي لهذه النسخة بهذه اللغة؟',
    preview: 'معاينة',
    editor: 'المحرر',
    variants: {
      corporate: { name: 'متعدد المهام', for: 'ECM · E-Transit · البريد', desc: 'شبكات وتطوير، مع لمسة من البرمجة بمساعدة الذكاء الاصطناعي.' },
      tech: { name: 'البنية التحتية', for: 'Munisys · الصرافات الآلية · النقديات', desc: 'ملف تقني بحت: شبكات، أنظمة، دعم من المستوى الثاني.' },
      creative: { name: 'إبداعي', for: 'Panneau Design · الوكالات', desc: 'تصميم غرافيكي وتصميم مواقع، هوية بصرية.' },
      startup: { name: 'بيلدر', for: 'شركات ناشئة · منتجات · ذكاء اصطناعي', desc: 'تطوير متكامل بمساعدة الذكاء الاصطناعي.' },
    },
    sections: {
      profile: 'نبذة',
      contact: 'التواصل',
      experience: 'الخبرة المهنية',
      education: 'التكوين',
      skills: 'المهارات',
      projects: 'المشاريع',
      certifications: 'الشهادات',
      languages: 'اللغات',
      interests: 'الاهتمامات',
    },
    editorGroups: {
      theme: 'المظهر',
      personal: 'المعلومات الشخصية',
      summary: 'النبذة',
      experience: 'الخبرات',
      education: 'التكوين',
      skills: 'المهارات',
      projects: 'المشاريع',
      certifications: 'الشهادات',
      languages: 'اللغات',
      interests: 'الاهتمامات',
    },
    fields: {
      firstName: 'الاسم',
      lastName: 'النسب',
      title: 'المسمى / المنصب المستهدف',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      location: 'المدينة',
      website: 'الموقع الإلكتروني',
      linkedin: 'لينكدإن',
      github: 'GitHub / بورتفوليو',
      photo: 'الصورة',
      uploadPhoto: 'رفع صورة',
      removePhoto: 'إزالة',
      role: 'المنصب',
      company: 'الشركة',
      start: 'البداية',
      end: 'النهاية',
      bullets: 'الإنجازات',
      bulletsHint: 'إنجاز واحد في كل سطر',
      degree: 'الشهادة',
      school: 'المؤسسة',
      note: 'ملاحظة / تفاصيل',
      groupName: 'الفئة',
      skillsList: 'المهارات',
      skillsHint: 'مفصولة بفواصل',
      projectName: 'اسم المشروع',
      description: 'الوصف',
      link: 'الرابط',
      tags: 'التقنيات',
      certName: 'الشهادة',
      issuer: 'الجهة المانحة',
      year: 'السنة',
      language: 'اللغة',
      level: 'المستوى',
      interestsHint: 'مفصولة بفواصل',
      accent: 'لون التمييز',
      showPhoto: 'إظهار الصورة',
      density: 'الكثافة',
      densities: { compact: 'مضغوطة', normal: 'عادية', airy: 'فسيحة' },
    },
    actions: { add: 'إضافة', remove: 'حذف', up: 'تحريك لأعلى', down: 'تحريك لأسفل' },
    deploy: {
      button: 'نشر',
      title: 'النشر على الإنترنت',
      intro: 'ينشر التطبيق (الكود فقط) على GitHub؛ معلوماتك الشخصية لا تغادر هذا الحاسوب أبدًا. يحدّث GitHub Pages الموقع خلال دقيقة تقريبًا.',
      save: 'الاحتفاظ بمعلوماتي على هذا الحاسوب',
      saved: 'تم الحفظ في src/content/local.json (لا يُنشر أبدًا)',
      publish: 'النشر على GitHub',
      publishing: 'جارٍ النشر…',
      branch: 'الفرع',
      remote: 'المستودع',
      noRemote: 'لا يوجد مستودع GitHub مرتبط بعد. أنشئه (عام) ثم الصق رابطه:',
      remotePlaceholder: 'https://github.com/akramazconnect/cv.git',
      createRepo: 'إنشاء المستودع على GitHub',
      lastCommit: 'آخر تعديل',
      dirty: 'تعديلات غير منشورة',
      clean: 'كل شيء منشور',
      openSite: 'فتح الموقع',
      openRepo: 'فتح المستودع',
      done: 'تم النشر! سيكون الموقع محدّثًا خلال دقيقة.',
      failed: 'فشل — انظر السجل أدناه.',
    },
    backup: {
      title: 'نسخة احتياطية',
      export: 'تصدير (JSON)',
      import: 'استيراد',
      imported: 'تم استيراد البيانات.',
      invalid: 'ملف غير صالح.',
    },
  },
}
