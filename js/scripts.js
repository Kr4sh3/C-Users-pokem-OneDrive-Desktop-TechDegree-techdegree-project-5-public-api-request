const galleryContainer = document.querySelector('#gallery');
const body = document.querySelector('body');
const modalRoot = document.querySelector('#modal-root');
let users = []

//Fetches 12 random users from randomuser.me api and appends the html generated with createGalleryCard
async function displayUsers() {
    try {
        const response = await fetch('https://randomuser.me/api/?results=12');
        const json = await response.json();
        users = json.results;
        users.forEach((user) => {
            galleryContainer.insertAdjacentHTML('beforeend', createGalleryCard(user));
        });
    }
    catch (error) {
        body.insertAdjacentHTML('beforeend', `<h1>Oh no! There was an error!</h1><h2>${error}</h2>`);
    }
}

//Takes in a user and creates a card with the data
function createGalleryCard(user) {
    html = `<div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${user.picture.large}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="${user.login.username}" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                    <p class="card-text">${user.email}</p>
                    <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
                </div>
            </div>`;
    return html;
}

//Takes in a user and creates a modal with the data
function createModalWindow(user) {
    html = `<div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${user.picture.large}" alt="profile picture">
                        <h3 id="modal-${user.login.username}" class="modal-name cap">${user.name.title} ${user.name.first} ${user.name.last}</h3>
                        <p class="modal-text">${user.email}</p>
                        <p class="modal-text cap">${user.location.city}</p>
                        <hr>
                        <p class="modal-text">${user.cell}</p>
                        <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
                        <p class="modal-text">Birthday: ${user.dob.date}</p>
                    </div>
                </div>

                // IMPORTANT: Below is only for exceeds tasks 
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>`;
    return html;
}

//Escape key to exit modal
body.addEventListener('keydown', (e) => {
    const modal = document.querySelector('.modal-container');
    if (modal !== null && e.key === 'Escape')
        modal.remove();
});

//Close button and clicking out of modal functionality
modalRoot.addEventListener('click', (e) => {
    const modal = document.querySelector('.modal-container');
    if (modal !== null) {
        //First part is for close button, everything after || is to allow clicking out of the modal
        if (e.target.closest('.modal-close-btn') !== null || (e.target.closest('.modal') === null && e.target.closest('.modal-btn-container') === null))
            modal.remove();
    }
});

//Clicking on card opens modal functionality
galleryContainer.addEventListener('click', (e) => {
    card = e.target.closest('.card');
    if (card !== null && card.classList.contains('card')) {
        const user = users.find((user) => user.login.username === card.querySelector('.card-name').id);
        const modalWindow = createModalWindow(user);
        modalRoot.insertAdjacentHTML('beforeend', modalWindow);
    }
});

displayUsers();