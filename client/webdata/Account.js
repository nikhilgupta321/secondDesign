import React, { useEffect, useState } from "react";
import auth from "../helper/auth-helper";

export default function Account() {


  const [values, setValues] = useState({

    newPassword: "",
    confirmPassword: "",
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    const jwt = auth.isAuthenticated();
    if (jwt) {
      setUser(jwt.user);
      console.log(jwt.user)
    }
  }, []);

  const handleChange = (field) => (event) => {
    setValues({ ...values, [field]: event.target.value });
  };

  const handleSubmit = () => {
    // Check if new password and confirm password match
    if (values.newPassword !== values.confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }
    const jwt = auth.isAuthenticated();

    if (user && user._id) {
      fetch(`http://localhost:8080/user/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt.token}`,
        },
        body: JSON.stringify({
          currentPassword: values.password,
          newPassword: values.newPassword,
        }),
      })
        .then((response) => {
          if (response.ok) {
            console.log(response);
            alert('Password updated successfully');
          } else {
            alert('Failed to update password');
          }
        })
        .catch((error) => {
          console.error('Error updating password:', error);
          alert('An error occurred while updating the password');
        });
    } else {
      alert('User information not available');
    }
  };
  return (
    <div className="flex grid grid-cols-5 gap-2 mt-4">
      <div className="">
        <label className="uppercase">User<span className="text-red-500">*</span> </label>
        <input
          className={`w-full border-2 border-gray-300 p-2 focus:outline-emerald-600 rounded-lg `}
          type="test"
          value={user}
        />
      </div>
      <div>
        <label className="uppercase">NEW PASSWORD</label>
        <input
          className={`w-full border-2 border-gray-300 p-2 focus:outline-emerald-600 rounded-lg `}
          type="password"
          value={values.newPassword}
          onChange={handleChange("newPassword")}
        />
      </div>
      <div>
        <label className="uppercase">CONFIRM PASSWORD</label>
        <input
          className={`w-full border-2 border-gray-300 p-2 focus:outline-emerald-600 rounded-lg`}
          type="password"
          value={values.confirmPassword}
          onChange={handleChange("confirmPassword")}
        />
      </div>
      <div className="mt-7">
        <button className="w-auto p-2 text-sm text-center text-white uppercase bg-green-700 rounded" onClick={handleSubmit}>Update Password</button>
      </div>
    </div>
  );
}



