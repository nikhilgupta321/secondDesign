import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom";
import auth from "../../helper/auth-helper"
import { addEditor } from "../../helper/api-editors";
import { GlobalContext } from "../../context/GlobalContext";

export default function AddEditor(props) {
  const {flash, setFlash} = useContext(GlobalContext)  
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isCreated, setIsCreated] = useState(false)
  const [editor, setEditor] = useState({
    category: '',
    post: '',
    name: '',
    content: '',
    // email: '',
    phone: '',
    country: '',
  })

  const [editorPic, setEditorPic] = useState()

  const jwt = auth.isAuthenticated()

  const handleChange = name => event => {
    setEditor({ ...editor, [name]: event.target.value })
  }

  const handleChangeFile = (event) => {
    setEditorPic(event.target.files[0])
  }

  const handleSubmit = () => {
    setIsSubmitted(true)
    if (
      !editor.category ||
      !editor.post ||
      !editor.name ||
      !editor.content    
    ) {
      return;
    }

    let data = editor;
    data = {
      ...data,
      // creation: new Date(),
      updated_at: new Date(),
    }

    addEditor(data, editorPic, { token: jwt.token }).then((data) => {
      if (data && data.error) {
        setFlash({error: true, msg: "Something went wrong"})
      }
      else {
        setFlash({success: true, msg: "Editor created successfully"})
        setIsCreated(true)
      }
    })
  }

  return (
    <div>
      <div className="flex gap-4">
        <Link to="/admin/editors/" className="p-2 mb-4 text-center rounded w-16 bg-gray-200 text-gray-500"><i className="fa fa-arrow-left" aria-hidden="true" /></Link>
        {!isCreated && <button onClick={handleSubmit} className="p-2 mb-4 rounded w-24 bg-sky-600 text-gray-100">Submit</button>}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div><div>AUTHOR NAME *</div><input value={editor.name} onChange={handleChange('name')} className={`w-full border-2 border-gray-300 p-2 focus:outline-emerald-600 ${isSubmitted && editor.name === '' ? 'border-b-red-500' : ''}`} type="text"></input></div>
        {/* <div><div>EMAIL</div><input value={editor.email} onChange={handleChange('email')} className={`w-full border-2 border-gray-300 p-2 focus:outline-emerald-600`} type="text"></input></div> */}
        <div><div>PHONE</div><input value={editor.phone} onChange={handleChange('phone')} className={`w-full border-2 border-gray-300 p-2 focus:outline-emerald-600`} type="text"></input></div>
        <div><div>COUNTRY</div><input value={editor.country} onChange={handleChange('country')} className={`w-full border-2 border-gray-300 p-2 focus:outline-emerald-600`} type="text"></input></div>
        <div><div>AFFILIATION *</div><input value={editor.content} onChange={handleChange('content')} className={`w-full border-2 border-gray-300 p-2 focus:outline-emerald-600 ${isSubmitted && editor.content === '' ? 'border-b-red-500' : ''}`} type="text"></input></div>
        <div><div>CATEGORY *</div>
          <select value={editor.category} onChange={handleChange('category')} className={`w-full border-2 border-gray-300 p-2 focus:outline-emerald-600 ${isSubmitted && editor.category === '' ? 'border-b-red-500' : ''}`}>
            <option value="">Null</option>
            <option value="Editors">Editors</option>
            <option value="Editor in chief">Chief Editor</option>
          </select>
        </div>
        <div><div>DESIGNATION *</div>
          <select value={editor.post} onChange={handleChange('post')} className={`w-full border-2 border-gray-300 p-2 focus:outline-emerald-600 ${isSubmitted && editor.post === '' ? 'border-b-red-500' : ''}`}>
            <option value="">Null</option>
            <option value="Professor">Professor</option>
            <option value="Associate Professor">Associate Professor</option>
            <option value="Assistant Professor">Assistant Professor</option>
            <option value="Scientist">Scientist</option>
            <option value="Head">Head</option>
            <option value="Lecturer">Lecturer</option>
          </select>
        </div>
        <div>
          <div>PICTURE</div>
          <input onChange={handleChangeFile} type="file" accept="image/*" className={`w-full bg-white border-2 border-gray-300 p-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-emerald-600 file:text-gray-100`} />
        </div>
      </div>
    </div>
  )
}