import { pool } from "./db";

// Obtener todos los productos
export async function obtenerProductos() {
  const r = await pool.query("SELECT * FROM products ORDER BY id ASC");
  return r.rows;
}

// Insertar producto
export async function crearProducto(nombre: string, precio: number) {
  const r = await pool.query(
    "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *",
    [nombre, precio]
  );
  return r.rows[0];
}

// Actualizar producto
export async function actualizarProducto(id: number, nombre: string, precio: number) {
  const r = await pool.query(
    "UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *",
    [nombre, precio, id]
  );
  return r.rows[0] || null;
}

// Eliminar producto
export async function eliminarProducto(id: number) {
  const r = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);
  return r.rows[0] || null;
}

// Limpiar tabla
export async function limpiarProductos() {
  await pool.query("DELETE FROM products");
}
