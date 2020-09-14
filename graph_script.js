var ctx = document.getElementById('myChart');

var wave = {
    y: ctx.height / 2,
    amplitude: 100,
    length: 0.05015,
    frequency: 220,
    phase: 20
}

var omega = 2 * Math.PI * wave.frequency;
var k = (2 * Math.PI) / wave.length;
var phi = Math.PI * wave.phase;
var time = 0;

// var x = [], y = [];
// for (let i = 0; i < ctx.width; i += 1) {
//     x.push(i);
//     y.push(Math.sin(i));
//     // console.log(Math.sin((k * x) - (omega * time) + phi));
//     // y.push(Math.sin((k * x) - (omega * time) + phi));
//     time += 0.05;
// }
// console.log('x:', x.length);
// console.log('y:', y);

var l = [];
for (let i = 0; i < 50; i++) {
    l.push(i);
}

var data = {
    labels: l,
    datasets: [
        // {
        //     label: 'f(x) = x',
        //     function: function (x) { return x },
        //     data: [],
        //     borderColor: [
        //         'rgba(255, 99, 132, 1)'
        //     ],
        //     borderWidth: 1,
        //     fill: false,
        // },
        // {
        //     label: "f(x) = x²",
        //     function: function (x) { return x * x },
        //     data: [],
        //     borderColor: "rgba(153, 102, 255, 1)",
        //     fill: false
        // },
        {
            label: "f(x) = sin(x)",
            function: function (x) { time += 0.5; return 50 * Math.sin((k * x) - (omega * time) + phi) },
            // 100 * Math.sin(0.1 * x)
            data: [],
            borderColor: "rgba(153, 255, 0, 1)",
            fill: false
        }]
};

Chart.pluginService.register({
    beforeInit: function (chart) {
        // We get the chart data
        var data = chart.config.data;

        // For every dataset ...
        for (var i = 0; i < data.datasets.length; i++) {

            // For every label ...
            for (var j = 0; j < data.labels.length; j++) {

                // We get the dataset's function and calculate the value
                var fct = data.datasets[i].function,
                    x = data.labels[j],
                    y = fct(x);
                // Then we add the value to the dataset data
                data.datasets[i].data.push(y);
            }
        }
    }
});

var myChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        elements: {
            point: {
                radius: 0
            }
        }
    }
});