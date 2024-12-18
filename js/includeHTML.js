function includeHTML() {
    var elements = document.querySelectorAll('[data-include]');
    elements.forEach(function (element) {
        var file = element.getAttribute('data-include');
        fetch(file)
            .then(response => response.text())
            .then(data => {
                element.innerHTML = data;
                element.removeAttribute('data-include');

                // After content is loaded, reapply styles if necessary
                setTimeout(function () {
                    element.style.width = '100%'; // Ensure the container takes full width
                }, 50);

                // Check if the newly included content has more includes
                includeHTML(); // Recursive call to handle nested includes

                // Execute any scripts that were loaded with the included HTML
                executeScripts(element);
            })
            .catch(error => console.error('Error loading HTML component:', error));
    });
}

function executeScripts(container) {
    var scripts = container.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
        var script = document.createElement("script");
        if (scripts[i].src) {
            script.src = scripts[i].src;
        } else {
            script.textContent = scripts[i].textContent;
        }
        document.body.appendChild(script);
    }
}

// Initialize the includeHTML function once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', includeHTML);
