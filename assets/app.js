'use strict'

console.clear()

let header__Search = document.querySelector(".header__Search");
let character__container = document.querySelector(".character__container");
let btnSearchIcon = document.getElementById("btnSearchIcon");
let inputSearch = document.getElementById("inputSearch");

async function llamarApi(nameCharacter) {

    try {
        let api = await fetch(
            `https://dragon-ball-super-api.herokuapp.com/api/characters/${nameCharacter}`
        );
        let data = await api.json();

        showPersonaje(data)
    } catch (error) {
      showError(error);
    }
}

function showError(error) {
  Swal.fire({
    icon: "error",
    title:"Personaje no encontrado",
    text: "¡Cuidado con las mayusculas!",
    showConfirmButton: false,
    timer: 3000,
  });
}


function showPersonaje(personaje) {
    const { name, specie, role, imageUrl, universe, originplanet } = personaje;


    character__container.innerHTML = `
        <section class="hero__Character">
        <div class="hero__Character-img">
        <img src="${imageUrl}" alt="fotoPrueba">
        </div>
        <div class="hero__Character-dates">
            <p>Nombre: <span class="dateColor">${name}</span></p>
            <p>Especie: <span class="dateColor">${specie}</span></p>
            <p>Rol Anime: <span class="dateColor"> ${role}</span></p>
            <p>Universo: <span class="dateColor">${universe}</span></p>
            <p>${originplanet}</p>
        </div>
        </section>
        `;
}


  btnSearchIcon.addEventListener("click", (e) => {
    e.preventDefault();

    let string = inputSearch.value

    function capitalizarPrimeraLetra(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    if (capitalizarPrimeraLetra(string) == "") {
        showError();
    } else {
      llamarApi(capitalizarPrimeraLetra(string));
    }
  });
