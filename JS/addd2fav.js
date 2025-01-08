document.addEventListener('DOMContentLoaded', () => {
    const favoritesContainer = document.getElementById('favorites-list');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Function to render the favorites list
    function renderFavorites() {
        favoritesContainer.innerHTML = '';
        
        if (favorites.length === 0) {
            favoritesContainer.innerHTML = '<p>Your favorites list is empty!</p>';
            return;
        }

        favorites.forEach(item => {
            const favoriteItem = document.createElement('div');
            favoriteItem.classList.add('favorite-item');
            favoriteItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="info">
                    <h3>${item.name}</h3>
                    <p>Price: Rs.${item.price}/-</p>
                </div>
                <div class="actions">
                    <button onclick="removeFromFavorites(${item.id})">Remove</button>
                </div>
            `;
            favoritesContainer.appendChild(favoriteItem);
        });
    }

    // Function to remove item from favorites
    window.removeFromFavorites = (id) => {
        const index = favorites.findIndex(item => item.id === id);
        if (index > -1) {
            favorites.splice(index, 1);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            renderFavorites();
            alert('Item removed from favorites!');
        }
    };

    renderFavorites();
});

// Function to add items to favorites (callable from other scripts)
window.addToFavorite = (id, name, price, image) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const existingItem = favorites.find(item => item.id === id);

    if (!existingItem) {
        favorites.push({ id, name, price, image });
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${name} has been added to your favorites!`);
    } else {
        alert(`${name} is already in your favorites!`);
    }
};
