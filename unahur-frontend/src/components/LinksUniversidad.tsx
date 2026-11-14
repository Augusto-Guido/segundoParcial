const LinksUniversidad = () => {
  const links = [
    { title: 'UNAHUR', icon: '🏛️', url: 'https://unahur.edu.ar/' },
    { title: 'Campus', icon: '💻', url: 'https://campus2026.unahur.edu.ar/login/index.php' },
    { title: 'SIU Guaraní', icon: '📝', url: 'https://servicios.unahur.edu.ar/unahur3w/' },
    { title: 'MATE', icon: '🧉', url: 'https://mate.unahur.edu.ar/' }
  ];

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-4 bg-white">
      <div className="card-body p-2 p-md-3">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
          {links.map((link, index) => (
            <a 
              key={index}
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-light d-flex flex-column align-items-center p-3 rounded-4 flex-grow-1"
              style={{ minWidth: '100px', border: '1px solid var(--bs-border-color-translucent)' }}
            >
              <span className="fs-2 mb-1">{link.icon}</span>
              <span className="fw-bold text-dark fs-6">{link.title}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinksUniversidad;