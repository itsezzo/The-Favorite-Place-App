import * as SQLite from 'expo-sqlite/legacy';

const db = SQLite.openDatabase('places.db');

export async function creatTable() {
  const db = SQLite.openDatabase('places.db');
  await db.transactionAsync(async tx => {
    try {
      await tx.executeSqlAsync(`CREATE TABLE IF NOT EXISTS places(
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lan REAL NOT NULL
      )`);
    } catch (error) {
      throw error;
    }
  });
  console.log(db);
}

export async function insertPlace(place) {
  await db.transactionAsync(async tx => {
    tx.executeSqlAsync(
      `INSERT INTO places (title, imageUri, address, lat, lan) VALUES (?,?,?,?,?)`,
      [
        place.title,
        place.imageUri,
        place.address,
        place.location.lat,
        place.location.lan,
      ]
    )
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
    // console.log(result);
    // return(result);
  });
}

// db.transactionAsync(async tx => {
//   tx.executeSqlAsync()
// })

// await db.transactionAsync(async tx => {
//   await tx.executeSqlAsync(`CREATE TABLE IF NOT EXISTS places(
//     id INTEGER PRIMARY KEY NOT NULL,
//     title TEXT NOT NULL,
//     imageUri TEXT NOT NULL,
//     address TEXT NOT NULL,
//     lat REAL NOT NULL,
//     lan REAL NOT NULL
//   )`)
// })
//  db
// export async function creatTable() {
//   const db = await SQLite.openDatabaseAsync('places.db');
//   console.log(db);
//   return db;
//   return db.execAsync(`
//       CREATE TABLE IF NOT EXISTS places (
//         id INTEGER PRIMARY KEY NOT NULL,
//         title TEXT NOT NULL,
//         imageUri TEXT NOT NULL,
//         address TEXT NOT NULL,
//         lat REAL NOT NULL,
//         lan REAL NOT NULL,
//       )`);
// }

// console.log(db.databaseName);

// db.withTransactionAsync.

// export async function init() {
//   try {
//     await db.execAsync(`
//     CREATE TABLE IF NOT EXISTS places (
//       id INTEGER PRIMARY KEY NOT NULL,
//       title TEXT NOT NULL,
//       imageUri TEXT NOT NULL,
//       address TEXT NOT NULL,
//       lat REAL NOT NULL,
//       lan REAL NOT NULL,
//     )`);
//     console.log('creating db...');
//   } catch (error) {
//     console.log('error');
//     throw error;
//   }
// }

// export function init() {
//   db.execAsync(`
//     PRAGMA journal_mode = WAL;
//     CREATE TABLE IF NOT EXISTS places (
//       id INTEGER PRIMARY KEY NOT NULL,
//       title TEXT NOT NULL,
//       imageUri TEXT NOT NULL,
//       address TEXT NOT NULL,
//       lat REAL NOT NULL,
//       lan REAL NOT NULL,
//     )`
//   )
//     .then(response => console.log(response))
//     .catch(error => {
//       throw error;
//     });
//   console.log('creating db...');
// }
