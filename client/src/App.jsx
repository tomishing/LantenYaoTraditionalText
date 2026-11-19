import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import About from "./pages/About";
import MigrationLaos from "./pages/MigrationLaos";
import MigrationChina from "./pages/MigrationChina";
import Photoshooting from "./pages/Photoshooting";
import Footer from "./components/Footer";
import Seo from "./components/Seo";
import References from "./pages/References";
import Rituals from "./pages/Rituals";
import Copyright from "./pages/Copyright";
import "./App.css";

const page = (title, description, element) => (
    <>
        <Seo title={title} description={description} />
        {element}
    </>
);

function App() {
    return (
        <div className="app-wrapper">
            <Navbar />
            <main className="container py-4">
                <Routes>
                    <Route
                        path="/"
                        element={page(
                            "Search Texts",
                            "Search and browse digitized Taoist ritual manuscripts of the Lanten Yao of northern Laos by title, ritual, category, province, district and village.",
                            <HomePage />,
                        )}
                    />
                    <Route path="/detail/:id" element={<DetailPage />} />
                    <Route
                        path="/about"
                        element={page(
                            "Overview",
                            "About the project “The Preservation, Compilation and Reading of Lanten Yao Traditional Texts in Northern Laos” (2009–2010), with the National Library of Laos and the Toyota Foundation.",
                            <About />,
                        )}
                    />
                    <Route
                        path="/migrationlaos"
                        element={page(
                            "History of Migration Based on Narratives",
                            "Oral narratives of the Lanten Yao migration into Laos, including Phongsaly, Oudomxay and Bokeo provinces.",
                            <MigrationLaos />,
                        )}
                    />
                    <Route
                        path="/migrationchina"
                        element={page(
                            "History of Migration Based on Documents",
                            "The history of Lanten Yao migration from southern China to Laos, reconstructed from traditional documents.",
                            <MigrationChina />,
                        )}
                    />
                    <Route
                        path="/photoshooting"
                        element={page(
                            "Photographing in the Fields",
                            "How Lanten Yao manuscripts were photographed and digitized during fieldwork in northern Laos.",
                            <Photoshooting />,
                        )}
                    />
                    <Route
                        path="/references"
                        element={page(
                            "References",
                            "Bibliography of research on the Lanten (Lao Huay, Kim Mun, 藍靛瑶) and their Taoist ritual texts.",
                            <References />,
                        )}
                    />
                    <Route
                        path="/rituals"
                        element={page(
                            "Rituals and Traditional Texts",
                            "The main rituals of the Lanten Yao, such as ai jai (斎) and ai siu (醮), and the traditional texts used in each.",
                            <Rituals />,
                        )}
                    />
                    <Route
                        path="/copyright"
                        element={page(
                            "Copyright and Terms of Use",
                            "Copyright and terms of use for the images and texts in the Lanten Yao Traditional Text Archive.",
                            <Copyright />,
                        )}
                    />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
