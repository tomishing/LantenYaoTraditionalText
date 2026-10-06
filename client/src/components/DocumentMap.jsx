import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const containerStyle = {
    width: "100%",
    height: "400px",
};

// Bundlers break Leaflet's default icon URLs, so point them at the imported assets
const markerIconDefault = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowSize: [41, 41],
});

const fetchCoordinates = async (district) => {
    if (!district) return null;
    const res = await axios.get(`${import.meta.env.VITE_API_URL || ""}/api/geocode`, {
        params: { district },
    });
    return res.data;
};

function DocumentMap({ district }) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["coordinates", district],
        queryFn: () => fetchCoordinates(district),
        enabled: !!district,
        staleTime: 1000 * 60 * 60,
        retry: 1,
    });

    if (!district) {
        return <p className="text-center">No district selected</p>;
    }

    if (isLoading) {
        return <p className="text-center">Loading map...</p>;
    }

    // Check if data exists and contains valid numbers
    const isValidLocation =
        data && typeof data.lat === "number" && typeof data.lng === "number";

    if (isError || !isValidLocation) {
        return (
            <div className="text-center p-4 border border-danger rounded">
                <p className="text-danger mb-0">
                    Failed to load location for: {district}
                </p>
            </div>
        );
    }

    const position = [data.lat, data.lng];

    return (
        // MapContainer ignores center changes after mount, so remount on new coordinates
        <MapContainer
            key={position.join(",")}
            center={position}
            zoom={13}
            style={containerStyle}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={markerIconDefault} />
        </MapContainer>
    );
}

export default DocumentMap;
