const auth = {
  isAuthenticated() {
    if (typeof window == "undefined")
      return false

    if (localStorage.getItem('acadpubjwt'))
      return JSON.parse(localStorage.getItem('acadpubjwt'))
    else
      return false
  },

  authenticate(jwt, cb) {
    if (typeof window !== "undefined")
      localStorage.setItem('acadpubjwt', JSON.stringify(jwt))
    cb()
  },

  clearJWT(cb) {
    if (typeof window !== "undefined")
      localStorage.removeItem('acadpubjwt')
    cb()
  }
}

export default auth
