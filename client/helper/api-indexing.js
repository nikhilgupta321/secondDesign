const listIndexing = async (signal) => {
  try {
    let response = await fetch('/api/indexing/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      signal: signal
    })
    return await response.json()
  } catch(err) {
    console.error(err)
    return {error: err}
  }
}

export {
  listIndexing
}