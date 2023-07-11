import Indexing from '../models/indexing.model'

const list = async (req, res) => {
  try {
    let data = await Indexing.findAll()
    res.json(data)
  } catch (err) {
    console.error(err)
    return {error: err}
  }
}

export default { list }