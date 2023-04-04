const getSettings = async (credentials) => {
  try {
    let response = await fetch('/api/settings/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.token
      }
    })
    return await response.json()
  } catch(err) {
    console.log(err)
    return {error: err}
  }
}

const updateSettings = async (data, credentials) => {
  try {
    let response = await fetch(`/api/settings`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.token
      },
    })
    console.log(response)
    return await response.json()
  } catch (err) {
    console.log(err)
    return {error: err}
  }
}

export {
  getSettings,
  updateSettings
}