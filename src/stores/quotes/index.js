import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useQuotesStore = defineStore('quotesStore', () => {
  const quotes = ref([
    {
      id: 1,
      author: 'Maia Nakashidze',
      authorProfileImageSrc: '/default-profile-image.png',
      quote: 'Follow your dream',
      quoteImageSrc: '/Rectangle 8.png',
      movie: 'Billy Elliot. (2000)',
      commentAmount: 3,
      comments: [
        {
          id: 1,
          author: 'Nina Baldadze',
          authorProfileImageSrc: '/default-profile-image.png',
          comment:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nunc vel massa facilisis consequat elit morbi convallis convallis. Volutpat vitae et nisl et. Adipiscing enim integer mi leo nisl. Arcu vitae mauris odio eget.'
        },
        {
          id: 2,
          author: 'Nika Tsetskhladze',
          authorProfileImageSrc: '/default-profile-image.png',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscin'
        }
      ],
      likeAmount: 10
    }
  ])

  return {
    quotes
  }
})
