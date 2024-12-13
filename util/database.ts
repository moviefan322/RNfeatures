import * as SQLite from "expo-sqlite";

import { Place } from "../models/Place";

const database = SQLite.openDatabaseSync("places.db");

export function init() {
  return database.runAsync(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            imageUri TEXT NOT NULL,
            address TEXT NOT NULL,
            lat REAL NOT NULL,
            lng REAL NOT NULL
        )
    `);
}

export function insertPlace(place: Place) {
  return database.runAsync(
    `
            INSERT INTO places (title, imageUri, address, lat, lng)
            VALUES (?, ?, ?, ?, ?)
        `,
    [
      place.title,
      place.imageUri,
      place.address,
      place.location.lat,
      place.location.lng,
    ]
  );
}

export async function fetchPlaces() {
  const result: any[] = await database.getAllAsync("SELECT * FROM places");

  const places = [];

  for (const dp of result) {
    places.push(
      new Place(dp.title, dp.imageUri, {
        address: dp.address,
        lat: dp.lat,
        lng: dp.lng,
      })
    );
  }

  return places;
}

export async function fetchPlaceDetails(id: any) {
  const dbPlace = (await database.getFirstAsync(
    "SELECT * FROM places WHERE id = ?",
    [id]
  )) as {
    id: number;
    title: string;
    imageUri: string;
    address: string;
    lat: number;
    lng: number;
  };
  const location = {
    lat: dbPlace.lat.toString(),
    lng: dbPlace.lng.toString(),
    address: dbPlace.address,
  };
  const place = new Place(dbPlace.title, dbPlace.imageUri, location);

  return place;
}
