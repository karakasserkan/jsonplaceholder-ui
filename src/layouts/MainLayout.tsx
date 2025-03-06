import { Outlet, Link } from 'react-router-dom';
import useFavoriteStore from '../store/favoriteStore';
import 'bootstrap/dist/css/bootstrap.min.css';

const MainLayout = () => {
  const favoritePhotos = useFavoriteStore((state) => state.photos);
  const favoritePosts = useFavoriteStore((state) => state.posts);
  const totalFavorites = favoritePhotos.length + favoritePosts.length;

  return (
    <div className="d-flex flex-column min-vh-100 w-100" style={{ maxWidth: '100vw' }}>
      {/* Navbar - Full width */}
      <header className="w-100" style={{ 
        background: 'linear-gradient(90deg, #283618 0%, #606c38 100%)',
        boxShadow: '0 4px 12px rgba(40, 54, 24, 0.2)',
        width: '100%',
        maxWidth: '100vw'
      }}>
        <nav className="navbar navbar-expand-lg py-3 w-100">
          <div className="container-fluid px-md-5 px-3" style={{ width: '100%', maxWidth: '100vw' }}>
            <Link to="/" className="navbar-brand fw-bold d-flex align-items-center text-white">
              <i className="bi bi-braces-asterisk me-2 fs-4"></i>
              JSONPlaceholder UI
            </Link>
            
            <button 
              className="navbar-toggler border-0"
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav" 
              aria-controls="navbarNav" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link d-flex align-items-center text-white px-3">
                    <i className="bi bi-house-door me-1"></i>
                    Ana Sayfa
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/users" className="nav-link d-flex align-items-center text-white px-3">
                    <i className="bi bi-people me-1"></i>
                    Kullanıcılar
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/favorites" className="nav-link d-flex align-items-center position-relative text-white px-3">
                    <i className="bi bi-heart me-1"></i>
                    Favoriler
                    {totalFavorites > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                            style={{ 
                              background: 'linear-gradient(45deg, #bc6c25 0%, #dda15e 100%)' 
                            }}>
                        {totalFavorites}
                      </span>
                    )}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      
      {/* Main Content - Full width */}
      <main className="flex-grow-1 py-5 w-100" style={{ background: '#fefae0', maxWidth: '100vw' }}>
        <div className="container-fluid px-md-5 px-3" style={{ width: '100%', maxWidth: '100vw' }}>
          <Outlet />
        </div>
      </main>
      
      {/* Footer - Full width */}
      <footer className="py-4 mt-auto w-100" 
              style={{ 
                background: 'linear-gradient(to right, #dda15e 0%, #fefae0 100%)',
                width: '100%',
                maxWidth: '100vw'
              }}>
        <div className="container-fluid px-md-5 px-3" style={{ width: '100%', maxWidth: '100vw' }}>
          <div className="row align-items-center" style={{ width: '100%', maxWidth: '100vw' }}>
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-0" style={{ color: '#283618' }}>&copy; {new Date().getFullYear()} JSONPlaceholder UI</p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <ul className="list-inline mb-0">
                <li className="list-inline-item">
                  <a href="https://jsonplaceholder.typicode.com/" 
                     target="_blank" 
                     rel="noreferrer"
                     className="text-decoration-none" 
                     style={{ color: '#283618' }}>
                    <i className="bi bi-box-arrow-up-right me-1"></i>
                    JSONPlaceholder
                  </a>
                </li>
                <li className="list-inline-item ms-3">
                  <Link 
                    to="/" 
                    className="text-decoration-none" 
                    style={{ color: '#283618' }}
                  >
                    <i className="bi bi-house-door me-1"></i>
                    Ana Sayfa
                  </Link>
                </li>
                <li className="list-inline-item ms-3">
                  <Link 
                    to="/favorites" 
                    className="text-decoration-none" 
                    style={{ color: '#283618' }}
                  >
                    <i className="bi bi-heart me-1"></i>
                    Favoriler
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout; 