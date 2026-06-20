import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function setupDatabase() {
  const schema = fs.readFileSync(path.join(__dirname, './sql/schema.sql'), 'utf8');

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Root@0078',
    multipleStatements: true
  });

  try {
    console.log('Executing database schema...');
    await connection.query(schema);
    console.log('✓ Database setup complete!');
  } catch (error) {
    console.error('✗ Database setup failed:', error.message);
  } finally {
    await connection.end();
  }
}

setupDatabase();
