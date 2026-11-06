// Radovi u portfoliju. Novi rad dodaj kao novi objekt u popis.
// image: screenshot u public/portfolio/ (npr. '/portfolio/sole.webp'); ako ga nema, prikazuje se obojeni blok s naslovom.
export const portfolio = [
  {
    name: 'Sole Apartments',
    url: 'https://sole.rentals',
    domain: 'sole.rentals',
    type: 'Apartmani za odmor · Turanj',
    headline: 'Wake up 10 metres from the sea',
    description:
      'Stranica za tri apartmana u prvom redu do mora. Galerija, karta, recenzije gostiju, obrazac za upit i WhatsApp/Viber kontakt, na 12 jezika.',
    tags: ['12 jezika', 'Upiti gostiju', 'Galerija', 'Blog'],
    accent: '#0E8C8C',
    image: '',
  },
  {
    name: 'idassa.click',
    url: 'https://idassa.click',
    domain: 'idassa.click',
    type: 'Lokalni portal · Zadar',
    headline: 'Vijesti iz Zadra i županije',
    description:
      'Agregator lokalnih vijesti koji se osvježava svakih 15 minuta, s kategorijama, RSS-om, prognozom vremena, događanjima i korisnim linkovima za trajekte i promet.',
    tags: ['Automatsko osvježavanje', 'RSS', 'Vrijeme', 'Događanja'],
    accent: '#1968B3',
    image: '/portfolio/idassa-click.webp',
  },
];
