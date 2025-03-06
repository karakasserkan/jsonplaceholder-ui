import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Photo {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  userId?: number; // Album sahibinin ID'si
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface FavoriteStore {
  photos: Photo[];
  posts: Post[];
  addFavoritePhoto: (photo: Photo) => void;
  removeFavoritePhoto: (photoId: number) => void;
  addFavoritePost: (post: Post) => void;
  removeFavoritePost: (postId: number) => void;
  isPhotoFavorite: (photoId: number) => boolean;
  isPostFavorite: (postId: number) => boolean;
}

const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      photos: [],
      posts: [],
      addFavoritePhoto: (photo) => set((state) => ({
        photos: state.photos.some(p => p.id === photo.id) 
          ? state.photos 
          : [...state.photos, photo]
      })),
      removeFavoritePhoto: (photoId) => set((state) => ({
        photos: state.photos.filter(photo => photo.id !== photoId)
      })),
      addFavoritePost: (post) => set((state) => ({
        posts: state.posts.some(p => p.id === post.id) 
          ? state.posts 
          : [...state.posts, post]
      })),
      removeFavoritePost: (postId) => set((state) => ({
        posts: state.posts.filter(post => post.id !== postId)
      })),
      isPhotoFavorite: (photoId) => 
        get().photos.some(photo => photo.id === photoId),
      isPostFavorite: (postId) => 
        get().posts.some(post => post.id === postId)
    }),
    {
      name: 'favorite-storage',
    }
  )
)

export default useFavoriteStore 