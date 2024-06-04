document.addEventListener("DOMContentLoaded", () => {
    fetchDogs();
    window.addEventListener('click', outsideClick);
});

function fetchDogs() {
    fetch('https://usersdogs.dmytrominochkin.cloud/dogs')
        .then(response => response.json())
        .then(data => displayDogs(data))
        .catch(error => console.error('Error fetching dogs:', error));
}

function displayDogs(dogs) {
    const dogList = document.getElementById('dog-list');
    dogs.forEach(dog => {
        const dogItem = document.createElement('div');
        dogItem.classList.add('dog-item');
        dogItem.innerHTML = `
            <img src="https://usersdogs.dmytrominochkin.cloud${dog.dogImage}" alt="${dog.title}">
            <div class="dog-info">
                <h3>${dog.title}</h3>
                <p>${dog.sex}</p>
            </div>
        `;
        dogItem.addEventListener('click', () => openModal(dog));
        dogList.appendChild(dogItem);
    });
}

function openModal(dog) {
    document.getElementById('modal-dog-image').src = `https://usersdogs.dmytrominochkin.cloud${dog.dogImage}`;
    document.getElementById('modal-dog-title').textContent = dog.title;
    document.getElementById('modal-dog-sex').textContent = dog.sex;
    document.getElementById('modal-dog-age').textContent = dog.age;
    document.getElementById('modal-dog-description').textContent = dog.description;
    document.getElementById('dog-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('dog-modal').style.display = 'none';
}

function outsideClick(event) {
    const modal = document.getElementById('dog-modal');
    if (event.target == modal) {
        closeModal();
    }
}
