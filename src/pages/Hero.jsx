import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { coupleData } from '../data/content'

function useDaysTogether() {
  const start = coupleData.startDate
  const now = new Date()
  const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24))
  return {
    days: diff,
    months: Math.floor(diff / 30),
  }
}

function Petal({ style }) {
  return (
    <motion.div
      className="absolute rounded-tl-full rounded-br-full bg-rose-300 opacity-0"
      style={{ width: 8, height: 8, ...style }}
      animate={{
        y: ['0vh', '105vh'],
        rotate: [0, 360],
        opacity: [0, 0.18, 0.12, 0],
      }}
      transition={{
        duration: style.duration,
        delay: style.delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )
}

const petals = Array.from({ length: 20 }, (_, i) => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 30}%`,
  width: 6 + Math.random() * 8,
  height: 6 + Math.random() * 8,
  duration: 7 + Math.random() * 10,
  delay: Math.random() * 8,
}))

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: 'easeOut' },
  }),
}

export default function Hero() {
  const { days, months } = useDaysTogether()

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-linear-to-br from-rose-50 via-amber-50/30 to-rose-100 px-6">

      {/* Petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {petals.map((p, i) => <Petal key={i} style={p} />)}
      </div>

      {/* Decorative circle blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-rose-200/20 blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">

        <motion.p
          className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-6"
          variants={fadeUp} custom={0} initial="hidden" animate="show"
        >
          Sebuah ruang milik kami berdua
        </motion.p>

        <motion.h1
          className="font-serif text-7xl md:text-9xl font-light text-rose-950 leading-tight mb-3"
          variants={fadeUp} custom={1} initial="hidden" animate="show"
        >
          Rizky <em className="text-rose-400 italic">&</em> Uti
        </motion.h1>

        <motion.p
          className="font-serif text-lg font-light italic text-rose-400/80 mb-12"
          variants={fadeUp} custom={2} initial="hidden" animate="show"
        >
          Dari teras masjid, menuju hari-hari yang tidak terbatas
        </motion.p>

        {/* Date pill */}
        <motion.div
          className="flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-rose-200/50 rounded-full px-6 py-3 text-sm text-rose-700 mb-10"
          variants={fadeUp} custom={3} initial="hidden" animate="show"
        >
          Bertemu sejak&nbsp;
          <span className="text-rose-400 font-medium">8 Januari 2026</span>
          &nbsp;— dan terus bertahan
        </motion.div>

        {/* Counters */}
        <motion.div
          className="flex items-center gap-10"
          variants={fadeUp} custom={4} initial="hidden" animate="show"
        >
          <div className="text-center">
            <span className="font-serif text-5xl font-light text-rose-400 block">
              {days.toLocaleString('id-ID')}
            </span>
            <span className="text-xs tracking-widest uppercase text-rose-900/40 mt-1 block">
              Hari Bersama
            </span>
          </div>

          <div className="w-px h-10 bg-rose-200" />

          <div className="text-center">
            <span className="font-serif text-5xl font-light text-rose-400 block">
              {months}
            </span>
            <span className="text-xs tracking-widest uppercase text-rose-900/40 mt-1 block">
              Bulan
            </span>
          </div>

          <div className="w-px h-10 bg-rose-200" />

          <div className="text-center">
            <span className="font-serif text-5xl font-light text-rose-400 block">∞</span>
            <span className="text-xs tracking-widest uppercase text-rose-900/40 mt-1 block">
              Kenangan
            </span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-14"
          variants={fadeUp} custom={5} initial="hidden" animate="show"
        >
          <Link
            to="/about"
            className="text-xs tracking-[0.25em] uppercase text-rose-400 hover:text-rose-600 transition-colors duration-300 flex flex-col items-center gap-3"
          >
            <span>Telusuri cerita kami</span>
            <motion.span
              className="block w-px h-10 bg-linear-to-b from-rose-400 to-transparent"
              animate={{ scaleY: [1, 0.4, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}