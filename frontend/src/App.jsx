import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SingUpform';
import Header from './components/Header';

import S1 from './Pages/S1';
// import AnimatedBackground from './components/Background';
import Background from './components/Background';
// Optional: Add S2–S5 when available

function App() {
  return (
    <BrowserRouter>
      <Header /> {/* ✅ Place Header outside <Routes> */}
    <Background></Background>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/s1" element={<S1 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
