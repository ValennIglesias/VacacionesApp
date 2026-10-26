import type { Category } from "../shared/data";

// Plantillas del viaje de ejemplo: se elige una al azar cada vez que se crea uno nuevo.
// expenses: [descripción es, en, categoría, día relativo a hoy, monto x100 en la moneda del viaje, quién pagó, entre quiénes]
// quién pagó / entre quiénes: índices de [yo, ...friends]
export type DemoTemplate = {
  name: { es: string; en: string };
  countryCode: string;
  city: string;
  currency: string;
  friends: [string, string, string];
  expenses: [string, string, Category, number, number, number, number[]][];
};

const all = [0, 1, 2, 3];

export const DEMOS: DemoTemplate[] = [
  {
    name: { es: "Brasil con amigos", en: "Brazil with friends" },
    countryCode: "BR",
    city: "Florianópolis",
    currency: "BRL",
    friends: ["Lucía", "Tomás", "Valen"],
    expenses: [
      ["Pasajes de avión", "Flights", "transport", -40, 240000, 0, all],
      ["Reserva de la posada", "Guesthouse booking", "lodging", -25, 180000, 1, all],
      ["Supermercado", "Groceries", "groceries", -1, 32050, 2, all],
      ["Cena en la playa", "Beach dinner", "food", -1, 41000, 0, [0, 1, 2]],
      ["Paseo en barco", "Boat tour", "activities", 0, 60000, 3, all],
      ["Uber al centro", "Ride downtown", "transport", 0, 4580, 1, [1, 3]],
    ],
  },
  {
    name: { es: "Escapada a Bariloche", en: "Bariloche getaway" },
    countryCode: "AR",
    city: "Bariloche",
    currency: "ARS",
    friends: ["Sofi", "Nico", "Juli"],
    expenses: [
      ["Pasajes de micro", "Bus tickets", "transport", -30, 22000000, 0, all],
      ["Seña de la cabaña", "Cabin deposit", "lodging", -20, 45000000, 1, all],
      ["Supermercado", "Groceries", "groceries", -1, 9840000, 2, all],
      ["Cena de cordero", "Lamb dinner", "food", -1, 16800000, 0, [0, 1, 3]],
      ["Bicis en el Circuito Chico", "Bikes on Circuito Chico", "activities", 0, 6000000, 2, [0, 2, 3]],
      ["Cerveza artesanal", "Craft beer", "nightlife", 0, 4200000, 3, all],
    ],
  },
  {
    name: { es: "Barcelona en grupo", en: "Barcelona group trip" },
    countryCode: "ES",
    city: "Barcelona",
    currency: "EUR",
    friends: ["Marta", "Pablo", "Ana"],
    expenses: [
      ["Vuelos", "Flights", "transport", -45, 128000, 0, all],
      ["Apartamento", "Apartment", "lodging", -30, 96000, 1, all],
      ["Supermercado", "Groceries", "groceries", -1, 8540, 2, all],
      ["Tapas en el Born", "Tapas in El Born", "food", -1, 9600, 0, [0, 1, 2]],
      ["Entradas a la Sagrada Familia", "Sagrada Família tickets", "activities", 0, 10400, 3, all],
      ["Metro y bus", "Metro and bus", "transport", 0, 2320, 1, [1, 3]],
    ],
  },
];
