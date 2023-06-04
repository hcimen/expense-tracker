var ctx = document.getElementById('income-expenses').getContext('2d');
  var chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [{
        label: 'Income',
        data: [2000, 3000, 2500, 4000, 3500, 5000],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }, {
        label: 'Expenses',
        data: [1500, 2000, 1800, 2500, 2200, 3000, 3850],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: false
			}
			}]
		}
		}
	});