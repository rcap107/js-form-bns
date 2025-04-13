document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userForm');
    const savedDataDiv = document.getElementById('savedData');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const shield_set = document.getElementById('shield_set').value;
        const shield_piece = document.getElementById('shield_piece').value;
        const hp = document.getElementById('hp').value;
        const stat_1 = document.getElementById('stat_1').value;
        const stat_1_text = document.getElementById('stat_1_text').value;
        const stat_2 = document.getElementById('stat_2').value;
        const stat_2_text = document.getElementById('stat_2_text').value;
        const add_stat_1 = document.getElementById('add_stat_1').value;
        const add_stat_1_text = document.getElementById('add_stat_1_text').value;
        const add_stat_2 = document.getElementById('add_stat_2').value;
        const add_stat_2_text = document.getElementById('add_stat_2_text').value;
        const primer_stat_1 = document.getElementById('primer_stat_1').value;
        const primer_stat_1_text = document.getElementById('primer_stat_1_text').value;

        const formData = {
            shield_set: shield_set,
            shield_piece: shield_piece,
            hp: hp,
            stat_1: stat_1,
            stat_1_text: stat_1_text,
            stat_2: stat_2,
            stat_2_text: stat_2_text,
            add_stat_1: add_stat_1,
            add_stat_1_text: add_stat_1_text,
            add_stat_2: add_stat_2,
            add_stat_2_text: add_stat_2_text,
            primer_stat_1: primer_stat_1,
            primer_stat_1_text: primer_stat_1_text
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

    clearLocal.addEventListener('click', () => {
        window.localStorage.clear();
        displaySavedData();
    });

    function displaySavedData() {
        const savedData = JSON.parse(localStorage.getItem('formData')) || [];
        savedDataDiv.innerHTML = '';
        savedData.forEach((data, index) => {
            const dataDiv = document.createElement('div');
            dataDiv.innerHTML = `<strong>Entry ${index + 1}:</strong><br>
                                 Shield Set: ${data.shield_set}<br>
                                 Shield Piece: ${data.shield_piece}<br>
                                 HP: ${data.hp}<br>
                                 Stat 1: ${data.stat_1} (${data.stat_1_text})<br>
                                 Stat 2: ${data.stat_2} (${data.stat_2_text})<br>
                                 Additional Stat 1: ${data.add_stat_1} (${data.add_stat_1_text})<br>
                                 Additional Stat 2: ${data.add_stat_2} (${data.add_stat_2_text})<br>
                                 Primer Stat 1: ${data.primer_stat_1} (${data.primer_stat_1_text})`;
            savedDataDiv.appendChild(dataDiv);
        });
    }

    // Display saved data on page load
    displaySavedData();
});
