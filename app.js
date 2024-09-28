// List of categories and their corresponding ranked brands
const categories = {
    "Smartphones & Accessories": ["1. Google (Pixel)", "2. Samsung (Galaxy series)", "3. Apple (iPhone, AirPods)", "4. Otterbox (phone cases)"],
    "Computers & Tablets": ["1. HP (Spectre, Pavilion)", "2. Dell (XPS, Inspiron)", "3. Microsoft (Surface)", "4. Apple (MacBook, iPad)"],
    "Smart Home Devices": ["1. Ring (smart doorbells)", "2. Google (Nest)", "3. Amazon (Echo, Alexa)", "4. Philips (Hue smart lighting)"],
    "TVs & Audio Equipment": ["1. LG (OLED TVs)", "2. Bose (speakers, soundbars)", "3. Samsung (QLED TVs)", "4. Sony (Bravia, audio systems)"],
    "Wearable Tech": ["1. Garmin (Vivoactive, Fenix)", "2. Apple (Apple Watch)", "3. Fitbit (Inspire, Charge)", "4. Samsung (Galaxy Watch)"],
    "Gaming Consoles": ["1. Nintendo (Switch)", "2. Microsoft (Xbox)", "3. Sony (PlayStation)"],
    // Add other categories here...
};

// Display suggestions as the user types
function showSuggestions(query) {
    const suggestionsDiv = document.getElementById('autocompleteSuggestions');
    suggestionsDiv.innerHTML = ''; // Clear suggestions
    
    if (query.length === 0) {
        return; // No query, no suggestions
    }

    // Filter categories by the user input
    const matchingCategories = Object.keys(categories).filter(category =>
        category.toLowerCase().includes(query.toLowerCase())
    );

    // Display matching suggestions
    matchingCategories.forEach(category => {
        const suggestion = document.createElement('div');
        suggestion.textContent = category;
        suggestion.onclick = () => showResults(category);
        suggestionsDiv.appendChild(suggestion);
    });
}

// Display the ranked list of brands based on the selected category
function showResults(category) {
    document.getElementById('autocompleteSuggestions').innerHTML = ''; // Clear suggestions
    document.getElementById('searchInput').value = ''; // Clear the input field
    
    // Display the results
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = ''; // Clear previous results
    categories[category].forEach(brand => {
        const listItem = document.createElement('li');
        listItem.textContent = brand;
        resultsList.appendChild(listItem);
    });

    // Toggle visibility
    document.querySelector('.container').style.display = 'none';
    document.getElementById('resultsContainer').style.display = 'block';
}

// Go back to the search screen
function goBack() {
    document.querySelector('.container').style.display = 'block';
    document.getElementById('resultsContainer').style.display = 'none';
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/simpleCategorySearch/service-worker.js')
        .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
            console.error('Service Worker registration failed:', error);
        });
    });
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the default mini-infobar from appearing
    e.preventDefault();
    // Store the event so it can be triggered later
    deferredPrompt = e;
    
    // Show the install button or any UI to promote the PWA installation
    const installButton = document.getElementById('installButton');
    installButton.style.display = 'block';  // Make the button visible
});

// When the user clicks the "Install" button
document.getElementById('installButton').addEventListener('click', async () => {
    if (deferredPrompt) {
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }
        // Reset the deferred prompt variable
        deferredPrompt = null;
        // Hide the install button
        document.getElementById('installButton').style.display = 'none';
    }
});