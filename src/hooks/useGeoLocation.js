import { useState } from "react";

export default function useGeoLocation() {
  const [detectedAddress, setDetectedAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const getLocation = async () => {
    if (!navigator.geolocation) {
      setDetectedAddress("您的瀏覽器不支援定位功能");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
        );
        const data = await response.json();

        if (data.results && data.results[0]) {
          setDetectedAddress(data.results[0].formatted_address);
        } else {
          setDetectedAddress("定位失敗，無法取得地址");
        }
      } catch (err) {
        setDetectedAddress("API 呼叫失敗");
      } finally {
        setLoading(false);
      }
    });
  };

  return { detectedAddress, getLocation, loading };
}
