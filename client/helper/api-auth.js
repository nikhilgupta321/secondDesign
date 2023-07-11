const sendOtp = async (user) => {
  try {
    let response = await fetch('/auth/sendOtp/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(user)
    })
    return await response.json()
  } catch(err) {
    console.error(err)
    return {error: err}
  }
}

const verifyOtp = async (otp) => {
  try {
    let response = await fetch('/auth/verifyOtp/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(otp)
    })
    return await response.json()
  } catch(err) {
    console.error(err)
    return {error: err}
  }
}

const login = async (credentials) => {
  try {
    let response = await fetch('/auth/login/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(credentials)
    })
    return await response.json()
  } catch(err) {
    console.error(err)
    return {error: err}
  }
}

const verifyToken = async (credentials) => {
  try {
    let response = await fetch('/auth/verify-token/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.token
      },
    })
    return await response.json()
  } catch(err) {
    console.error(err)
    return {error: err}
  }
}

export {
  sendOtp,
  verifyOtp,
  verifyToken,
  login,
}