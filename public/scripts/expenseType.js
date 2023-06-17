var xValues = ["Housing", "Grocery", "Transportation", "Entertainment", "Financial", "Others"];
    var yValues = [500, 429, 213, 379, 435, 183];
    var barColors = ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)", "rgba(255, 99, 132, 0.2)"];
    
    new Chart("expenseType", {
      type: "bar",
      data: {
        labels: xValues,
        datasets: [{
          backgroundColor: barColors,
          data: yValues
        }]
      },
      options: {
        legend: {display: false},
        title: {
          display: true,
          text: "(Bar Chart)"
        }
      }
    });