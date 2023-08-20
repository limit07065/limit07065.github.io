// estimated-bill/script.js
// Scripts for the Estimated Bill page

const billTableBody = document.getElementById('bill-table');

// Function to calculate the total cost
function calculateTotalCost(group, rate) {
  const daysInMonth = getDaysInMonth(group.year,group.month);  
  const multiples = daysInMonth * 24 / group.hoursDifference;
  
  return (multiples * (group.lastValue - group.firstValue) * rate).toFixed(2);
}

// Populate the Estimated Bill table with input history
function populateEstimatedBillTable(inputHistory) {
  const rate = 0.2775; // Electricity rate per kWh
  var estimates = groupDataByMonth(inputHistory);

  estimates.forEach(group => {
    var date = new Date();

    date.setMonth(group.month);
    const month = date.toLocaleString('en-US', { month: 'long' });
    
    const totalCost = calculateTotalCost(group, rate);

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${month} - ${group.year}</td>
      <td> kWh</td>
      <td>${rate.toFixed(4)} $/kWh</td>
      <td>${totalCost} $</td>
    `;

    billTableBody.appendChild(row);
  });
}

function groupDataByMonth(data) {
  const groupedData = {};

  data.forEach(item => {
    const timestamp = new Date(item.time);
    const year = timestamp.getFullYear();
    const month = timestamp.getMonth();
    const key = `${year}-${month}`;

    if (!groupedData[key]) {
      groupedData[key] = { year: year, month: month};
    }
    const group = groupedData[key];

    if (!group.firstDay) {
      group.firstDay = timestamp;
      group.firstValue = item.value;
    }
    else {
      group.lastDay = timestamp;
      group.lastValue = item.value;
    }

    const hoursDifference = calculateHourDifference(group.firstDay, group.lastDay);
    if (hoursDifference) {
      group.hoursDifference = hoursDifference;            
    }

  });

  return Object.values(groupedData);
}

function calculateHourDifference(date1, date2) {
  if (!date1 || !date2) {
    return null;
  }
  // Calculate the time difference in milliseconds
  const timeDifference = date2 - date1;

  // Convert the time difference to days
  const hoursDifference = Math.round(timeDifference / (1000 * 60 * 60));
  return hoursDifference;
}

function getDaysInMonth(year, month) {
  // Create a new Date object for the given year and month (months are 0-indexed)
  const date = new Date(year, month, 1);

  // Move to the next month and subtract 1 day to get the last day of the target month
  date.setMonth(date.getMonth() + 1);
  date.setDate(date.getDate() - 1);

  // The date now holds the last day of the target month, which gives the number of days in that month
  return date.getDate();
}

// Simulated input history for testing
const inputHistory = JSON.parse(localStorage.getItem('inputHistory')) || [];

// Populate Estimated Bill table with simulated input history
populateEstimatedBillTable(inputHistory);
