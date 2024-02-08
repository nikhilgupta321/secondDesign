import React, { useState, useEffect } from "react";
import auth from "../helper/auth-helper";
import { Outlet } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { verifyToken } from "../helper/api-auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Account from "./Account";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchInput, setSearchInput] = useState(''); // Add search input state
  const navigate = useNavigate();

  const handleSignOut = () => {
    auth.clearJWT(() => {
      navigate("/webdata/login");
    });
  };

  useEffect(() => {
    const jwt = auth.isAuthenticated();
    if (!jwt) {
      navigate("/webdata/login");
    } else {
      verifyToken(jwt).then((data) => {
        if (data.error) {
          auth.clearJWT(() => {
            navigate("/");
          });
        } else {
          setIsLoggedIn(true);
          setUser(jwt.user);
        }
      });
    }
  }, []);

  const handleAccountClick = () => {
    navigate("/webdata/account");
  };

  const handleSearch = () => {
    navigate({ search: `?search=${searchInput}` });
  };
  return (
    <>
      {isLoggedIn && (
        <div>
          <div className="fixed top-0 z-10 flex items-center justify-between w-full bg-blue-500 shadow-md h-14">
            <div className="m-3 text-xl text-slate-100 ">
              <Link to="/webdata/*" className="text-slate-100 hover:text-red-500">
                Home<hr />
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="relative sm:w-60 lg:w-96">
                <input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search..."
                  type="text"
                  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white "
                />
                <button
                  onClick={() => handleSearch()}
                  type="submit"
                  className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none  dark:bg-blue-600 dark:hover:bg-blue-700 ">
                  <FontAwesomeIcon icon={faSearch} className="text-lg text-white search-icon" />
                </button>
              </div>
            </div>
            <div className="flex gap-2 text-xl">
              <div className="m-3 text-slate-100">User: {user} <hr /></div>
              {/* <div className="m-3 text-slate-100 hover:text-red-500">
                <button onClick={handleAccountClick}>Account</button><hr />
              </div> */}
              <div className="m-3 text-slate-100 hover:text-red-500">
                <button onClick={handleSignOut}>Logout<hr /></button>
              </div>
            </div>
          </div>
          <div className="p-6 text-base pt-14">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
}

