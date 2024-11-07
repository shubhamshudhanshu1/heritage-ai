export const fetchSettingSchemasApi = async params => {
  let API_URL = '/api/settingSchema';
  const queryParams = new URLSearchParams(params).toString();
  const response = await fetch(`${API_URL}?${queryParams}`);

  if (!response.ok) {
    throw new Error('Failed to fetch setting schemas');
  }

  return response.json();
};

export const fetchTenantsApi = async params => {
  const queryParams = new URLSearchParams(params).toString();
  const response = await fetch('/api/tenants' + '?' + queryParams);
  if (!response.ok) throw new Error('Failed to fetch tenants');
  return await response.json();
};

export const fetchUserTypesApi = async tenantId => {
  const response = await fetch(`/api/user-types?tenantId=${tenantId}`);
  if (!response.ok) throw new Error('Failed to fetch user types');
  return await response.json();
};

export const fetchPagesApi = async (tenantId, userTypeId) => {
  const response = await fetch(`/api/pages?tenantId=${tenantId}&userTypeId=${userTypeId}`);
  if (!response.ok) throw new Error('Failed to fetch pages');
  return await response.json();
};
