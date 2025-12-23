// Helper function to create URL-friendly slugs
const createSlug = (name) => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with -
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing -
};

export const mockSchools = [
  {
    id: 1,
    name: 'Jardín de Niños Montessori del Valle',
    slug: createSlug('Jardín de Niños Montessori del Valle'),
    type: 'Preescolar',
    level: 'Preescolar',
    city: 'Ciudad de México',
    address: 'Av. Insurgentes Sur 1234, Colonia Del Valle',
    image: 'https://images.unsplash.com/photo-1427504494904-71bcccf93b5b?w=600&h=400&fit=crop',
    rating: 4.8,
    reviews: 47,
    tuition: '$3,000 - $5,000 MXN/mes',
    capacity: '120 estudiantes',
    founded: 2010,
    hours: 'Lunes a Viernes: 8:00 AM - 2:00 PM',
    isPrivate: true,
    description: 'Jardín de niños con metodología Montessori, enfocado en el desarrollo integral de los pequeños a través del juego y la exploración.',
    programs: ['Montessori', 'Inglés', 'Arte y música', 'Psicomotricidad'],
    languages: ['Español', 'Inglés'],
    facilities: ['Área de juegos', 'Salón de música', 'Gimnasio', 'Biblioteca infantil', 'Huerto escolar'],
    extracurricular: ['Música', 'Arte', 'Yoga para niños'],
    certifications: ['SEP', 'Asociación Montessori Mexicana'],
    phone: '55-1234-5678',
    email: 'contacto@montessoridelval.edu.mx',
    website: 'www.montessoridelval.edu.mx'
  },
  {
    id: 2,
    name: 'Preescolar Arcoíris',
    slug: createSlug('Preescolar Arcoíris'),
    type: 'Preescolar',
    level: 'Preescolar',
    city: 'Ciudad de México',
    address: 'Calle Morelos 456, Colonia Centro',
    image: 'https://images.unsplash.com/photo-1508735468589-ce25ee15033f?w=600&h=400&fit=crop',
    rating: 4.5,
    reviews: 32,
    tuition: 'Gratuito',
    capacity: '150 estudiantes',
    founded: 2005,
    hours: 'Lunes a Viernes: 8:00 AM - 1:00 PM',
    isPrivate: false,
    description: 'Preescolar público de calidad con enfoque en valores y desarrollo socioemocional.',
    programs: ['Desarrollo integral', 'Educación lúdica', 'Formación de valores'],
    languages: ['Español'],
    facilities: ['Área de juegos', 'Biblioteca infantil', 'Aula de arte', 'Patio amplio'],
    extracurricular: ['Danza', 'Deportes'],
    certifications: ['SEP'],
    phone: '55-2345-6789',
    email: 'arcoiris@sep.gob.mx',
    website: 'www.preescolararcoiris.edu.mx'
  },
  {
    id: 3,
    name: 'Kinder Little Stars',
    slug: createSlug('Kinder Little Stars'),
    type: 'Preescolar',
    level: 'Preescolar',
    city: 'Polanco',
    address: 'Av. Reforma 789, Polanco',
    image: 'https://images.unsplash.com/photo-1577896552935-860461c6b646?w=600&h=400&fit=crop',
    rating: 4.9,
    reviews: 58,
    tuition: '$4,500 - $6,000 MXN/mes',
    capacity: '100 estudiantes',
    founded: 2015,
    hours: 'Lunes a Viernes: 7:30 AM - 3:00 PM',
    isPrivate: true,
    description: 'Preescolar bilingüe con instalaciones de primer nivel y programa de desarrollo temprano.',
    programs: ['Bilingüe', 'STEM', 'Artes', 'Educación física'],
    languages: ['Español', 'Inglés'],
    facilities: ['Área de juegos cubierta', 'Laboratorio STEM', 'Piscina', 'Aula de música', 'Biblioteca'],
    extracurricular: ['Natación', 'Tenis', 'Música', 'Robótica'],
    certifications: ['SEP', 'Cambridge English'],
    phone: '55-3456-7890',
    email: 'info@littlestars.edu.mx',
    website: 'www.littlestars.edu.mx'
  },
  {
    id: 4,
    name: 'Instituto Bilingüe Sapiens',
    slug: createSlug('Instituto Bilingüe Sapiens'),
    type: 'Primaria',
    level: 'Primaria',
    city: 'Zona Rosa',
    address: 'Calle Amberes 234, Zona Rosa',
    image: 'https://images.unsplash.com/photo-1509062522246-0b2e038b9b53?w=600&h=400&fit=crop',
    rating: 4.7,
    reviews: 42,
    tuition: '$5,000 - $7,000 MXN/mes',
    capacity: '300 estudiantes',
    founded: 2008,
    hours: 'Lunes a Viernes: 7:45 AM - 4:00 PM',
    isPrivate: true,
    description: 'Primaria bilingüe con educación de calidad y formación integral del estudiante.',
    programs: ['Bilingüe', 'Matemáticas avanzadas', 'Ciencias', 'Artes'],
    languages: ['Español', 'Inglés'],
    facilities: ['Laboratorio de ciencias', 'Sala de cómputo', 'Biblioteca', 'Auditorium', 'Comedor'],
    extracurricular: ['Fútbol', 'Voleibol', 'Taekwondo', 'Ajedrez', 'Debate'],
    certifications: ['SEP', 'Cambridge'],
    phone: '55-4567-8901',
    email: 'admisiones@sapiens.edu.mx',
    website: 'www.sapiens.edu.mx'
  },
  {
    id: 5,
    name: 'Escuela Primaria Benito Juárez',
    slug: createSlug('Escuela Primaria Benito Juárez'),
    type: 'Primaria',
    level: 'Primaria',
    city: 'Coyoacán',
    address: 'Av. Francisco Sosa 100, Coyoacán',
    image: 'https://images.unsplash.com/photo-1623280354173-b7f0fa9d0a1b?w=600&h=400&fit=crop',
    rating: 4.3,
    reviews: 25,
    tuition: 'Gratuito',
    capacity: '250 estudiantes',
    founded: 1985,
    hours: 'Lunes a Viernes: 8:00 AM - 2:30 PM',
    isPrivate: false,
    description: 'Primaria pública con enfoque en educación integral y valores cívicos.',
    programs: ['Educación integral', 'Civismo', 'Educación física'],
    languages: ['Español'],
    facilities: ['Patio de recreo', 'Biblioteca', 'Aula de recursos', 'Cancha de deportes'],
    extracurricular: ['Fútbol', 'Voleibol', 'Banda de música'],
    certifications: ['SEP'],
    phone: '55-5678-9012',
    email: 'benito.juarez@sep.gob.mx',
    website: 'www.benito-juarez-primaria.edu.mx'
  }
];

export const getSchoolById = (id) => {
  return mockSchools.find(school => school.id === parseInt(id));
};

export const getSchoolBySlug = (slug) => {
  return mockSchools.find(school => school.slug === slug);
};

export const getSchoolsByFilters = (level, type, city) => {
  return mockSchools.filter(school => {
    if (level && school.level !== level) return false;
    if (type === 'Privada' && !school.isPrivate) return false;
    if (type === 'Publica' && school.isPrivate) return false;
    if (city && school.city !== city) return false;
    return true;
  });
};

export const getAllCities = () => {
  return [...new Set(mockSchools.map(s => s.city))];
};

export const getLevels = () => {
  return ['Preescolar', 'Primaria', 'Secundaria'];
};

export const getTypes = () => {
  return ['Privada', 'Publica'];
};