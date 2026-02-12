import { useAuth } from "../auth/AuthContext";
import {
  HeartIcon,
  HomeIcon,
  MicrophoneIcon,
  MusicalNoteIcon,
  QueueListIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/IconHeader.png";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/20/solid";

const navs = [
  { to: "/", label: "Home", icon: HomeIcon },
  { to: "/playlist", label: "Playlist", icon: QueueListIcon },
  { to: "/singer", label: "Singer", icon: MicrophoneIcon },
  { to: "/songs", label: "Songs", icon: MusicalNoteIcon },
  { to: "/favorite", label: "Favorite", icon: HeartIcon },
  { to: "/profile", label: "Profile", icon: UserIcon, auth: true },
];

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
      navigate("/login", { replace: true });
    } else {
      navigate("/login", { state: { from: location } });
    }
  };

  return (
    <header className="h-20 bg-gradient-to-b from-neutral-900 via-neutral-900/90 to-transparent flex items-center px-12 shadow z-10">
      {/* LEFT */}
      <div className="flex-1 flex items-center gap-8 pb-6">
        <span className="text-2xl font-bold mr-8 whitespace-nowrap flex items-center">
          <img src={logo} alt="logo" className="inline-block w-8 h-8 mr-2" />
          Music Remix
        </span>

        <nav className="flex gap-3 items-center">
          {navs.map((nav) => {
            if (nav.auth && !isAuthenticated) return null;
            const Icon = nav.icon;

            return (
              <NavLink
                key={nav.to}
                to={nav.to}
                end={nav.to === "/"}
                className={({ isActive }) =>
                  "flex gap-2 items-center px-5 py-1.5 rounded-full font-medium transition " +
                  (isActive
                    ? "bg-pink-500 text-white shadow"
                    : "text-neutral-200 hover:bg-white/10")
                }
              >
                <Icon className="w-5 h-5" />
                {nav.label}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* RIGHT - AUTH BUTTON */}
      <div className="pb-6">
        <button
          onClick={handleAuthClick}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-neutral-200 hover:bg-white/10"
        >
          {/* Always render both icons */}
          <ArrowRightOnRectangleIcon
            className={`w-5 h-5 transition-opacity ${isAuthenticated ? "opacity-100" : "opacity-0"
              }`}
          />
          <ArrowLeftOnRectangleIcon
            className={`w-5 h-5 transition-opacity ${isAuthenticated ? "opacity-0" : "opacity-100"
              }`}
          />

          <span className="transition-opacity">
            {isAuthenticated ? "Logout" : "Login"}
          </span>
        </button>


      </div>
    </header>
  );
}
