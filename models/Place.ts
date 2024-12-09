class Place {
  constructor(
    title: string,
    imageUri: string,
    address: string,
    location: { lat: number; lng: number }
  ) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location;
    this.id = new Date().toISOString();
  }
}
