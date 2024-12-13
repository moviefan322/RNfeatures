const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export const getMapPreview = (lat: string, lng: string) => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
};

export const getAddress = async (lat: string, lng: string) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch address!");
  }

  const data = await response.json();
  const address = data.results[0].formatted_address;

  return address;
};
