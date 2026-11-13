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
    image: '/portfolio/sole.webp',
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
  {
    name: 'domacin.digital',
    url: 'https://domacin.digital',
    domain: 'domacin.digital',
    type: 'Web aplikacija · Privatni smještaj',
    headline: 'Gost skenira QR kod i sve zna na svom jeziku',
    description:
      'Digitalni vodič za goste za male iznajmljivače: Wi-Fi, check-in i check-out, kućni red, upute za uređaje i preporuke u blizini, na 8 jezika. Domaćin ga uređuje s mobitela, a QR kartica se nikad ne mora ponovno tiskati.',
    tags: ['8 jezika', 'QR kod', 'Pretplate', 'Sučelje za domaćina'],
    accent: '#1A78B4',
    image: '/portfolio/domacin.webp',
  },
];
