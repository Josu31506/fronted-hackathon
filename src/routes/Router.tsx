import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Listings } from '../pages/Listings';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { MapPage } from '../pages/MapPage';
import { Navbar } from '../components/Navbar';

export const Router = () => (
  <div className="min-h-screen bg-page text-slate-900">
    <Navbar />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/avisos" element={<Listings />} />
        <Route path="/mapa" element={<MapPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  </div>
);
