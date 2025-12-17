import { Link } from "react-router";
import { ClockLoader } from "react-spinners";
import { LuLogIn } from "react-icons/lu";
import { BiLogOutCircle } from "react-icons/bi";

const AvatarDropdown = ({ user, loading, handleLogout }) => {
  return (
    <div className="dropdown dropdown-end">
      {/* Avatar Button */}
      <label tabIndex={0} className="btn btn-ghost p-0 rounded-full">
        <img
          className="md:w-12 md:h-12 h-10 w-10 object-cover rounded-full ring-2 ring-transparent hover:ring-[#9f62f2]"
          src={
            user
              ? user.photoURL
              : "https://img.icons8.com/?size=40&id=23493&format=png"
          }
          alt="User Avatar"
          title={user ? user.displayName || "User" : "Guest"}
        />
      </label>

      {/* Dropdown Content */}
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box w-40 shadow-lg mt-2 p-2"
      >
        {loading ? (
          <li className="flex justify-center py-2">
            <ClockLoader height={5} color="#9f62f2" />
          </li>
        ) : user ? (
          <>
            <li className="px-4 py-2 text-sm font-medium text-gray-700 border-b">
              {user.displayName || "User"}
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500"
              >
                <span>
                  <BiLogOutCircle />
                </span>
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link
              to="/login"
              className=" flex px-4 py-2 text-sm hover:bg-gray-100"
            >
              <span>
                <LuLogIn />
              </span>
              Login
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default AvatarDropdown;
