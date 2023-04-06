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
    console.log(err)
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
    console.log(err)
    return {error: err}
  }
}

const verifyCredential = async (credentials) => {
  try {
    let response = await fetch('/auth/authenticate/', {
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
    console.log(err)
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
    console.log(err)
    return {error: err}
  }
}

export {
  sendOtp,
  verifyOtp,
  verifyToken,
  verifyCredential
}