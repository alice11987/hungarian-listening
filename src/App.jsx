import { useState } from 'react'
import Home from './pages/Home'
import Dictation from './pages/Dictation'
import MultipleChoice from './pages/MultipleChoice'
import Shadowing from './pages/Shadowing'
import FreeListening from './pages/FreeListening'

import dailyData from './content/daily.json'
import vocabData from './content/vocab.json'
import newsData from './content/news.json'

const CONTENT = {
  daily: dailyData,
  vocab: vocabData,
  news: newsData,
}

export default function App() {
  const [screen, setScreen] = useState({ page: 'home' })

  function start(category, mode) {
    setScreen({ page: 'practice', category, mode })
  }

  function goHome() {
    setScreen({ page: 'home' })
  }

  if (screen.page === 'home') {
    return <Home onStart={start} />
  }

  const { category, mode } = screen
  const items = CONTENT[category]

  if (mode === 'dictation') return <Dictation items={items} onBack={goHome} />
  if (mode === 'choice') return <MultipleChoice items={items} onBack={goHome} />
  if (mode === 'shadowing') return <Shadowing items={items} onBack={goHome} />
  if (mode === 'free') return <FreeListening items={items} onBack={goHome} />

  return null
}
