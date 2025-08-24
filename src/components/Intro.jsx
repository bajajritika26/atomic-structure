import { motion } from 'framer-motion'

export default function Intro({ goTo }) {
  return (
    <div className="grid grid-2">
      <div className="card">
        <h1>Atoms are the building blocks of matter</h1>
        <p style={{ marginTop: 12 }}>
          Every substance around you is made of atoms. Each atom has a tiny, dense <b>nucleus</b>
          containing <b>protons</b> (positive) and <b>neutrons</b> (neutral), with <b>electrons</b>
          (negative) moving in regions around the nucleus.
        </p>
        <p>
          For Class 10, we often use the simple and visual <b>Bohr model</b>, where electrons
          occupy <b>shells</b> with capacities like 2, 8, 18, 32...
        </p>
        <div className="row" style={{ marginTop: 12 }}>
          <span className="tag">Z (atomic number) = protons</span>
          <span className="tag">Mass number A = p + n</span>
          <span className="tag">Neutral atom: e⁻ = p⁺</span>
        </div>
        <div className="row" style={{ marginTop: 16 }}>
          <button className="btn primary" onClick={() => goTo('sim')}>Try the Simulator</button>
          <button className="btn ghost" onClick={() => goTo('quiz')}>Quick Quiz</button>
        </div>
        <p className="note" style={{ marginTop: 12 }}>Tip: Use the tabs above to explore each interactive section.</p>
      </div>

      <div className="card">
        <motion.div
          className="canvas"
          initial={{ opacity: 0, scale: .9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: .6 }}
        >
          <motion.div
            className="nucleus"
            style={{
              position: 'absolute',
              left: 'calc(50% - 40px)',
              top: 'calc(50% - 40px)', transform: 'translate(-50%,-50%)',
              zIndex: 2
            }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Nucleus
          </motion.div>

          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="shell"
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%,-50%)',
                width: 180 + i * 70,
                height: 180 + i * 70
              }}
            />
          ))}

  
          {[0, 1, 2, 3, 4, 5, 6, 7].map((j) => {
            const angle = (j / 8) * Math.PI * 2
            const r = 90
            const cx = 210 + r * Math.cos(angle) - 6
            const cy = 210 + r * Math.sin(angle) - 6
            return (
              <motion.div
                key={j}
                className="electron"
                style={{ left: cx, top: cy }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
              />
            )
          })}
        </motion.div>
        <p className="note" style={{ marginTop: 10, textAlign: 'center' }}>Animated Bohr-style atom (for visualization).</p>
      </div>
    </div>
  )
}
