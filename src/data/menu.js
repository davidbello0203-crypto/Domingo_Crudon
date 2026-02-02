// Menú The Green Garden — diseño y precios según carta física
export const menuData = {
  categorias: [
    {
      id: 'cerveza',
      nombre: 'Cerveza',
      icono: '🍺',
      productos: [
        { id: 1, nombre: 'Corona', precio: 28 },
        { id: 2, nombre: 'Victoria', precio: 28 },
        { id: 3, nombre: 'XX Lager', precio: 25 },
        { id: 4, nombre: 'Miller', precio: 40 },
        { id: 5, nombre: 'Bohemia oscura', precio: 35 },
        { id: 6, nombre: 'Bohemia clásica', precio: 35 },
        { id: 7, nombre: 'Heineken 0.0', precio: 25 },
        { id: 8, nombre: 'Indio', precio: 25 },
        { id: 9, nombre: 'Strongbow', precio: 35, descripcion: 'Honey, gold Apple, rose apple, red berries' },
      ],
    },
    {
      id: 'micheladas',
      nombre: 'Micheladas',
      icono: '🍺',
      productos: [
        { id: 10, nombre: 'Cubana', precios: [{ etiqueta: '1/2 lt', precio: 55 }, { etiqueta: '1 lt', precio: 90 }] },
        { id: 11, nombre: 'Clamato', precios: [{ etiqueta: '1/2 lt', precio: 55 }, { etiqueta: '1 lt', precio: 100 }] },
        { id: 12, nombre: 'Limón y sal', precios: [{ etiqueta: '1/2 lt', precio: 55 }, { etiqueta: '1 lt', precio: 90 }] },
        { id: 13, nombre: 'Tamarindo', precios: [{ etiqueta: '1/2 lt', precio: 55 }, { etiqueta: '1 lt', precio: 100 }] },
        { id: 14, nombre: 'Mango', precios: [{ etiqueta: '1/2 lt', precio: 55 }, { etiqueta: '1 lt', precio: 100 }] },
        { id: 15, nombre: 'Fresa', precios: [{ etiqueta: '1/2 lt', precio: 55 }, { etiqueta: '1 lt', precio: 100 }] },
      ],
    },
    {
      id: 'mezcal',
      nombre: 'Mezcal',
      icono: '🥃',
      productos: [
        { id: 16, nombre: 'Tabla 9 shots', precio: 200 },
        { id: 17, nombre: 'Tabla 7 shots', precio: 150 },
      ],
    },
    {
      id: 'cantaritos',
      nombre: 'Cantaritos',
      icono: '🫙',
      descripcionCategoria: 'Tequila de tu preferencia, jugo de naranja, toronja, limón, sal, squirt, servido en cántaro de barro',
      productos: [
        { id: 18, nombre: 'Centenario', precios: [{ etiqueta: '1 lt', precio: 150 }, { etiqueta: '4 lt', precio: 600 }, { etiqueta: '6 lt', precio: 800 }] },
        { id: 19, nombre: 'José Cuervo', precios: [{ etiqueta: '1 lt', precio: 135 }, { etiqueta: '4 lt', precio: 500 }, { etiqueta: '6 lt', precio: 700 }] },
      ],
    },
    {
      id: 'mojitos',
      nombre: 'Mojitos',
      icono: '🍃',
      productos: [
        { id: 20, nombre: 'Mojito', precio: 75, descripcion: 'Pepino, Manzana, Piña, Pera, Kiwi' },
      ],
    },
    {
      id: 'cocteles',
      nombre: 'Cócteles',
      icono: '🍸',
      productos: [
        { id: 21, nombre: 'Margarita tradicional', precio: 75 },
        { id: 22, nombre: 'Mojito', precio: 80 },
        { id: 23, nombre: 'Tequila sunrise', precio: 60 },
      ],
    },
    {
      id: 'vodka',
      nombre: 'Base de Vodka',
      icono: '🍸',
      productos: [
        { id: 24, nombre: 'White Russian', precio: 75, descripcion: 'Vodka, licor de café, leche evaporada y crema de café' },
        { id: 25, nombre: 'Madras', precio: 75, descripcion: 'Vodka, jugo de naranja, jugo de arándano en capas' },
        { id: 26, nombre: 'Electric limonade', precio: 90 },
      ],
    },
    {
      id: 'ron',
      nombre: 'Base de Ron',
      icono: '🍹',
      productos: [
        { id: 27, nombre: 'Piña colada', precio: 80, descripcion: 'Ron blanco, jugo de piña, crema de coco, leche evaporada y azúcar' },
        { id: 28, nombre: 'Baby Mango', precio: 80, descripcion: 'Ron blanco, puré de mango, jugo de arándano, jugo de naranja' },
      ],
    },
    {
      id: 'ginebra',
      nombre: 'Base de Ginebra',
      icono: '🍸',
      productos: [
        { id: 29, nombre: 'Gintonic', precio: 100, descripcion: 'Ginebra, agua quina — Frutos rojos, Pepino, Clásica' },
      ],
    },
    {
      id: 'shot',
      nombre: 'Shot',
      icono: '🥃',
      productos: [
        { id: 30, nombre: 'Shot', precio: 40, descripcion: 'Tequila sunrise, Blue kamikaze' },
      ],
    },
    {
      id: 'botellas',
      nombre: 'Botellas y Copeo',
      icono: '🍾',
      productos: [
        { id: 31, nombre: 'Bacardi blanco', precios: [{ etiqueta: 'Copa', precio: 50 }, { etiqueta: 'Botella', precio: 600 }] },
        { id: 32, nombre: 'Bacardi de sabor', precios: [{ etiqueta: 'Copa', precio: 55 }, { etiqueta: 'Botella', precio: 700 }] },
        { id: 33, nombre: 'Absolut', precios: [{ etiqueta: 'Copa', precio: 70 }, { etiqueta: 'Botella', precio: 700 }] },
        { id: 34, nombre: 'Absolut sabor', precios: [{ etiqueta: 'Copa', precio: 75 }, { etiqueta: 'Botella', precio: 800 }] },
        { id: 35, nombre: 'Smirnoff', precios: [{ etiqueta: 'Copa', precio: 50 }, { etiqueta: 'Botella', precio: 600 }] },
        { id: 36, nombre: 'Smirnoff tamarindo', precios: [{ etiqueta: 'Copa', precio: 50 }, { etiqueta: 'Botella', precio: 600 }] },
        { id: 37, nombre: 'José Cuervo esp.', precios: [{ etiqueta: 'Copa', precio: 80 }, { etiqueta: 'Botella', precio: 900 }] },
        { id: 38, nombre: 'José Cuervo trad.', precios: [{ etiqueta: 'Copa', precio: 65 }, { etiqueta: 'Botella', precio: 750 }] },
        { id: 39, nombre: 'Maestro Dobel', precios: [{ etiqueta: 'Copa', precio: 100 }, { etiqueta: 'Botella', precio: 1500 }] },
        { id: 40, nombre: '1800 cristalino', precios: [{ etiqueta: 'Copa', precio: 120 }, { etiqueta: 'Botella', precio: 1600 }] },
        { id: 41, nombre: 'Cigarros', precio: 10 },
      ],
    },
    {
      id: 'snacks',
      nombre: "Snack's",
      icono: '🍟',
      productos: [
        { id: 42, nombre: 'Choripan', precio: 100, descripcion: 'Pan o bolillo, chorizo argentino importado, salsa casera chimichurri, mayonesa y vegetales' },
        { id: 43, nombre: 'Guacamole Especial', precio: 200, descripcion: 'Guacamole con queso panela y carne arrachera, salsa mexicana y chicharrón de la casa' },
        { id: 44, nombre: 'Palomitas de pollo', precio: 100, descripcion: 'Trocitos de pechuga empanizados, salsa verde o aderezo' },
        { id: 45, nombre: 'Green-Tiras', precio: 150, descripcion: '6 tiras de pechuga empanizadas con salsa o aderezo a elegir' },
        { id: 46, nombre: 'Tender', precio: 65, descripcion: '4 piezas de pechuguitas de pollo con aderezo' },
        { id: 47, nombre: 'Aros de cebolla', precio: 70, descripcion: '12 piezas con aderezo' },
        { id: 48, nombre: 'Papas sencillas', precio: 75, descripcion: 'Papas con salsa catsup' },
        { id: 49, nombre: 'Especial Green (papas)', precio: 130, descripcion: 'Papas, arrachera, tocino, jamón y queso fundido' },
        { id: 50, nombre: 'Papas/queso', precio: 80 },
        { id: 51, nombre: 'Papas gajo sencillas', precio: 90 },
        { id: 52, nombre: 'Especial Green (gajo)', precio: 150, descripcion: 'Papas gajo, arrachera, tocino, jamón y queso fundido' },
        { id: 53, nombre: 'Papas gajo/queso', precio: 100 },
        { id: 54, nombre: 'Nachos sencillos', precio: 70, descripcion: 'Nachos con queso y chiles jalapeños' },
        { id: 55, nombre: 'Nachos especiales', precio: 120, descripcion: 'Nachos, arrachera, tocino y queso fundido' },
        { id: 56, nombre: 'Mega Alas', precios: [{ etiqueta: '6 pz', precio: 125 }, { etiqueta: '10 pz', precio: 210 }, { etiqueta: '12 pz', precio: 250 }, { etiqueta: '15 pz', precio: 300 }], descripcion: 'Alas crujientes con salsa a elegir, apio, zanahoria y aderezo ranch' },
        { id: 57, nombre: 'Boneless', precios: [{ etiqueta: '6 pz', precio: 90 }, { etiqueta: '8 pz', precio: 120 }, { etiqueta: '10 pz', precio: 150 }, { etiqueta: '12 pz', precio: 180 }, { etiqueta: '15 pz', precio: 225 }, { etiqueta: '20 pz', precio: 250 }], descripcion: 'Pechuga empanizada en salsa a elegir, apio, zanahoria y ranch' },
      ],
    },
    {
      id: 'salsas-snacks',
      nombre: 'Salsas / Aderezos',
      icono: '🌶️',
      descripcionCategoria: 'Buffalo • BBQ • Mango Habanero • Ranch • Salsa verde • Catsup • Chipotle • Aderezo ranch',
      productos: [],
    },
    {
      id: 'burguers',
      nombre: "Burguer's",
      icono: '🍔',
      productos: [
        { id: 58, nombre: 'Clásica', precio: 75, descripcion: 'Pan brioche, 180 gr carne magra, queso americano, vegetales y aderezos' },
        { id: 59, nombre: 'Tiki Burguer', precio: 85, descripcion: 'Pan brioche, 180 gr carne, queso mozzarella, jamón, piña, tocino, vegetales y aderezos' },
        { id: 60, nombre: 'Meats Bacon', precio: 120, descripcion: 'Pan brioche, 2x180 gr carne, tocino, queso americano, vegetales y aderezos' },
        { id: 61, nombre: 'Arrachera', precio: 110, descripcion: 'Pan brioche, 180 gr arrachera, queso mozzarella, cebolla caramelizada, vegetales y aderezos' },
        { id: 62, nombre: 'Chicken Deluxe', precio: 100, descripcion: 'Pan brioche, 180 gr pechuga, guacamole, queso mozzarella, cebolla caramelizada y vegetales' },
        { id: 63, nombre: 'Crispy Chicken', precio: 110, descripcion: 'Pan brioche, pechuga empanizada en salsa a elegir, queso, cebolla caramelizada y aderezos' },
        { id: 64, nombre: 'Cheese Pepperoni', precio: 110, descripcion: 'Pan brioche, 180 gr carne, salsa de tomate, pepperoni, queso mozzarella y vegetales' },
      ],
    },
    {
      id: 'hotdogs',
      nombre: "Hot Dog's",
      icono: '🌭',
      productos: [
        { id: 65, nombre: 'Clásico', precio: 35, descripcion: 'Pan, salchicha jumbo, vegetales y aderezos' },
        { id: 66, nombre: 'Chesse Bacon', precio: 40, descripcion: 'Pan, salchicha jumbo, tocino, queso chihuahua, vegetales y aderezos' },
        { id: 67, nombre: 'Tiki Dog', precio: 50, descripcion: 'Pan, salchicha jumbo, tocino, piña, queso, jamón, vegetales y aderezos' },
        { id: 68, nombre: 'Norteño', precio: 60, descripcion: 'Pan, salchicha jumbo, queso, chorizo, champiñones, guacamole, cebolla caramelizada y aderezos' },
        { id: 69, nombre: 'Peluchin', precio: 50, descripcion: 'Pan, salchicha, jamón, tocino, queso fundido y vegetales' },
      ],
    },
    {
      id: 'burritos',
      nombre: "Burritos",
      icono: '🌯',
      productos: [
        { id: 70, nombre: 'Arrachera', precio: 130, descripcion: 'Tortilla de harina, 200 gr arrachera, frijol, costra de queso, jitomate, cebolla y chile, guacamole y papas' },
        { id: 71, nombre: 'Kentucky', precio: 120, descripcion: 'Tortilla de harina, 200 gr pechuga con receta casera, queso fundido, frijoles, jitomate, cebolla y chile, guacamole y papas' },
        { id: 72, nombre: 'Norteño', precio: 120, descripcion: 'Tortilla de harina, 200 gr bistec, champiñones, frijol, queso fundido, jitomate, cebolla y chile, guacamole y papas' },
      ],
    },
  ],
};

// 4 secciones del menú (como en las fotos): Bebidas, Comida, Snacks, Botellas y Copeo
// Imágenes: comida/bebida al centro, sin fondos cargados (Unsplash)
export const seccionesMenu = [
  {
    id: 'bebidas',
    nombre: "Drink's",
    icono: '🍺',
    // Imagen local: horizontal, estilo tropical (cóctel, madera, limas, luz cálida)
    imagen: '/imagenes/drinks.png',
    categoriaIds: ['cerveza', 'micheladas', 'mezcal', 'cantaritos', 'mojitos', 'cocteles', 'vodka', 'ron', 'ginebra', 'shot'],
  },
  {
    id: 'comida',
    nombre: 'Comida',
    icono: '🍔',
    imagen: '/imagenes/comida.png',
    categoriaIds: ['burguers', 'hotdogs', 'burritos'],
  },
  {
    id: 'snacks',
    nombre: "Snack's",
    icono: '🍟',
    imagen: '/imagenes/snacks.png',
    categoriaIds: ['snacks', 'salsas-snacks'],
  },
  {
    id: 'botellas',
    nombre: 'Botellas y Copeo',
    icono: '🍾',
    imagen: '/imagenes/botellas.png',
    categoriaIds: ['botellas'],
  },
];

export const premiosRuletaBienvenida = [
  { id: 1, texto: '10% de descuento', corto: '10% desc.', tipo: 'descuento', valor: 10 },
  { id: 2, texto: '5% de descuento', corto: '5% desc.', tipo: 'descuento', valor: 5 },
  { id: 3, texto: 'Shot gratis (Tequila sunrise, Blue kamikaze o mezcal)', corto: 'Shot a escoger', tipo: 'shot', valor: 1 },
  { id: 4, texto: 'Dos cigarros', corto: '2 cigarros', tipo: 'cigarros', valor: 2 },
  { id: 5, texto: 'Cerveza a escoger', corto: 'Cerveza a escoger', tipo: 'cerveza', valor: 1 },
];

export const opcionesRuletaConsumo = [
  { id: 1, texto: 'Ronda de cantaritos', corto: 'Ronda de cantaritos', accion: 'ronda-cantaritos' },
  { id: 2, texto: 'Shot de Tequila Baby Mango', corto: 'Shot Baby Mango', accion: 'shot-baby-mango' },
  { id: 3, texto: 'Mezcal para todos', corto: 'Mezcal para todos', accion: 'mezcal-todos' },
  { id: 4, texto: 'Solo hombres toman lo del siguiente giro', corto: 'Solo hombres', accion: 'solo-hombres' },
  { id: 5, texto: 'Ronda de cervezas', corto: 'Ronda de cervezas', accion: 'cervezas' },
  { id: 6, texto: 'Shot de Tequila Tradicional', corto: 'Shot Tradicional', accion: 'shot-tradicional' },
  { id: 7, texto: 'Ronda de cantaritos', corto: 'Ronda de cantaritos', accion: 'ronda-cantaritos' },
  { id: 8, texto: 'Solo mujeres toman lo del siguiente giro', corto: 'Solo mujeres', accion: 'solo-mujeres' },
];
