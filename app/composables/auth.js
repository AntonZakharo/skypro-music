const API_URL = 'https://webdev-music-003b5b991590.herokuapp.com'

export async function login(email, password) {
  const response = await fetch(API_URL + '/user/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'content-type': 'application/json',
    },
  })
  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.message)
  }
}
export async function register(email, password, username) {
  const response = await fetch(API_URL + '/user/signup/', {
    method: 'POST',
    body: JSON.stringify({ email, password, username }),
    headers: {
      'content-type': 'application/json',
    },
  })
  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.message)
  }
  return response.json()
}
export async function getToken(email, password) {
  const response = await fetch(API_URL + '/user/token/', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'content-type': 'application/json',
    },
  })
  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.message)
  }
  return response.json()
}

export async function refreshToken(token) {
  const response = await fetch(API_URL + '/user/token/refresh', {
    method: 'POST',
    body: JSON.stringify({ refresh: token }),
    headers: {
      'content-type': 'application/json',
    },
  })
  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.message)
  }
  return response.json()
}
