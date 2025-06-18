import { Link, Outlet,useLocation } from "react-router-dom";
import {
  AlignLeft,
  BookOpen,
  Home,
  Loader2,
  LogOut,
  LucideLayoutDashboard,
  Palette,
  TypeOutline,
  User,
  UserLockIcon,
} from "lucide-react";

import { useGetUserQuery, useLogoutMutation } from "../querys/useUserQuery";

const Navbar = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  const currentPath = location.pathname;

  const { data } = useGetUserQuery();
  const user = data?.user;
  const mutation = useLogoutMutation();

  const handleLogout = () => {
    mutation.mutate({});
  };

  return (
    <>
      <div className="sticky top-0 z-50">
        <div className="navbar bg-base-200 md:px-20 md:py-4">
          <div className="navbar-start">
            <Link to="/" className="text-lg md:text-xl text-center">
              <p className="logo text-lg md:text-2xl font-bold font-sans -mb-1.5 flex flex-col items-center">
                <span className="text-primary">Code0</span>
              </p>
            </Link>
          </div>

          <div className="navbar-end space-x-2">
            <div className="flex items-center justify-center md:space-x-6 space-x-2">
              <Link to={currentPath==="/theme"?"/problems":"/theme"} className="btn btn-sm md:btn-md flex items-center justify-center">
                <Palette size={18} />
                Theme
              </Link>

              {!user ? (
                <Link to="/login" className="btn btn-primary btn-sm md:btn-md">
                  Login
                </Link>
              ) : (
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-sm md:btn-md btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <img alt="Profile Pic" src={user?.profileImage} />
                    </div>
                  </div>
                  <ul tabIndex={0} className="menu menu-md dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                    <li className="font-semibold">
                      <h4>{user.fullname}</h4>
                    </li>
                    <li>
                      <Link to="/profile">
                        <User size={18} />
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard">
                        <LucideLayoutDashboard size={18} />
                        Dashboard
                      </Link>
                    </li>
                    {user?.role === "ADMIN" && (
                      <li>
                        <Link to="/admin">
                          <UserLockIcon size={18} />
                          Admin
                        </Link>
                      </li>
                    )}
                    <li>
                      <button onClick={handleLogout}>
                        {mutation.isPending ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Loading...
                          </>
                        ) : (
                          <>
                            <LogOut size={18} />
                            Logout
                          </>
                        )}
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <AlignLeft />
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm">
                <li>
                  <Link to="/">
                    <Home size={18} />
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/problems">
                    <BookOpen size={18} />
                    Problems
                  </Link>
                </li>
                <li>
                  <Link to="/about">
                    <TypeOutline size={18} />
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
