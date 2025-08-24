import  { useState } from 'react'
import "./App.css";
import { motion, AnimatePresence } from 'framer-motion'
import Intro from './components/Intro.jsx'
import AtomSimulator from './components/AtomSimulator.jsx'
import ExciteElectron from './components/ExciteElectron.jsx'
import BuildAtom from './components/BuildAtom.jsx'
import Quiz from './components/Quiz.jsx'
import Glossary from './components/Glossary.jsx'

const tabs = [
  { id: 'intro', label: 'Intro' },
  { id: 'sim', label: 'Atom Simulator' },
  { id: 'excite', label: 'Excite Electron' },
  { id: 'build', label: 'Build an Atom' },
  { id: 'quiz', label: 'Quiz' },
  { id: 'glossary', label: 'Glossary' },
]

export default function App() {
  const [tab, setTab] = useState('intro')

  return (
    <div>
      <div className="nav">
        <div className="nav-wrap">
          <div className="brand">Atomic Structure (Class 10)</div>
          <div className="tabs">
            {tabs.map(t => (
              <button key={t.id} className={'tab ' + (tab === t.id ? 'active' : '')} onClick={() => setTab(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <AnimatePresence mode="wait">
          {tab === 'intro' && <motion.div key="intro" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><Intro goTo={(id) => setTab(id)} /></motion.div>}
          {tab === 'sim' && <motion.div key="sim" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><AtomSimulator /></motion.div>}
          {tab === 'excite' && <motion.div key="exc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><ExciteElectron /></motion.div>}
          {tab === 'build' && <motion.div key="build" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><BuildAtom /></motion.div>}
          {tab === 'quiz' && <motion.div key="quiz" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><Quiz /></motion.div>}
          {tab === 'glossary' && <motion.div key="glo" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><Glossary /></motion.div>}
        </AnimatePresence>
      </div>
    </div>
  )
}
