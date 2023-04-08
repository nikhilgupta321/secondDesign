import Setting from '../models/setting.model';

const list = async (req, res) => {
  try {
    let data = await Setting.findOne({where: {
      id: 1
    }})
    res.json(data)
  } catch (err) {
    console.log(err)
    return {error: err}
  }
}

const update = async (req, res) => {
  try {
    await Setting.update(req.body, {
      where: {
        id: 1
      }
    })
    res.json({message: 'Success'})
  } catch (err) {
    console.log(err)
    return {error: err}
  }
}

export default { list, update }