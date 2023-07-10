export type FiltersType = {
  institution: string;
  types: string[];
  tags: string[];
  exact: boolean;
  exclusions: string[];
};

export async function getSearchResults(
  searchQuery: string,
  filters: FiltersType = { institution: 'all', types: [], tags: [], exact: false, exclusions: [] }
) {
  try {
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ searchQuery, filters })
    });

    const data = await response.json();

    return await data;
  } catch (e) {
    console.log(e);
  }
}
