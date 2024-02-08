import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../helper/auth-helper";
import axios from "axios";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

const Add_data = (props) => {
  const [formData, setFormData] = useState({
    status: "",
    content: "",
  });

  const navigate = useNavigate();
  const jwt = auth.isAuthenticated();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (jwt) {
        const response = await axios.post("/api/webdata", {
          status: formData.status,
          content: formData.content,
          createdby: jwt.user,
          created_at: new Date().toISOString(),
        });
        navigate("/webdata");
        console.log("API Response:", response.data);
      } else {
        console.log("please provide token");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  return (
    <>
      <div className="gap-4 bar-add">
        <Link
          to="/webdata"
          className="w-auto p-2 text-sm text-center text-white uppercase bg-gray-400 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </Link>
        <button
          onClick={handleSubmit}
          className="w-auto p-2 text-sm text-center text-white uppercase bg-blue-700 rounded "
        >
          Submit
        </button>
      </div>
      <form
        className="grid grid-cols-3 gap-4 p-4 mt-14"
        encType="multipart/form-data"
      >
        <div>
          <label className="uppercase">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            className={`w-full border-2 border-gray-300 p-2 focus:outline-emerald-600 rounded-lg`}
          >
            <option value="" selected>
              Select Type
            </option>
            <option value="info">Information</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
        <div className="col-span-2 row-span-4">
          <label htmlFor="content" className="uppercase">
            Your Content
          </label>
          {/* <ReactQuill
            id="content"
            value={formData.content}
            onChange={handleChange}
            className="focus:shadow-soft-primary-outline min-h-unset text-sm leading-5.6 ease-soft block h-auto w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
            placeholder="Write your thoughts here..."
          /> */}
          <input
            type="text"
            name="content"
            value={formData.content}
            onChange={handleChange}
            autoComplete="off"
            className="focus:shadow-soft-primary-outline min-h-unset text-sm leading-5.6 ease-soft block h-auto w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
          />
        </div>
      </form>
    </>
  );
};

export default Add_data;
