const getCertificate = async (refnumber) => {
  try {
    let response = await fetch(`/api/pdf/certificate/${refnumber}`, {
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

export {
  getCertificate,
  getCoverpage,
  getEditorialBoard
}