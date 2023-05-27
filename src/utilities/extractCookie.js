export default (cookieName) => {
  const cookies = document.cookie.split(';') // Split cookies into an array

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim() // Trim any leading/trailing spaces

    if (cookie.startsWith(`${cookieName}=`)) {
      const cookieValue = cookie.substring(`${cookieName}=`.length) // Extract the value
      return cookieValue
    }
  }
}
