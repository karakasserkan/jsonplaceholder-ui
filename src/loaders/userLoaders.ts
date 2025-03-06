import { LoaderFunctionArgs } from 'react-router-dom';
import { User } from '../types/apiTypes';

export const usersLoader = async (): Promise<User[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
    throw new Error('Kullanıcılar alınırken bir sorun oluştu');
  }
  return response.json();
};

export const userDetailLoader = async ({ params }: LoaderFunctionArgs) => {
  try {
    const userId = params.userId;
    
    if (!userId) {
      throw new Error('Kullanıcı ID bilgisi eksik');
    }
    
    // Ana kullanıcı bilgisini al
    const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if (!userResponse.ok) {
      throw new Error('Kullanıcı bilgisi alınırken bir sorun oluştu');
    }
    const user = await userResponse.json();
    
    // Kullanıcının gönderilerini al
    const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
    if (!postsResponse.ok) {
      throw new Error('Kullanıcının gönderileri alınırken bir sorun oluştu');
    }
    const posts = await postsResponse.json();
    
    // Kullanıcının albümlerini al
    const albumsResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`);
    if (!albumsResponse.ok) {
      throw new Error('Kullanıcının albümleri alınırken bir sorun oluştu');
    }
    const albums = await albumsResponse.json();
    
    // Kullanıcının yapılacaklarını al
    const todosResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
    if (!todosResponse.ok) {
      throw new Error('Kullanıcının yapılacakları alınırken bir sorun oluştu');
    }
    const todos = await todosResponse.json();
    
    return { user, posts, albums, todos };
  } catch (error) {
    console.error('API isteği sırasında bir hata oluştu:', error);
    throw error instanceof Error ? error : new Error('Beklenmeyen bir hata oluştu');
  }
}; 