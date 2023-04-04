
const download = async (req, res) => {
    try {
        const filePath = `${__dirname}/${req.params.resource}/${req.params.fileName}`
        res.download(filePath);
    } catch (err) {
    console.log(err)
    return {error: err}
    }
  
  }

  export default { download, upload }
