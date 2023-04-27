const getCertificate = async (refnumber, author) => {
  try {
    let response = await fetch(`/api/pdf/certificate/${refnumber}/${author}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/pdf',
      },
    })
    return await response.blob()
  } catch(err) {
    console.log(err)
    return {error: err}
  }
}


const getCoverpage = async (refnumber) => {
  try {
    let response = await fetch(`/api/pdf/coverpage/${refnumber}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/pdf',
      }
    })
    return await response.blob()
  } catch(err) {
    console.log(err)
    return {error: err}
  }
}

const getEditorialBoard = async (refnumber) => {
  try {
    let response = await fetch(`/api/pdf/editorialboard`, {
      method: 'GET',
      headers: {
        'Accept': 'application/pdf',
      }
    })
    return await response.blob()
  } catch(err) {
    console.log(err)
    return {error: err}
  }
}

const getIndexPage = async (selected) => {
  try {
    console.log(selected)
    let response = await fetch(`/api/pdf/indexpage`, {
      method: 'POST',
      headers: {
        'Accept': 'application/pdf',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selected)
    })
    return await response.blob()
  } catch(err) {
    console.log(err)
    return {error: err}
  }
}

export {
  getCertificate,
  getCoverpage,
  getEditorialBoard,
  getIndexPage,
}