var ctx = document.getElementById('largeGraphic').getContext('2d');
var chart = new Chart(ctx, {
type: 'bar',
data: {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [{
      label: 'Income',
      data: [2200, 2500, 1800, 2000, 2200, 2300, 2400, 2100, 1700, 1900, 2800, 2200],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 2,
  }, {
      label: 'Expenses',
      data: [1900, 1600, 1500, 2200, 1800, 1500, 1600, 2500, 1600, 1300, 1800, 1500],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 2,
  }, {
      type: 'line',
      label: 'Difference',
      data: [300, 900, 300, 100, 400, 800, 100, 1100, 800, 600, 300, 1300],
      fill: true,
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 6,
      pointRadius: 3,
      pointBackgroundColor: 'rgba(75, 192, 192, 1)',
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)'
  }]
},
options: {
  responsive: true,
  maintainAspectRatio: true,
  scales: {
      xAxes: [{
          display: true,
          ticks: {
              autoSkip: true,
              maxTicksLimit: 12,
          }
      }],
      yAxes: [{
          display: true,
          position: 'left',
          id: 'y-axis-1'
      }, {
          display: true,
          position: 'right',
          id: 'y-axis-2',
          gridLines: {
              drawOnChartArea: true,
          }
      }]
  }
}
});