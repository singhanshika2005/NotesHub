import React from "react";
import { Box, Drawer } from "@mui/material";
import {
  BookHeart,
  LogOut,
  Notebook,
  Settings,
  UserRoundCog,
} from "lucide-react";
import { useAuthState } from "../contextapi/AuthState";
import { Link } from "react-router-dom";

function Sidebar({ open, setOpen }) {
  const { logoutHandler, profile } = useAuthState();

  // ✅ FIX: proper close handler (removes aria warning)
  const handleClose = () => {
    setOpen(false);
    if (document.activeElement) {
      document.activeElement.blur();
    }
  };

  return (
    <Drawer open={open} anchor="right" onClose={handleClose}>
      <Box sx={{ width: 300 }} role="presentation">
        <div className="h-full w-full py-12 flex flex-col justify-between">
          
          {/* Profile Section */}
          <div>
            <div className="flex flex-col items-center">
              <img
                className="h-24 w-24 rounded-full"
                src={
                  profile?.avatar ||
                  "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"
                }
                alt="profile"
              />
              <h1 className="my-3 text-2xl capitalize font-bold">
                {profile?.name || "User"}
              </h1>
              <p className="text-sm text-gray-600">{profile?.email}</p>
            </div>

            {/* Menu */}
            <ul className="my-6 space-y-2">
              <Link
                to="/yournotes"
                onClick={handleClose}
                className="hover:bg-gray-200 px-5 py-2 flex items-center gap-2 font-semibold"
              >
                <BookHeart size={18} /> Your Notes
              </Link>

              <Link
                to="/notes"
                onClick={handleClose}
                className="hover:bg-gray-200 px-5 py-2 flex items-center gap-2 font-semibold"
              >
                <Notebook size={18} /> Public Notes
              </Link>

              <Link
                to="/profile"
                onClick={handleClose}
                className="hover:bg-gray-200 px-5 py-2 flex items-center gap-2 font-semibold"
              >
                <UserRoundCog size={18} /> Profile
              </Link>

              <li
                onClick={handleClose}
                className="hover:bg-gray-200 px-5 py-2 flex items-center gap-2 font-semibold cursor-pointer"
              >
                <Settings size={18} /> Settings
              </li>
            </ul>
          </div>

          {/* Logout */}
          <div className="flex justify-center pb-5">
            <button
              className="px-6 py-2 font-semibold rounded dark:bg-rose-600 dark:text-gray-50 flex items-center gap-2"
              onClick={() => {
                logoutHandler();
                handleClose();
              }}
            >
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>
      </Box>
    </Drawer>
  );
}

export default Sidebar;