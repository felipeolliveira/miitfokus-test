import { createConnection } from 'typeorm';

const connectionSQLite = async () => {
  try {
    const connection = await createConnection();
    console.log('=== migrations runs success ===');
    connection.runMigrations();
  } catch (err) {
    console.log('Error in connection database', err);
  }
};

connectionSQLite();
