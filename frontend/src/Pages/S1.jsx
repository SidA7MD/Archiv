import React from 'react';
import { useNavigate } from 'react-router-dom';

const cards = [
  {
    title: 'Cours',
    path: '/cours',
    image: 'https://i.pinimg.com/736x/ea/c1/94/eac194c170210319a1c0906a4169ad79.jpg',
    icon: '📚',
    date: '30.11.2023',
    description: 'Accédez à tous les documents et ressources du cours',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    title: 'Devoirs',
    path: '/devoirs',
    image: 'https://i.pinimg.com/736x/53/ad/2b/53ad2bc43869800df382394fa29419d6.jpg',
    icon: '📝',
    date: '28.11.2023',
    description: 'Consultez et soumettez vos devoirs',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
  },
  {
    title: 'Compositions',
    path: '/compositions',
    image: 'https://i.pinimg.com/736x/65/f7/4a/65f74ad156b5b5fcd256695209b114e7.jpg?',
    icon: '📊',
    date: '15.12.2023',
    description: 'Préparez vos examens avec les annales',
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  },
  {
    title: 'TD',
    path: '/td',
    image: 'https://png.pngtree.com/png-vector/20230729/ourlarge/pngtree-meeting-clipart-group-of-people-sitting-around-the-table-cartoon-vector-png-image_6811881.png',
    icon: '🧮',
    date: '05.12.2023',
    description: 'Travaux dirigés et exercices pratiques',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    title: 'TP',
    path: '/tp',
    image: 'https://media.gettyimages.com/id/519765301/vector/overhead-view-of-people-discussing-at-round-table.jpg?s=612x612&w=gi&k=20&c=-6vYwNdEFXbTh5e4vfHDXa5vLzD2cskB2ReOwAzth2g=',
    icon: '🔬',
    date: '12.12.2023',
    description: 'Travaux pratiques et laboratoires',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
  {
    title: 'Rattrapages',
    path: '/rattrapages',
    image: 'https://i.pinimg.com/736x/fd/6f/58/fd6f58b85308c304c7dd406453ff42f8.jpg',
    icon: '🔄',
    date: '20.01.2024',
    description: 'Documents pour les sessions de rattrapage',
    gradient: 'linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)',
  },
];

const S1 = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '32px',
        padding: '40px',
        // background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        minHeight: '30vh',
      }}
    >
      {cards.map((card, i) => (
        <div
          key={i}
          onClick={() => navigate(card.path)}
          style={{
            position: 'relative',
            height: '420px',
            borderRadius: '15px',
            // border: '1px solid #fff',
            overflow: 'hidden',
            backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url(${card.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            cursor: 'pointer',
            boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
          //  alignItems:'center',
            justifyContent: 'flex-end',
          }}
          // onMouseEnter={(e) => {
          //   // e.currentTarget.style.transform = 'translateY(-10px)';
          //   // e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
          // }}
          // onMouseLeave={(e) => {
          //   e.currentTarget.style.transform = 'translateY(0)';
          //   e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
          // }}
        >
          <div
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(5px)',
              padding: '8px 12px',
              borderRadius: '20px',
              fontSize: '14px',
              color: 'white',
              fontWeight: '600',
              display:'none',
            }}
          >
            {card.date}
          </div>
          
          <div
            style={{
              padding: '25px',
              color: 'white',
              // background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(10px)',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
            }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '15px',
              gap: '15px'
            }}>
              <div style={{
                fontSize: '32px',
                width: '60px',
                height: '60px',
                borderRadius: '15px',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {card.icon}
              </div>
              <div>
                <h3 style={{ 
                  fontSize: '22px', 
                  margin: 0, 
                  fontWeight: '700',
                  marginBottom: '5px'
                }}>
                  {card.title}
                </h3>
                <p style={{ 
                  fontSize: '14px', 
                  margin: 0,
                  opacity: 0.9
                }}>
                  {card.description}
                </p>
              </div>
            </div>
            
            <button
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '50px',
                fontSize: '14px',
                cursor: 'pointer',
                fontWeight: '600',
                width: '100%',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.3)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
            >
              Accéder maintenant
              <span style={{ fontSize: '16px' }}>→</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default S1;