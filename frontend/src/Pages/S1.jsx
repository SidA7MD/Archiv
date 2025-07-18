import React from 'react';
import { useNavigate } from 'react-router-dom';

const cards = [
  {
    title: 'Cours',
    path: '/cours',
    image: 'https://erasmusplus.ma/wp-content/uploads/2020/03/e-learning-icones-.jpg',
    icon: '📚',
    date: '30.11.2023',
    description: 'Accédez à tous les documents et ressources du cours',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    title: 'Devoirs',
    path: '/devoirs',
    image: 'https://cdn.evopresse.ca/content/user_files/sites/2/2023/04/20005909/ZMayotte_devoirs_EF.jpg',
    icon: '📝',
    date: '28.11.2023',
    description: 'Consultez et soumettez vos devoirs',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
  },
  {
    title: 'Compositions',
    path: '/compositions',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1373&q=80',
    icon: '📊',
    date: '15.12.2023',
    description: 'Préparez vos examens avec les annales',
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  },
  {
    title: 'TD',
    path: '/td',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYNUqnutUlDyErbjmQaZOFehCaTD6Ize8FNw&s',
    icon: '🧮',
    date: '05.12.2023',
    description: 'Travaux dirigés et exercices pratiques',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    title: 'TP',
    path: '/tp',
    image: 'https://media.licdn.com/dms/image/v2/D4E0BAQEpF_t8GV2wjw/company-logo_200_200/company-logo_200_200/0/1680709072047?e=2147483647&v=beta&t=x3gkQ2xKwwRDlIysw1JVA-vbvh39EEZvd4WFy-x7O0Y',
    icon: '🔬',
    date: '12.12.2023',
    description: 'Travaux pratiques et laboratoires',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
  {
    title: 'Rattrapages',
    path: '/rattrapages',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
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