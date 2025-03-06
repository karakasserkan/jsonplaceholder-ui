import { useLoaderData, Link } from 'react-router-dom';
import { User } from '../types/apiTypes';
import { usersLoader } from '../loaders/userLoaders';

export { usersLoader };

const Users = () => {
  const users = useLoaderData() as User[];

  return (
    <div className="py-3 py-md-4 w-100" style={{ width: '100%', maxWidth: '100vw' }}>
      {/* Başlık Bölümü - Gradient Arka Plan */}
      <div className="card mb-4 border-0 shadow-sm rounded-3 overflow-hidden w-100" style={{ width: '100%', maxWidth: '100vw' }}>
        <div className="card-body p-4 p-md-5 w-100" 
             style={{ 
               background: 'linear-gradient(135deg, #606c38 0%, #283618 100%)',
               width: '100%',
               maxWidth: '100vw'
             }}>
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between w-100">
            <div className="text-white mb-3 mb-md-0">
              <h1 className="fw-bold mb-1">
                <i className="bi bi-people-fill me-2"></i>
                Kullanıcılar
              </h1>
              <p className="mb-0 lead">JSONPlaceholder'daki tüm kullanıcılar</p>
            </div>
            <span className="badge rounded-pill px-3 py-2 fs-6"
                  style={{ 
                    background: 'linear-gradient(45deg, #fefae0 0%, #dda15e 100%)',
                    color: '#283618'
                  }}>
              {users.length} kullanıcı
            </span>
          </div>
        </div>
      </div>
      
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 w-100" style={{ width: '100%', maxWidth: '100vw' }}>
        {users.map((user) => (
          <div key={user.id} className="col">
            <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="card-header text-white border-0 py-3"
                   style={{ 
                     background: `linear-gradient(45deg, hsl(${user.id * 15 + 30}, 65%, 40%) 0%, hsl(${user.id * 15 + 45}, 70%, 50%) 100%)` 
                   }}>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="bg-white rounded-circle d-flex align-items-center justify-content-center" 
                         style={{ 
                           width: '42px', 
                           height: '42px', 
                           fontSize: '1.25rem',
                           color: '#283618'
                         }}>
                      {user.name.charAt(0)}
                    </div>
                    <div className="ms-3">
                      <h5 className="card-title fw-bold mb-0">{user.name}</h5>
                      <div className="text-white opacity-75 small">@{user.username}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card-body p-4" style={{ background: '#fefae0' }}>
                <div className="card-text">
                  <div className="mb-2">
                    <i className="bi bi-envelope text-primary me-2" style={{ color: '#606c38!important' }}></i>
                    <a href={`mailto:${user.email}`} className="text-decoration-none" style={{ color: '#283618' }}>{user.email}</a>
                  </div>
                  
                  <div className="mb-2">
                    <i className="bi bi-phone text-primary me-2" style={{ color: '#606c38!important' }}></i>
                    <span style={{ color: '#283618' }}>{user.phone}</span>
                  </div>
                  
                  <div className="mb-3">
                    <i className="bi bi-globe text-primary me-2" style={{ color: '#606c38!important' }}></i>
                    <a href={`https://${user.website}`} target="_blank" rel="noreferrer" className="text-decoration-none" style={{ color: '#283618' }}>
                      {user.website}
                    </a>
                  </div>
                  
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-building text-primary me-2" style={{ color: '#606c38!important' }}></i>
                    <span className="text-truncate" style={{ color: '#283618' }}>{user.company.name}</span>
                  </div>
                  
                  <div className="d-flex align-items-center">
                    <i className="bi bi-geo-alt text-primary me-2" style={{ color: '#606c38!important' }}></i>
                    <span className="text-truncate" style={{ color: '#283618' }}>{user.address.city}</span>
                  </div>
                </div>
              </div>
              
              <div className="card-footer bg-transparent border-top-0 p-4 pt-0" style={{ background: '#fefae0' }}>
                <Link 
                  to={`/users/${user.id}`} 
                  className="btn d-block"
                  style={{ 
                    background: `linear-gradient(45deg, #bc6c25 0%, #dda15e 100%)`,
                    borderColor: 'transparent',
                    color: 'white'
                  }}
                >
                  <i className="bi bi-person-lines-fill me-2"></i>
                  Profili Görüntüle
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users; 