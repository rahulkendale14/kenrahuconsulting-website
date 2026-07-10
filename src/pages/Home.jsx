import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Tools from '../components/Tools'
import Skills from '../components/Skills'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Tools />
      <Skills />
      <Contact />
      <Footer />
    </div>
  )
}
