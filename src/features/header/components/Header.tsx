import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between p-2">
      <div className="dummy"></div>
      <a href="#" className="block shrink-0">
        <img
          alt="Man"
          src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          className="h-10 w-10 rounded-full object-cover"
        />
      </a>
    </div>
  );
};

export default Header;
