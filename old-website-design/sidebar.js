// sidebar.js
document.addEventListener("DOMContentLoaded", function() {
    fetch('sidebar.html') // Load the sidebar file
        .then(response => {
            if (!response.ok) { // Check for response errors
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('sidebar-placeholder').innerHTML = data; // Insert sidebar content
        })
        .catch(err => console.error('Error loading the sidebar:', err));
});
