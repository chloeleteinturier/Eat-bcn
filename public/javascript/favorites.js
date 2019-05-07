'use strict';

let favoriteContainer = document.getElementById('favoriteContainer');

let favoriteStatus = 'off';
let favoritePhoto = `<a id="favorite" class="btn btn-secondary ml-1"><img src="/src/favorite-${favoriteStatus}.svg"></a>`;

let placeId = window.location.search.slice(10);

// let favoriteFormHtml = `
// <form method="POST" action="../api" id="hiddenForm">
// <input type="hidden" name="placeId" value="${placeId}" />
// <input type="hidden" name="status" value="${favoriteStatus}" />
// </form>
// `;

favoriteContainer.addEventListener('click', (e) => {
  e.preventDefault();
  axios.post('http://localhost:3000/api', {
    placeId,
    status: favoriteStatus
  });
  if (favoriteStatus === 'off') {
    favoriteContainer.innerHTML = '<a id="favorite" class="btn btn-secondary ml-1"><img src="/src/favorite-on.svg"></a>';
    favoriteStatus = 'on';
  } else {
    favoriteContainer.innerHTML = '<a id="favorite" class="btn btn-secondary ml-1"><img src="/src/favorite-off.svg"></a>';
    favoriteStatus = 'off';
  }
});

window.addEventListener('load', function (event) {
  // console.log(favoriteContainer);
  favoriteContainer.innerHTML = favoritePhoto;
});
