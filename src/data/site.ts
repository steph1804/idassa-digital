// Osnovni podaci o studiju. Promijeni ovdje i promjena vrijedi na cijeloj stranici.
export const site = {
  // false = stranica je skrivena od Googlea (noindex). Kad je spremna za javnost, stavi true.
  isPublic: false,
  name: 'idassa.digital',
  tradeName: 'idassa digital',
  city: 'Zadar',
  email: 'hello@idassa.digital',
  phone: '+385976070998',
  phoneDisplay: '+385 97 607 0998',
  year: 2026,
  // Fotografija u parallax zaglavlju (datoteka u public/), npr. '/hero/zadar.webp'. Prazno = bez fotografije.
  heroImage: '/hero/zadar-2000.webp',
  heroImageSmall: '/hero/zadar-1000.webp',
  // Fotografija: Nazrin Babashova, Unsplash (besplatna licenca)
  // Kad registriraš obrt, upiši podatke ovdje i pojavit će se u podnožju:
  owner: '', // npr. 'Stipe Prezime'
  address: '', // npr. 'Ulica 1, 23000 Zadar'
  oib: '',
};
