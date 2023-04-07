const listEditors = async (credentials) => {
  try {
    let response = await fetch('/api/editors/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.token
      }
    })
    let result = await response.json()
    return result
  } catch(err) {
    console.log(err)
    return {error: err}
  }
}

const addEditor = async (data, file, credentials) => {
  try {
    const formData = new FormData();
    for ( var key in data ) {
      formData.append(key, data[key]);
    }
  
    formData.append("imgFile", file);
    
    let response = await fetch('/api/editors', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': 'Bearer ' + credentials.token
      },
    })
    return await response.json()
  } catch (err) {
    console.log(err)
    return {error: err}
  }
}

const editorById = async (params, signal) => {
  try {
    let response = await fetch(`/api/editors/${params.id}`, {
      method: "GET",
      signal: signal,
    });
    const result = await response.json(); 
    return result
  } catch (err) {
    console.log(err);
    return {error: err}
  }
}

const updateEditor = async (params, credentials) => {
  try {
    const formData = new FormData();

    for ( var key in params.data ) {
      formData.append(key, params.data[key]);
    }
  
    formData.append("imgFile", params.file);
    
    let response = await fetch(`/api/editors/${params.id}`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': 'Bearer ' + credentials.token
      },
    })
    return await response.json()
  } catch (err) {
    console.log(err)
    return {error: err}
  }
}

export {
  listEditors,
  addEditor,
  editorById,
  updateEditor
}