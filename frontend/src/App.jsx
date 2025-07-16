import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SingUpform';
import Header from './components/Header';
import Background from './components/Background';

import S1 from './Pages/S1';
import S1cours from './Pages/S1cours';
import S1devoirs from './Pages/S1devoirs';
import S1Compositions from './Pages/S1Compositions';
import S1TD from './Pages/S1TD';
import S1TP from './Pages/S1TP';
import S1Rattrapages from './Pages/S1Rattrapages';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Background />
      <Routes>
        {/* General routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />

        {/* Semester 1 main + sub routes */}
        <Route path="/s1" element={<S1 />} />
        <Route path="/cours" element={<S1cours />} />
        <Route path="/devoirs" element={<S1devoirs />} />
        <Route path="/compositions" element={<S1Compositions />} />
        <Route path="/td" element={<S1TD />} />
        <Route path="/tp" element={<S1TP />} />
        <Route path="/rattrapages" element={<S1Rattrapages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
