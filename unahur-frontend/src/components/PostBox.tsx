// src/components/QuickPostBox.tsx
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

const QuickPostBox = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div 
      className="card border-0 shadow-sm rounded-4 mb-5 p-3" 
      onClick={() => navigate('/new-post')}
      style={{ cursor: 'pointer' }}
    >
      <div className="d-flex align-items-center">
        <div 
          className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center me-3 flex-shrink-0 shadow-sm" 
          style={{ width: '45px', height: '45px', fontSize: '1.2rem', fontWeight: 'bold' }}
        >
          {user.nickName.charAt(0).toUpperCase()}
        </div>
        
        <div 
          className="form-control bg-light border-0 rounded-pill text-muted px-4 py-2 w-100 d-flex align-items-center" 
          style={{ height: '50px', cursor: 'pointer' }}
        >
          ¿Qué estás pensando, {user.nickName}?
        </div>
      </div>
    </div>
  );
};

export default QuickPostBox;