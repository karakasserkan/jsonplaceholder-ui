import { useLoaderData, Link } from 'react-router-dom';
import { useState } from 'react';
import { User, Post, Album, Todo } from '../types/apiTypes';
import { userDetailLoader } from '../loaders/userLoaders';

export { userDetailLoader };

// Loader tipini tanımla
interface UserDetailData {
  user: User;
  posts: Post[];
  albums: Album[];
  todos: Todo[];
}

const UserDetail = () => {
  // Loader'dan gelen veriyi doğru şekilde al
  const { user, posts: initialPosts, albums: initialAlbums, todos: initialTodos } = useLoaderData() as UserDetailData;
  const [activeTab, setActiveTab] = useState('posts');
  const [posts] = useState<Post[]>(initialPosts);
  const [albums] = useState<Album[]>(initialAlbums);
  const [todos] = useState<Todo[]>(initialTodos);

  return (
    <div className="row">
      <div className="col-md-4 mb-4">
        <div className="card border-0 shadow-sm" style={{ background: '#fefae0' }}>
          <div className="card-header text-white py-3" style={{ 
            background: 'linear-gradient(135deg, #606c38 0%, #283618 100%)',
            borderBottom: 'none'
          }}>
            <h1 className="card-title h3 mb-0">{user.name}</h1>
            <small className="opacity-75">@{user.username}</small>
          </div>
          <div className="card-body">
            <p className="mb-1">
              <i className="bi bi-envelope me-2" style={{ color: '#606c38' }}></i>
              <a href={`mailto:${user.email}`} style={{ color: '#283618' }}>{user.email}</a>
            </p>
            <p className="mb-1">
              <i className="bi bi-phone me-2" style={{ color: '#606c38' }}></i>
              <span style={{ color: '#283618' }}>{user.phone}</span>
            </p>
            <p className="mb-1">
              <i className="bi bi-globe me-2" style={{ color: '#606c38' }}></i>
              <a href={`https://${user.website}`} target="_blank" rel="noreferrer" style={{ color: '#283618' }}>
                {user.website}
              </a>
            </p>
            
            <hr />
            
            <h6 className="mb-2" style={{ color: '#283618' }}>Adres</h6>
            <p className="mb-1 small" style={{ color: '#606c38' }}>
              {user.address.street}, {user.address.suite}<br />
              {user.address.city}, {user.address.zipcode}
            </p>
            
            <hr />
            
            <h6 className="mb-2" style={{ color: '#283618' }}>Şirket</h6>
            <p className="mb-1">
              <strong style={{ color: '#283618' }}>{user.company.name}</strong><br />
              <small style={{ color: '#606c38' }}>{user.company.catchPhrase}</small>
            </p>
          </div>
        </div>
      </div>
      
      <div className="col-md-8">
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'posts' ? 'active' : ''}`} 
              style={{ 
                color: activeTab === 'posts' ? '#283618' : '#606c38',
                borderColor: activeTab === 'posts' ? '#dda15e' : 'transparent',
                borderBottom: activeTab === 'posts' ? '2px solid #bc6c25' : 'none'
              }}
              onClick={() => setActiveTab('posts')}
            >
              Gönderiler
              <span className="badge ms-2" style={{ 
                background: '#606c38',
                color: '#fefae0'
              }}>{posts.length}</span>
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'albums' ? 'active' : ''}`} 
              style={{ 
                color: activeTab === 'albums' ? '#283618' : '#606c38',
                borderColor: activeTab === 'albums' ? '#dda15e' : 'transparent',
                borderBottom: activeTab === 'albums' ? '2px solid #bc6c25' : 'none'
              }}
              onClick={() => setActiveTab('albums')}
            >
              Albümler
              <span className="badge ms-2" style={{ 
                background: '#606c38',
                color: '#fefae0'
              }}>{albums.length}</span>
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'todos' ? 'active' : ''}`} 
              style={{ 
                color: activeTab === 'todos' ? '#283618' : '#606c38',
                borderColor: activeTab === 'todos' ? '#dda15e' : 'transparent',
                borderBottom: activeTab === 'todos' ? '2px solid #bc6c25' : 'none'
              }}
              onClick={() => setActiveTab('todos')}
            >
              Yapılacaklar
              <span className="badge ms-2" style={{ 
                background: '#606c38',
                color: '#fefae0'
              }}>{todos.length}</span>
            </button>
          </li>
        </ul>
        
        {/* Aktif tab içeriği */}
        {activeTab === 'posts' && (
          <div className="posts-container">
            <h2 className="mb-4" style={{ color: '#283618' }}>Gönderiler</h2>
            {posts.length === 0 ? (
              <div className="alert" style={{ background: '#fefae0', color: '#283618' }}>
                <i className="bi bi-info-circle me-2"></i>
                Hiç gönderi bulunamadı.
              </div>
            ) : (
              <div className="list-group shadow-sm">
                {posts.map(post => (
                  <Link 
                    to={`/users/${user.id}/posts/${post.id}`} 
                    key={post.id} 
                    className="list-group-item list-group-item-action border-0 mb-2"
                    style={{ background: '#fefae0' }}
                  >
                    <h5 className="mb-1" style={{ color: '#283618' }}>{post.title}</h5>
                    <p className="mb-1 text-truncate" style={{ color: '#606c38' }}>{post.body}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'albums' && (
          <div className="albums-container">
            <h2 className="mb-4" style={{ color: '#283618' }}>Albümler</h2>
            {albums.length === 0 ? (
              <div className="alert" style={{ background: '#fefae0', color: '#283618' }}>
                <i className="bi bi-info-circle me-2"></i>
                Hiç albüm bulunamadı.
              </div>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 g-4">
                {albums.map(album => (
                  <div className="col" key={album.id}>
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body" style={{ background: '#fefae0' }}>
                        <h5 className="card-title" style={{ color: '#283618' }}>{album.title}</h5>
                      </div>
                      <div className="card-footer" style={{ 
                        background: '#fefae0',
                        borderTop: 'none'
                      }}>
                        <Link 
                          to={`/users/${user.id}/albums/${album.id}`} 
                          className="btn d-block"
                          style={{ 
                            background: 'linear-gradient(45deg, #bc6c25 0%, #dda15e 100%)',
                            borderColor: 'transparent',
                            color: 'white'
                          }}
                        >
                          <i className="bi bi-images me-1"></i>
                          Albüme Git
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'todos' && (
          <div className="todos-container">
            <h2 className="mb-4" style={{ color: '#283618' }}>Yapılacaklar</h2>
            {todos.length === 0 ? (
              <div className="alert" style={{ background: '#fefae0', color: '#283618' }}>
                <i className="bi bi-info-circle me-2"></i>
                Hiç yapılacak iş bulunamadı.
              </div>
            ) : (
              <div className="list-group shadow-sm">
                {todos.map(todo => (
                  <div 
                    key={todo.id} 
                    className="list-group-item border-0 mb-2"
                    style={{ 
                      background: todo.completed ? 'rgba(96, 108, 56, 0.15)' : '#fefae0',
                      borderRadius: '8px'
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <input 
                        type="checkbox" 
                        className="form-check-input me-3" 
                        checked={todo.completed} 
                        onChange={() => {}} 
                        disabled 
                        style={{ 
                          borderColor: '#606c38',
                          backgroundColor: todo.completed ? '#606c38' : 'transparent'
                        }}
                      />
                      <span style={{ 
                        textDecoration: todo.completed ? 'line-through' : 'none',
                        color: '#283618'
                      }}>
                        {todo.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetail; 