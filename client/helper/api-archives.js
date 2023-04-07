const create = async (credentials, params) => {
  try {
      let response = await fetch('/api/admin/create-issue', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.token
        },
        body: JSON.stringify(params)
      })
    return await response.json()
  } catch(err) {
    console.log(err)
    return {error: err}
  }
}

const listPublicArchives = async (signal) => {
  try {
    let response = await fetch("/api/archives/", {
      method: "GET",
      signal: signal,
    });

    return await response.json();
  } catch (err) {
    console.log(err);
    return {error: err}
  }
};

const listArchives = async (credentials) => {
  try {
    let response = await fetch('/api/admin/archives/', {
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

const read = async (params, credentials, signal) => {
  try {
    let response = await fetch('/api/archives/' + params.userId, {
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
    console.log(err)
    return {error: err}
  }
}

const update = async (params, credentials, user) => {
  try {
    let response = await fetch('/api/archives/' + params.userId, {
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
    console.log(err)
    return {error: err}
  }
}

const addArticle = async (data, file, credentials) => {
  try {
    const formData = new FormData();

    for ( var key in data ) {
      formData.append(key, data[key]);
    }
  
    formData.append("pdfFile", file);
    
    let response = await fetch('/api/admin/archives/', {
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

const updateArticle = async (params, credentials) => {
  try {
    const formData = new FormData();

    for ( var key in params.data ) {
      formData.append(key, params.data[key]);
    }
  
    if(params.file) formData.append("pdfFile", params.file);
    
    let response = await fetch(`/api/admin/archives/${params.ref}`, {
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

const listIssue = async (params, signal) => {
  try {
    let response = await fetch('/api/archives/' + params.year + '/' + params.vol + '/' + params.issue, {
      method: 'GET',
      signal: signal
    })
    const result = await response.json();
    return result
  } catch (err) {
    console.log(err)
    return {error: err}
  }
}

const archivesByRef = async (params, signal) => {
  try {
    let response = await fetch(`/api/archives/${params.ref}`, {
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

const searchArchives = async (query, signal) => {
  try {
    let response = await fetch(`/api/search?q=${query}`, {
      method: "GET",
      signal: signal,
    });
    let result = await response.json();
    return result
  } catch (err) {
    console.log(err);
    return {error: err}
  }
};

export {
  updateArticle,
  archivesByRef,
  addArticle,
  create,
  listPublicArchives,
  listArchives,
  listIssue,
  read,
  update,
  searchArchives
}
