import { crearProducto, obtenerProductos } from "./products";
import { initDb } from "./initDb";

async function main() {
  await initDb();
  console.log("Insertando producto de prueba...");
  const nuevo = await crearProducto("Monitor Dell", 250);
  console.log("Insertado:", nuevo);

  const lista = await obtenerProductos();
  console.log("Productos:", lista);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
