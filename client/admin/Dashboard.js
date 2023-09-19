import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import auth from "../helper/auth-helper"

const Card = (props) => {
  return (
    <Link className="w-64 h-32 text-green-800 bg-teal-400 rounded-lg shadow-md" to={props.link}>
      <div className="m-6 text-3xl text-center">{props.title}</div>
      {props.content && <div className="m-2 text-lg text-center">{props.content}</div>}
    </Link>
  )
}

const count = async (credentials, signal) => {
  try {
    let response = await fetch('/api/admin/', {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.token
      }
    })
    return await response.json()
  } catch(err) {
    console.error(err)
    return {error: err}
  }
}

export default function Dashboard(props) {
  const [values, setValues] = useState({
    archives: '',
    editors: '',
  })

  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    count({ token: jwt.token }, signal).then((data) => {
      if (data && !data.error) {
        setValues({ archives: data.archives, editors: data.editors })
      }
    })

    return function cleanup() {
      abortController.abort()
    }
  }, [])

  return (
    <div className="flex flex-wrap gap-8">
      <Card title="Archives" content={values.archives} link="/admin/archives" />
      <Card title="Editors" content={values.editors} link="/admin/editors" />
      {/* <Card title="Settings" link="/admin/settings" /> */}
    </div>
  )
}