$(document).ready(function() {
    fetchDogs();
    $(window).on('click', function(event) {
        if ($(event.target).is('#dog-modal')) {
            closeModal();
        }
    });

    $('.close-button').on('click', function() {
        closeModal();
    });
});

function fetchDogs() {
    $.get('https://usersdogs.dmytrominochkin.cloud/dogs', function(data) {
        displayDogs(data);
    }).fail(function(error) {
        console.error('Error fetching dogs:', error);
    });
}

function displayDogs(dogs) {
    const $dogList = $('#dog-list');
    dogs.forEach(dog => {
        const dogItem = `
            <div class="dog-item">
                <img src="https://usersdogs.dmytrominochkin.cloud${dog.dogImage}" alt="${dog.title}">
                <div class="dog-info">
                    <h3>${dog.title}</h3>
                    <p>${dog.sex}</p>
                </div>
            </div>
        `;
        const $dogItem = $(dogItem).on('click', function() {
            openModal(dog);
        });
        $dogList.append($dogItem);
    });
}

function openModal(dog) {
    $('#modal-dog-image').attr('src', `https://usersdogs.dmytrominochkin.cloud${dog.dogImage}`);
    $('#modal-dog-title').text(dog.title);
    $('#modal-dog-sex').text(dog.sex);
    $('#modal-dog-age').text(dog.age);
    $('#modal-dog-description').text(dog.description);
    $('#adopt-button').attr('href', `tel:0500313901`);
    $('#dog-modal').show();
}

function closeModal() {
    $('#dog-modal').hide();
}
