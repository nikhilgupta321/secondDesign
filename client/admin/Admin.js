import React, { useState, useEffect } from "react"
import auth from "../helper/auth-helper"
import { Outlet } from "react-router"
import { Link, useNavigate } from "react-router-dom"
import Flash from "./Flash"
import { verifyToken } from "../helper/api-auth"

export default function Admin(props) {
  const [user, setUser] = useState('')
  const [query, setQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  function handleChange(event) {
    setQuery(event.target.value);
  }

  const handleSignOut = () => {
    auth.clearJWT(() => {navigate('/admin/login')})
  }

  function handleSubmit(event) {
    event.preventDefault();
    const searchUrl = `/admin/search?q=${query}`;
    setQuery("");
    navigate(searchUrl);
  }

  useEffect(() => {
    const jwt = auth.isAuthenticated()
    if(!jwt) {
      navigate('/admin/login')
    } else {
      verifyToken(jwt).then((data) => {
        if(data.error) {
          auth.clearJWT(() => {navigate('/admin/login')})
        }
        else {
          setIsLoggedIn(true)
          setUser(jwt.user)
        }
      })
    }
  }, [])

  return (
    <>
    {isLoggedIn && <div>
      <Flash/>
      <div className="z-10 fixed top-0 w-full flex h-14 bg-blue-500 items-center justify-between shadow-md">
        <div className="m-3 text-xl text-slate-100"><Link className="text-slate-100" to="/admin">Home</Link></div>
        <div>
          <form onSubmit={handleSubmit} className="search">
            <input className="pl-4 mb-5 w-96 h-8 rounded-md focus:outline-emerald-600" onChange={handleChange} placeholder="Search..." type="text" value={query} />
            <button type="submit">
              <i className="text-slate-200 text-2xl m-4 fa fa-search"></i>
            </button>
          </form>
        </div>
        <div className="flex gap-2 text-xl">
          <div className="m-3 text-slate-100">User : {user}</div>
          <Link className="m-3 text-slate-100" to="/" target="_blank" rel="noopener noreferrer">Site</Link>
          <div className="m-3  text-slate-100"><button onClick={handleSignOut}>Logout</button></div>
        </div>
      </div>
      <div className="p-6 pt-20 text-base">
        <Outlet />
      </div>
    </div>
    }
    </>
  )
}