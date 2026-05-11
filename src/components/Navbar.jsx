import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const links = [
  { to: '/',          label: 'Beranda' },
  { to: '/about',     label: 'Tentang Kami' },
  { to: '/timeline',  label: 'Cerita' },
  { to: '/gallery',   label: 'Galeri' },
  { to: '/letter',    label: 'Surat' },
  { to: '/countdown', label: 'Tanggal Penting' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="font-serif text-xl text-rose-400 tracking-widest font-semibold">
          R & U
        </NavLink>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7">
          {links.map(link => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `text-xs tracking-widest uppercase transition-colors duration-200 ${
                    isActive ? 'text-rose-400' : 'text-rose-900/50 hover:text-rose-400'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-rose-400 focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-px bg-rose-400 mb-1 transition-all" />
          <span className="block w-5 h-px bg-rose-400 mb-1 transition-all" />
          <span className="block w-5 h-px bg-rose-400 transition-all" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-rose-100 px-6 py-4 flex flex-col gap-4">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-sm tracking-widest uppercase ${
                  isActive ? 'text-rose-400' : 'text-rose-900/50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  )
}