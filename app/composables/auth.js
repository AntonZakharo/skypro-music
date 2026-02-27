const API_URL = 'https://webdev-music-003b5b991590.herokuapp.com'

export async function login(email, password) {
  try {
    const response = await fetch(API_URL + '/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'content-type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error('Сервер сломался')
    }
  } catch (error) {
    console.error(error)
  }
}
export async function register(email, password, username) {
  try {
    const response = await fetch(API_URL + '/user/signup/', {
      method: 'POST',
      body: JSON.stringify({ email, password, username }),
      headers: {
        'content-type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error('Сервер сломался')
    }
    return response.json()
  } catch (error) {
    console.error(error)
  }
}
export async function getToken(email, password) {
  try {
    const response = await fetch(API_URL + '/user/token/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'content-type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error('Сервер сломался')
    }
    return response.json()
  } catch (error) {
    console.error(error)
  }
}

export async function refreshToken(token) {
  try {
    const response = await fetch(API_URL + '/user/token/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh: token }),
      headers: {
        'content-type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error('Сервер сломался')
    }
    return response.json()
  } catch (error) {
    console.error(error)
  }
}
