const apiKey = 'live_hlj1KYddLVWkCVUVx8C7Vmbi5HYraIfdgjOUiP55UwVq2bWAPZXqQV15zAWdLtx5';

export function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';

  return fetch(url, {
    headers: {
      'x-api-key': apiKey
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Nie udało się pobrać ras');
      }
      return response.json();
    })
    .then(data => data)
    .catch(error => {
      throw new Error(error);
    });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return fetch(url, {
    headers: {
      'x-api-key': apiKey
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Nie udało się pobrać informacji o kocie');
      }
      return response.json();
    })
    .then(data => data[0])
    .catch(error => {
      throw new Error(error);
    });
}
