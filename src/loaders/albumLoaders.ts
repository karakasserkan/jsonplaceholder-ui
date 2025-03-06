import { LoaderFunctionArgs } from 'react-router-dom';
import { Album, Photo, User } from '../types/apiTypes';

export const albumDetailLoader = async ({ params }: LoaderFunctionArgs) => {
  try {
    const { userId, albumId } = params;
    
    if (!userId || !albumId) {
      throw new Error('Kullanıcı ID veya Albüm ID bilgisi eksik');
    }
    
    // Ana albüm bilgisini al
    const albumResponse = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`);
    if (!albumResponse.ok) {
      throw new Error('Albüm bilgisi alınırken bir sorun oluştu');
    }
    const album: Album = await albumResponse.json();
    
    // Albümdeki fotoğrafları al
    const photosResponse = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
    if (!photosResponse.ok) {
      throw new Error('Albüm fotoğrafları alınırken bir sorun oluştu');
    }
    const photos: Photo[] = await photosResponse.json();
    
    // Kullanıcı bilgisini al
    const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if (!userResponse.ok) {
      throw new Error('Kullanıcı bilgisi alınırken bir sorun oluştu');
    }
    const user: User = await userResponse.json();
    
    // Kullanıcı ID'sini fotoğraflara ekle (favoriler için kullanışlı)
    const photosWithUserId = photos.map(photo => ({
      ...photo,
      userId: parseInt(userId as string)
    }));
    
    return { album, photos: photosWithUserId, user };
  } catch (error) {
    console.error('API isteği sırasında bir hata oluştu:', error);
    throw error instanceof Error ? error : new Error('Beklenmeyen bir hata oluştu');
  }
}; 