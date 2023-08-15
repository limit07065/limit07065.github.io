// estimated-bill/script.js
// Scripts for the Estimated Bill page

const billTableBody = document.getElementById('bill-table');

// Function to calculate the total cost
function calculateTotalCost(consumption, rate) {
  return (consumption * rate).toFixed(2);
}

// Populate the Estimated Bill table with input history
function populateEstimatedBillTable(inputHistory) {
  const rate = 0.2775; // Electricity rate per kWh
  var estimates = groupData(inputHistory);
  console.log(estimates);

  estimates.forEach(entry => {    
    var date = new Date();
    date.setMonth(entry.month);
    const month = date.toLocaleString('en-US', { month: 'long' });

    const consumption = entry.sum;        
    const totalCost = calculateTotalCost(consumption, rate);

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${month} - ${entry.year}</td>
      <td>${consumption.toFixed(1)} kWh</td>
      <td>${rate.toFixed(4)} $/kWh</td>
      <td>${totalCost} $</td>
    `;

    billTableBody.appendChild(row);
  });
}

function groupData(data){
  const groupedData = {};

  data.forEach(item => {
    const timestamp = new Date(item.time);
    const year = timestamp.getFullYear();
    const month = timestamp.getMonth();
    const key = `${year}-${month}`;

    if (!groupedData[key]) {
      groupedData[key] = { year, month, sum: 0 };
    }

    groupedData[key].sum += parseFloat(item.value);
  });

  return Object.values(groupedData);    
}

// Simulated input history for testing
const inputHistory = JSON.parse(localStorage.getItem('inputHistory')) || [];

// Populate Estimated Bill table with simulated input history
populateEstimatedBillTable(inputHistory);
