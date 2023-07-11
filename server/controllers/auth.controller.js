import User from '../models/user.model'
import jwt from 'jsonwebtoken'
const { expressjwt: expressJwt } = require('express-jwt');
import { config } from './../../config/config'
import Setting from '../models/setting.model';

const sendOtp = async (req, res) => {
  try {
    console.error(req.body)
    let user = await User.findOne({
      attributes: ['id', 'username', 'phoneNo'],
      where: {
        username: req.body.username
      }
    })

    if (!user) return res.status(401).json({ error: "User not Found" })

    const otp = Math.floor(100000 + Math.random() * 900000)

    user.set({ otp: otp, otpAt: new Date() })

    await user.save()

    fetch('https://api.textlocal.in/send/?' + new URLSearchParams({
      apiKey: config.textlocalApi,
      sender: 'Acapub',
      numbers: user.phoneNo,
      message: `${user.name} use Admin Panel code is ${otp}\nAcapub`
    }), {
      method: 'POST'
    })
    return res.status(200).json({
      message: `Otp sent to phone no: ${user.phoneNo}`
    })
  } catch (err) {
    console.error(err)
    return res.status(401).json({ error: "Something went wrong" })
  }
}

const verifyOtp = async (req, res) => {
  try {
    let user = await User.findOne({ "name": req.body.username })

    if (req.body.otp !== user.otp)
      throw "otp_invalid"

    const otp_duration = Math.ceil(Math.abs((new Date() - user.otpAt) / (1000 * 60)))

    if (otp_duration >= 10)
      throw "otp_expired"

    const token = jwt.sign({ username: user.name }, config.jwtSecret)
    res.cookie('t', token, { expire: new Date() + 86400000 })
    return res.json({
      token,
      user: {
        username: user.name
      }
    })
  } catch (err) {
    console.error(err)
    return res.status(401).json({ error: err })
  }
}

const verifyToken = async (req, res) => {
  try {
    res.status(200).json({ message: "Token Verified" })
  } catch (err) {
    console.error(err)
    return res.status(401).json({ error: err })
  }
}

const login = async (req, res) => {
  try {
    let user = await User.findOne({ where: { "name": req.body.username } })
    
    if (!user || req.body.password !== user.password)
      throw "invalid_credentials"

    if (user.status == 'disabled')
      throw 'disabled'

      let result = await Setting.findOne({
        where: { id: 1 },
        attributes: ['allowed_ip']
      });

      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      
      // if (!result.allowed_ip.split(',').includes(ip)) {
      //   console.error(ip)
      //   throw 'invalid_ip'
      // }

    const token = jwt.sign({ username: user.name }, config.jwtSecret, { expiresIn: '12h' })
    
    return res.status(200).json({
      token: token,
      user: user.name
    });
    
  } catch (err) {
    console.error(err)
    return res.status(401).json({ error: err })
  }
}

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: 'auth',
  algorithms: ['HS256']
})

const hasAuthorization = (req, res, next) => {
  const authorized = req.auth.username == 'viki'
  if (!(authorized)) {
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next()
}

export default { sendOtp, verifyOtp, login, requireSignin, verifyToken, hasAuthorization }