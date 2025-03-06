import { LoaderFunctionArgs } from 'react-router-dom';
import { Post, Comment } from '../types/apiTypes';

export const postDetailLoader = async ({ params }: LoaderFunctionArgs) => {
  try {
    const { userId, postId } = params;
    
    if (!userId || !postId) {
      throw new Error('Kullanıcı ID veya Gönderi ID bilgisi eksik');
    }
    
    // Ana gönderi bilgisini al
    const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    if (!postResponse.ok) {
      throw new Error('Gönderi bilgisi alınırken bir sorun oluştu');
    }
    const post: Post = await postResponse.json();
    
    // Gönderinin yorumlarını al
    const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    if (!commentsResponse.ok) {
      throw new Error('Gönderi yorumları alınırken bir sorun oluştu');
    }
    const comments: Comment[] = await commentsResponse.json();
    
    // Kullanıcı bilgisini al
    const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if (!userResponse.ok) {
      throw new Error('Kullanıcı bilgisi alınırken bir sorun oluştu');
    }
    const user = await userResponse.json();
    
    return { post, comments, user };
  } catch (error) {
    console.error('API isteği sırasında bir hata oluştu:', error);
    throw error instanceof Error ? error : new Error('Beklenmeyen bir hata oluştu');
  }
}; 