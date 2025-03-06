import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import useFavoriteStore from '../store/favoriteStore';
import { Photo } from '../types/apiTypes';

declare global {
  interface Window {
    bootstrap: {
      Modal: {
        getInstance: (element: Element) => {
          show: () => void;
          hide: () => void;
        } | null;
        getOrCreateInstance: (element: Element) => {
          show: () => void;
          hide: () => void;
        };
      };
    };
  }
}

const Favorites = () => {
  const [activeTab, setActiveTab] = useState<'photos' | 'posts'>('photos');
  const favoritePhotos = useFavoriteStore(state => state.photos);
  const favoritePosts = useFavoriteStore(state => state.posts);
  const removeFavoritePhoto = useFavoriteStore(state => state.removeFavoritePhoto);
  const removeFavoritePost = useFavoriteStore(state => state.removeFavoritePost);
  const [activePhoto, setActivePhoto] = useState<Photo | null>(null);
  const photoModalRef = useRef<HTMLDivElement>(null);
  
  // Modal işlemleri için Bootstrap JS kullanımı
  const openPhotoModal = (photo: Photo) => {
    setActivePhoto(photo);
    if (photoModalRef.current) {
      const modal = window.bootstrap.Modal.getOrCreateInstance(photoModalRef.current);
      modal.show();
    }
  };
  
  const closePhotoModal = () => {
    if (photoModalRef.current) {
      const modal = window.bootstrap.Modal.getOrCreateInstance(photoModalRef.current);
      modal.hide();
      // Modal tamamen kapandığında activePhoto'yu sıfırlayalım
      photoModalRef.current.addEventListener('hidden.bs.modal', () => {
        setActivePhoto(null);
      }, { once: true });
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0" style={{ color: '#283618' }}>Favorilerim</h1>
        <div className="bg-light rounded-pill py-2 px-3" style={{ 
          background: `linear-gradient(90deg, #fefae0 0%, #dda15e 100%)!important`,
          color: '#283618' 
        }}>
          <i className="bi bi-heart-fill me-2" style={{ color: '#bc6c25' }}></i>
          {favoritePhotos.length + favoritePosts.length} öğe
        </div>
      </div>
      
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'photos' ? 'active' : ''}`}
            style={{ 
              color: activeTab === 'photos' ? '#283618' : '#606c38',
              borderColor: activeTab === 'photos' ? '#dda15e' : 'transparent',
              borderBottom: activeTab === 'photos' ? '2px solid #bc6c25' : 'none'
            }}
            onClick={() => setActiveTab('photos')}
          >
            Fotoğraflar 
            <span className="badge ms-2" style={{ 
              background: '#606c38',
              color: '#fefae0'
            }}>{favoritePhotos.length}</span>
          </button>
        </li>
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
            }}>{favoritePosts.length}</span>
          </button>
        </li>
      </ul>
      
      {activeTab === 'photos' && (
        <>
          {favoritePhotos.length === 0 ? (
            <div className="alert border-0 shadow-sm" style={{ 
              background: 'linear-gradient(90deg, #fefae0 0%, #dda15e 40%)',
              color: '#283618' 
            }}>
              <i className="bi bi-info-circle me-2"></i>
              Favori fotoğrafınız bulunmuyor. Albümlere göz atarak favorilerinize fotoğraf ekleyebilirsiniz.
            </div>
          ) : (
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
              {favoritePhotos.map(photo => (
                <div key={photo.id} className="col">
                  <div className="card h-100 border-0 shadow-sm">
                    <div 
                      className="photo-thumbnail"
                      style={{ 
                        position: 'relative',
                        paddingTop: '100%', 
                        overflow: 'hidden',
                        cursor: 'pointer',
                        borderRadius: '8px 8px 0 0'
                      }}
                      onClick={() => openPhotoModal(photo)}
                    >
                      <img 
                        src={photo.thumbnailUrl} 
                        alt={photo.title}
                        className="img-fluid"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                    <div className="card-body" style={{ background: '#fefae0' }}>
                      <h5 className="card-title text-truncate" style={{ color: '#283618' }}>{photo.title}</h5>
                      <div className="d-flex mt-2">
                        {photo.userId && (
                          <Link
                            to={`/users/${photo.userId}/albums/${photo.albumId}`}
                            className="btn btn-sm me-2"
                            style={{ 
                              background: '#606c38',
                              color: '#fefae0',
                              border: 'none'
                            }}
                          >
                            <i className="bi bi-images me-1"></i>
                            Albüme Git
                          </Link>
                        )}
                        <button 
                          className="btn btn-sm"
                          style={{ 
                            background: '#bc6c25',
                            color: '#fefae0',
                            border: 'none'
                          }}
                          onClick={() => removeFavoritePhoto(photo.id)}
                        >
                          <i className="bi bi-trash me-1"></i>
                          Kaldır
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      
      {activeTab === 'posts' && (
        <>
          {favoritePosts.length === 0 ? (
            <div className="alert border-0 shadow-sm" style={{ 
              background: 'linear-gradient(90deg, #fefae0 0%, #dda15e 40%)',
              color: '#283618' 
            }}>
              <i className="bi bi-info-circle me-2"></i>
              Favori gönderiniz bulunmuyor. Kullanıcıların gönderilerine göz atarak favorilerinize gönderi ekleyebilirsiniz.
            </div>
          ) : (
            <div className="list-group shadow-sm">
              {favoritePosts.map(post => (
                <div key={post.id} className="list-group-item border-0 mb-3" style={{ background: '#fefae0' }}>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h5 className="mb-1" style={{ color: '#283618' }}>{post.title}</h5>
                      <p className="mb-1" style={{ color: '#606c38' }}>{post.body}</p>
                      <div className="mt-2">
                        <Link 
                          to={`/users/${post.userId}/posts/${post.id}`} 
                          className="btn btn-sm me-2"
                          style={{ 
                            background: '#606c38',
                            color: '#fefae0',
                            border: 'none'
                          }}
                        >
                          <i className="bi bi-eye me-1"></i>
                          Detayları Görüntüle
                        </Link>
                        <button 
                          className="btn btn-sm"
                          style={{ 
                            background: '#bc6c25',
                            color: '#fefae0',
                            border: 'none'
                          }}
                          onClick={() => removeFavoritePost(post.id)}
                        >
                          <i className="bi bi-trash me-1"></i>
                          Favorilerden Kaldır
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      
      {/* Bootstrap Modal */}
      <div className="modal fade" id="photoModal" tabIndex={-1} ref={photoModalRef}>
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content" style={{ background: '#fefae0' }}>
            {activePhoto && (
              <>
                <div className="modal-header" style={{ 
                  background: 'linear-gradient(90deg, #606c38 0%, #283618 100%)',
                  color: 'white', 
                  borderBottom: 'none'
                }}>
                  <h5 className="modal-title">{activePhoto.title}</h5>
                  <button 
                    type="button" 
                    className="btn-close btn-close-white" 
                    onClick={closePhotoModal}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body text-center">
                  <img 
                    src={activePhoto.url} 
                    alt={activePhoto.title} 
                    className="img-fluid rounded"
                  />
                </div>
                <div className="modal-footer" style={{ borderTop: 'none' }}>
                  {activePhoto.userId && (
                    <Link
                      to={`/users/${activePhoto.userId}/albums/${activePhoto.albumId}`}
                      className="btn me-auto"
                      style={{ 
                        background: '#606c38',
                        color: '#fefae0',
                        border: 'none'
                      }}
                      onClick={closePhotoModal}
                    >
                      <i className="bi bi-images me-2"></i>
                      Albüme Git
                    </Link>
                  )}
                  <button 
                    type="button" 
                    className="btn"
                    style={{ 
                      background: '#bc6c25',
                      color: '#fefae0',
                      border: 'none'
                    }}
                    onClick={closePhotoModal}
                  >
                    Kapat
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites; 