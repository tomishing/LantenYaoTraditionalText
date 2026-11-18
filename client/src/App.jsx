import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import About from "./pages/About";
import MigrationLaos from "./pages/MigrationLaos";
import MigrationChina from "./pages/MigrationChina";
import Photoshooting from "./pages/Photoshooting";
import Footer from "./components/Footer";
import References from "./pages/References";
import Rituals from "./pages/Rituals";
import "./App.css";

function App() {
    return (
        <div className="app-wrapper">
            <Navbar />
            <main className="container py-4">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/detail/:id" element={<DetailPage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/migrationlaos" element={<MigrationLaos />} />
                    <Route
                        path="/migrationchina"
                        element={<MigrationChina />}
                    />
                    <Route path="/photoshooting" element={<Photoshooting />} />
                    <Route path="/references" element={<References />} />
                    <Route path="/rituals" element={<Rituals />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
