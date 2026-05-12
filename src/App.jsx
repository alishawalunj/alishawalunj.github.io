import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Projects from './components/Projects'
import Education from './components/Education'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Resume from './components/Resume'
import Contact from './components/Contact'
import { ThemeContext } from './context/ThemeContext'
import './App.css'

const App = () => {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      <div className="app-root">
        <Navbar />
        <section id="home"><Home /></section>
        <section id="projects"><Projects /></section>
        <section id="education"><Education /></section>
        <section id="experience"><Experience /></section>
        <section id="skills"><Skills /></section>
        <section id="resume"><Resume /></section>
        <section id="contact"><Contact /></section>
      </div>
    </ThemeContext.Provider>
  )
}

export default App
