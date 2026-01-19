// Portfolio Data - Bilingual Content
// Data Portfolio - Konten Bilingual

export const personalInfo = {
    name: 'Raffa Yuda Pratama',
    title: 'Full Stack Developer',
    tagline: 'Creating beautiful & functional web experiences',
    email: 'raffayudapratama20@gmail.com',
    location: 'Bogor, Indonesia',
    avatar: '/avatar.jpg' // Add your photo to static folder
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
        title: {
            id: 'Kosakata Bahasa Inggris',
            en: 'English Vocabulary',
        },
        description: {
            id: 'Platform belajar bahasa inggris yang lengkap dengan fitur Quiz, menyimpan kosakata, dan real-time inventory management.',
            en: 'Full-featured online learning platform with Quiz, vocabulary saving, and real-time inventory management.'
        },
        image: '/images/projek1.png',
        tags: ['Next.js', 'TypeScript', 'Prisma', 'Tailwind', 'PostgreSQL'],
        github: 'https://github.com/raffayuda/vocabulary-english',
        demo: 'https://vocabulary-english.vercel.app/',
        category: 'web'
    },
    {
        id: 2,
        title: {
            id: 'Landing Page Platform Absensi',
            en: 'Attendance Platform Landing Page'
        },
        description: {
            id: 'Landing page platform absensi dengan desain yang modern, user friendly, dan juga responsive',
            en: 'Attendance platform landing page with modern, user-friendly, and responsive design.'
        },
        image: '/images/projek2.png',
        tags: ['Laravel', 'Alpine.js', 'Tailwind', 'MySQL'],
        github: 'https://github.com/raffayuda/proyek-absensi',
        // demo: 'https://attendance-platform.vercel.app/',
        category: 'web'
    },
    {
        id: 3,
        title: {
            id: 'Dashboard Absensi',
            en: 'Attendance Dashboard'
        },
        description: {
            id: 'Dashboard absensi yang memiliki fitur absensi manual dan QR Code, kelola jadwal, dan materi mata kuliah',
            en: 'Attendance dashboard with manual and QR code attendance, schedule management, and course materials.'
        },
        image: '/images/projek3.png',
        tags: ['Laravel', 'Tailwind', 'MySQL'],
        github: 'https://github.com/raffayuda/dashboard-joki-absen',
        // demo: 'https://attendance-dashboard.vercel.app/',
        category: 'web'
    },
    {
        id: 4,
        title: {
            id: 'Monitoring Peralatan Kantor',
            en: 'Office Equipment Monitoring'
        },
        description: {
            id: 'Platform monitoring peralatan kantor yang memungkinkan pengguna untuk melacak inventaris dan aset mereka dengan fitur real-time dan kolaborasi tim.',
            en: 'Office equipment monitoring platform that allows users to track their inventory and assets with real-time updates and team collaboration features.'
        },
        image: '/images/projek4.png',
        tags: ['Laravel', 'Tailwind', 'MySQL'],
        // github: 'https://github.com/raffayuda/office-equipment-monitoring',
        // demo: 'https://office-equipment-monitoring.vercel.app/',
        category: 'web'
    },
    {
        id: 5,
        title: {
            id: 'DBSCAN Riwayat Gempa Bumi 2001 - 2023',
            en: 'DBSCAN Earthquake History 2001 - 2023'
        },
        description: {
            id: 'Clustering gempa bumi menggunakan algoritma DBSCAN dengan dataset gempa bumi dari tahun 2001 - 2023',
            en: 'Clustering earthquake using DBSCAN algorithm with earthquake dataset from 2001 - 2023'
        },
        image: '/images/projek5.png',
        tags: ['Python', 'DBSCAN', 'Matplotlib', 'Seaborn', 'Scikit-learn', 'GeoPandas'],
        github: 'https://github.com/raffayuda/Machine-Learning/tree/main/pertemuan11',
        // demo: 'https://office-equipment-monitoring.vercel.app/',
        category: 'ai'
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
        company: 'PT. IOWork Indonesia',
        location: 'Bogor, Jawa Barat',
        period: {
            id: '2022 - 2022',
            en: '2022 - 2022'
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
