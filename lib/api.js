const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function getAllSchools() {
  const response = await fetch(`${API_URL}/schools`);
  if (!response.ok) throw new Error('Failed to fetch schools');
  return response.json();
}

export async function getSchoolBySlug(slug) {
  const response = await fetch(`${API_URL}/schools/${slug}`);
  if (!response.ok) throw new Error('Failed to fetch school');
  return response.json();
}

export async function getFilteredSchools(filters) {
  const params = new URLSearchParams();
  if (filters.level) params.set('level', filters.level);
  if (filters.type) params.set('type', filters.type);
  if (filters.city) params.set('city', filters.city);

  const response = await fetch(`${API_URL}/schools/filter?${params}`);
  if (!response.ok) throw new Error('Failed to fetch schools');
  return response.json();
}