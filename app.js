document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userForm');
    const savedDataDiv = document.getElementById('savedData');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const formData = {
            name: name,
            email: email,
            message: message
        };

        // Save data to local storage
        const savedData = JSON.parse(localStorage.getItem('formData')) || [];
        savedData.push(formData);
        localStorage.setItem('formData', JSON.stringify(savedData));

        // Display saved data
        displaySavedData();

        // Clear the form
        form.reset();
    });
    exportButton.addEventListener('click', () => {
        const savedData = JSON.parse(localStorage.getItem('formData')) || [];
        const jsonData = JSON.stringify(savedData, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'formData.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });

    function displaySavedData() {
        const savedData = JSON.parse(localStorage.getItem('formData')) || [];
        savedDataDiv.innerHTML = '';
        savedData.forEach((data, index) => {
            const dataDiv = document.createElement('div');
            dataDiv.innerHTML = `<strong>Entry ${index + 1}:</strong><br>
                                 Name: ${data.name}<br>
                                 Email: ${data.email}<br>
                                 Message: ${data.message}`;
            savedDataDiv.appendChild(dataDiv);
        });
    }

    // Display saved data on page load
    displaySavedData();
});
