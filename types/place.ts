interface Place {
    id: string;
    title: string;
    imageUri: string;
    address: string;
    location: { lat: number; lng: number };
}

export default Place;