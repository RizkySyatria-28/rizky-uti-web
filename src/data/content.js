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

export const diaryData = [
  {
    id: 'rizky',
    owner: 'Rizky',
    passwordHash: "88f1116b59c9506530c2e48ea59b494c321d398d8ad7c4b1933db83b0668bde3", // hash dari "rizkyyy" (tanpa tanda kutip)
    color: {
      cover: 'from-rose-800 to-rose-950',
      spine: 'bg-rose-950',
      accent: 'text-rose-300',
      tag: 'bg-rose-700',
    },
    coverLabel: 'My Diary',
    coverYear: '2026',
    entries: [
      {
        date: '8 Januari 2026',
        title: 'Hari pertama KKN',
        mood: '😐',
        content: 'Hari pertama di lokasi KKN. Semua masih canggung, termasuk aku. Ada satu perempuan yang kalem, namanya Putri. Belum terlalu notice, tapi entah kenapa aku ingat wajahnya.',
      },
      {
        date: '15 Januari 2026',
        title: 'Mulai memperhatikan',
        mood: '🤔',
        content: 'Hari ini Putri cerita random soal makanan kesukaannya waktu rapat. Aku tidak tahu kenapa aku mendengarkan dengan sangat seksama. Biasanya aku tidak seperti ini.',
      },
      {
        date: '23 Januari 2026',
        title: 'Malam di rumah sakit',
        mood: '😟',
        content: 'Putri pingsan lagi. Aku yang antar ke rumah sakit. Semua orang kelelahan dan tertidur, tapi aku tidak bisa tidur. Aku hanya duduk dan menunggu. Aku tidak tahu ini apa namanya.',
      },
      {
        date: '2 Februari 2026',
        title: '"Pahlawan Penjagaku"',
        mood: '🥺',
        content: 'Putri mengirimkan tulisannya. Dia menulis tentang aku. Aku baca tiga kali. Aku tidak tahu harus berkata apa. Tidak ada yang pernah memperhatikan hal-hal kecil yang aku lakukan seperti itu.',
      },
      {
        date: '14 Februari 2026',
        title: 'kik… nyaman…',
        mood: '🌸',
        content: 'Dia bilang itu sambil bersandar. Tiga kata. Aku tidak menjawab karena aku tidak tahu harus bilang apa. Tapi di dalam, aku tahu — aku tidak mau pergi dari sisinya.',
      },
    ],
  },
  {
    id: 'uti',
    owner: 'Putri',
    passwordHash: "69e19a910862a125e0ec56cd703892e5c23369b4fea324b7a8c4212d51e7e444", // hash dari "utiii" (tanpa tanda kutip)
    color: {
      cover: 'from-pink-700 to-pink-950',
      spine: 'bg-pink-950',
      accent: 'text-pink-300',
      tag: 'bg-pink-700',
    },
    coverLabel: 'My Diary',
    coverYear: '2026',
    entries: [
      {
        date: '8 Januari 2026',
        title: 'KKN dimulai',
        mood: '😊',
        content: 'Hari pertama KKN. Kelompoknya lumayan, ada yang pendiam tapi kelihatan baik — namanya Rizky. Dia tidak banyak bicara tapi matanya selalu memperhatikan. Entah kenapa aku notice itu.',
      },
      {
        date: '20 Januari 2026',
        title: 'Dia selalu ada',
        mood: '🥹',
        content: 'Badan aku tidak enak lagi hari ini. Tapi sebelum aku bilang apa-apa, Rizky sudah bawain air. Dia tidak bilang apa-apa, hanya taruh di depanku lalu pergi. Aku diam tapi hati aku tidak diam.',
      },
      {
        date: '23 Januari 2026',
        title: 'Malam yang tidak terlupakan',
        mood: '😢',
        content: 'Aku pingsan dan dibawa ke rumah sakit. Yang aku ingat waktu sadar — Rizky masih di sana. Sendirian. Menunggu. Padahal yang lain sudah tidur. Aku menangis tapi pura-pura tidak.',
      },
      {
        date: '1 Februari 2026',
        title: 'Pahlawan Penjagaku',
        mood: '💗',
        content: 'Aku nulis tentang dia. Tentang semua hal kecil yang dia lakukan tanpa sadar. Aku takut kalau tidak aku tulis, aku akan lupa. Tapi rasanya aku tidak akan pernah bisa lupa.',
      },
      {
        date: '14 Februari 2026',
        title: 'Nyaman',
        mood: '🌸',
        content: 'Hari ini aku bilang "kik… nyaman…" sambil bersandar ke dia. Aku tidak tahu kenapa aku berani bilang itu. Tapi itu jujur. Aku nyaman. Dan itu hal yang sudah lama tidak aku rasakan.',
      },
    ],
  },
]