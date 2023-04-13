import React, { useState, useEffect, useContext } from "react"
import auth from "../../helper/auth-helper"
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { getSettings, updateSettings } from "../../helper/api-settings";

function convertNullToEmptyString(obj) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc[key] = value ?? '';
    return acc;
  }, {});
}

export default function Settings(props) {
  const {flash, setFlash} = useContext(GlobalContext)  

  const [settings, setSettings] = useState({
    websitename: '',
    websiteemail: '',
    impactfactor: '',
    issn: '',
    whatsup_number: '',
    domain: '',
  })

  const jwt = auth.isAuthenticated()

  const handleChange = name => event => {
    setSettings({ ...settings, [name]: event.target.value })
  }

  const handleSubmit = () => {
    updateSettings(settings, { token: jwt.token }).then((data) => {
      if (data && data.error) {
        setFlash({error: true, msg: "Something went wrong"})
      }
      else {
        console.log('ping')
        setFlash({success: true, msg: "Settings updated successfully"})
      }
    })
  }

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    getSettings(signal).then((data) => {
      if (data && data.error) {
        setFlash({error: true, msg: "Something went wrong"})
      } else {
        setSettings({
          websitename: data.websitename || settings.websitename,
          websiteemail: data.websiteemail || settings.websiteemail,
          impactfactor: data.impactfactor || settings.impactfactor,
          issn: data.issn || settings.issn,
          whatsup_number: data.whatsup_number || settings.whatsup_number,
          domain: data.domain || settings.domain,
        })
      }
    })

    return function cleanup() {
      abortController.abort()
    }
  }, [])

  return (
    <div>
      <div className="flex gap-4">
        <Link to="/admin" className="p-2 mb-4 text-center rounded w-16 bg-gray-200 text-gray-500"><i className="fa fa-arrow-left" aria-hidden="true" /></Link>
        <button onClick={handleSubmit} className="p-2 mb-4 rounded w-24 bg-sky-600 text-gray-100">Submit</button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><div>Journal Name</div><input value={settings.websitename} onChange={handleChange('websitename')} className="w-full border-2 border-gray-300 p-2 focus:outline-emerald-600" type="text"></input ></div>
        <div><div>EMAIL</div><input value={settings.websiteemail} onChange={handleChange('websiteemail')} className="w-full border-2 border-gray-300 p-2 focus:outline-emerald-600" type="text"></input ></div>
        <div><div>Impact Factor</div><input value={settings.impactfactor} onChange={handleChange('impactfactor')} className="w-full border-2 border-gray-300 p-2 focus:outline-emerald-600" type="text"></input ></div>
        <div><div>ISSN</div><input value={settings.issn} onChange={handleChange('issn')} className="w-full border-2 border-gray-300 p-2 focus:outline-emerald-600" type="text"></input ></div>
        <div><div>Whatsapp</div><input value={settings.whatsup_number} onChange={handleChange('whatsup_number')} className="w-full border-2 border-gray-300 p-2 focus:outline-emerald-600" type="text"></input ></div>
        <div><div>Domain</div><input value={settings.domain} onChange={handleChange('domain')} className="w-full border-2 border-gray-300 p-2 focus:outline-emerald-600" type="text"></input ></div>
      </div>
    </div>
  )
}