import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  collection, addDoc, getDocs,
  deleteDoc, doc, updateDoc,
  orderBy, query, serverTimestamp
} from 'firebase/firestore'
import { db } from '../firebase'
import { diaryConfig, coupleData } from '../data/content'

// ── Komponen: Cover Buku ─────────────────────────────────────────────────────
function BookCover({ owner, label, onClick }) {
  const c = diaryConfig[owner].color
  return (
    <motion.div
      className="cursor-pointer select-none"
      whileHover={{ y: -8, rotate: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300 }}
      onClick={onClick}
    >
      <div className="flex shadow-2xl rounded-r-lg overflow-hidden" style={{ width: 200, height: 280 }}>
        {/* Spine */}
        <div className={`${c.spine} w-8 flex items-center justify-center`}>
          <p className={`text-xs ${c.accent} tracking-widest`}
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            SECRET DIARY
          </p>
        </div>
        {/* Cover */}
        <div className={`flex-1 bg-linear-to-br ${c.cover} flex flex-col items-center justify-between p-5`}>
          <div className={`text-xs ${c.accent} tracking-[0.25em] uppercase mt-1`}>
            private
          </div>
          <div className="text-center">
            <p className="text-white/20 text-5xl mb-2">🔒</p>
            <p className="font-serif text-xl font-light italic text-white leading-tight">
              {label}
            </p>
            <div className="w-8 h-px bg-white/20 mx-auto mt-3" />
          </div>
          <p className={`text-xs ${c.accent} tracking-widest`}>
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// ── Komponen: Lock Screen ────────────────────────────────────────────────────
function LockScreen({ owner, onUnlock, onBack }) {
  const [input, setInput] = useState('')
  const [shake, setShake] = useState(false)
  const [show, setShow] = useState(false)
  const c = diaryConfig[owner].color
  const label = owner === 'rizky' ? coupleData.names.male : coupleData.names.femaleNickname

  const handleSubmit = () => {
    if (input === diaryConfig[owner].password) {
      onUnlock()
    } else {
      setShake(true)
      setInput('')
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <motion.div
        className={`bg-linear-to-br ${c.cover} rounded-2xl p-8 w-full max-w-xs shadow-2xl`}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <p className="text-center text-white/40 text-3xl mb-2">🔒</p>
        <p className="font-serif text-xl italic text-white text-center mb-1">
          Diary {label}
        </p>
        <p className={`text-xs ${c.accent} text-center tracking-widest mb-8`}>
          masukkan password untuk membuka
        </p>

        <motion.div animate={shake ? { x: [-8, 8, -6, 6, 0] } : {}} transition={{ duration: 0.4 }}>
          <div className="relative mb-4">
            <input
              type={show ? 'text' : 'password'}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="Password..."
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/40 pr-10"
              autoFocus
            />
            <button
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 text-xs"
            >
              {show ? '🙈' : '👁️'}
            </button>
          </div>
        </motion.div>

        <button
          onClick={handleSubmit}
          className={`w-full ${c.button} text-white text-sm py-3 rounded-xl tracking-widest uppercase transition-colors mb-3`}
        >
          Buka
        </button>
        <button
          onClick={onBack}
          className="w-full text-white/30 hover:text-white/60 text-xs tracking-widest uppercase transition-colors py-2"
        >
          Kembali
        </button>
      </motion.div>
    </motion.div>
  )
}

// ── Komponen: Form Tambah / Edit Entry ──────────────────────────────────────
function EntryForm({ owner, onSave, onCancel, initial }) {
  const c = diaryConfig[owner].color
  const [title, setTitle]     = useState(initial?.title || '')
  const [content, setContent] = useState(initial?.content || '')
  const [mood, setMood]       = useState(initial?.mood || '🌸')
  const moods = ['🌸', '😊', '🥰', '😢', '😤', '🌙', '✨', '💭']

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return
    onSave({ title, content, mood })
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onCancel}
    >
      <motion.div
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header form */}
        <div className={`bg-linear-to-r ${c.cover} px-6 py-4`}>
          <p className="font-serif italic text-white text-lg">
            {initial ? 'Edit catatan' : 'Catatan baru'}
          </p>
        </div>

        <div className="p-6 space-y-4">
          {/* Mood picker */}
          <div>
            <p className="text-xs text-rose-900/40 tracking-widest uppercase mb-2">Mood</p>
            <div className="flex gap-2 flex-wrap">
              {moods.map(m => (
                <button
                  key={m}
                  onClick={() => setMood(m)}
                  className={`text-xl p-1.5 rounded-lg transition-all ${mood === m ? 'bg-rose-100 scale-110' : 'hover:bg-rose-50'}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Judul */}
          <div>
            <p className="text-xs text-rose-900/40 tracking-widest uppercase mb-2">Judul</p>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Judul catatan..."
              className="w-full border border-rose-100 rounded-xl px-4 py-2.5 text-sm text-rose-950 focus:outline-none focus:border-rose-300 placeholder-rose-200"
            />
          </div>

          {/* Isi */}
          <div>
            <p className="text-xs text-rose-900/40 tracking-widest uppercase mb-2">Isi</p>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Tulis isi catatan di sini..."
              rows={5}
              className="w-full border border-rose-100 rounded-xl px-4 py-2.5 text-sm text-rose-950 focus:outline-none focus:border-rose-300 placeholder-rose-200 resize-none leading-relaxed"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={onCancel}
              className="flex-1 border border-rose-200 text-rose-400 text-sm py-2.5 rounded-xl hover:bg-rose-50 transition-colors"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              disabled={!title.trim() || !content.trim()}
              className={`flex-1 ${c.button} text-white text-sm py-2.5 rounded-xl transition-colors disabled:opacity-40`}
            >
              Simpan
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Komponen: Entry Card ─────────────────────────────────────────────────────
function EntryCard({ entry, owner, onEdit, onDelete }) {
  const c = diaryConfig[owner].color
  const [expanded, setExpanded] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const date = entry.createdAt?.toDate
    ? entry.createdAt.toDate().toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric'
      })
    : 'Baru saja'

  return (
    <motion.div
      layout
      className={`${c.entry} border rounded-2xl p-5 relative`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      {/* Header entry */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{entry.mood}</span>
          <div>
            <p className={`font-serif text-base font-semibold ${c.entryText}`}>
              {entry.title}
            </p>
            <p className="text-xs text-rose-900/30">{date}</p>
          </div>
        </div>
        {/* Actions */}
        <div className="flex gap-1 shrink-0">
          <button
            onClick={() => onEdit(entry)}
            className="w-7 h-7 rounded-full bg-white/80 hover:bg-white text-rose-400 text-xs flex items-center justify-center transition-colors shadow-sm"
          >
            ✏️
          </button>
          <button
            onClick={() => setConfirmDelete(true)}
            className="w-7 h-7 rounded-full bg-white/80 hover:bg-white text-rose-400 text-xs flex items-center justify-center transition-colors shadow-sm"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Content */}
      <p className={`text-sm ${c.entryText} opacity-70 leading-relaxed`}>
        {expanded ? entry.content : entry.content.slice(0, 120) + (entry.content.length > 120 ? '…' : '')}
      </p>
      {entry.content.length > 120 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-rose-400 mt-2 hover:underline"
        >
          {expanded ? 'Sembunyikan' : 'Baca selengkapnya'}
        </button>
      )}

      {/* Confirm delete */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            className="absolute inset-0 bg-white/95 rounded-2xl flex flex-col items-center justify-center gap-3 p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <p className="text-sm text-rose-950 font-serif italic text-center">
              Yakin ingin menghapus catatan ini?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-4 py-2 border border-rose-200 text-rose-400 text-xs rounded-xl hover:bg-rose-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => onDelete(entry.id)}
                className="px-4 py-2 bg-rose-500 text-white text-xs rounded-xl hover:bg-rose-600 transition-colors"
              >
                Hapus
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Komponen: Diary Book (isi setelah unlock) ────────────────────────────────
function DiaryBook({ owner, onLock }) {
  const c = diaryConfig[owner].color
  const label = owner === 'rizky' ? coupleData.names.male : coupleData.names.femaleNickname
  const [entries, setEntries]     = useState([])
  const [loading, setLoading]     = useState(true)
  const [showForm, setShowForm]   = useState(false)
  const [editEntry, setEditEntry] = useState(null)

  const colRef = collection(db, `diary_${owner}`)

  const fetchEntries = async () => {
    setLoading(true)
    const q = query(colRef, orderBy('createdAt', 'desc'))
    const snap = await getDocs(q)
    setEntries(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    setLoading(false)
  }

  useEffect(() => { fetchEntries() }, [])

  const handleAdd = async (data) => {
    await addDoc(colRef, { ...data, createdAt: serverTimestamp() })
    setShowForm(false)
    fetchEntries()
  }

  const handleEdit = async (data) => {
    await updateDoc(doc(db, `diary_${owner}`, editEntry.id), data)
    setEditEntry(null)
    fetchEntries()
  }

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, `diary_${owner}`, id))
    fetchEntries()
  }

  return (
    <motion.div
      className="min-h-screen pt-32 pb-24 px-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
    >
      <div className="max-w-lg mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-1">Secret Diary</p>
            <h2 className="font-serif text-3xl font-light text-rose-950">
              <em className="italic text-rose-400">Diary {label}</em>
            </h2>
          </div>
          <button
            onClick={onLock}
            className="text-xs tracking-widest text-rose-300 hover:text-rose-500 uppercase border border-rose-100 px-3 py-1.5 rounded-full transition-colors"
          >
            🔒 Kunci
          </button>
        </div>

        {/* Tombol tambah */}
        <motion.button
          onClick={() => setShowForm(true)}
          className={`w-full ${c.button} text-white text-sm py-4 rounded-2xl tracking-wide mb-8 flex items-center justify-center gap-2 shadow-sm`}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-lg">✍️</span>
          Tulis catatan baru
        </motion.button>

        {/* Entries */}
        {loading ? (
          <div className="text-center py-20">
            <motion.p
              className="font-serif italic text-rose-300 text-lg"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Membuka halaman…
            </motion.p>
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">📖</p>
            <p className="font-serif italic text-rose-300 text-lg">
              Belum ada catatan di sini…
            </p>
            <p className="text-xs text-rose-900/25 mt-2">
              mulai tulis ceritamu
            </p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="space-y-4">
              {entries.map(entry => (
                <EntryCard
                  key={entry.id}
                  entry={entry}
                  owner={owner}
                  onEdit={(e) => setEditEntry(e)}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>

      {/* Form tambah */}
      <AnimatePresence>
        {showForm && (
          <EntryForm
            owner={owner}
            onSave={handleAdd}
            onCancel={() => setShowForm(false)}
          />
        )}
      </AnimatePresence>

      {/* Form edit */}
      <AnimatePresence>
        {editEntry && (
          <EntryForm
            owner={owner}
            initial={editEntry}
            onSave={handleEdit}
            onCancel={() => setEditEntry(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function Letter() {
  const [selected, setSelected]   = useState(null) // 'rizky' | 'uti'
  const [unlocked, setUnlocked]   = useState(null) // 'rizky' | 'uti'

  const handleSelect = (owner) => setSelected(owner)
  const handleUnlock = () => { setUnlocked(selected); setSelected(null) }
  const handleLock   = () => setUnlocked(null)
  const handleBack   = () => setSelected(null)

  if (unlocked) {
    return <DiaryBook owner={unlocked} onLock={handleLock} />
  }

  return (
    <section className="min-h-screen bg-rose-50/30 pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.p
          className="text-rose-400 text-xs tracking-[0.3em] uppercase mb-3"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Secret Diary
        </motion.p>
        <motion.h2
          className="font-serif text-5xl md:text-6xl font-light text-rose-950 leading-tight mb-4"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Buku harian<br />
          <em className="italic text-rose-400">yang tersimpan</em>
        </motion.h2>
        <motion.p
          className="text-sm text-rose-900/40 mb-20"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Pilih buku, masukkan password, lalu mulai menulis. ✦
        </motion.p>

        {/* Dua buku */}
        <div className="flex flex-wrap gap-16 justify-center items-end">
          <motion.div
            className="flex flex-col items-center gap-5"
            initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <BookCover
              owner="rizky"
              label={`Diary\n${coupleData.names.male}`}
              onClick={() => handleSelect('rizky')}
            />
            <p className="text-xs text-rose-900/30 tracking-widest uppercase">
              {coupleData.names.male}
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-5"
            initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            <BookCover
              owner="uti"
              label={`Diary\n${coupleData.names.femaleNickname}`}
              onClick={() => handleSelect('uti')}
            />
            <p className="text-xs text-rose-900/30 tracking-widest uppercase">
              {coupleData.names.femaleNickname}
            </p>
          </motion.div>
        </div>

        {/* Quote */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
        >
          <p className="font-serif text-2xl font-light italic text-rose-300">
            "Ada hal-hal yang hanya pantas ditulis, bukan diucapkan."
          </p>
        </motion.div>
      </div>

      {/* Lock screen */}
      <AnimatePresence>
        {selected && (
          <LockScreen
            owner={selected}
            onUnlock={handleUnlock}
            onBack={handleBack}
          />
        )}
      </AnimatePresence>
    </section>
  )
}