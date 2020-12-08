//
// PROYECTOII Countries
//

// Se crea una constante con la dirección de la api
const API = ('https://restcountries.eu/rest/v2/all');

// Se crean las variables para poder manipular el DOM
const form = document.getElementById('search');
const list = document.getElementById('countries-list');
const modal = document.getElementById('modal');

// addDetails se crean los detalles de cada país.
const addDetails = (details) => {
  const info = document.createElement('div');
  info.setAttribute('id', `${details.name}`);
  modal.appendChild(info);

  const idioma = [];
  const coin = [];
  // recorremos details.languages y details.currencies ya que los datos
  // están dentro de otro array
  const lan = details.languages;
  lan.forEach((languages) => {
    idioma.push(`${languages.name}`);
  });

  const curre = details.currencies;
  curre.forEach((currency) => {
    coin.push(`${currency.name}`);
  });

  const content = `
  <div class="container clearfix">
    <button id="close">X</button>
    <h2>${details.name}</h2>
    <img src="${details.flag}" alt="${details.name}">
    <ul class="content-detail">
    <li>Capital: ${details.capital}</li>
    <li>Region: ${details.region}</li>
    <li>Subregion: ${details.region}</li>
    <li>Population: ${details.population}</li>
    <li>Area: ${details.area}km<sup>2</sup></li>
    <li>Languages: ${idioma}</li>
    <li>Currency: ${coin}</li>
    </ul>
  </div>
  `;
  info.innerHTML = content;
  // close() función para cerrar el modal
  const closeModal = document.getElementById('close');
  function close() {
    modal.innerHTML = '';
    form.classList.remove('dark');
    list.classList.remove('dark');
  }
  closeModal.addEventListener('click', close);
};

// addCountries agrega la lista de todos los países
// Además tiene un evento tipo click para que los detalles se despilieguen cuando
// se haga click
const addCountries = (countrie) => {
  list.innerHTML = '';
  countrie.forEach((countrieName) => {
    const countrieList = document.createElement('a');
    countrieList.setAttribute('href', countrieName.name);
    countrieList.setAttribute('id', countrieName.name);
    countrieList.innerHTML = countrieName.name;
    list.appendChild(countrieList);
    countrieList.addEventListener('click', (event) => {
      event.preventDefault();
      addDetails(countrieName);
      form.classList.add('dark');
      list.classList.add('dark');
      modal.classList.add('active');
    });
  });
};

// Se hace la petición get para obtener los datos de la api
// Y dentro de ella hay un evento tipo input para filtrar
// la entrada de los datos.
fetch(API)
  .then((response) => response.json())
  .then((data) => {
    addCountries(data);
    form.addEventListener('input', (event) => {
      event.preventDefault();
      const input = form.elements[0].value;
      const filtro = data.filter((word) => word.name.toUpperCase().includes(`${input.toUpperCase()}`));
      if (filtro === false) {
        addCountries(data);
      } else {
        addCountries(filtro);
      }
    });
  });
