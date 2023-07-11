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
    console.error(err)
    return {error: err}
  }
}

const getbulkCertificates = async (selected) => {
  try {
    let response = await fetch(`/api/pdf/bulkcertificates`, {
      method: 'POST',
      headers: {
        'Accept': 'application/zip',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selected)
    })
    return await response.blob()
  } catch(err) {
    console.error(err)
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
    console.error(err)
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
    console.error(err)
    return {error: err}
  }
}

const getIndexPage = async (selected) => {
  try {
    console.error(selected)
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
    console.error(err)
    return {error: err}
  }
}


const getEditorsCertificate = async (selected) => {
  try {
    console.error(selected)
    let response = await fetch(`/api/pdf/editorscertificate`, {
      method: 'POST',
      headers: {
        'Accept': 'application/zip',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selected)
    })
    return await response.blob()
  } catch(err) {
    console.error(err)
    return {error: err}
  }
}


export {
  getCertificate,
  getbulkCertificates,
  getCoverpage,
  getEditorialBoard,
  getIndexPage,
  getEditorsCertificate,
}