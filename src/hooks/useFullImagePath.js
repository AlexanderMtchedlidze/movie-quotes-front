import { computed } from 'vue'

const baseUrl = import.meta.env.VITE_BASE_URL
const storagePath = import.meta.env.VITE_STORAGE_PATH

export function useUserProfileImagePath(profileImagePath) {
  const userImageSrc = computed(() => baseUrl + storagePath + profileImagePath)

  return userImageSrc
}

const thumbnailsPath = import.meta.env.VITE_THUMBNAILS_PATH
export function useThumbnailImagePath(thumbnailImagePath) {
  const thumbnailImageSrc = computed(
    () =>
      baseUrl +
      storagePath +
      thumbnailsPath +
      thumbnailImagePath.substring(thumbnailImagePath.lastIndexOf('/') + 1)
  )

  return thumbnailImageSrc
}
