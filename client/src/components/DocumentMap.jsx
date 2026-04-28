import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const containerStyle = {
    width: "100%",
    height: "400px",
};

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const fetchCoordinates = async (district) => {
    if (!district) return null;
    const res = await axios.get("http://localhost:3000/api/geocode", {
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

    // Define the position object from the fetched data
    const position = {
        lat: data.lat,
        lng: data.lng,
    };

    return (
        <LoadScriptNext googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={position}
                zoom={13}
            >
                <Marker position={position} />
            </GoogleMap>
        </LoadScriptNext>
    );
}

export default DocumentMap;
