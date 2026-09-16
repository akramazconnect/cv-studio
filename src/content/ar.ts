import type { LangContent } from './schema'

export const ar: LangContent = {
  personal: {
    firstName: 'أكرم',
    lastName: 'AZ',
    email: 'wasslconnect@gmail.com',
    phone: '+212 6 00 00 00 00',
    location: 'الدار البيضاء، المغرب',
    website: '',
    linkedin: 'linkedin.com/in/akram-az',
    github: 'github.com/akram-az',
  },
  education: [
    {
      degree: 'دبلوم تقني متخصص في التطوير المعلوماتي',
      school: 'ISTA / OFPPT',
      location: 'الدار البيضاء',
      start: '2021',
      end: '2023',
      note: 'شبكات، أنظمة، برمجة، قواعد بيانات',
    },
    {
      degree: 'باكالوريا علوم فيزيائية',
      school: 'الثانوية التأهيلية',
      location: 'الدار البيضاء',
      start: '2020',
      end: '2021',
      note: '',
    },
  ],
  languages: [
    { name: 'العربية', level: 'اللغة الأم' },
    { name: 'الفرنسية', level: 'إتقان' },
    { name: 'الإنجليزية', level: 'مستوى مهني' },
  ],
  variants: {
    corporate: {
      title: 'تقني معلوميات — شبكات وتطوير',
      summary:
        'تقني معلوميات متعدد المهام، أتقن إدارة الشبكات ودعم المستخدمين كما أتقن تطوير الأدوات الداخلية. أقوم بأتمتة المهام المتكررة، وأضمن موثوقية العمليات (حملات البريد الإلكتروني، تتبع الشحنات، الربط عبر واجهات API)، وأنجز بسرعة بفضل التطوير بمساعدة الذكاء الاصطناعي مع الحفاظ على كود نظيف وقابل للصيانة.',
      experiences: [
        {
          role: 'تقني دعم وشبكات',
          company: 'شركة لوجستيك ونقل البريد',
          location: 'الدار البيضاء',
          start: '2023',
          end: 'حتى الآن',
          bullets: [
            'إدارة الشبكة (VLAN، Wi-Fi، VPN بين المواقع) وحظيرة تضم أكثر من 60 حاسوبًا وطابعات وماسحات ضوئية في الوكالات.',
            'دعم من المستوى الأول والثاني على Windows وMicrosoft 365 والتطبيقات المهنية؛ تقليص متوسط مدة الحل بنسبة 35%‎ بفضل قاعدة معرفية داخلية.',
            'تطوير لوحة تحكم لتتبع الشحنات (Python + واجهات API لشركات النقل) يستخدمها فريق خدمة العملاء يوميًا.',
            'أتمتة حملات البريد الإلكتروني والتذكيرات (سكريبتات، قوالب، إعدادات SPF/DKIM).',
          ],
        },
        {
          role: 'متدرب في قسم المعلوميات',
          company: 'مقاولة صغيرة ومتوسطة للخدمات',
          location: 'الدار البيضاء',
          start: '2022',
          end: '2023',
          bullets: [
            'تثبيت وإعداد الحواسيب والطابعات الشبكية وحسابات Active Directory.',
            'إرساء نظام نسخ احتياطي آلي وتوثيق الإجراءات.',
          ],
        },
      ],
      skillGroups: [
        { name: 'الشبكات', skills: ['TCP/IP', 'VLAN', 'VPN', 'Wi-Fi', 'Cisco / MikroTik', 'جدران الحماية'] },
        { name: 'الأنظمة', skills: ['Windows Server', 'Active Directory', 'Linux', 'Microsoft 365', 'الافتراضية'] },
        { name: 'التطوير', skills: ['Python', 'JavaScript', 'SQL', 'REST API', 'الأتمتة', 'التطوير بمساعدة الذكاء الاصطناعي'] },
        { name: 'الأدوات', skills: ['GLPI', 'Zabbix', 'Git', 'Excel متقدم', 'Power BI'] },
      ],
      projects: [
        {
          name: 'تتبع الشحنات',
          description: 'لوحة تحكم فورية تجمع حالات الشحن من عدة شركات نقل مع تنبيهات تلقائية.',
          link: '',
          tags: ['Python', 'API', 'SQL'],
        },
        {
          name: 'أتمتة البريد الإلكتروني',
          description: 'مسار إرسال وتذكير بقوالب ديناميكية وتتبع لمعدل الفتح.',
          link: '',
          tags: ['Node.js', 'SMTP', 'Cron'],
        },
      ],
      certifications: [
        { name: 'CCNA — Introduction to Networks', issuer: 'Cisco Networking Academy', year: '2023' },
        { name: 'Microsoft 365 Fundamentals (MS-900)', issuer: 'Microsoft', year: '2024' },
      ],
      interests: ['الأتمتة', 'التقنيات الحديثة', 'كرة القدم'],
    },
    tech: {
      title: 'تقني بنية تحتية معلوماتية — شبكات، أنظمة ونقديات',
      summary:
        'تقني بنية تحتية ميداني متخصص في الدعم من المستوى الثاني: الشبكات، أنظمة Windows/Linux، المراقبة والتدخل على التجهيزات الحساسة. دقيق ومنهجي ومعتاد على إجراءات ITIL، مع اهتمام خاص ببيئات النقديات (الصرافات الآلية GAB/ATM وأجهزة الأداء الإلكتروني) حيث تكون الجاهزية والأمان في المقام الأول.',
      experiences: [
        {
          role: 'تقني بنية تحتية ودعم من المستوى الثاني',
          company: 'مزود خدمات معلوماتية',
          location: 'الدار البيضاء',
          start: '2023',
          end: 'حتى الآن',
          bullets: [
            'إدارة خوادم Windows Server / Linux وActive Directory وسياسات GPO وخدمات DHCP/DNS والنسخ الاحتياطي.',
            'إعداد وصيانة تجهيزات الشبكة (محولات، موجهات، جدران حماية) عبر عدة مواقع بعيدة.',
            'نشر نظام المراقبة Zabbix: المجسات، عتبات التنبيه والمناوبة؛ الحفاظ على نسبة جاهزية 99.8%‎.',
            'تدخلات ميدانية وعن بُعد، معالجة التذاكر وتحرير تقارير الحوادث.',
          ],
        },
        {
          role: 'تقني دعم معلوماتي (تدريب)',
          company: 'بنك / مؤسسة مالية',
          location: 'الدار البيضاء',
          start: '2022',
          end: '2023',
          bullets: [
            'دعم الوكالات: الحواسيب، الطابعات، الملحقات والتطبيقات المهنية.',
            'المشاركة في عمليات الصيانة الوقائية وتتبع الحظيرة المعلوماتية.',
          ],
        },
      ],
      skillGroups: [
        { name: 'الشبكات', skills: ['TCP/IP', 'التوجيه والتبديل', 'VLAN', 'VPN IPsec', 'Cisco', 'Fortinet'] },
        { name: 'الأنظمة', skills: ['Windows Server', 'Active Directory / GPO', 'Linux (Debian, RHEL)', 'VMware / Hyper-V', 'النسخ الاحتياطي'] },
        { name: 'النقديات والميدان', skills: ['الصرافات الآلية GAB / ATM', 'أجهزة TPE', 'الصيانة الوقائية', 'تشخيص العتاد', 'التدخل الميداني'] },
        { name: 'المراقبة والأمان', skills: ['Zabbix', 'PRTG', 'جدران الحماية', 'مضاد الفيروسات / EDR', 'ITIL'] },
        { name: 'السكريبت', skills: ['PowerShell', 'Bash', 'Python', 'SQL'] },
      ],
      projects: [
        {
          name: 'مراقبة متعددة المواقع',
          description: 'نشر Zabbix على 12 موقعًا مع خرائط الشبكة وتنبيهات SMS ولوحات جاهزية.',
          link: '',
          tags: ['Zabbix', 'SNMP', 'Linux'],
        },
        {
          name: 'نشر آلي للحواسيب',
          description: 'سكريبتات PowerShell لتهيئة الحواسيب (الانضمام للنطاق، البرامج، التأمين) خفّضت مدة التجهيز من ساعتين إلى 20 دقيقة.',
          link: '',
          tags: ['PowerShell', 'AD', 'GPO'],
        },
      ],
      certifications: [
        { name: 'CCNA — Introduction to Networks', issuer: 'Cisco Networking Academy', year: '2023' },
        { name: 'CompTIA Network+ (قيد الإنجاز)', issuer: 'CompTIA', year: '2025' },
        { name: 'ITIL 4 Foundation', issuer: 'PeopleCert', year: '2024' },
      ],
      interests: ['الأمن السيبراني', 'مختبر منزلي', 'الإلكترونيات'],
    },
    creative: {
      title: 'مصمم غرافيك ومصمم مواقع',
      summary:
        'مصمم غرافيك ومواقع بعين دقيقة للتركيبات النظيفة والهويات البصرية المتناسقة، من الشعار إلى اللافتات مرورًا بالموقع التعريفي. أجمع بين الاهتمام بالتفاصيل وإتقان أدوات Adobe / Figma ومهارات التكامل الويب لتسليم دعامات مطبوعة ورقمية جاهزة للإنتاج.',
      experiences: [
        {
          role: 'مصمم غرافيك ومواقع (مستقل)',
          company: 'مقاولات صغيرة، محلات تجارية وجمعيات',
          location: 'الدار البيضاء',
          start: '2023',
          end: 'حتى الآن',
          bullets: [
            'إنشاء هويات بصرية متكاملة: الشعار، الدليل الغرافيكي، القرطاسية ونسخ مواقع التواصل الاجتماعي.',
            'تصميم الدعامات المطبوعة (ملصقات، مطويات، لافتات، عرض نقاط البيع، تغليف السيارات) بملفات جاهزة للطباعة.',
            'تصميم وتكامل مواقع تعريفية متجاوبة (Figma ← WordPress / HTML-CSS) لأكثر من 8 عملاء.',
            'تعديل الصور، النماذج والمرئيات الإعلانية للحملات الرقمية.',
          ],
        },
        {
          role: 'متدرب مصمم غرافيك',
          company: 'وكالة تواصل',
          location: 'الدار البيضاء',
          start: '2022',
          end: '2023',
          bullets: [
            'تطبيق الأدلة الغرافيكية على الدعامات المطبوعة والرقمية وتحضير الملفات للمطبعة.',
            'المشاركة في جلسات الإحاطة مع العملاء والعروض الإبداعية.',
          ],
        },
      ],
      skillGroups: [
        { name: 'التصميم', skills: ['الهوية البصرية', 'الطباعة الحرفية', 'الإخراج', 'الإدارة الفنية', 'تصميم الواجهات'] },
        { name: 'البرامج', skills: ['Figma', 'Illustrator', 'Photoshop', 'InDesign', 'After Effects', 'Canva'] },
        { name: 'الطباعة واللافتات', skills: ['اللافتات', 'عرض نقاط البيع', 'الملصقات', 'التحضير للطباعة', 'Pantone / CMYK'] },
        { name: 'الويب', skills: ['HTML / CSS', 'Tailwind', 'WordPress', 'Webflow', 'تصميم متجاوب', 'أساسيات JavaScript'] },
      ],
      projects: [
        {
          name: 'هوية بصرية — مقهى مفاهيمي',
          description: 'الشعار، الألوان، الخطوط، قوائم الطعام، لافتة الواجهة واللافتات الداخلية. تسليم دليل علامة من 24 صفحة.',
          link: '',
          tags: ['علامة تجارية', 'طباعة', 'لافتات'],
        },
        {
          name: 'موقع تعريفي — مكتب هندسة معمارية',
          description: 'نماذج Figma ثم تكامل متجاوب، معرض مشاريع ونموذج اتصال.',
          link: '',
          tags: ['Figma', 'WordPress', 'UI'],
        },
        {
          name: 'حملة ملصقات — حدث محلي',
          description: 'سلسلة ملصقات ومرئيات لمواقع التواصل بثلاثة أحجام، طُبعت بمقاس 4×3 م.',
          link: '',
          tags: ['ملصق', 'مواقع التواصل'],
        },
      ],
      certifications: [
        { name: 'Adobe Certified Professional — Graphic Design', issuer: 'Adobe', year: '2024' },
        { name: 'Google UX Design', issuer: 'Google / Coursera', year: '2023' },
      ],
      interests: ['التصوير', 'الخطوط', 'العمارة'],
    },
    startup: {
      title: 'مطور ويب متكامل وبيلدر بالذكاء الاصطناعي',
      summary:
        'مطور ويب متكامل يحوّل الفكرة إلى منتج فعّال في أيام. أبني نماذج أولية كاملة (React / Next.js، Node، Supabase) بالاعتماد على أدوات الذكاء الاصطناعي التوليدي (Claude Code، Cursor) للإنجاز بسرعة دون التضحية بالجودة: الاختبارات ومراجعة الكود والنشر المستمر جزء من سير العمل.',
      experiences: [
        {
          role: 'مطور ويب متكامل (مستقل)',
          company: 'شركات ناشئة وأصحاب مشاريع',
          location: 'عن بُعد / الدار البيضاء',
          start: '2023',
          end: 'حتى الآن',
          bullets: [
            'تصميم وتسليم 6 نماذج أولية لمنصات SaaS (تسجيل الدخول، الدفع، لوحات التحكم) في 3 أسابيع في المتوسط.',
            'أتمتة العمليات التجارية عبر n8n وواجهات API (CRM، البريد الإلكتروني، WhatsApp) — توفير أكثر من 40 ساعة شهريًا لأحد العملاء.',
            'إرساء خطوط CI/CD (GitHub Actions، Vercel) ومراقبة الأخطاء.',
            'دمج النماذج اللغوية (محادثة، استخراج بيانات، وكلاء) في منتجات قيد الإنتاج.',
          ],
        },
        {
          role: 'تقني معلوميات ومطور داخلي',
          company: 'مقاولة صغيرة ومتوسطة',
          location: 'الدار البيضاء',
          start: '2022',
          end: '2023',
          bullets: [
            'تطوير أدوات داخلية (تتبع، تقارير) عوّضت ملفات Excel المشتركة.',
            'إدارة الشبكة ودعم المستخدمين بالموازاة مع التطوير.',
          ],
        },
      ],
      skillGroups: [
        { name: 'الواجهة الأمامية', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite'] },
        { name: 'الواجهة الخلفية', skills: ['Node.js', 'Supabase', 'PostgreSQL', 'Prisma', 'REST API'] },
        { name: 'الذكاء الاصطناعي والأتمتة', skills: ['Claude Code', 'Cursor', 'Anthropic / OpenAI API', 'n8n', 'هندسة الأوامر'] },
        { name: 'DevOps', skills: ['Git / GitHub', 'Vercel', 'Docker', 'GitHub Actions', 'Linux'] },
      ],
      projects: [
        {
          name: 'مولّد سير ذاتية متعدد اللغات',
          description: 'تطبيق ويب لإنشاء السير الذاتية (FR / EN / AR) مع معاينة فورية وقوالب وتصدير PDF.',
          link: '',
          tags: ['React', 'TypeScript', 'Tailwind'],
        },
        {
          name: 'مساعد WhatsApp للتجار',
          description: 'بوت لاستقبال الطلبات مرتبط بنظام إداري، مع ملخص يومي تلقائي.',
          link: '',
          tags: ['Node.js', 'n8n', 'LLM'],
        },
        {
          name: 'لوحة تحليلات',
          description: 'منصة تقارير مرتبطة بـ Google Sheets وStripe، مع تسجيل دخول واشتراكات.',
          link: '',
          tags: ['Next.js', 'Supabase', 'Stripe'],
        },
      ],
      certifications: [
        { name: 'Meta Front-End Developer', issuer: 'Meta / Coursera', year: '2024' },
        { name: 'Supabase Bootcamp', issuer: 'Supabase', year: '2024' },
      ],
      interests: ['المنتج وتجربة المستخدم', 'المصادر المفتوحة', 'متابعة الذكاء الاصطناعي'],
    },
  },
}
