import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import axios from '../config/axios/api'

export default function instantiatePusher() {
  window.Pusher = Pusher
  window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_KEY,
    forceTLS: true,
    cluster: ['eu'],
    authorizer: (channel) => {
      return {
        authorize: (socketId, callback) => {
          axios
            .post(axios.post('/broadcasting/auth'), {
              socket_id: socketId,
              channel_name: channel.name
            })
            .then((response) => {
              callback(null, response.data)
            })
            .catch((error) => {
              callback(error)
            })
        }
      }
    }
  })

  return true
}
