import { useLoaderData, Link } from 'react-router-dom';
import { User, Album, Photo } from '../types/apiTypes';
import useFavoriteStore from '../store/favoriteStore';
import { useState } from 'react';
import { albumDetailLoader } from '../loaders/albumLoaders';

// Loader için dönen veri tipi
interface AlbumDetailData {
  album: Album;
  user: User;
  photos: Photo[];
}

export { albumDetailLoader };

const AlbumDetail = () => {
  const { album, user, photos } = useLoaderData() as AlbumDetailData;
  const [activePhoto, setActivePhoto] = useState<Photo | null>(null);

  const isFavorite = useFavoriteStore((state: { isPhotoFavorite: (id: number) => boolean }) => 
    (photoId: number) => state.isPhotoFavorite(photoId)
  );
  
  const addFavoritePhoto = useFavoriteStore((state: { addFavoritePhoto: (photo: Photo) => void }) => state.addFavoritePhoto);
  const removeFavoritePhoto = useFavoriteStore((state: { removeFavoritePhoto: (id: number) => void }) => state.removeFavoritePhoto);
  
  const handleToggleFavorite = (photo: Photo) => {
    if (isFavorite(photo.id)) {
      removeFavoritePhoto(photo.id);
    } else {
      // Kullanıcı ID'sini de ekliyoruz ki favorilerden bakınca kimin albümü olduğunu bilelim
      addFavoritePhoto({...photo, userId: user.id});
    }
  };
  
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="mb-0">{album.title}</h1>
          <Link to={`/users/${user.id}`} className="text-decoration-none">
            <div className="d-flex align-items-center mt-2">
              <i className="bi bi-person-circle me-2"></i>
              <span>{user.name}</span>
            </div>
          </Link>
        </div>
        <div>
          <Link to={`/users/${user.id}`} className="btn btn-outline-primary">
            <i className="bi bi-arrow-left me-2"></i>
            Kullanıcıya Dön
          </Link>
        </div>
      </div>
      
      {activePhoto && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{activePhoto.title}</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setActivePhoto(null)}
                ></button>
              </div>
              <div className="modal-body text-center">
                <img 
                  src={activePhoto.url} 
                  alt={activePhoto.title} 
                  className="img-fluid rounded"
                />
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className={`btn ${isFavorite(activePhoto.id) ? 'btn-danger' : 'btn-outline-danger'} me-auto`}
                  onClick={() => handleToggleFavorite(activePhoto)}
                >
                  <i className={`bi ${isFavorite(activePhoto.id) ? 'bi-heart-fill' : 'bi-heart'} me-2`}></i>
                  {isFavorite(activePhoto.id) ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setActivePhoto(null)}
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </div>
      )}
      
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
        {photos.map(photo => (
          <div key={photo.id} className="col">
            <div className="card h-100">
              <div 
                className="photo-thumbnail"
                style={{ 
                  position: 'relative',
                  paddingTop: '100%', 
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                onClick={() => setActivePhoto(photo)}
              >
                <img 
                  src={photo.thumbnailUrl} 
                  alt={photo.title}
                  className="img-fluid rounded-top"
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
              <div className="card-body">
                <h5 className="card-title text-truncate">{photo.title}</h5>
                <button 
                  type="button" 
                  className={`btn ${isFavorite(photo.id) ? 'btn-danger' : 'btn-outline-danger'} btn-sm mt-2`}
                  onClick={() => handleToggleFavorite(photo)}
                >
                  <i className={`bi ${isFavorite(photo.id) ? 'bi-heart-fill' : 'bi-heart'} me-2`}></i>
                  {isFavorite(photo.id) ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumDetail; 