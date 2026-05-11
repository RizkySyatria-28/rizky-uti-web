import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { diaryData } from '../data/content'

async function hashInput(input) {
  const encoded = new TextEncoder().encode(input)
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoded)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

function DiaryBook({ diary, onUnlock }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-4 cursor-pointer group"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -6 }}
      onClick={() => onUnlock(diary)}
    >
      {/* Buku */}
      <div className="relative flex shadow-2xl" style={{ height: 280 }}>

        {/* Spine */}
        <div className={`${diary.color.spine} w-8 rounded-l-sm flex items-center justify-center`}>
          <p
            className="text-white/40 text-xs tracking-widest"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            {diary.owner}
          </p>
        </div>

        {/* Cover */}
        <div className={`bg-gradient-to-br ${diary.color.cover} w-48 rounded-r-sm p-5 flex flex-col justify-between relative overflow-hidden`}>

          {/* Texture lines */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 h-px bg-white/5"
              style={{ top: `${(i + 1) * 12}%` }}
            />
          ))}

          {/* Tag bookmark */}
          <div className={`absolute top-0 right-6 ${diary.color.tag} w-6 h-10 rounded-b-sm flex items-end justify-center pb-1`}>
            <span className="text-white/60 text-xs">✦</span>
          </div>

          {/* Top */}
          <div>
            <p className={`${diary.color.accent} text-xs tracking-[0.2em] uppercase mb-2`}>
              Private
            </p>
            <h3 className="font-serif text-white text-2xl font-light italic">
              {diary.coverLabel}
            </h3>
          </div>

          {/* Bottom */}
          <div>
            <p className="font-serif text-white/30 text-xs italic mb-1">
              {diary.owner}
            </p>
            <p className="text-white/20 text-xs">{diary.coverYear}</p>
          </div>

          {/* Lock icon */}
          <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <span className="text-white/60 text-sm">🔒</span>
          </div>

        </div>
      </div>

      <p className="text-xs tracking-widest text-rose-900/30 uppercase">
        Klik untuk buka
      </p>
    </motion.div>
  )
}

function PasswordModal({ diary, onSuccess, onClose }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    const hash = await hashInput(input)
    if (hash === diary.passwordHash) {
      onSuccess(diary)
    } else {
      setError(true)
      setInput('')
      setTimeout(() => setError(false), 800)
    }
    setLoading(false)
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={error ? { x: [-8, 8, -8, 8, 0], scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <span className="text-4xl block mb-3">🔒</span>
          <h3 className="font-serif text-xl text-rose-950 mb-1">
            Diary milik {diary.owner}
          </h3>
          <p className="text-xs text-rose-900/40 tracking-wide">
            Masukkan password untuk membuka
          </p>
        </div>

        <input
          type="password"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder="Password..."
          autoFocus
          className={`w-full border rounded-xl px-4 py-3 text-sm text-center tracking-widest outline-none transition-colors mb-4 ${
            error
              ? 'border-red-300 bg-red-50 placeholder-red-300'
              : 'border-rose-200 focus:border-rose-400'
          }`}
        />

        {error && (
          <p className="text-xs text-red-400 text-center mb-3">
            Password salah. Coba lagi.
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={!input || loading}
          className="w-full bg-rose-400 hover:bg-rose-500 disabled:bg-rose-200 text-white text-sm tracking-widest uppercase rounded-xl py-3 transition-colors"
        >
          {loading ? '...' : 'Buka Diary'}
        </button>

        <button
          onClick={onClose}
          className="w-full mt-3 text-xs text-rose-900/30 hover:text-rose-400 tracking-widest uppercase transition-colors"
        >
          Batal
        </button>
      </motion.div>
    </motion.div>
  )
}

function DiaryPage({ diary, onClose }) {
  const [currentEntry, setCurrentEntry] = useState(0)
  const entry = diary.entries[currentEntry]

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-rose-950/90 backdrop-blur-sm flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-full max-w-2xl"
        initial={{ rotateY: 90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        exit={{ rotateY: -90, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        style={{ perspective: 1000 }}
      >
        {/* Buku terbuka */}
        <div className="bg-amber-50 rounded-r-2xl shadow-2xl overflow-hidden flex" style={{ minHeight: 480 }}>

          {/* Halaman kiri — daftar entri */}
          <div className="w-48 bg-amber-100/60 border-r border-amber-200 p-5 flex flex-col gap-1 flex-shrink-0">
            <p className="text-xs tracking-widest text-amber-700/50 uppercase mb-4">
              Entri
            </p>
            {diary.entries.map((e, i) => (
              <button
                key={i}
                onClick={() => setCurrentEntry(i)}
                className={`text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                  currentEntry === i
                    ? 'bg-rose-400 text-white'
                    : 'text-amber-800/60 hover:bg-amber-200/60'
                }`}
              >
                <span className="block font-medium leading-snug">{e.title}</span>
                <span className="block text-[10px] mt-0.5 opacity-60">{e.date}</span>
              </button>
            ))}
          </div>

          {/* Halaman kanan — isi entri */}
          <div className="flex-1 p-8 relative overflow-hidden">

            {/* Ruled lines */}
            {[...Array(14)].map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 h-px bg-blue-100/60"
                style={{ top: `${60 + i * 32}px` }}
              />
            ))}

            {/* Margin line merah */}
            <div className="absolute top-0 bottom-0 left-16 w-px bg-red-200/50" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentEntry}
                className="relative z-10"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Header entri */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-xs text-rose-400/70 tracking-widest mb-1">
                      {entry.date}
                    </p>
                    <h4
                      className="font-serif text-xl text-rose-950"
                      style={{ fontStyle: 'italic' }}
                    >
                      {entry.title}
                    </h4>
                  </div>
                  <span className="text-2xl">{entry.mood}</span>
                </div>

                {/* Isi */}
                <p
                  className="text-sm text-rose-950/70 leading-8"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {entry.content}
                </p>

                {/* Nomor halaman */}
                <p className="absolute bottom-0 right-0 text-xs text-amber-400/50">
                  {currentEntry + 1} / {diary.entries.length}
                </p>

              </motion.div>
            </AnimatePresence>

          </div>
        </div>

        {/* Tombol tutup */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center text-sm transition-colors shadow-lg"
        >
          ✕
        </button>

        {/* Label owner */}
        <div className={`absolute -left-3 top-8 ${diary.color.tag} text-white text-xs px-3 py-1 rounded-r-full shadow-md`}>
          {diary.owner}
        </div>

      </motion.div>
    </motion.div>
  )
}

export default function Letter() {
  const [modalDiary, setModalDiary] = useState(null)
  const [openDiary, setOpenDiary] = useState(null)

  const handleUnlockSuccess = (diary) => {
    setModalDiary(null)
    setOpenDiary(diary)
  }

  return (
    <section className="min-h-screen bg-rose-50/40 pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.p
          className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Diary Kami
        </motion.p>

        <motion.h2
          className="font-serif text-5xl md:text-6xl font-light text-rose-950 leading-tight mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Tulisan yang<br />
          <em className="italic text-rose-400">hanya untuk diri sendiri</em>
        </motion.h2>

        <motion.p
          className="text-sm text-rose-900/40 mb-20 max-w-md"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Masing-masing diary terkunci dengan password pribadi.
          Hanya pemiliknya yang tahu isinya. ✦
        </motion.p>

        {/* Dua buku */}
        <div className="flex flex-wrap gap-16 justify-center">
          {diaryData.map(diary => (
            <DiaryBook
              key={diary.id}
              diary={diary}
              onUnlock={setModalDiary}
            />
          ))}
        </div>

        {/* Quote */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-serif text-2xl font-light italic text-rose-300">
            "Ada hal-hal yang lebih mudah ditulis<br />daripada diucapkan."
          </p>
        </motion.div>

      </div>

      {/* Password modal */}
      <AnimatePresence>
        {modalDiary && (
          <PasswordModal
            diary={modalDiary}
            onSuccess={handleUnlockSuccess}
            onClose={() => setModalDiary(null)}
          />
        )}
      </AnimatePresence>

      {/* Diary terbuka */}
      <AnimatePresence>
        {openDiary && (
          <DiaryPage
            diary={openDiary}
            onClose={() => setOpenDiary(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}