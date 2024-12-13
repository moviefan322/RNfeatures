interface Place {
    id: string;
    title: string;
    imageUri: string;
    address: string;
    location: { lat: string; lng: string };
}

export default Place;