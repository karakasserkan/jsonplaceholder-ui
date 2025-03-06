import { useLoaderData, Link } from 'react-router-dom';
import { User, Post, Comment } from '../types/apiTypes';
import useFavoriteStore from '../store/favoriteStore';
import { postDetailLoader } from '../loaders/postLoaders';

// Loader için dönen veri tipi
interface PostDetailData {
  post: Post;
  user: User;
  comments: Comment[];
}

export { postDetailLoader };

const PostDetail = () => {
  const { post, user, comments } = useLoaderData() as PostDetailData;
  const addFavoritePost = useFavoriteStore(state => state.addFavoritePost);
  const removeFavoritePost = useFavoriteStore(state => state.removeFavoritePost);
  const isPostFavorite = useFavoriteStore(state => state.isPostFavorite);
  
  const handleToggleFavorite = () => {
    if (isPostFavorite(post.id)) {
      removeFavoritePost(post.id);
    } else {
      addFavoritePost(post);
    }
  };
  
  return (
    <div className="row">
      <div className="col-lg-8 mx-auto">
        <div className="card mb-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Link 
                to={`/users/${user.id}`} 
                className="text-decoration-none"
              >
                <div className="d-flex align-items-center">
                  <div className="bg-primary text-white rounded-circle p-2 me-2">
                    <i className="bi bi-person"></i>
                  </div>
                  <span>{user.name} (@{user.username})</span>
                </div>
              </Link>
              
              <button 
                className={`btn ${isPostFavorite(post.id) ? 'btn-danger' : 'btn-outline-danger'}`}
                onClick={handleToggleFavorite}
              >
                <i className={`bi ${isPostFavorite(post.id) ? 'bi-heart-fill' : 'bi-heart'}`}></i>
              </button>
            </div>
            
            <h1 className="card-title h4 mb-3">{post.title}</h1>
            <p className="card-text">{post.body}</p>
          </div>
        </div>
        
        <h3 className="mt-4 mb-3">Yorumlar ({comments.length})</h3>
        
        {comments.length === 0 ? (
          <p>Bu gönderi için henüz yorum yok.</p>
        ) : (
          <div className="card">
            <ul className="list-group list-group-flush">
              {comments.map(comment => (
                <li key={comment.id} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <h5 className="mb-1">{comment.name}</h5>
                    <small className="text-muted">{comment.email}</small>
                  </div>
                  <p className="mb-1">{comment.body}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetail;