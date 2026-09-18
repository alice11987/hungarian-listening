const CATEGORIES = [
  { id: 'daily', label: '日常对话', labelHu: 'Mindennapi párbeszéd', emoji: '💬' },
  { id: 'vocab', label: '词汇练习', labelHu: 'Szókincs', emoji: '📚' },
  { id: 'news', label: '新闻短文', labelHu: 'Hírek', emoji: '📰' },
]

const MODES = [
  { id: 'dictation', label: '听写', desc: '听完后打出句子', emoji: '✍️' },
  { id: 'choice', label: '选择题', desc: '从4个选项中选出意思', emoji: '🔤' },
  { id: 'shadowing', label: '跟读', desc: '听一句，跟着说一句', emoji: '🗣' },
  { id: 'free', label: '自由聆听', desc: '带文字稿，随意播放', emoji: '👂' },
]

export default function Home({ onStart }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 text-center">
        <p className="text-4xl mb-3">🇭🇺</p>
        <h1 className="text-2xl font-bold">Magyar Hallás</h1>
        <p className="text-gray-400 text-sm mt-1">匈牙利语听力练习</p>
      </div>

      <div className="flex-1 px-5 pb-10 flex flex-col gap-7">
        {/* Categories */}
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-3">选择主题</p>
          <div className="flex flex-col gap-3">
            {CATEGORIES.map(cat => (
              <div key={cat.id} className="bg-gray-800 rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{cat.emoji}</span>
                  <div>
                    <p className="font-semibold">{cat.label}</p>
                    <p className="text-gray-500 text-xs">{cat.labelHu}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {MODES.map(mode => (
                    <button
                      key={mode.id}
                      onClick={() => onStart(cat.id, mode.id)}
                      className="bg-gray-700 hover:bg-gray-600 active:bg-red-600 rounded-xl px-3 py-3 text-left transition-colors"
                    >
                      <span className="text-xl">{mode.emoji}</span>
                      <p className="text-sm font-medium mt-1">{mode.label}</p>
                      <p className="text-xs text-gray-400 leading-tight">{mode.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-gray-600 text-xs">
          音频由 gTTS 生成 · 匈牙利语 hu-HU
        </p>
      </div>
    </div>
  )
}
