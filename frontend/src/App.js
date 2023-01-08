import StartPage from './pages/StartPage';
import BattlePage from './pages/BattlePage';
import GalleryPage from './pages/GalleryPage';
import MakeHamsterPage from './pages/MakeHamsterPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <div className="app">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/battle" element={<BattlePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/newHamster" element={<MakeHamsterPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
