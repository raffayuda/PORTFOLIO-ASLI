// Portfolio Data - Bilingual Content
// Data Portfolio - Konten Bilingual

export const personalInfo = {
    name: 'Your Name',
    title: 'Full Stack Developer',
    tagline: 'Creating beautiful & functional web experiences',
    email: 'your.email@example.com',
    location: 'Jakarta, Indonesia',
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
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
    instagram: 'https://instagram.com/yourusername'
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
            id: 'Platform E-Commerce',
            en: 'E-Commerce Platform'
        },
        description: {
            id: 'Platform belanja online lengkap dengan integrasi pembayaran, dashboard admin, dan manajemen inventori real-time.',
            en: 'Full-featured online shopping platform with payment integration, admin dashboard, and real-time inventory management.'
        },
        image: '/projects/ecommerce.jpg',
        tags: ['Next.js', 'TypeScript', 'Prisma', 'Stripe'],
        github: 'https://github.com/yourusername/ecommerce',
        demo: 'https://demo.example.com',
        category: 'web'
    },
    {
        id: 2,
        title: {
            id: 'Aplikasi Manajemen Tugas',
            en: 'Task Management App'
        },
        description: {
            id: 'Tool manajemen tugas kolaboratif dengan update real-time, fitur kolaborasi tim, dan papan kanban.',
            en: 'Collaborative task management tool with real-time updates, team collaboration features, and kanban boards.'
        },
        image: '/projects/taskapp.jpg',
        tags: ['SvelteKit', 'Firebase', 'Tailwind'],
        github: 'https://github.com/yourusername/taskapp',
        demo: 'https://demo.example.com',
        category: 'web'
    },
    {
        id: 3,
        title: {
            id: 'Dashboard Cuaca',
            en: 'Weather Dashboard'
        },
        description: {
            id: 'Dashboard cuaca yang indah dengan prakiraan, peta interaktif, dan rekomendasi berbasis lokasi.',
            en: 'Beautiful weather dashboard with forecasts, interactive maps, and location-based recommendations.'
        },
        image: '/projects/weather.jpg',
        tags: ['React', 'OpenWeather API', 'Chart.js'],
        github: 'https://github.com/yourusername/weather',
        demo: 'https://demo.example.com',
        category: 'web'
    },
    {
        id: 4,
        title: {
            id: 'Generator Portfolio',
            en: 'Portfolio Generator'
        },
        description: {
            id: 'Generator website portfolio bertenaga AI yang membuat situs indah dari input pengguna.',
            en: 'AI-powered portfolio website generator that creates beautiful sites from user input.'
        },
        image: '/projects/portfolio.jpg',
        tags: ['Python', 'FastAPI', 'OpenAI', 'Svelte'],
        github: 'https://github.com/yourusername/portfolio-gen',
        demo: 'https://demo.example.com',
        category: 'ai'
    }
];

// Bilingual Experience
export const experience = [
    {
        id: 1,
        type: 'work',
        title: {
            id: 'Senior Full Stack Developer',
            en: 'Senior Full Stack Developer'
        },
        company: 'Tech Company',
        location: 'Jakarta, Indonesia',
        period: {
            id: '2022 - Sekarang',
            en: '2022 - Present'
        },
        description: {
            id: 'Memimpin pengembangan aplikasi web, membimbing pengembang junior, dan merancang solusi yang scalable.',
            en: 'Leading development of web applications, mentoring junior developers, and architecting scalable solutions.'
        },
        icon: 'Briefcase'
    },
    {
        id: 2,
        type: 'work',
        title: {
            id: 'Full Stack Developer',
            en: 'Full Stack Developer'
        },
        company: 'Startup Inc',
        location: 'Remote',
        period: {
            id: '2020 - 2022',
            en: '2020 - 2022'
        },
        description: {
            id: 'Mengembangkan dan memelihara berbagai proyek klien menggunakan teknologi web modern.',
            en: 'Developed and maintained multiple client projects using modern web technologies.'
        },
        icon: 'Briefcase'
    },
    {
        id: 3,
        type: 'education',
        title: {
            id: 'Sarjana Ilmu Komputer',
            en: 'Bachelor of Computer Science'
        },
        company: 'University Name',
        location: 'Indonesia',
        period: {
            id: '2016 - 2020',
            en: '2016 - 2020'
        },
        description: {
            id: 'Fokus pada rekayasa perangkat lunak, pengembangan web, dan sistem basis data.',
            en: 'Focused on software engineering, web development, and database systems.'
        },
        icon: 'GraduationCap'
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
