import { createBrowserRouter, RouterProvider, useRouteError } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Users, { usersLoader } from './pages/Users'
import UserDetail, { userDetailLoader } from './pages/UserDetail'
import PostDetail, { postDetailLoader } from './pages/PostDetail'
import AlbumDetail, { albumDetailLoader } from './pages/AlbumDetail'
import Favorites from './pages/Favorites'

// Hata sayfasını inline olarak tanımlayalım
const ErrorPage = () => {
  const error = useRouteError();
  let errorMessage = 'Bilinmeyen bir hata oluştu';

  if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center p-4" 
         style={{ 
           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
         }}>
      <div className="bg-white p-5 rounded-4 shadow-lg" style={{ maxWidth: '500px' }}>
        <h1 className="display-1 text-danger mb-4">Hata!</h1>
        <p className="lead mb-4">{errorMessage}</p>
        <a href="/" className="btn btn-primary btn-lg px-4">Ana Sayfaya Dön</a>
      </div>
    </div>
  );
};

// Ana sayfa içeriği
const HomePage = () => {
  return (
    <>
      {/* Hero Section - Full Width */}
      <div className="w-100 px-0 mb-5" style={{ width: '100%', maxWidth: '100vw' }}>
        <div className="py-5 w-100" 
             style={{ 
               background: 'linear-gradient(135deg, #606c38 0%, #283618 100%)',
               boxShadow: '0 4px 10px rgba(40, 54, 24, 0.2)',
               width: '100%',
               maxWidth: '100vw'
             }}>
          <div className="container-fluid text-center text-white py-md-5 py-4" style={{ width: '100%', maxWidth: '100vw' }}>
            <h1 className="display-3 fw-bold mb-3">JSONPlaceholder UI</h1>
            <p className="lead mb-4 px-md-5" style={{ maxWidth: '800px', margin: '0 auto' }}>
              Modern bir arayüz ile JSONPlaceholder API verilerini keşfedin
            </p>
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mt-4">
              <a href="/users" className="btn btn-light btn-lg fw-bold" style={{ 
                background: '#fefae0',
                color: '#283618' 
              }}>
                <i className="bi bi-people me-2"></i>
                Kullanıcıları Görüntüle
              </a>
              <a href="https://jsonplaceholder.typicode.com/" target="_blank" rel="noopener noreferrer" 
                 className="btn btn-outline-light btn-lg">
                <i className="bi bi-box-arrow-up-right me-2"></i>
                JSONPlaceholder API
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Feature Cards */}
      <div className="row g-4 mb-5 w-100" style={{ width: '100%', maxWidth: '100vw' }}>
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="card-body p-4" style={{ background: 'linear-gradient(180deg, #fefae0 0%, #dda15e 100%)' }}>
              <div className="mb-3 text-primary">
                <i className="bi bi-people-fill display-4" style={{ color: '#283618' }}></i>
              </div>
              <h3 className="card-title fw-bold" style={{ color: '#283618' }}>10 Kullanıcı</h3>
              <p className="card-text" style={{ color: '#606c38' }}>Farklı kullanıcı profilleri ve onların içerikleri</p>
              <a href="/users" className="btn mt-3" style={{ 
                background: '#606c38',
                color: '#fefae0',
                borderColor: 'transparent' 
              }}>Kullanıcıları Gör</a>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="card-body p-4" style={{ background: 'linear-gradient(180deg, #fefae0 0%, #dda15e 100%)' }}>
              <div className="mb-3 text-primary">
                <i className="bi bi-file-text-fill display-4" style={{ color: '#283618' }}></i>
              </div>
              <h3 className="card-title fw-bold" style={{ color: '#283618' }}>100 Gönderi</h3>
              <p className="card-text" style={{ color: '#606c38' }}>Kullanıcılar tarafından oluşturulan gönderiler ve yorumlar</p>
              <a href="/users" className="btn mt-3" style={{ 
                background: '#606c38',
                color: '#fefae0',
                borderColor: 'transparent' 
              }}>Gönderileri Gör</a>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="card-body p-4" style={{ background: 'linear-gradient(180deg, #fefae0 0%, #dda15e 100%)' }}>
              <div className="mb-3 text-primary">
                <i className="bi bi-images display-4" style={{ color: '#283618' }}></i>
              </div>
              <h3 className="card-title fw-bold" style={{ color: '#283618' }}>5000 Fotoğraf</h3>
              <p className="card-text" style={{ color: '#606c38' }}>Albümlerde düzenlenmiş çeşitli fotoğraflar</p>
              <a href="/users" className="btn mt-3" style={{ 
                background: '#606c38',
                color: '#fefae0',
                borderColor: 'transparent' 
              }}>Albümleri Gör</a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-5 w-100" style={{ width: '100%', maxWidth: '100vw' }}>
        <div className="card-body p-4" 
             style={{ 
               background: 'linear-gradient(135deg, #bc6c25 0%, #dda15e 100%)' 
             }}>
          <div className="row align-items-center" style={{ width: '100%', maxWidth: '100vw' }}>
            <div className="col-lg-8 text-white">
              <h3 className="fw-bold mb-3">Favori İçeriklerinizi Kaydedin</h3>
              <p className="mb-0 mb-md-0">Beğendiğiniz gönderi ve fotoğrafları favorilerinize ekleyerek daha sonra kolayca ulaşabilirsiniz.</p>
            </div>
            <div className="col-lg-4 text-md-end mt-3 mt-lg-0">
              <a href="/favorites" className="btn btn-lg" style={{
                background: '#fefae0',
                color: '#283618'
              }}>
                <i className="bi bi-heart-fill me-2" style={{ color: '#bc6c25' }}></i>
                Favorilerime Git
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'users',
        element: <Users />,
        loader: usersLoader
      },
      {
        path: 'users/:userId',
        element: <UserDetail />,
        loader: userDetailLoader
      },
      {
        path: 'users/:userId/posts/:postId',
        element: <PostDetail />,
        loader: postDetailLoader
      },
      {
        path: 'users/:userId/albums/:albumId',
        element: <AlbumDetail />,
        loader: albumDetailLoader
      },
      {
        path: 'favorites',
        element: <Favorites />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
