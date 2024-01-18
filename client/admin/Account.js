import React, { useContext, useEffect, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import auth from "../helper/auth-helper";
import { updateUser, userById } from "../helper/api-user";
import { GlobalContext } from "../context/GlobalContext";

function convertNullToEmptyString(obj) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc[key] = value ?? "";
    return acc;
  }, {});
}

export default function Account(props) {
  const { flash, setFlash } = useContext(GlobalContext);
  const {id} = useParams();
  const [values, setValues] = useState({
    name: '',
    password: '',
  });

  const jwt = auth.isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value, error: "" });
  };

  const handleSubmit = () => {
    updateUser(values,{id:id,data:data}, { token: jwt.token }).then((data) => {
      if (data && data.error) {
        setFlash({ error: true, msg: "Something went wrong" });
      } else {
        console.error("ping");
        setFlash({ success: true, msg: "User updated successfully" });
      }
    });
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
debugger
    userById({id: id}, signal).then((data) => {
      if (data && data.error) {
        setFlash({ error: true, msg: "Something went wrong" });
      } else {
        setValues({
          name: data.name || values.name,
          password: data.password || values.password,
        });
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <div className="border-b-2">
      <div className="flex gap-4 ">
        <Link
          to="/admin"
          className="w-12 p-2 text-center text-gray-900 rounded bg-slate-200 "
        >
          <HiOutlineArrowLeft style={{ height: "20px", width: "30px" }} />
        </Link>
        <button
          onClick={handleSubmit}
          type="submit"
          className="w-16 p-2 text-gray-100 rounded bg-sky-600"
        >
          Submit
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 p-2 mt-2 ">
        <div>
          <div className="text-xs">USERNAME</div>
          <input
            className={`w-full border-2 border-gray-300  `}
            type="text"
            value={values.name}
            onChange={handleChange("name")}
          />
        </div>
        <div>
          <div className="text-xs">NEW PASSWORD</div>
          <input
            className={`w-full border-2 border-gray-300  `}
            type="text"
            value={values.password}
            onChange={handleChange("password")}
          />
        </div>
        <div>
          <div className="text-xs">RE-ENTER PASSWORD</div>
          <input
            className={`w-full border-2 border-gray-300 `}
            type="text"
            value={values.password}
            onChange={handleChange("password")}
          />
        </div>
      </div>
    </div>
  );
}
