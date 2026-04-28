import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import DetailPage from "./pages/DetailPage";
import Footer from "./components/Footer";

function App() {
    return (
        <div className="app-wrapper">
            <Navbar />
            <main className="container py-4">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/create" element={<CreatePage />} />
                    <Route path="/edit/:id" element={<EditPage />} />
                    <Route path="/detail/:id" element={<DetailPage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
