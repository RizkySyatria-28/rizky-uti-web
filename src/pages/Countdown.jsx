import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { milestoneData, coupleData } from '../data/content'

// ── Helper: hitung countdown ─────────────────────────────────────────────────
function getCountdown(targetDate) {
  const now  = new Date()
  const diff = targetDate - now

  if (diff <= 0) {
    const passed = Math.abs(Math.floor(diff / (1000 * 60 * 60 * 24)))
    return { past: true, days: passed }
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return { past: false, days, hours, minutes, seconds }
}

function pad(n) { return String(n).padStart(2, '0') }

// ── Helper: progress total perjalanan ────────────────────────────────────────
function getJourneyProgress() {
  const start = coupleData.startDate
  const end   = milestoneData[milestoneData.length - 1].date
  const now   = new Date()
  const total = end - start
  const elapsed = Math.min(now - start, total)
  return Math.max(0, Math.min(100, (elapsed / total) * 100))
}

// ── Komponen: Countdown Ticker ───────────────────────────────────────────────
function Ticker({ value, label }) {
  return (
    <div className="text-center">
      <motion.span
        key={value}
        className="font-serif text-3xl md:text-4xl font-light text-rose-950 block leading-none"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {pad(value)}
      </motion.span>
      <span className="text-[10px] tracking-widest uppercase text-rose-900/30 mt-1 block">
        {label}
      </span>
    </div>
  )
}

// ── Komponen: Milestone Card ─────────────────────────────────────────────────
function MilestoneCard({ item, index, isActive, onClick }) {
  const [cd, setCd] = useState(getCountdown(item.date))

  useEffect(() => {
    if (item.type !== 'upcoming') return
    const interval = setInterval(() => setCd(getCountdown(item.date)), 1000)
    return () => clearInterval(interval)
  }, [item])

  const isPast     = cd.past
  const isSelected = isActive

  return (
    <motion.div
      className={`cursor-pointer rounded-2xl border transition-all duration-300 overflow-hidden
        ${isSelected
          ? 'border-rose-300 shadow-lg shadow-rose-100'
          : 'border-rose-100 hover:border-rose-200'
        }
        ${isPast ? 'bg-white' : 'bg-rose-50/60'}
      `}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={() => onClick(item)}
      layout
    >
      {/* Card header */}
      <div className="flex items-center gap-4 p-5">
        {/* Icon + status */}
        <div className="relative flex-shrink-0">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl
            ${isPast ? 'bg-rose-100' : 'bg-white border border-rose-200'}`}
          >
            {item.icon}
          </div>
          {isPast && (
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-rose-400 rounded-full flex items-center justify-center">
              <span className="text-white text-[8px]">✓</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="font-serif text-base font-semibold text-rose-950 truncate">
            {item.label}
          </p>
          <p className="text-xs text-rose-900/40 mt-0.5">
            {item.date.toLocaleDateString('id-ID', {
              day: 'numeric', month: 'long', year: 'numeric'
            })}
          </p>
        </div>

        {/* Badge */}
        <div className={`flex-shrink-0 text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full
          ${isPast
            ? 'bg-rose-100 text-rose-500'
            : 'bg-white border border-rose-200 text-rose-400'
          }`}
        >
          {isPast ? `${cd.days} hari lalu` : 'Akan datang'}
        </div>
      </div>

      {/* Expanded: desc + countdown */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            className="px-5 pb-5"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <div className="pt-1 pb-4 border-t border-rose-100 mt-1">
              <p className="text-sm text-rose-900/55 leading-relaxed mt-3 mb-5 italic font-serif">
                "{item.desc}"
              </p>

              {/* Countdown ticker — hanya untuk upcoming */}
              {!isPast ? (
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-rose-400 mb-3 text-center">
                    Menghitung mundur
                  </p>
                  <div className="flex items-start justify-center gap-4">
                    <Ticker value={cd.days}    label="Hari" />
                    <span className="font-serif text-2xl text-rose-200 mt-1">:</span>
                    <Ticker value={cd.hours}   label="Jam" />
                    <span className="font-serif text-2xl text-rose-200 mt-1">:</span>
                    <Ticker value={cd.minutes} label="Menit" />
                    <span className="font-serif text-2xl text-rose-200 mt-1">:</span>
                    <Ticker value={cd.seconds} label="Detik" />
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-rose-400 mb-2">
                    Sudah terlewati
                  </p>
                  <p className="font-serif text-3xl font-light text-rose-300">
                    {cd.days} hari yang lalu
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function Countdown() {
  const [activeId, setActiveId] = useState(null)
  const [progress, setProgress] = useState(0)
  const [daysTogether, setDaysTogether] = useState(0)

  useEffect(() => {
    setProgress(getJourneyProgress())
    const diff = new Date() - coupleData.startDate
    setDaysTogether(Math.floor(diff / (1000 * 60 * 60 * 24)))
  }, [])

  const handleClick = (item) => {
    setActiveId(prev => prev === item.id ? null : item.id)
  }

  const pastCount     = milestoneData.filter(m => getCountdown(m.date).past).length
  const upcomingCount = milestoneData.filter(m => !getCountdown(m.date).past).length

  return (
    <section className="min-h-screen bg-white pt-32 pb-24 px-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <motion.p
          className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-3"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Perjalanan Kami
        </motion.p>
        <motion.h2
          className="font-serif text-5xl md:text-6xl font-light text-rose-950 leading-tight mb-4"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Milestone<br />
          <em className="italic text-rose-400">road</em>
        </motion.h2>
        <motion.p
          className="text-sm text-rose-900/40 mb-14"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Klik milestone untuk melihat detailnya ✦
        </motion.p>

        {/* Journey progress bar */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <div className="flex justify-between items-end mb-3">
            <div>
              <p className="text-[10px] tracking-widest uppercase text-rose-400 mb-1">
                Progress perjalanan
              </p>
              <p className="font-serif text-2xl font-light text-rose-950">
                {daysTogether.toLocaleString('id-ID')}
                <span className="text-base text-rose-900/30 ml-1">hari bersama</span>
              </p>
            </div>
            <p className="font-serif text-xl text-rose-300">
              {Math.round(progress)}%
            </p>
          </div>

          {/* Track */}
          <div className="relative h-3 bg-rose-50 rounded-full border border-rose-100 overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-rose-300 to-rose-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
            />

            {/* Milestone markers di progress bar */}
            {milestoneData.map((item) => {
              const start = coupleData.startDate
              const end   = milestoneData[milestoneData.length - 1].date
              const pos   = ((item.date - start) / (end - start)) * 100
              const isPast = getCountdown(item.date).past
              return (
                <div
                  key={item.id}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                  style={{ left: `${Math.min(Math.max(pos, 2), 98)}%` }}
                >
                  <div className={`w-3 h-3 rounded-full border-2 border-white
                    ${isPast ? 'bg-rose-500' : 'bg-white border-rose-300'}`}
                  />
                </div>
              )
            })}
          </div>

          {/* Label start & end */}
          <div className="flex justify-between mt-2">
            <p className="text-[10px] text-rose-900/30">8 Jan 2026</p>
            <p className="text-[10px] text-rose-900/30">Sep 2026</p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 gap-4 mb-12"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5 text-center">
            <p className="font-serif text-4xl font-light text-rose-400">{pastCount}</p>
            <p className="text-xs tracking-widest uppercase text-rose-900/40 mt-1">
              Momen terlewati
            </p>
          </div>
          <div className="bg-white border border-rose-100 rounded-2xl p-5 text-center">
            <p className="font-serif text-4xl font-light text-rose-300">{upcomingCount}</p>
            <p className="text-xs tracking-widest uppercase text-rose-900/40 mt-1">
              Akan datang
            </p>
          </div>
        </motion.div>

        {/* Milestone list */}
        <div className="relative">

          {/* Road line */}
          <div className="absolute left-[22px] top-6 bottom-6 w-px bg-gradient-to-b from-rose-200 via-rose-100 to-transparent -z-0" />

          <div className="space-y-4">
            {milestoneData.map((item, index) => (
              <div key={item.id} className="flex gap-4 items-start">

                {/* Road dot */}
                <div className="flex-shrink-0 mt-5 z-10">
                  <motion.div
                    className={`w-[10px] h-[10px] rounded-full border-2 border-white shadow-sm
                      ${getCountdown(item.date).past ? 'bg-rose-400' : 'bg-rose-200'}`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: 'spring' }}
                  />
                </div>

                {/* Card */}
                <div className="flex-1">
                  <MilestoneCard
                    item={item}
                    index={index}
                    isActive={activeId === item.id}
                    onClick={handleClick}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Penutup */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
        >
          <div className="w-px h-12 bg-linear-to-b from-rose-200 to-transparent mx-auto mb-8" />
          <p className="font-serif text-2xl font-light italic text-rose-300">
            "Perjalanan ini belum selesai —<br />
            dan kita terus melangkah bersama."
          </p>
        </motion.div>

      </div>
    </section>
  )
}