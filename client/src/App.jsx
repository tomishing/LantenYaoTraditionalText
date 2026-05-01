import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";
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
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/create" element={<CreatePage />} />
                    <Route path="/edit/:id" element={<EditPage />} />
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
