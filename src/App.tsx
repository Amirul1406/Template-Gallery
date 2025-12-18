import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Gallery from './pages/Gallery';
import ComponentDetail from './pages/ComponentDetail';
import ColorPalette from './pages/ColorPalette';
import LayoutGenerator from './pages/LayoutGenerator';
import ResponsiveTester from './pages/ResponsiveTester';
import UnrealEngine from './pages/UnrealEngine';
import Library from './pages/Library';

function App() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/component/:id" element={<ComponentDetail />} />
        <Route path="/colors" element={<ColorPalette />} />
        <Route path="/layouts" element={<LayoutGenerator />} />
        <Route path="/responsive" element={<ResponsiveTester />} />
        <Route path="/unreal-engine" element={<UnrealEngine />} />
        <Route path="/library" element={<Library />} />
      </Routes>
    </div>
  );
}

export default App;

