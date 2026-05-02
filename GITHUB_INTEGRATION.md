# 🚀 GitHub Integration Guide

## ✅ Apa yang Sudah Diimplementasikan

Sistem GitHub integration di portfolio Anda terdiri dari:

### 1. **Data & Utilitas** (`/src/lib/utils/github.ts`)
- Fungsi untuk fetch repositories, user stats, dan contributions
- Type definitions untuk TypeScript
- Helper functions (colors, date formatting)
- Support untuk GitHub token (optional)

### 2. **API Endpoints** (`/src/routes/api/github/`)
- `GET /api/github/repos` - Fetch repositories dengan caching
- `GET /api/github/stats` - Fetch user statistics
- `GET /api/github/contributions` - Fetch contribution graph data

### 3. **Components**
- `GitHubPreview.svelte` - Menampilkan preview 4 repo terbaru
- `GitHubProfileCard.svelte` - Card profil GitHub baru
- Halaman `/github` - Detail lengkap dengan semua repositories

## 🔧 Cara Mengaktifkan & Menggunakan

### Step 1: Verifikasi Username GitHub
Edit [src/lib/data/portfolio.ts](../src/lib/data/portfolio.ts):

```typescript
export const personalInfo = {
    github: 'raffayuda', // ✓ Username sudah benar
    // ... data lainnya
};
```

### Step 2: (Optional) Tambahkan GitHub Token untuk Higher Rate Limits

Jika ingin API calls lebih banyak (60 → 5000 requests/hour):

1. Buka https://github.com/settings/tokens
2. Klik "Generate new token (classic)"
3. Pilih scope `public_repo`
4. Copy token
5. Buat file `.env.local` di root folder:

```env
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxx
```

⚠️ **PENTING**: Jangan commit `.env.local` ke git!

### Step 3: Import Components di halaman yang ingin

**Di halaman utama atau about section:**

```svelte
<script>
    import GitHubProfileCard from '$lib/components/GitHubProfileCard.svelte';
</script>

<GitHubProfileCard />
```

**Di halaman GitHub yang sudah ada:**
- Komponen sudah terintegrasi di `/src/routes/github/+page.svelte`

## 📊 Data yang Ditampilkan

### 1. **Repositories** 
- Nama dan deskripsi
- Bahasa pemrograman dengan warna
- Jumlah stars dan forks
- Link ke repository

### 2. **User Statistics**
- Jumlah public repositories
- Followers
- Following
- Member since (tahun join)

### 3. **Contribution Graph**
- Heatmap 1 tahun terakhir
- Total contributions per hari
- Color intensity berdasarkan aktivitas

## 🎨 Styling & Tema

Semua komponen menggunakan:
- `glass` class untuk efek glassmorphism
- `primary` color untuk highlight
- `muted-foreground` untuk text sekunder
- Responsive design dengan Tailwind CSS

## 📱 Responsive Behavior

- **Mobile**: Stack vertikal, single column
- **Tablet**: 2 column grid
- **Desktop**: 3 column grid atau list view

## ⚡ Performance & Caching

Server-side API endpoints dengan cache headers:
- `/repos` - Cache 5 menit
- `/stats` - Cache 10 menit  
- `/contributions` - Cache 1 jam

## 🐛 Error Handling

Semua komponen punya:
- Loading state dengan skeleton loaders
- Error messages yang user-friendly
- Graceful fallbacks jika API tidak respond

## 🔗 Bagaimana Data Ditampilkan

### Flow Client-side (Current):
```
User visits page
    ↓
onMount() in component
    ↓
Fetch from GitHub API (direct)
    ↓
Display data with animations
```

### Flow Server-side (Recommended):
```
User visits page
    ↓
Component fetch dari /api/github/*
    ↓
Server fetch dari GitHub API
    ↓
Return cached response
    ↓
Display data
```

## 📋 Translations

Sudah setup di [src/lib/translations/index.ts](../src/lib/translations/index.ts):

```typescript
github: {
    title: 'GitHub Saya',
    subtitle: 'Kontribusi dan repository saya',
    contributions: 'Kontribusi',
    repositories: 'Repository',
    // ... lebih banyak translations
}
```

## 🚨 Troubleshooting

### Repositori tidak muncul?
1. Cek apakah username benar di portfolio.ts
2. Pastikan repository bersifat **public**
3. Buka browser console (F12) untuk error messages

### Contribution graph kosong?
- Contributions API kadang slow
- Refresh halaman beberapa kali
- Atau lihat langsung di github.com/[username]

### Rate limit error?
- Tambahkan GitHub token di `.env.local`
- Atau tunggu 1 jam dan coba lagi

## 📚 API Reference

### Fetch Repositories
```typescript
import { getRepositories } from '$lib/utils/github';

const repos = await getRepositories('raffayuda', {
    sort: 'pushed',  // stars, forks, updated, pushed
    per_page: 12
});
```

### Fetch User Stats
```typescript
import { getUserStats } from '$lib/utils/github';

const stats = await getUserStats('raffayuda');
console.log(stats.public_repos, stats.followers);
```

### Fetch Contributions
```typescript
import { getContributions } from '$lib/utils/github';

const contrib = await getContributions('raffayuda');
console.log(contrib.total.lastYear); // Total contributions
```

## 🎯 Next Steps / Enhancement Ideas

- [ ] Add GitHub language distribution chart
- [ ] Show pinned repositories
- [ ] Add repo search/filter
- [ ] Display GitHub activity feed
- [ ] Add followers/following list
- [ ] Social badges (stars, forks, watchers)
- [ ] GitHub README preview
- [ ] Repository trending graphs

## 📞 Support

Untuk masalah lebih lanjut:
1. Buka GitHub API documentation: https://docs.github.com/rest
2. Check server logs di terminal
3. Lihat browser console untuk errors
