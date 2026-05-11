import { motion } from 'framer-motion'
import { timelineData } from '../data/content'

const fadeLeft = {
  hidden: { opacity: 0, x: -32 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}

const fadeDot = {
  hidden: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: 'backOut' },
  },
}

export default function Timeline() {
  return (
    <section className="min-h-screen bg-rose-50/40 pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.p
          className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Perjalanan Kami
        </motion.p>

        <motion.h2
          className="font-serif text-5xl md:text-6xl font-light text-rose-950 leading-tight mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Cerita yang<br />
          <em className="italic text-rose-400">terus ditulis</em>
        </motion.h2>

        {/* Timeline list */}
        <div className="relative">

          {/* Garis vertikal */}
          <motion.div
            className="absolute left-5 top-2 bottom-0 w-px bg-gradient-to-b from-rose-300 via-rose-200 to-transparent"
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />

          <div className="space-y-14">
            {timelineData.map((item, i) => (
              <div key={item.id} className="flex gap-10 relative">

                {/* Dot */}
                <motion.div
                  className="relative z-10 flex-shrink-0"
                  variants={fadeDot}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-rose-300 flex items-center justify-center shadow-sm">
                    <span className="font-serif text-sm text-rose-400 font-medium">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                </motion.div>

                {/* Content card */}
                <motion.div
                  className="flex-1 bg-white border border-rose-100 rounded-2xl px-7 py-6 shadow-sm"
                  variants={fadeLeft}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-60px' }}
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <p className="text-xs tracking-[0.2em] uppercase text-rose-400 mb-2">
                    {item.month}
                  </p>
                  <h3 className="font-serif text-2xl font-semibold text-rose-950 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-rose-900/55 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>

              </div>
            ))}
          </div>

        </div>

        {/* Penutup */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-rose-300 to-transparent mx-auto mb-8" />
          <p className="font-serif text-3xl font-light italic text-rose-300">
            Dan cerita ini masih berlanjut…
          </p>
          <p className="text-xs tracking-widest text-rose-900/25 uppercase mt-4">
            halaman ini akan terus bertambah
          </p>
        </motion.div>

      </div>
    </section>
  )
}