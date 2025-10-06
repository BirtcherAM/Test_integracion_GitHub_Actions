import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  limpiarProductos,
} from "../src/products";
import { initDb } from "../src/initDb";

describe("CRUD de Products con Postgres", () => {
  beforeAll(async () => {
    await initDb();
  });

  beforeEach(async () => {
    await limpiarProductos();
  });

  it("crea un producto", async () => {
    const p = await crearProducto("Laptop", 1200);
    expect(p).toHaveProperty("id");
    expect(p.name).toBe("Laptop");
    expect(Number(p.price)).toBe(1200);
  });

  it("obtiene productos", async () => {
    await crearProducto("Mouse", 25);
    const lista = await obtenerProductos();
    expect(lista.length).toBe(1);
    expect(lista[0].name).toBe("Mouse");
  });

  it("actualiza un producto", async () => {
    const p = await crearProducto("Teclado", 50);
    const actualizado = await actualizarProducto(p.id, "Teclado Mecánico", 80);
    expect(actualizado?.name).toBe("Teclado Mecánico");
    expect(Number(actualizado?.price)).toBe(80);
  });

  it("elimina un producto", async () => {
    const p = await crearProducto("Monitor", 200);
    const eliminado = await eliminarProducto(p.id);
    expect(eliminado?.id).toBe(p.id);

    const lista = await obtenerProductos();
    expect(lista.length).toBe(0);
  });
});
