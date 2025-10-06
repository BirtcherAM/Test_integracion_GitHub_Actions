import { describe, it, expect, beforeEach } from "vitest";
import { pool } from "../src/db";
import { initDb } from "../src/initDb";
import {
  crearProducto,
  obtenerProductos,
  actualizarProducto,
  eliminarProducto
} from "../src/products";

describe("CRUD de Products con Postgres", () => {
  beforeEach(async () => {
    await initDb(); // asegura que la tabla exista
    await pool.query("DELETE FROM products"); // limpia antes de cada test
  });

  it("crea un producto", async () => {
    const nuevo = await crearProducto("Monitor", 250);
    expect(nuevo.name).toBe("Monitor");
  });

  it("obtiene productos", async () => {
    await crearProducto("Mouse", 25);
    const lista = await obtenerProductos();
    expect(lista.length).toBe(1);
    expect(lista[0].name).toBe("Mouse");
  });

  it("actualiza un producto", async () => {
    const creado = await crearProducto("Keyboard", 55);
    await actualizarProducto(creado.id, "Keyboard Pro", 80);
    const lista = await obtenerProductos();
    expect(lista[0].name).toBe("Keyboard Pro");
  });

  it("elimina un producto", async () => {
    const creado = await crearProducto("Tablet", 400);
    await eliminarProducto(creado.id);
    const lista = await obtenerProductos();
    expect(lista.length).toBe(0);
  });
});
