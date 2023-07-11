const create = async (credentials, user) => {
  try {
      let response = await fetch('/api/users/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.token
        },
        body: JSON.stringify(user)
      })
    return await response.json()
  } catch(err) {
    console.error(err)
    return {error: err}
  }
}

const list = async (credentials) => {
  try {
    let response = await fetch('/api/users/', {
      method: 'GET',
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

const read = async (params, credentials, signal) => {
  try {
    let response = await fetch('/api/users/' + params.id, {
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

const update = async (params, credentials, user) => {
  try {
    let response = await fetch('/api/users/' + params.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.token
      },
      body: JSON.stringify(user)
    })
    return await response.json()
  } catch(err) {
    console.error(err)
    return {error: err}
  }
}

const remove = async (params, credentials) => {
  try {
    let response = await fetch('/api/users/' + params.id, {
      method: 'DELETE',
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

export {
  create,
  list,
  read,
  update,
  remove
}