import React from "react";

import { useAuth } from "../../../contexts";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex justify-between p-2">
      <div className="dummy"></div>
      {user ? (
        <div className="avatar dropdown dropdown-end">
          <div tabIndex={0} className="mask mask-squircle w-10 cursor-pointer">
            <img src={user.photoURL || ""} alt="avatar" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <label htmlFor="logout" onClick={() => logout()}>
                Logout
              </label>
            </li>
          </ul>
        </div>
      ) : (
        <a href="/login">
          <label className="btn btn-outline border-2">Login</label>
        </a>
      )}
    </div>
  );
};

export default Header;
