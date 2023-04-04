import React, { useState } from 'react'
import { sendOtp, verifyOtp } from '../helper/api-auth.js'
import auth from '../helper/auth-helper'
import { Navigate } from "react-router"

export default function SignIn(props) {
  const [values, setValues] = useState({
    username: '',
    error: '',
    verified: false,
    otpSent: false,
    otpCode: ''
  })

  const clickSendOtp = () => {
    if (!values.username) {
      setValues({ ...values, error: 'Username cannot be empty' })
    }
    else {
      const user = { username: values.username }
      sendOtp(user).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error })
        } else {
          setValues({ ...values, otpSent: true })
        }
      })
    }
  }

  const clickVerifyOtp = () => {
    const otp = { username: values.username, otp: values.otpCode }

    verifyOtp(otp).then((data) => {
      if (data.error) {
        if (data.error === 'otp_invalid')
          setValues({ ...values, error: 'OTP Invalid' })
        else if (data.error === 'otp_expired') {
          setValues({ ...values, otpSent: false, error: 'OTP expired, Send OTP again' })
        }
        else
          setValues({ ...values, error: data.error })
      }
      else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: '', verified: true })
        })
      }
    })
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value , error: ''})
  }

  return (<>
    <div className='min-h-screen bg-gray-100'>
      {values.verified && (
        <Navigate to="/admin" replace={true} />
      )}
      <div className="flex items-center justify-center pt-40">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
          <h3 className="text-2xl font-bold text-center">Login to your account</h3>
          <p className='h-4 text-red-500'>{values.error}</p>
          {!values.otpSent && <div className="mt-4">
            <div>
              <input type="text" placeholder="Username" value={values.username} onChange={handleChange('username')}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
            </div>
            <div className="flex items-center justify-center">
              <button type="button" onClick={clickSendOtp}
                className="px-6 py-2 mt-8 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Send OTP</button>
            </div>
          </div>
          }
          {values.otpSent && <div className="mt-4">
            <div>
              <input type="text" placeholder="OTP" value={values.otpCode} onChange={handleChange('otpCode')}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
            </div>
            <div className="flex items-center justify-center">
              <button type="button" onClick={clickVerifyOtp}
                className="px-6 py-2 mt-8 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Sign In</button>
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  </>)
}