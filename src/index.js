import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const breedSelect = $('.breed-select');

  const loader = document.querySelector('.loader');
  const catInfo = document.querySelector('.cat-info');
  const error = document.querySelector('.error');

  loader.style.display = 'none';
  catInfo.innerHTML = '';
  error.style.display = 'none';

  try {
    breedSelect.addClass('hidden');
    loader.style.display = 'block';

    const breeds = await fetchBreeds();
    breeds.forEach(breed => {
      breedSelect.append(new Option(breed.name, breed.id));
    });

    breedSelect.removeClass('hidden');
  } catch (err) {
    console.error(err);
    breedSelect.append(new Option('Nie udało się pobrać danych', ''));
  } finally {
    loader.style.display = 'none';
  }

  breedSelect.on('change', () => {
    const breedId = breedSelect.val();

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

  breedSelect.select2();
});
