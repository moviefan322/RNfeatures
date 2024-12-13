export class Place {
  title: string;
  imageUri: string;
  address: string;
  location: { lat: string; lng: string };
  id: string;

  constructor(
    title: string,
    imageUri: string,
    location: { lat: string; lng: string; address: string }
  ) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = { lat: location.lat, lng: location.lng };
    this.id = new Date().toISOString();
  }
}
