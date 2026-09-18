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

function getItems(category, mode) {
  const raw = CONTENT[category]

  if (mode === 'free') {
    if (category === 'news') return raw
    // daily/vocab: wrap each item as a single-sentence passage
    return raw.map(item => ({
      id: item.id,
      title: item.hu,
      title_zh: item.zh,
      sentences: [{ id: item.id, hu: item.hu, en: item.en, zh: item.zh, audio: item.audio }],
    }))
  }

  if (mode === 'shadowing') {
    // news: flatten sentences from all passages
    if (category === 'news') return raw.flatMap(p => p.sentences)
    return raw
  }

  // dictation / choice
  if (category === 'news') {
    return raw.flatMap(p =>
      p.sentences.map(s => ({ ...s, choices: p.choices || [] }))
    )
  }
  return raw
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
  const items = getItems(category, mode)

  if (mode === 'dictation') return <Dictation items={items} onBack={goHome} />
  if (mode === 'choice') return <MultipleChoice items={items} onBack={goHome} />
  if (mode === 'shadowing') return <Shadowing items={items} onBack={goHome} />
  if (mode === 'free') return <FreeListening items={items} onBack={goHome} />

  return null
}
