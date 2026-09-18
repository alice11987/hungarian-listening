export default function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 text-gray-400 text-sm py-2 px-1"
    >
      ← 返回
    </button>
  )
}
