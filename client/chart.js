// Any of the following formats may be used
var ctx = document.getElementById('myChart').getContext('2d');

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['12:30', '12:31', '12:32', '12:33', '12:34', '12:35'],
        datasets: [{
            label: 'Price $',
            data: [58, 59, 58, 60, 61, 65, 60, 58, 57, 58, 59, 59, 6, 60, 60, 59],
            backgroundColor: 'transparent',
            borderColor: 'rgba(100,100,255,0.85)',
            borderWidth: 4
        }]
    },
});
