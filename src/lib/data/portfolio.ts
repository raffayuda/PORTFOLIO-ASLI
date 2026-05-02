// Portfolio Data - Bilingual Content
// Data Portfolio - Konten Bilingual

export const personalInfo = {
    name: 'Raffa Yuda Pratama',
    title: 'Full Stack Developer',
    tagline: 'Creating beautiful & functional web experiences',
    email: 'raffayudapratama20@gmail.com',
    location: 'Bogor, Indonesia',
    avatar: '/avatar.jpg', // Add your photo to static folder
    github: 'raffayuda'
};

// Bilingual Bio
export const bio = {
    id: {
        intro: 'Pengembang web yang passionate dengan keahlian dalam teknologi web modern. Saya senang membangun aplikasi yang user-friendly dan dapat menyelesaikan masalah di dunia nyata.',
        detail: 'Saya berspesialisasi dalam membangun aplikasi web modern dengan teknologi terkini. Fokus saya adalah menciptakan pengalaman pengguna yang intuitif sambil mempertahankan arsitektur kode yang bersih dan scalable.'
    },
    en: {
        intro: 'Passionate developer with expertise in modern web technologies. I love building user-friendly applications that solve real-world problems.',
        detail: 'I specialize in building modern web applications with cutting-edge technologies. My focus is on creating intuitive user experiences while maintaining clean, scalable code architecture.'
    }
};

export const socialLinks = {
    github: 'https://github.com/raffayuda',
    linkedin: 'https://linkedin.com/in/raffayuda',
    twitter: 'https://twitter.com/raffayuda',
    instagram: 'https://instagram.com/raffayudapratama06'
};

export const skills = [
    { name: 'React', devicon: 'devicon-react-original' },
    { name: 'Next.js', customSvg: true },
    { name: 'Svelte', devicon: 'devicon-svelte-plain' },
    { name: 'SvelteKit', devicon: 'devicon-svelte-plain' },
    { name: 'Vue.js', devicon: 'devicon-vuejs-plain' },
    { name: 'TypeScript', devicon: 'devicon-typescript-plain' },
    { name: 'JavaScript', devicon: 'devicon-javascript-plain' },
    { name: 'Tailwind CSS', devicon: 'devicon-tailwindcss-original' },
    { name: 'HTML', devicon: 'devicon-html5-plain' },
    { name: 'CSS', devicon: 'devicon-css3-plain' },
    { name: 'Node.js', devicon: 'devicon-nodejs-plain' },
    { name: 'Python', devicon: 'devicon-python-plain' },
    { name: 'PHP', devicon: 'devicon-php-plain' },
    { name: 'Laravel', devicon: 'devicon-laravel-plain' },
    { name: 'PostgreSQL', devicon: 'devicon-postgresql-plain' },
    { name: 'MongoDB', devicon: 'devicon-mongodb-plain' },
    { name: 'MySQL', devicon: 'devicon-mysql-plain' },
    { name: 'Prisma', customSvg: true },
    { name: 'Git', devicon: 'devicon-git-plain' },
    { name: 'GitHub', devicon: 'devicon-github-original' },
    { name: 'Docker', devicon: 'devicon-docker-plain' },
    { name: 'Figma', devicon: 'devicon-figma-plain' },
    { name: 'Vercel', customSvg: true },
    { name: 'Firebase', devicon: 'devicon-firebase-plain' }
];

// Bilingual Projects
export const projects = [
    {
        id: 1,
        slug: 'english-vocabulary',
        title: {
            id: 'Kosakata Bahasa Inggris',
            en: 'English Vocabulary',
        },
        description: {
            id: 'Platform belajar bahasa inggris yang lengkap dengan fitur Quiz, menyimpan kosakata, dan real-time inventory management.',
            en: 'Full-featured online learning platform with Quiz, vocabulary saving, and real-time inventory management.'
        },
        longDescription: {
            id: 'Platform pembelajaran bahasa Inggris interaktif yang dirancang untuk membantu pengguna memperluas kosakata mereka secara efektif. Dilengkapi dengan sistem quiz adaptif, penyimpanan kosakata personal, dan manajemen inventaris real-time. Aplikasi ini dibangun dengan arsitektur modern menggunakan Next.js dan PostgreSQL untuk performa optimal.',
            en: 'An interactive English learning platform designed to help users effectively expand their vocabulary. Features an adaptive quiz system, personal vocabulary storage, and real-time inventory management. Built with modern architecture using Next.js and PostgreSQL for optimal performance.'
        },
        image: '/images/projek1.png',
        gallery: ['/images/projek1.png'],
        tags: ['Next.js', 'TypeScript', 'Prisma', 'Tailwind', 'PostgreSQL'],
        github: 'https://github.com/raffayuda/vocabulary-english',
        demo: 'https://vocabulary-english.vercel.app/',
        category: 'web',
        features: {
            id: ['Sistem quiz adaptif', 'Penyimpanan kosakata personal', 'Progress tracking', 'Responsive design'],
            en: ['Adaptive quiz system', 'Personal vocabulary storage', 'Progress tracking', 'Responsive design']
        },
        year: 2024
    },
    {
        id: 2,
        slug: 'attendance-landing-page',
        title: {
            id: 'Landing Page Platform Absensi',
            en: 'Attendance Platform Landing Page'
        },
        description: {
            id: 'Landing page platform absensi dengan desain yang modern, user friendly, dan juga responsive',
            en: 'Attendance platform landing page with modern, user-friendly, and responsive design.'
        },
        longDescription: {
            id: 'Landing page profesional untuk platform absensi digital yang dirancang dengan pendekatan mobile-first. Menampilkan UI/UX modern dengan animasi halus, sistem navigasi intuitif, dan desain yang sepenuhnya responsive di semua perangkat.',
            en: 'A professional landing page for a digital attendance platform designed with a mobile-first approach. Features modern UI/UX with smooth animations, intuitive navigation, and a fully responsive design across all devices.'
        },
        image: '/images/projek2.png',
        gallery: ['/images/projek2.png'],
        tags: ['Laravel', 'Alpine.js', 'Tailwind', 'MySQL'],
        github: 'https://github.com/raffayuda/proyek-absensi',
        category: 'web',
        features: {
            id: ['Desain mobile-first', 'Animasi halus', 'SEO optimized', 'Cross-browser compatible'],
            en: ['Mobile-first design', 'Smooth animations', 'SEO optimized', 'Cross-browser compatible']
        },
        year: 2024
    },
    {
        id: 3,
        slug: 'attendance-dashboard',
        title: {
            id: 'Dashboard Absensi',
            en: 'Attendance Dashboard'
        },
        description: {
            id: 'Dashboard absensi yang memiliki fitur absensi manual dan QR Code, kelola jadwal, dan materi mata kuliah',
            en: 'Attendance dashboard with manual and QR code attendance, schedule management, and course materials.'
        },
        longDescription: {
            id: 'Sistem dashboard absensi komprehensif yang mendukung pencatatan kehadiran melalui input manual maupun pemindaian QR Code. Dilengkapi dengan manajemen jadwal perkuliahan, pengelolaan materi mata kuliah, dan laporan kehadiran yang detail.',
            en: 'A comprehensive attendance dashboard system supporting attendance recording through manual input and QR Code scanning. Equipped with course schedule management, course material management, and detailed attendance reports.'
        },
        image: '/images/projek3.png',
        gallery: ['/images/projek3.png'],
        tags: ['Laravel', 'Tailwind', 'MySQL'],
        github: 'https://github.com/raffayuda/dashboard-joki-absen',
        category: 'web',
        features: {
            id: ['Absensi QR Code', 'Manajemen jadwal', 'Materi kuliah', 'Laporan kehadiran'],
            en: ['QR Code attendance', 'Schedule management', 'Course materials', 'Attendance reports']
        },
        year: 2024
    },
    {
        id: 4,
        slug: 'office-equipment-monitoring',
        title: {
            id: 'Monitoring Peralatan Kantor',
            en: 'Office Equipment Monitoring'
        },
        description: {
            id: 'Platform monitoring peralatan kantor yang memungkinkan pengguna untuk melacak inventaris dan aset mereka dengan fitur real-time dan kolaborasi tim.',
            en: 'Office equipment monitoring platform that allows users to track their inventory and assets with real-time updates and team collaboration features.'
        },
        longDescription: {
            id: 'Platform monitoring peralatan kantor yang dirancang untuk memudahkan pelacakan inventaris dan aset perusahaan. Mendukung pembaruan real-time, kolaborasi tim, dan pelaporan otomatis untuk manajemen aset yang efisien.',
            en: 'An office equipment monitoring platform designed to simplify company inventory and asset tracking. Supports real-time updates, team collaboration, and automated reporting for efficient asset management.'
        },
        image: '/images/projek4.png',
        gallery: ['/images/projek4.png'],
        tags: ['Laravel', 'Tailwind', 'MySQL'],
        category: 'web',
        features: {
            id: ['Tracking real-time', 'Kolaborasi tim', 'Pelaporan otomatis', 'Manajemen inventaris'],
            en: ['Real-time tracking', 'Team collaboration', 'Automated reporting', 'Inventory management']
        },
        year: 2025
    },
    {
        id: 5,
        slug: 'dbscan-earthquake',
        title: {
            id: 'DBSCAN Riwayat Gempa Bumi 2001 - 2023',
            en: 'DBSCAN Earthquake History 2001 - 2023'
        },
        description: {
            id: 'Clustering gempa bumi menggunakan algoritma DBSCAN dengan dataset gempa bumi dari tahun 2001 - 2023',
            en: 'Clustering earthquake using DBSCAN algorithm with earthquake dataset from 2001 - 2023'
        },
        longDescription: {
            id: 'Proyek analisis data menggunakan algoritma DBSCAN untuk mengklasterisasi data gempa bumi Indonesia dari tahun 2001 hingga 2023. Menghasilkan visualisasi peta cluster yang informatif menggunakan GeoPandas dan Matplotlib.',
            en: 'A data analysis project using the DBSCAN algorithm to cluster Indonesian earthquake data from 2001 to 2023. Produces informative cluster map visualizations using GeoPandas and Matplotlib.'
        },
        image: '/images/projek5.png',
        gallery: ['/images/projek5.png'],
        tags: ['Python', 'DBSCAN', 'Matplotlib', 'Seaborn', 'Scikit-learn', 'GeoPandas'],
        github: 'https://github.com/raffayuda/Machine-Learning/tree/main/pertemuan11',
        category: 'ai',
        features: {
            id: ['Clustering DBSCAN', 'Visualisasi peta', 'Analisis data 22 tahun', 'Interaktif plotting'],
            en: ['DBSCAN clustering', 'Map visualization', '22-year data analysis', 'Interactive plotting']
        },
        year: 2024
    },
    {
        id: 6,
        slug: 'coffee-shop-app',
        title: {
            id: 'Aplikasi Coffee Shop',
            en: 'Coffee Shop Application'
        },
        description: {
            id: 'Aplikasi coffee shop yang memungkinkan pengguna untuk memesan menu dan melihat daftar menu.',
            en: 'Coffee shop application that allows users to order menu and view the menu list.'
        },
        longDescription: {
            id: 'Aplikasi coffee shop modern yang memungkinkan pelanggan untuk menjelajahi menu, melakukan pemesanan, dan mengelola pesanan mereka. Dibangun dengan Vue.js di frontend dan PostgreSQL dengan Prisma ORM di backend.',
            en: 'A modern coffee shop application that allows customers to browse the menu, place orders, and manage their orders. Built with Vue.js on the frontend and PostgreSQL with Prisma ORM on the backend.'
        },
        image: '/images/projek6.png',
        gallery: ['/images/projek6.png'],
        tags: ['Vue', 'Tailwind', 'PostgreSQL', 'Vercel', 'Prisma'],
        github: 'https://github.com/raffayuda/coffeshop-artisan',
        demo: 'https://coffeshop-artisan.vercel.app/',
        category: 'web',
        features: {
            id: ['Sistem pemesanan', 'Manajemen menu', 'Keranjang belanja', 'Responsive UI'],
            en: ['Ordering system', 'Menu management', 'Shopping cart', 'Responsive UI']
        },
        year: 2024
    }
];

// Bilingual Experience
export const experience = [
    {
        id: 1,
        type: 'work',
        title: {
            id: 'Magang Tim IT',
            en: 'IT Team Intern'
        },
        company: 'PT. IHATEC',
        location: 'Bogor, Jawa Barat',
        period: {
            id: '2025 - 2025',
            en: '2025 - 2025'
        },
        description: {
            id: 'Membuat sistem monitoring dan maintenance peralatan kantor, serta membantu merancang database.',
            en: 'Creating office equipment monitoring and maintenance systems, and also helping to design the database.'
        },
        icon: 'Briefcase'
    },
    {
        id: 2,
        type: 'education',
        title: {
            id: 'Teknik Informatika',
            en: 'Informatics Engineering'
        },
        company: 'STT Terpadu Nurul Fikri',
        location: 'Depok, Jawa Barat',
        period: {
            id: '2024 - Sekarang',
            en: '2024 - Present'
        },
        description: {
            id: 'Mempelajari ilmu informatika dan teknologi modern.',
            en: 'Learning informatics and modern technology.'
        },
        icon: 'GraduationCap'
    },
    {
        id: 3,
        type: 'education',
        title: {
            id: 'Rekayasa Perangkat Lunak',
            en: 'Software Engineering'
        },
        company: 'SMK INFOKOM Bogor',
        location: 'Bogor, Jawa Barat',
        period: {
            id: '2021 - 2024',
            en: '2021 - 2024'
        },
        description: {
            id: 'Fokus pada rekayasa perangkat lunak, pengembangan web, dan sistem basis data.',
            en: 'Focused on software engineering, web development, and database systems.'
        },
        icon: 'GraduationCap'
    },
    {
        id: 4,
        type: 'work',
        title: {
            id: 'Magang Web Developer',
            en: 'Web Developer Intern'
        },
        company: 'PT. Mega Kreasi Teknologi',
        location: 'Bogor, Jawa Barat',
        period: {
            id: '2023 - 2023',
            en: '2023 - 2023'
        },
        description: {
            id: 'Fokus pada pengembangan aplikasi web yang modern, cepat, user friendly, dan juga responsive.',
            en: 'Focused on developing modern, fast, user-friendly, and responsive web applications.'
        },
        icon: 'Briefcase'
    }
];

// Bilingual Category Labels
export const projectCategories = [
    {
        id: 'all',
        label: {
            id: 'Semua Proyek',
            en: 'All Projects'
        }
    },
    {
        id: 'web',
        label: {
            id: 'Aplikasi Web',
            en: 'Web Apps'
        }
    },
    {
        id: 'mobile',
        label: {
            id: 'Mobile',
            en: 'Mobile'
        }
    },
    {
        id: 'ai',
        label: {
            id: 'AI/ML',
            en: 'AI/ML'
        }
    }
];

// Services data
export const services = [
    {
        id: 'web-development',
        icon: 'Code2',
        title: { id: 'Pengembangan Web', en: 'Web Development' },
        description: {
            id: 'Membangun aplikasi web full-stack yang cepat, scalable, dan modern dengan teknologi terkini.',
            en: 'Building fast, scalable, and modern full-stack web applications with cutting-edge technologies.'
        }
    },
    {
        id: 'ui-ux-design',
        icon: 'Palette',
        title: { id: 'Desain UI/UX', en: 'UI/UX Design' },
        description: {
            id: 'Merancang antarmuka pengguna yang intuitif dan pengalaman pengguna yang menarik.',
            en: 'Designing intuitive user interfaces and engaging user experiences.'
        }
    },
    {
        id: 'mobile-development',
        icon: 'Smartphone',
        title: { id: 'Pengembangan Mobile', en: 'Mobile Development' },
        description: {
            id: 'Membuat aplikasi mobile cross-platform yang responsif dan performant.',
            en: 'Creating responsive and performant cross-platform mobile applications.'
        }
    },
    {
        id: 'api-development',
        icon: 'Server',
        title: { id: 'Pengembangan API', en: 'API Development' },
        description: {
            id: 'Membangun RESTful API dan GraphQL yang aman, efisien, dan terdokumentasi.',
            en: 'Building secure, efficient, and well-documented RESTful and GraphQL APIs.'
        }
    },
    {
        id: 'database-design',
        icon: 'Database',
        title: { id: 'Desain Database', en: 'Database Design' },
        description: {
            id: 'Merancang arsitektur database yang efisien dan optimal untuk kebutuhan aplikasi.',
            en: 'Designing efficient and optimal database architectures for application needs.'
        }
    },
    {
        id: 'consulting',
        icon: 'MessageSquare',
        title: { id: 'Konsultasi', en: 'Consulting' },
        description: {
            id: 'Memberikan konsultasi teknis dan code review untuk meningkatkan kualitas proyek.',
            en: 'Providing technical consulting and code reviews to improve project quality.'
        }
    }
];
