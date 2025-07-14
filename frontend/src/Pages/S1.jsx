// ✅ S1.jsx - Fully Working, Icon-based Semester Component with Routing

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  ClipboardList,
  FileText,
  Layers,
  Terminal,
  Repeat,
} from 'lucide-react';
import '../components/S1.css';

const cards = [
  {
    title: 'Cours',
    path: '/cours',
    icon: <BookOpen size={28} />,
    gradient: 'linear-gradient(to right, #667eea, #764ba2)',
  },
  {
    title: 'Devoirs',
    path: '/devoirs',
    icon: <ClipboardList size={28} />,
    gradient: 'linear-gradient(to right, #f7971e, #ffd200)',
  },
  {
    title: 'Compositions',
    path: '/compositions',
    icon: <FileText size={28} />,
    gradient: 'linear-gradient(to right, #ff416c, #ff4b2b)',
  },
  {
    title: 'TD',
    path: '/td',
    icon: <Layers size={28} />,
    gradient: 'linear-gradient(to right, #00c6ff, #0072ff)',
  },
  {
    title: 'TP',
    path: '/tp',
    icon: <Terminal size={28} />,
    gradient: 'linear-gradient(to right, #43e97b, #38f9d7)',
  },
  {
    title: 'Rattrapages',
    path: '/rattrapages',
    icon: <Repeat size={28} />,
    gradient: 'linear-gradient(to right, #ff9a9e, #fad0c4)',
  },
];

export default function S1() {
  const navigate = useNavigate();

  return (
    <div className="s1-wrapper">
      {cards.map((card, index) => (
        <div className="s1-card" key={index} onClick={() => navigate(card.path)}>
          <div className="s1-wave" style={{ background: card.gradient }} />
          <div className="s1-icon">{card.icon}</div>
          <div className="s1-title">{card.title}</div>
        </div>
      ))}
    </div>
  );
}
