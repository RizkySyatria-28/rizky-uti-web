import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './pages/Hero'
import About from './pages/About'
import Timeline from './pages/Timeline'
import Gallery from './pages/Gallery'
import Letter from './pages/Letter'
import Countdown from './pages/Countdown'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/"         element={<Hero />} />
          <Route path="/about"    element={<About />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/gallery"  element={<Gallery />} />
          <Route path="/letter"   element={<Letter />} />
          <Route path="/countdown" element={<Countdown />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}