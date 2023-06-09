import { fetchBreeds, fetchCatByBreed } from './cat-api.js';


document.addEventListener('DOMContentLoaded', async () => {
  const breedSelect = document.querySelector('.breed-select');
  const loader = document.querySelector('.loader');
  const catInfo = document.querySelector('.cat-info');
  const error = document.querySelector('.error');

  loader.style.display = 'none';
  catInfo.innerHTML = '';
  error.style.display = 'none';

  try {
    breedSelect.classList.add('hidden');
    loader.style.display = 'block';

    const breeds = await fetchBreeds();
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.text = breed.name;
      option.value = breed.id;
      breedSelect.appendChild(option);
    });

    breedSelect.classList.remove('hidden');
  } catch (err) {
    console.error(err);
    const option = document.createElement('option');
    option.text = 'Nie udało się pobrać danych';
    option.value = '';
    breedSelect.appendChild(option);
  } finally {
    loader.style.display = 'none';
  }

  breedSelect.addEventListener('change', () => {
    const breedId = breedSelect.value;

    if (!breedId) {
      catInfo.innerHTML = '';
      return;
    }

    catInfo.innerHTML = '';
    loader.style.display = 'block';

    fetchCatByBreed(breedId)
      .then(cat => {
        const catInfoHTML = `
          <img src="${cat.url}" alt="Zdjęcie kota">
          <h2>${cat.breeds[0].name}</h2>
          <p>${cat.breeds[0].description}</p>
          <p>Temperament: ${cat.breeds[0].temperament}</p>
        `;

        catInfo.innerHTML = catInfoHTML;
      })
      .catch(err => {
        console.error(err);
        error.style.display = 'block';
      })
      .finally(() => {
        loader.style.display = 'none';
      });
  });
});
