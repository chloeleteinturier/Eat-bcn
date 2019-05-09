'use strict';

let favoriteContainer = document.getElementById('favoriteContainer');
let user = document.getElementById('user').value;
let favoriteStatus = favoriteContainer.className;
let favoritePhoto = `<button id="favorite" class="btn btn-secondary ml-1"><img src="/src/favorite-${favoriteStatus}.svg"></button>`;

let placeId = window.location.search.slice(10);

favoriteContainer.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(user);
  if (user === 'true') {
    axios.post('/api', {
      placeId,
      status: favoriteStatus
    });
    if (favoriteStatus === 'off') {
      favoriteContainer.innerHTML = '<button id="favorite" class="btn btn-secondary ml-1"><img src="/src/favorite-on.svg"></button>';
      favoriteStatus = 'on';
    } else {
      favoriteContainer.innerHTML = '<button id="favorite" class="btn btn-secondary ml-1"><img src="/src/favorite-off.svg"></button>';
      favoriteStatus = 'off';
    }
  } else {
    window.location.href = '/login';
  }
});

window.addEventListener('load', function (event) {
  console.log(user);
  favoriteContainer.innerHTML = favoritePhoto;
});
