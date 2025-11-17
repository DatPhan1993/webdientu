import { Spinner } from 'react-bootstrap';
import './Loading.css';

const Loading = ({ fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="loading-fullscreen">
        <div className="text-center">
          <Spinner animation="border" role="status" variant="primary" style={{ width: '4rem', height: '4rem' }}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3 text-muted fs-5">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-5">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <p className="mt-2 text-muted">Đang tải...</p>
    </div>
  );
};

export default Loading;

