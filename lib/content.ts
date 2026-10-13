export const navLinks = [
  { href: "/#catalogo", label: "Catálogo" },
  { href: "/#menu", label: "Menú" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/visitanos", label: "Visítanos" },
];

export const procesoSteps = [
  {
    numero: "01",
    titulo: "Cultivo",
    texto:
      "Trabajamos con caficultores de Alegría y de otros orígenes que cuidan cada planta a mano, en fincas de altura donde el grano madura despacio.",
  },
  {
    numero: "02",
    titulo: "Cosecha y proceso",
    texto:
      "Solo se recolectan las cerezas maduras. Después, cada lote se procesa por separado —lavado, honey o natural— para conservar su carácter.",
  },
  {
    numero: "03",
    titulo: "Tueste",
    texto:
      "Tostamos en lotes pequeños, varias veces por semana, ajustando la curva a cada origen para resaltar sus notas naturales.",
  },
  {
    numero: "04",
    titulo: "Taza",
    texto:
      "Catamos cada lote antes de ponerlo en el menú. Si no nos convence a nosotros, no llega a tu mesa.",
  },
];

export const menuBebidas = [
  {
    categoria: "Carta de café",
    items: [
      { nombre: "Espresso", precio: "1.50", nota: "" },
      { nombre: "Americano", precio: "1.75", nota: "$2.25 con leche" },
      { nombre: "Latté", precio: "2.50", nota: "$2.99 saborizado" },
      { nombre: "Mocha", precio: "2.50", nota: "$2.99 saborizado" },
      { nombre: "Capuccino Italiano", precio: "2.50", nota: "$2.99 con vainilla" },
      { nombre: "Capuccino Carnaval", precio: "2.50", nota: "" },
      { nombre: "Capuccino Vienés", precio: "2.50", nota: "" },
      { nombre: "Tazón de Chocolate Colombiano", precio: "2.50", nota: "Caliente" },
      { nombre: "Chocolatada", precio: "2.75", nota: "Helada" },
      { nombre: "Affogato", precio: "2.75", nota: "Espresso con helado" },
      { nombre: "Café de Olla", precio: "1.25", nota: "$1.75 con leche" },
    ],
  },
  {
    categoria: "Cócteles",
    items: [
      { nombre: "Cuba Libre", precio: "3.50", nota: "" },
      { nombre: "Mojito", precio: "3.50", nota: "" },
      { nombre: "Mojito de Fresa", precio: "3.50", nota: "" },
      { nombre: "Bloody Mary", precio: "3.50", nota: "" },
      { nombre: "Margarita", precio: "3.50", nota: "" },
      { nombre: "Margarita de Fresa", precio: "3.50", nota: "" },
      { nombre: "Piña Colada", precio: "3.50", nota: "" },
      { nombre: "Cosmopolitan", precio: "3.50", nota: "" },
      { nombre: "Marea Roja", precio: "3.50", nota: "" },
      { nombre: "Conga", precio: "3.50", nota: "" },
      { nombre: "Tequila Rojo", precio: "3.50", nota: "" },
    ],
  },
];

export const testimonios = [
  {
    cita:
      "Ambiente rústico y acogedor, muy cerca del Mirador de las Cien Gradas. Ideal para bajar y comer algo dulce.",
    autor: "Marcela R.",
    detalle: "Reseña de Google Maps",
  },
  {
    cita:
      "Las bebidas son un gusto para el diente dulce y los postres se ven deliciosos. Un lugar espacioso y tranquilo.",
    autor: "Diego H.",
    detalle: "Reseña de Google Maps",
  },
  {
    cita:
      "Buena opción para un café gourmet: precios razonables y ubicación muy cómoda, a pasos del mirador.",
    autor: "Ana Sofía P.",
    detalle: "Reseña de Google Maps",
  },
  {
    cita:
      "El cheesecake de maracuyá con un café frío es mi combinación de cada visita.",
    autor: "Roberto M.",
    detalle: "Reseña de Google Maps",
  },
  {
    cita:
      "Instalaciones limpias y cómodas, buena atención. Se nota el cuidado en la decoración del lugar.",
    autor: "Claudia V.",
    detalle: "Reseña de Google Maps",
  },
  {
    cita:
      "Pedimos café en grano para llevar a casa. Vale la pena el viaje al pueblo por esta parada.",
    autor: "Jonathan S.",
    detalle: "Reseña de Google Maps",
  },
];

export const horarios = [
  { dia: "Lunes", horas: "Cerrado" },
  { dia: "Martes a viernes", horas: "9:30 am – 8:00 pm" },
  { dia: "Sábado", horas: "9:00 am – 8:00 pm" },
  { dia: "Domingo", horas: "9:30 am – 8:00 pm" },
];

export const contacto = {
  nombreCompleto: "Restaurante Museo y Café Gourmet La Calesa",
  direccion: "30 metros del Mirador de las Cien Gradas, Alegría, Usulután, El Salvador",
  telefono: "2628-1192",
  correo: "hola@lacalesa.sv",
  instagram: "@la_calesa",
  googleRating: 4.5,
  googleReviewCount: 70,
  googlePlaceId: "ChIJ0S5MoJBKe48RubFIDpF09s4",
};

export const ubicacion = {
  lat: 13.509306,
  lng: -88.488806,
  gradosSexagesimales: `13°30'33.5"N 88°29'19.7"W`,
};
