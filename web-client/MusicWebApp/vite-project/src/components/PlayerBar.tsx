export default function PlayerBar() {
  return (
    <footer className="fixed left-0 right-0 bottom-0 h-20 bg-neutral-800 border-t border-neutral-700 z-50 flex items-center justify-between px-6">
      <div>
        <p className="text-sm font-medium">Song Name</p>
        <p className="text-xs text-neutral-400">Artist</p>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-sm">⏮</button>
        <button className="text-lg">▶</button>
        <button className="text-sm">⏭</button>
      </div>

      <div className="w-32 text-right text-xs text-neutral-400">
        Volume
      </div>
    </footer>
  );
}
