const API_URL = 'https://webdev-music-003b5b991590.herokuapp.com'

export async function like(id) {
  try {
    const response = await fetch(API_URL + `/catalog/track/${id}/favorite/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
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
export async function deleteLike(id) {
  try {
    const response = await fetch(API_URL + `/catalog/track/${id}/favorite/`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
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
