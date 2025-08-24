import { useState } from 'react'

const QUESTIONS = [
  { q: 'Which particle is negatively charged?', a: 'Electron', options: ['Proton', 'Neutron', 'Electron'] },
  { q: 'How many electrons can the first shell hold?', a: '2', options: ['2', '8', '18'] },
  { q: 'Atomic number equals number of…', a: 'Protons', options: ['Neutrons', 'Protons', 'Electrons in last shell'] },
  { q: 'When an electron relaxes to a lower shell, it…', a: 'Emits a photon', options: ['Stops moving', 'Emits a photon', 'Absorbs energy'] },
]

export default function Quiz() {
  const [i, setI] = useState(0)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const curr = QUESTIONS[i]

  function pick(opt) {
    if (opt === curr.a) setScore(s=>s+1)
    const next = i+1
    if (next >= QUESTIONS.length) setDone(true)
    else setI(next)
  }

  function reset() {
    setI(0); setScore(0); setDone(false)
  }

  return (
    <div className="card">
      <h2>Quick Quiz</h2>
      {!done ? (
        <div style={{marginTop:12}}>
          <p><b>Q{i+1}.</b> {curr.q}</p>
          {curr.options.map(opt => (
            <button key={opt} className="quiz-option" onClick={()=>pick(opt)}>{opt}</button>
          ))}
          <p className="note">Choose the best answer.</p>
        </div>
      ) : (
        <div style={{marginTop:12}}>
          <h2>Your Score: {score}/{QUESTIONS.length}</h2>
          <div className="row" style={{marginTop:12}}>
            <button className="btn primary" onClick={reset}>Retry</button>
          </div>
        </div>
      )}
    </div>
  )
}
