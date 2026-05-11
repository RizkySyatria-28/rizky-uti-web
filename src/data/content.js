export const coupleData = {
  names: {
    male: "Rizky",
    female: "Putri Rama Sari",
    femaleNickname: "Uti",
  },
  startDate: new Date("2026-01-08"), // awal KKN semester 5
  birthdays: {
    male: new Date("2004-06-07"),    // Rizky
    female: new Date("2005-11-18"),  // Uti
  },
  tagline: "Dari teras masjid, menuju hari-hari yang tidak terbatas",
}

export const timelineData = [
  {
    id: 1,
    month: "8 Januari 2026",
    title: "Teras Masjid",
    desc: "Pertemuan pertama di rapat offline KKN. Waktu itu Putri hanyalah satu dari banyak wajah — belum ada yang istimewa.",
  },
  {
    id: 2,
    month: "Selama KKN",
    title: "Tinggal & Tumbuh Bersama",
    desc: "Minggu-minggu di lokasi KKN mengubah segalanya. Bangun pagi bersama, program kerja, lelah bersama.",
  },
  {
    id: 3,
    month: "Momen Kritis",
    title: "Malam di Rumah Sakit",
    desc: "Ketika Putri harus dibawa ke rumah sakit, Rizky memilih tetap terjaga — menunggu sampai kondisi Putri benar-benar membaik.",
  },
  {
    id: 4,
    month: "Setelah KKN",
    title: '"Pahlawan Penjagaku"',
    desc: "Putri menulis tentang Rizky. Untuk pertama kalinya Rizky sadar — semua hal kecil yang ia lakukan, benar-benar dirasakan.",
  },
  {
    id: 5,
    month: "Hingga Kini",
    title: "Setiap Hari, Selalu Ada",
    desc: "Chat dari pagi hingga malam. Sleepcall sampai tertidur bersama. Kik… nyaman… — dan mereka terus bertahan.",
  },
]

export const importantDates = [
  {
    id: 1,
    label: "Ulang Tahun Uti",
    icon: "🎂",
    date: new Date("2025-11-18"),
  },
  {
    id: 2,
    label: "Ulang Tahun Rizky",
    icon: "🎂",
    date: new Date("2025-06-07"),
  },
  {
    id: 3,
    label: "Wisuda & Lulus",
    icon: "🎓",
    date: new Date("2026-09-01"), // estimasi, bisa diubah
  },
]

export const galleryData = [
  {
    id: 1,
    photo: null, // ganti dengan: import foto1 from '../assets/gallery/foto1.jpg'
    caption: "Rapat pertama di teras masjid — waktu itu masih canggung.",
    date: "8 Januari 2026",
    category: "KKN",
    rotate: -3,
  },
  {
    id: 2,
    photo: null,
    caption: "Masak bareng di dapur posko, berantakan tapi seru.",
    date: "Januari 2026",
    category: "KKN",
    rotate: 2,
  },
  {
    id: 3,
    photo: null,
    caption: "Malam di rumah sakit — malam yang mengubah segalanya.",
    date: "Januari 2026",
    category: "KKN",
    rotate: -1.5,
  },
  {
    id: 4,
    photo: null,
    caption: "Pertama kali sleepcall sampai ketiduran bersama.",
    date: "Februari 2026",
    category: "Setelah KKN",
    rotate: 3,
  },
  {
    id: 5,
    photo: null,
    caption: "kik… nyaman… 🌸",
    date: "Februari 2026",
    category: "Setelah KKN",
    rotate: -2,
  },
  {
    id: 6,
    photo: null,
    caption: "Hari biasa yang terasa luar biasa.",
    date: "Maret 2026",
    category: "Setelah KKN",
    rotate: 1.5,
  },
]

export const diaryConfig = {
  rizky: {
    password: "rizkyyy", // kamu yang tentukan
    color: {
      cover: 'from-rose-800 to-rose-950',
      spine: 'bg-rose-900',
      accent: 'text-rose-300',
      tag: 'bg-rose-700',
      button: 'bg-rose-700 hover:bg-rose-600',
      entry: 'bg-rose-50 border-rose-100',
      entryText: 'text-rose-900',
    },
  },
  uti: {
    password: "utiiii", // Uti yang tentukan
    color: {
      cover: 'from-pink-700 to-pink-950',
      spine: 'bg-pink-900',
      accent: 'text-pink-300',
      tag: 'bg-pink-700',
      button: 'bg-pink-700 hover:bg-pink-600',
      entry: 'bg-pink-50 border-pink-100',
      entryText: 'text-pink-900',
    },
  },
}

export const milestoneData = [
  {
    id: 1,
    date: new Date("2026-01-08"),
    label: "Pertemuan Pertama KKN",
    desc: "Tinggal bersama, tumbuh bersama, dan mulai saling memperhatikan.",
    icon: "🏡",
    type: "past",
  },
  {
    id: 2,
    date: new Date("2026-02-13"),
    label: "Kepulangan Setelah KKN",
    desc: "Chat tiap hari, sleepcall, dan cerita yang tidak ada habisnya.",
    icon: "📱",
    type: "past",
  },
  {
    id: 3,
    date: new Date("2026-06-07"),
    label: "Ulang Tahun Rizky",
    desc: "7 Juni — semoga jadi hari yang selalu dirayakan bersama.",
    icon: "🎂",
    type: "upcoming",
  },
  {
    id: 4,
    date: new Date("2026-11-18"),
    label: "Ulang Tahun Uti",
    desc: "18 November — hari lahirnya orang yang bilang 'kik… nyaman…'",
    icon: "🌸",
    type: "upcoming",
  },
  {
    id: 5,
    date: new Date("2027-09-01"),
    label: "Lulus & Wisuda",
    desc: "Finish line yang sedang kalian kejar bersama-sama.",
    icon: "🎓",
    type: "upcoming",
  },
]