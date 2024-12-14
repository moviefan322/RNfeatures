import * as SQLite from "expo-sqlite";

import { Place } from "../models/Place";

const database = SQLite.openDatabaseSync("places.db");

export async function init() {
  try {
    console.log("Initializing DB...");
    await database.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat TEXT NOT NULL,
        lng TEXT NOT NULL
      )
    `);
    console.log("DB initialized successfully");
  } catch (error) {
    console.error("Failed to initialize DB:", error);
  }
}

// // `runAsync()` is useful when you want to execute some write operations.
// const result = await db.runAsync('INSERT INTO test (value, intValue) VALUES (?, ?)', 'aaa', 100);
// console.log(result.lastInsertRowId, result.changes);
// await db.runAsync('UPDATE test SET intValue = ? WHERE value = ?', 999, 'aaa'); // Binding unnamed parameters from variadic arguments
// await db.runAsync('UPDATE test SET intValue = ? WHERE value = ?', [999, 'aaa']); // Binding unnamed parameters from array
// await db.runAsync('DELETE FROM test WHERE value = $value', { $value: 'aaa' }); // Binding named parameters from object

export function insertPlace(place: Place) {
  const insertion = database.runAsync(
    `
            INSERT INTO places (title, imageUri, address, lat, lng)
            VALUES (?, ?, ?, ?, ?)
        `,
    place.title,
    place.imageUri,
    place.address,
    place.location.lat,
    place.location.lng
  );
  console.log(insertion);
  return insertion;
}

// // `getAllAsync()` is useful when you want to get all results as an array of objects.
// const allRows = await db.getAllAsync('SELECT * FROM test');
// for (const row of allRows) {
//   console.log(row.id, row.value, row.intValue);
// }

export async function fetchPlaces() {
  return await database.getAllAsync("SELECT * FROM places");
}

// // `getFirstAsync()` is useful when you want to get a single row from the database.
// const firstRow = await db.getFirstAsync('SELECT * FROM test');
// console.log(firstRow.id, firstRow.value, firstRow.intValue);

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
