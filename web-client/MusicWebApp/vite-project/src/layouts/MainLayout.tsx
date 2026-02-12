import Header from "../components/Header";
import PlayerBar from "../components/PlayerBar";
import Sidebar from "../components/Sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col w-full bg-gradient-to-br from-[#301860] via-[#10061e] to-[#15151e] text-white">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 overflow-y-auto p-6 pb-20">
            {children}
          </main>
        </div>
      </div>
      <PlayerBar />
    </div>
  );
}

