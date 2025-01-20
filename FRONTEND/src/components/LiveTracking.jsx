import { useState, useEffect } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import { Link } from 'react-router-dom';

const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: -3.745,
    lng: -38.523,
};

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(center);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({
                lat: latitude,
                lng: longitude,
            });
            setIsLoaded(true); // Set loaded state when position is obtained
        });

        const watchId = navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({
                lat: latitude,
                lng: longitude,
            });
        });

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    useEffect(() => {
        const updatePosition = () => {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setCurrentPosition({
                    lat: latitude,
                    lng: longitude
                });
            });
        };
    
        updatePosition(); // Initial position update
    
        // const intervalId = setInterval(updatePosition, 1000); // Update every 10 seconds
    }, []);

    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
            {isLoaded && ( // Render map only when position is loaded
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={currentPosition}
                    zoom={15}
                >
                    <Marker position={currentPosition} />
                </GoogleMap>
            )}
        </LoadScript>
    );
};

export default LiveTracking;


