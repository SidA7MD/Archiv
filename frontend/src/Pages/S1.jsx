import React from 'react';
import { useNavigate } from 'react-router-dom';

const cards = [
  {
    title: 'Cours',
    path: '/cours',
    image: 'https://i.pinimg.com/736x/ea/c1/94/eac194c170210319a1c0906a4169ad79.jpg',
    icon: '📚',
    description: 'Accédez à tous les documents et ressources du cours',
    gradient: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
    color: '#ff6b35'
  },
  {
    title: 'Devoirs',
    path: '/devoirs',
    image: 'https://i.pinimg.com/736x/53/ad/2b/53ad2bc43869800df382394fa29419d6.jpg',
    icon: '📝',
    description: 'Consultez et soumettez vos devoirs',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
    color: '#8b5cf6'
  },
  {
    title: 'Compositions',
    path: '/compositions',
    image: 'https://i.pinimg.com/736x/65/f7/4a/65f74ad156b5b5fcd256695209b114e7.jpg?',
    icon: '📊',
    description: 'Préparez vos examens avec les annales',
    gradient: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    color: '#4f46e5'
  },
  {
    title: 'TD',
    path: '/td',
    image: 'https://png.pngtree.com/png-vector/20230729/ourlarge/pngtree-meeting-clipart-group-of-people-sitting-around-the-table-cartoon-vector-png-image_6811881.png',
    icon: '🧮',
    description: 'Travaux dirigés et exercices pratiques',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
    color: '#06b6d4'
  },
  {
    title: 'TP',
    path: '/tp',
    image: 'https://media.gettyimages.com/id/519765301/vector/overhead-view-of-people-discussing-at-round-table.jpg?s=612x612&w=gi&k=20&c=-6vYwNdEFXbTh5e4vfHDXa5vLzD2cskB2ReOwAzth2g=',
    icon: '🔬',
    description: 'Travaux pratiques et laboratoires',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    color: '#f59e0b'
  },
  {
    title: 'Rattrapages',
    path: '/rattrapages',
    image: 'https://i.pinimg.com/736x/fd/6f/58/fd6f58b85308c304c7dd406453ff42f8.jpg',
    icon: '🔄',
    description: 'Documents pour les sessions de rattrapage',
    gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    color: '#ef4444'
  },
];

const S1 = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 'clamp(16px, 3vw, 24px)',
        padding: 'clamp(20px, 4vw, 40px)',
        minHeight: '120vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '1600px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {cards.map((card, i) => (
        <div
          key={i}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '400px',
            height: 'clamp(350px, 50vw, 400px)',
            background: 'white',
            borderRadius: '24px',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            justifySelf: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
          }}
          onClick={() => navigate(card.path)}
        >
          {/* Header with gradient and image */}
          <div
            style={{
              height: 'clamp(200px, 30vw, 230px)',
              background: card.gradient,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Background Image */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${card.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.25,
                mixBlendMode: 'overlay',
              }}
            />

            {/* Decorative Elements */}
            <div
              style={{
                position: 'absolute',
                top: 'clamp(-40px, -8vw, -50px)',
                right: 'clamp(-40px, -8vw, -50px)',
                width: 'clamp(100px, 20vw, 150px)',
                height: 'clamp(100px, 20vw, 150px)',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 'clamp(-20px, -4vw, -30px)',
                left: 'clamp(-20px, -4vw, -30px)',
                width: 'clamp(60px, 12vw, 80px)',
                height: 'clamp(70px, 14vw, 100px)',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '50%',
              }}
            />

            {/* Icon */}
            <div
              style={{
                position: 'absolute',
                top: 'clamp(16px, 3vw, 24px)',
                left: 'clamp(16px, 3vw, 24px)',
                width: 'clamp(48px, 8vw, 56px)',
                height: 'clamp(48px, 8vw, 56px)',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'clamp(20px, 4vw, 24px)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              {card.icon}
            </div>

            {/* Title */}
            <div
              style={{
                position: 'absolute',
                bottom: 'clamp(16px, 3vw, 24px)',
                left: 'clamp(16px, 3vw, 24px)',
                right: 'clamp(16px, 3vw, 24px)',
              }}
            >
              <h3
                style={{
                  fontSize: 'clamp(20px, 4vw, 24px)',
                  fontWeight: '700',
                  color: 'white',
                  margin: 0,
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                  lineHeight: '1.2',
                }}
              >
                {card.title}
              </h3>
            </div>
          </div>

          {/* Content */}
          <div
            style={{
              padding: 'clamp(16px, 3vw, 20px)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(12px, 2vw, 16px)',
              height: 'clamp(140px, 20vw, 180px)',
              justifyContent: 'space-between',
            }}
          >
            {/* Description */}
            <p
              style={{
                fontSize: 'clamp(12px, 2.5vw, 14px)',
                color: '#64748b',
                margin: 0,
                lineHeight: '1.5',
                fontWeight: '400',
              }}
            >
              {card.description}
            </p>

            {/* Button */}
            <button
              style={{
                background: `linear-gradient(135deg, ${card.color}15, ${card.color}08)`,
                border: `1px solid ${card.color}20`,
                color: card.color,
                padding: 'clamp(10px, 2vw, 12px) clamp(16px, 3vw, 20px)',
                borderRadius: '16px',
                fontSize: 'clamp(12px, 2.5vw, 14px)',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                top: 'clamp(-50px, -12vw, -80px)',
                gap: '8px',
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `linear-gradient(135deg, ${card.color}25, ${card.color}15)`;
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 8px 20px ${card.color}25`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `linear-gradient(135deg, ${card.color}15, ${card.color}08)`;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onClick={(e) => {
                e.stopPropagation();
                navigate(card.path);
              }}
            >
              <span>Ouvrir</span>
              <span style={{ fontSize: 'clamp(12px, 2.5vw, 14px)', opacity: 0.8, transition: 'transform 0.3s ease' }}>→</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default S1;