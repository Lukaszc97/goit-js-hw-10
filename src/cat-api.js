const apiKey = 'live_hlj1KYddLVWkCVUVx8C7Vmbi5HYraIfdgjOUiP55UwVq2bWAPZXqQV15zAWdLtx5';

export function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';

  return axios
    .get(url, {
      headers: {
        'x-api-key': apiKey
      }
    })
    .then(response => {
      if (response.status !== 200) {
        throw new Error('Nie udało się pobrać ras');
      }
      return response.data;
    })
    .catch(error => {
      throw new Error(error);
    });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return axios
    .get(url, {
      headers: {
        'x-api-key': apiKey
      }
    })
    .then(response => {
      if (response.status !== 200) {
        throw new Error('Nie udało się pobrać informacji o kocie');
      }
      return response.data[0];
    })
    .catch(error => {
      throw new Error(error);
    });
}
