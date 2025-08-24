import  { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ExciteElectron() {
  const [shell, setShell] = useState(1)
  const [excited, setExcited] = useState(false)

  const baseRadius = 90;
  const radii = [baseRadius, baseRadius + 70, baseRadius + 140, baseRadius + 210];
  const idx = Math.max(1, Math.min(4, shell)) - 1;
  const r = radii[idx];
  const rExcited = radii[Math.min(idx + 1, radii.length - 1)];

  return (
    <div className="grid grid-2">
      <div className="card">
        <h2>Excite & Relax an Electron</h2>
        <p style={{ marginTop: 8 }}>Provide energy to promote an electron to a higher shell (excitation). When it returns, a photon is emitted.</p>
        <ul className="list">
          <li>Excitation: energy absorbed</li>
          <li>Relaxation: energy emitted as light (photon)</li>
        </ul>

        <div className="row" style={{ marginTop: 12 }}>
          <label>Electron starts in shell:</label>
          <input className="input" type="number" min="1" max="4" value={shell} onChange={e => setShell(Math.max(1, Math.min(4, Number(e.target.value) || 1)))} />
        </div>

        <div className="row" style={{ marginTop: 12 }}>
          <button className="btn primary" onClick={() => setExcited(true)}>Excite (absorb)</button>
          <button className="btn success" onClick={() => setExcited(false)}>Relax (emit)</button>
        </div>

        <p className="note" style={{ marginTop: 8 }}>
          Observe the electron jump outward on excitation and drop inward on relaxation. A flash indicates photon emission.
        </p>
      </div>

      <div className="card">
        <div className="canvas">
          <div className="shell" style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 180, height: 180 }} />
          <div className="shell" style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 250, height: 250 }} />
          <div className="shell" style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 320, height: 320 }} />
          <div className="shell" style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 390, height: 390 }} />

          <motion.div
            className="nucleus"
            style={{
             position: 'absolute',
              left: 'calc(50% - 40px)',  
              top: 'calc(50% - 40px)', transform: 'translate(-50%,-50%)'
            }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2.1 }}
          >
            p⁺/n⁰
          </motion.div>

          <Electron r={excited ? rExcited : r} />
          <PhotonFlash show={!excited} />
        </div>
      </div>
    </div>
  )
}

function Electron({ r }) {
  
  return (
    <motion.div
      style={{ position: 'absolute', left: 210 - 6 + r, top: 210 - 6 }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
    >
      <div className="electron" />
    </motion.div>
  )
}

function PhotonFlash({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
          style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }}
        >
          <div style={{ width: 160, height: 160, borderRadius: 999, background: 'radial-gradient(circle, rgba(255,241,175,.9), rgba(255,241,175,.0))' }} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
