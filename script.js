document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const suggestions = document.getElementById('suggestions');
    const carInfo = document.getElementById('car-info');
    const maintext = document.querySelector('.maintext');
    const variants = document.querySelector('variants')
    let carData = [];
    let carVariants = [];
    let currentIndex = -1;

    const csvConfig = {
        carName: 'car_name',
        price: 'price',
        variantName: 'variant_name',
        drive_type: 'drive_type',
        fuel_tank_capacity: 'fuel_tank_capacity',
        fuel_type: 'fuel_type',
        mileage: 'mileage',
        torque: 'torque',
        image: 'image' // Ensure this column exists in your CSV
    };

    function resetSearchBoxBorderRadius() {
        maintext.style.borderBottomLeftRadius = '10px'; // Revert to default border radius
        maintext.style.borderBottomRightRadius = '10px'; // Revert to default border radius
    }

    if (searchInput) {
        Papa.parse('cars.csv', {
            download: true,
            header: true,
            complete: function(results) {
                carData = results.data;
                checkDataLoaded();
            },
            error: function(error) {
                console.error('Error loading cars2 CSV:', error);
            }
        });

        

        function checkDataLoaded() {
            if (carData.length && carVariants.length) {
                carData.forEach(car => {
                    car.variants = carVariants
                        .filter(variant => variant[csvConfig.carName] === car[csvConfig.carName])
                        .map(variant => variant[csvConfig.variantName]);
                });
                console.log('Combined car data:', carData);
            }
        }

        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            suggestions.innerHTML = '';
            currentIndex = -1;
            if (query && carData.length) {
                const filteredCars = carData.filter(car => car[csvConfig.carName].toLowerCase().includes(query));
                console.log('Filtered cars:', filteredCars);

                if (filteredCars.length > 0) {
                    filteredCars.forEach(car => {
                        const div = document.createElement('div');
                        div.className = 'suggestion-item';
                        const regex = new RegExp(`(${query})`, 'gi');
                        div.innerHTML = car[csvConfig.carName].replace(regex, '<strong>$1</strong>');
                        div.addEventListener('click', () => navigateToCarPage(car));
                        suggestions.appendChild(div);
                    });
                    suggestions.classList.add('show');
                    maintext.style.borderBottomLeftRadius = '0'; // Adjust border radius
                    maintext.style.borderBottomRightRadius = '0'; // Adjust border radius
                } else {
                    const noResultsDiv = document.createElement('div');
                    noResultsDiv.className = 'no-results';
                    noResultsDiv.textContent = 'No results found';
                    suggestions.appendChild(noResultsDiv);
                    suggestions.classList.add('show');
                    // Keep border radius as 0 if no results found
                }
            } else {
                suggestions.classList.remove('show');
                resetSearchBoxBorderRadius(); // Revert to default border radius
            }
        });

        searchInput.addEventListener('keydown', (e) => {
            const items = suggestions.getElementsByClassName('suggestion-item');
            if (items.length > 0) {
                if (e.key === 'ArrowDown') {
                    currentIndex = (currentIndex + 1) % items.length;
                    highlightSuggestion(items);
                } else if (e.key === 'ArrowUp') {
                    currentIndex = (currentIndex - 1 + items.length) % items.length;
                    highlightSuggestion(items);
                } else if (e.key === 'Enter' && currentIndex >= 0) {
                    items[currentIndex].click();
                }
            }
        });

        function highlightSuggestion(items) {
            for (let i = 0; i < items.length; i++) {
                items[i].classList.remove('highlighted');
            }
            items[currentIndex].classList.add('highlighted');
            items[currentIndex].scrollIntoView({ block: 'nearest' });
        }

        function navigateToCarPage(car) {
            sessionStorage.setItem('selectedCar', JSON.stringify(car));
            window.location.href = 'car.html';
        }

        document.addEventListener('click', function(event) {
            if (!maintext.contains(event.target)) {
                if (searchInput.value.trim() !== '') {
                    searchInput.value = ''; // Clear the input field
                    suggestions.innerHTML = ''; // Clear the suggestions
                }
                maintext.classList.remove('active');
                resetSearchBoxBorderRadius(); // Revert to default border radius
            }
        });

        document.querySelector('.container').classList.add('show');
    }

    if (carInfo) {
        const carDataString = sessionStorage.getItem('selectedCar');
        if (carDataString) {
            const car = JSON.parse(carDataString);
            let variantsHTML = '';
            if (car.variants && car.variants.length) {
                variantsHTML = `
                    <h3>Variants:</h3>
                    <ul>
                        ${car.variants.map(variant => `<li>${variant}</li>`).join('')}
                    </ul>
                `;
            }

            // Log the car data to ensure the image URL is available
            console.log('Selected car data:', car);

            // Create the car info HTML with the image tag included
            
            carInfo.innerHTML = `
                <h2 id="car_name" class="p">${car[csvConfig.carName]}</h2>
                <p id="price" class="p">Price: ${car[csvConfig.price]}</p>
                <p id="drive_type" class="p">Drive Type: ${car[csvConfig.drive_type]}</p>
                <p id="fuel_tank_cap" class="p">Fuel Tank Capacity: ${car[csvConfig.fuel_tank_capacity]}</p>
                <p id="fuel_type" class="p">Fuel Type: ${car[csvConfig.fuel_type]}</p>
                <p id="torque" class="p">Torque: ${car[csvConfig.torque]}</p>
                <p id="mileage" class="p">Mileage: ${car[csvConfig.mileage]}</p>
                <div class="car-img" class="p"><img id="car-image" src="${car[csvConfig.image]}" alt="Car Image"></div>
                <div class="variants">${variantsHTML}</div>
                
                
            `;
            

            // Check if the image source is being set correctly
            const carImage = document.getElementById('car-image');
            if (carImage) {
                console.log('Image source:', carImage.src);
                if (!carImage.src) {
                    carImage.style.display = 'none';
                }
            }

            carInfo.classList.add('show');
        } else {
            carInfo.innerHTML = '<p>No car data found. Please return to the search page.</p>';
        }
    }

    maintext.addEventListener('click', function() {
        maintext.classList.add('active');
        searchInput.focus();
    });
});
