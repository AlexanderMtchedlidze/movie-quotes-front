const baseUrl = import.meta.env.VITE_BASE_URL
const storagePath = import.meta.env.VITE_STORAGE_PATH

export function useUserProfileImagePath(profileImagePath) {
  return baseUrl + storagePath + profileImagePath
}

const thumbnailsPath = import.meta.env.VITE_THUMBNAILS_PATH
export function useThumbnailImagePath(thumbnailImagePath) {
  return (
    baseUrl +
    storagePath +
    thumbnailsPath +
    thumbnailImagePath.substring(thumbnailImagePath.lastIndexOf('/') + 1)
  )
}
