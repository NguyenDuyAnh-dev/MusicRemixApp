export default function ProfilePage() {
  return (
    <div>
      <div className="rounded-2xl flex gap-7 items-center p-6 mb-6 bg-gradient-to-r from-pink-600/60 to-violet-600/60">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-28 h-28 rounded-full border-4 border-pink-300/60"/>
          <div>
            <h1 className="text-2xl font-bold mb-1">Anh Vũ</h1>
            <span className="bg-white/20 rounded px-2 py-0.5 text-sm">Music Enthusiast <span>🎵</span></span>
            <div className="flex gap-2 text-sm text-white/90 mt-2 items-center">
              <span>anhvu@music.com</span>
              <span className="bg-white/10 px-2 rounded text-xs">Joined Jan 2024</span>
            </div>
          </div>
      </div>
      <div className="grid grid-cols-3 gap-8 mb-10">
        <div className="bg-neutral-800 rounded-xl p-6 flex flex-col gap-2">
          <div className="text-pink-400 text-3xl mb-1">🎵</div>
          <div className="text-lg font-bold">342</div>
          <div className="text-sm text-neutral-400">Total Songs</div>
        </div>
        <div className="bg-neutral-800 rounded-xl p-6 flex flex-col gap-2">
          <div className="text-pink-400 text-3xl mb-1">❤</div>
          <div className="text-lg font-bold">67</div>
          <div className="text-sm text-neutral-400">Favorites</div>
        </div>
        <div className="bg-neutral-800 rounded-xl p-6 flex flex-col gap-2">
          <div className="text-pink-400 text-3xl mb-1">📁</div>
          <div className="text-lg font-bold">12</div>
          <div className="text-sm text-neutral-400">Playlists</div>
        </div>
      </div>
      <div className="bg-neutral-900 rounded-2xl divide-y divide-neutral-800">
        <div className="p-6 font-bold">Account Settings</div>
        <div className="p-6 flex items-center justify-between">
          <span>Edit Profile</span> <span className="text-neutral-400">&gt;</span>
        </div>
        <div className="p-6 flex items-center justify-between">
          <span>Preferences</span> <span className="text-neutral-400">&gt;</span>
        </div>
        <div className="p-6 flex items-center justify-between">
          <span>Notifications</span> <span className="text-neutral-400">&gt;</span>
        </div>
        <div className="p-6 flex items-center justify-between">
          <span>Privacy</span> <span className="text-neutral-400">&gt;</span>
        </div>
      </div>
    </div>
  );
}

