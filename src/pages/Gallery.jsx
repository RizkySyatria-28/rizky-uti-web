import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { galleryData } from '../data/content'

const categories = ['Semua', 'KKN', 'Setelah KKN']

const PLACEHOLDER = (id) =>
  `https://placehold.co/400x400/fce7f3/be185d?text=Foto+${id}`

function PolaroidCard({ item, onClick, index }) {
  return (
    <motion.div
      className="cursor-pointer flex-shrink-0"
      style={{ rotate: item.rotate }}
      initial={{ opacity: 0, y: 40, rotate: item.rotate }}
      whileInView={{ opacity: 1, y: 0, rotate: item.rotate }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{
        scale: 1.06,
        rotate: 0,
        zIndex: 10,
        transition: { type: 'spring', stiffness: 300 },
      }}
      onClick={() => onClick(item)}
    >
      {/* Polaroid frame */}
      <div className="bg-white p-3 pb-10 shadow-md rounded-sm w-52 relative">
        {/* Foto */}
        <div className="w-full aspect-square overflow-hidden bg-rose-50">
          <img
            src={item.photo || PLACEHOLDER(item.id)}
            alt={item.caption}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Caption bawah polaroid */}
        <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 pt-1">
          <p className="text-center text-xs text-rose-900/50 font-light leading-snug line-clamp-2"
            style={{ fontFamily: 'cursive' }}
          >
            {item.caption}
          </p>
        </div>

        {/* Sticker tanggal pojok */}
        <div className="absolute -top-2 -right-2 bg-rose-400 text-white text-[9px] rounded-full px-2 py-0.5 tracking-wide shadow-sm">
          {item.date}
        </div>
      </div>
    </motion.div>
  )
}

function Lightbox({ item, onClose, onPrev, onNext }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Card lightbox */}
      <motion.div
        className="relative bg-white p-5 pb-14 shadow-2xl rounded-sm max-w-md w-full"
        style={{ rotate: item.rotate * 0.3 }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Foto besar */}
        <div className="w-full aspect-square overflow-hidden bg-rose-50 mb-1">
          <img
            src={item.photo || PLACEHOLDER(item.id)}
            alt={item.caption}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-4">
          <p
            className="text-center text-sm text-rose-900/60 leading-relaxed"
            style={{ fontFamily: 'cursive' }}
          >
            {item.caption}
          </p>
          <p className="text-center text-xs text-rose-300 mt-1 tracking-widest">
            {item.date}
          </p>
        </div>

        {/* Kategori badge */}
        <div className="absolute top-3 left-3 bg-rose-100 text-rose-500 text-[10px] px-2 py-0.5 rounded-full tracking-wide">
          {item.category}
        </div>
      </motion.div>

      {/* Tombol prev/next */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center text-lg transition-colors"
      >
        ‹
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center text-lg transition-colors"
      >
        ›
      </button>

      {/* Tombol close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors"
      >
        ✕
      </button>

      {/* Hint */}
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 text-xs tracking-widest">
        klik di luar untuk tutup
      </p>
    </motion.div>
  )
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [lightboxItem, setLightboxItem] = useState(null)

  const filtered = activeCategory === 'Semua'
    ? galleryData
    : galleryData.filter(item => item.category === activeCategory)

  const currentIndex = lightboxItem
    ? filtered.findIndex(item => item.id === lightboxItem.id)
    : -1

  const handlePrev = () => {
    const prev = (currentIndex - 1 + filtered.length) % filtered.length
    setLightboxItem(filtered[prev])
  }

  const handleNext = () => {
    const next = (currentIndex + 1) % filtered.length
    setLightboxItem(filtered[next])
  }

  return (
    <section className="min-h-screen bg-white pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.p
          className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Momen Bersama
        </motion.p>

        <motion.h2
          className="font-serif text-5xl md:text-6xl font-light text-rose-950 leading-tight mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Setiap foto,<br />
          <em className="italic text-rose-400">sebuah rasa</em>
        </motion.h2>

        <motion.p
          className="text-sm text-rose-900/40 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Klik foto untuk membaca ceritanya ✦
        </motion.p>

        {/* Filter */}
        <motion.div
          className="flex gap-3 mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs tracking-widest uppercase px-5 py-2 rounded-full border transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-rose-400 border-rose-400 text-white'
                  : 'bg-white border-rose-200 text-rose-400 hover:border-rose-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Polaroid wall */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="flex flex-wrap gap-8 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((item, index) => (
              <PolaroidCard
                key={item.id}
                item={item}
                index={index}
                onClick={setLightboxItem}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <p className="text-center text-rose-300 font-serif italic text-xl mt-20">
            Belum ada foto di kategori ini…
          </p>
        )}

        {/* Quote bawah */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-serif text-2xl font-light italic text-rose-300">
            "Kenangan terbaik bukan yang paling dramatis —
            <br />melainkan yang terasa hangat setiap kali diingat."
          </p>
        </motion.div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <Lightbox
            item={lightboxItem}
            onClose={() => setLightboxItem(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </section>
  )
}