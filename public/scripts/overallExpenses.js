var ctx = document.getElementById('overall').getContext('2d');
		var chart = new Chart(ctx, {
			type: 'doughnut',
			data: {
				labels: ['Food', 'Housing', 'Transportation', 'Entertainment', 'Other'],
				datasets: [{
					data: [300, 500, 200, 100, 150],
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 206, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(153, 102, 255, 0.2)'
					],
					borderColor: [
						'rgba(255, 99, 132, 1)',
						'rgba(54, 162, 235, 1)',
						'rgba(255, 206, 86, 1)',
						'rgba(75, 192, 192, 1)',
						'rgba(153, 102, 255, 1)'
					],
					borderWidth: 2
				}]
			},
			options: {
				responsive: true,
				maintainAspectRatio: true,
				aspectRatio: 2,
				title: {
					display: true,
					text: '(Pie Chart)'
				},
				legend: {
					position: 'left'
				  }
			}
		});

/*     function changeData() {
			chart.data.datasets[0].data = [150, 300, 100, 50, 75];
			chart.update();
		}
 */