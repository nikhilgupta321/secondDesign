import User from '../models/user.model.js'

const create = async (req, res) => {
  try {
    await User.create(req.body)
    return res.status(200).json({
      message: "Created new user!"
    })
  } catch (err) {
    console.error(err)
    return {error: err}
  }
}

const list = async (req, res) => {
  try {
    let users = await User.findAll()
    res.json(users)
  } catch (err) {
    console.error(err)
    return {error: err}
  }
}

const update = async (req, res) => {
  try {
    let user = await User.findByPk(req.params.ref)
    user.set(req.body)
    await user.save()
    res.json(user)
  } catch (err) {
    console.error(err)
    return {error: err}
  }
}

const remove = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.ref)
    await user.destroy()
    res.json(user)
  } catch (err) {
    console.error(err)
    return {error: err}
  }
}

export default { create, list, remove, update }