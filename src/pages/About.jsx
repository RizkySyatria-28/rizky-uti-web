import { motion } from 'framer-motion'
import rizkyPhoto from '../assets/rizky.jpg'
import utiPhoto from '../assets/uti.jpg'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: 'easeOut' },
  }),
}

const people = [
  {
    photo: rizkyPhoto,
    name: 'Rizky',
    nickname: '— si penjaga yang diam',
    desc: 'Pendiam, tenang, dan lebih suka hadir lewat tindakan daripada kata-kata. Ia bukan tipe yang mudah terbuka, tetapi ketika sudah nyaman — ia akan benar-benar ada, sepenuhnya.',
    traits: ['Pendengar setia', 'Penjaga tulus', 'Overthinking tipis', 'Serius kalau peduli', 'Hati-hati dalam bertindak'],
    born: '7 Juni 2004',
    color: {
      card: 'from-rose-50 to-amber-50/40',
      initial: 'text-rose-200',
      nickname: 'text-rose-400',
      trait: 'bg-white border-rose-100 text-rose-700',
    },
  },
  {
    photo: utiPhoto,
    name: 'Putri Rama Sari',
    nickname: '— dipanggil Uti 🌸',
    desc: 'Hangat, ekspresif, dan penuh warna. Di luar terlihat kalem, tapi semakin dekat semakin terasa betapa ia bisa mengisi setiap sudut ruangan dengan kehidupan dan cerita.',
    traits: ['Cerewet kalau nyaman', 'Physical touch', 'Emosional & hangat', 'Pecicilan', 'Suka bercerita panjang'],
    born: '18 November 2005',
    color: {
      card: 'from-pink-50 to-rose-50/60',
      initial: 'text-pink-200',
      nickname: 'text-pink-400',
      trait: 'bg-white border-pink-100 text-pink-700',
    },
  },
]

export default function About() {
  return (
    <section className="min-h-screen bg-white pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.p
          className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-3"
          variants={fadeUp} custom={0} initial="hidden" whileInView="show" viewport={{ once: true }}
        >
          Tentang Kami
        </motion.p>

        <motion.h2
          className="font-serif text-5xl md:text-6xl font-light text-rose-950 leading-tight mb-16"
          variants={fadeUp} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }}
        >
          Dua jiwa yang<br />
          <em className="italic text-rose-400">saling menemukan</em>
        </motion.h2>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {people.map((p, i) => (
            <motion.div
              key={p.name}
              className={`bg-gradient-to ${p.color.card} border border-rose-100 rounded-3xl p-9 relative overflow-hidden`}
              variants={fadeUp} custom={i + 2} initial="hidden" whileInView="show" viewport={{ once: true }}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {/* Decorative circle */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-rose-100/40" />

              {/* Foto */}
              <div className="mb-5">
                <img
                    src={p.photo}
                    alt={p.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-sm"
                />
              </div>

              {/* Name */}
              <h3 className="font-serif text-2xl font-semibold text-rose-950 mb-0.5">
                {p.name}
              </h3>
              <p className={`text-sm ${p.color.nickname} mb-1`}>
                {p.nickname}
              </p>
              <p className="text-xs text-rose-900/30 tracking-widest mb-5">
                Lahir {p.born}
              </p>

              {/* Divider */}
              <div className="w-10 h-px bg-rose-200 mb-5" />

              {/* Description */}
              <p className="text-sm text-rose-900/60 leading-relaxed mb-6">
                {p.desc}
              </p>

              {/* Traits */}
              <div className="flex flex-wrap gap-2">
                {p.traits.map(trait => (
                  <span
                    key={trait}
                    className={`text-xs px-3 py-1 rounded-full border ${p.color.trait}`}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote bawah */}
        <motion.div
          className="mt-20 text-center"
          variants={fadeUp} custom={5} initial="hidden" whileInView="show" viewport={{ once: true }}
        >
          <p className="font-serif text-2xl font-light italic text-rose-300">
            "biarkan aku menjadi alasan dia tersenyum, walau hanya lewat cerita yang aku sampaikan"
          </p>
          <p className="text-xs tracking-widest text-rose-900/30 uppercase mt-3">
            — kata yang mengubah segalanya
          </p>
        </motion.div>

      </div>
    </section>
  )
}