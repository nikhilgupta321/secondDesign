import Archive from '../models/archive.model.js'
import Editor from '../models/editor.model.js'

const count = async (req, res) => {
  try {
    let result = {}
    result.archives = await Archive.count()
    result.editors = await Editor.count()
    res.json(result)
  } catch (err) {
    console.error(err)
    return {error: err}
  }
}


export default { count }