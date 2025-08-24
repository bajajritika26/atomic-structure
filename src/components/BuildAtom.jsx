import { useMemo, useState } from 'react'

export default function BuildAtom() {
  const [p, setP] = useState(6)
  const [n, setN] = useState(6)
  const [e, setE] = useState(6)

  const charge = e - p
  const isIon = charge !== 0
  const mass = p + n

  const symbol = useMemo(() => {
    const map = ['', 'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne']
    return map[p] || 'X'
  }, [p])

  const shells = useMemo(() => {
    const caps = [2, 8, 18, 32]
    let rem = e, out = []
    for (let cap of caps) {
      if (rem <= 0) break
      const put = Math.min(cap, rem)
      out.push(put); rem -= put
    }
    return out
  }, [e])

  return (
    <div className="grid grid-2">
      <div className="card">
        <h2>Build an Atom</h2>
        <p style={{ marginTop: 8 }}>Adjust protons, neutrons, and electrons to create elements, isotopes, and ions.</p>

        <div className="row" style={{ marginTop: 12 }}>
          <label>Protons (Z):</label>
          <input className="input" type="number" min="1" max="30" value={p} onChange={e => setP(Math.max(1, Math.min(30, Number(e.target.value) || 1)))} />
          <label>Neutrons:</label>
          <input className="input" type="number" min="0" max="40" value={n} onChange={e => setN(Math.max(0, Math.min(40, Number(e.target.value) || 0)))} />
          <label>Electrons:</label>
          <input className="input" type="number" min="0" max="40" value={e} onChange={e => setE(Math.max(0, Math.min(40, Number(e.target.value) || 0)))} />
        </div>

        <ul className="list">
          <li>Element symbol: <b>{symbol}</b></li>
          <li>Mass number A = p + n = <b>{mass}</b></li>
          <li>Charge = e − p = <b>{charge}</b> → {isIon ? (charge > 0 ? 'Anion (−)' : 'Cation (+)') : 'Neutral atom'}</li>
          <li>Shell filling: [{shells.join(', ')}]</li>
        </ul>

        <p className="note">Two atoms with same p but different n are <b>isotopes</b>. Different p ⇒ different element.</p>
      </div>

      <div className="card">
        <div className="canvas">
          <div className="nucleus" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontSize: 14 }}>
            Z={p}<br />n={n}
          </div>
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
                  return (
                    <div
                      key={j}
                      className="electron"
                      style={{ left: cx, top: cy }}
                      title={`e⁻ (shell ${i + 1})`}
                    />
                  )
                })}
              </div>
            )
          })}

        </div>
      </div>
    </div>
  )
}
