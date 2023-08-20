const contentDiv = document.getElementById('content');
const inputHistoryTable = document.getElementById('inputHistory');
const electricityInput = document.getElementById('electricityInput');
const submitBtn = document.getElementById('submitBtn');
var inputCount = 1;

// Function to populate the input history list
function populateInputHistory(inputHistory) {
    
    inputHistory.forEach(inputRow => {
        const row = document.createElement('tr');

        const tdNo = document.createElement('td');
        tdNo.textContent = inputCount;
        inputCount++;
        row.appendChild(tdNo);

        const tdValue = document.createElement('td');
        tdValue.textContent = inputRow["value"];
        row.appendChild(tdValue);

        const tdTime = document.createElement('td');
        tdTime.textContent = inputRow["time"];
        row.appendChild(tdTime);
        inputHistoryTable.appendChild(row);
    });
}

// Function to populate the input history list
function appendNewInputHistory(newRow) {

    const row = document.createElement('tr');

    const tdNo = document.createElement('td');
    tdNo.textContent = inputCount;
    inputCount++;
    row.appendChild(tdNo);

    const tdValue = document.createElement('td');
    tdValue.textContent = newRow["value"];
    row.appendChild(tdValue);

    const tdTime = document.createElement('td');
    tdTime.textContent = newRow["time"];
    row.appendChild(tdTime);
    inputHistoryTable.appendChild(row);

}

// Simulated input history for testing
const inputHistory = JSON.parse(localStorage.getItem('inputHistory')) || [];

// Function to track and display input history
function trackElectricity() {
    const inputValue = electricityInput.value;
    if (inputValue === '') {
        return;
    }

    const currentTime = new Date().toLocaleString();
    const newData = { value: inputValue, time: currentTime };

    inputHistory.push(newData);
    appendNewInputHistory(newData);
    localStorage.setItem('inputHistory', JSON.stringify(inputHistory));

    electricityInput.value = ''; // Clear input field after submission
}

submitBtn.addEventListener('click', trackElectricity);

electricityInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        trackElectricity();
    }
});

// Populate input history list with simulated input history
populateInputHistory(inputHistory);