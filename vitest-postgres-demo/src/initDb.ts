import { pool } from "./db";

export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      price NUMERIC NOT NULL
    );
  `);
  console.log("Tabla 'products' lista.");
}

// permite ejecutar el archivo directamente con `npm run init-db`
if (require.main === module) {
  initDb()
    .then(() => process.exit(0))
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
