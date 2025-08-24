import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const CAP = [2, 8, 18, 32]

function fillShells(n) {
  const out = []
  for (let i = 0; i < CAP.length; i++) {
    const put = Math.min(n, CAP[i])
    if (put <= 0) break
    out.push(put); n -= put
  }
  return out
}

export default function AtomSimulator() {
  const [Z, setZ] = useState(8) // atomic number
  const [showLabels, setShowLabels] = useState(true)
  const shells = useMemo(() => fillShells(Z), [Z])

  return (
    <div className="grid grid-2">
      <div className="card">
        <h2>Atomic Structure Simulator</h2>
        <p style={{ marginTop: 8 }}>Enter an <b>atomic number (Z)</b> and watch shells auto-fill using the 2, 8, 18, 32 rule.</p>

        <div className="row" style={{ marginTop: 12 }}>
          <label>Atomic Number (1–30)</label>
          <input className="input" type="number" min="1" max="30" value={Z} onChange={e => setZ(Math.max(1, Math.min(30, Number(e.target.value) || 1)))} />
          <button className="btn ghost" onClick={() => setShowLabels(s => !s)}>{showLabels ? 'Hide' : 'Show'} labels</button>
        </div>

        <ul className="list">
          <li>Protons (p⁺) = {Z}</li>
          <li>Electrons (e⁻) = {Z} (neutral atom)</li>
          <li>Shell distribution: [{shells.join(', ')}]</li>
        </ul>

        <p className="note" style={{ marginTop: 8 }}>Hover electrons for tooltips. Inner shells fill first.</p>
      </div>

      <div className="card">
        <div
          className="canvas"
          style={{
            position: "relative",
            width: 480,
            height: 480,
            backgroundColor: "red",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              height: "100%",
            }}
          >

            <motion.div
              className="nucleus"
              style={{
                position: 'absolute',
                left: 'calc(50% - 40px)',
                top: 'calc(50% - 40px)', 
                transform: "translate(-50%, -50%)",
                zIndex: 2,
              }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
            >
              {showLabels ? "p⁺/n⁰" : ""}
            </motion.div>

            {shells.map((count, i) => {
              const size = 180 + i * 70
              const radius = size / 2
              return (
                <div
                  key={i}
                  className="shell"
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    width: size,
                    height: size,
                  }}
                >
                  {Array.from({ length: count }).map((_, j) => {
                    const angle = (j / count) * Math.PI * 2
                    const cx = `calc(50% + ${radius * Math.cos(angle)}px - 6px)`
                    const cy = `calc(50% + ${radius * Math.sin(angle)}px - 6px)`
                    const title = `Electron in shell ${i + 1}`
                    return (
                      <motion.div
                        key={j}
                        className="electron"
                        style={{ left: cx, top: cy }}
                        title={title}
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 8 + i * 2,
                          ease: "linear",
                        }}
                      />
                    )
                  })}

                  {showLabels && (
                    <div
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: -14,
                        transform: "translateX(-50%)",
                        fontSize: 12,
                        color: "#aab5e4",
                      }}
                    >
                      Shell {i + 1}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>



    </div>
  )
}
