var plot_container = document.getElementById('plot-container');

var config = {
    responsive: true,
    scrollZoom: true,
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['resetScale2d'],
}

function plotSine() {
    console.log('called plot Sine');

    var lx = [];
    var ly = [];

    var a = 50;
    var f = 630;
    var N = 2;
    var upper_limit = N * (1 / f);
    var step1 = 1 / (f * 100);
    var step2 = 0.0001;

    console.log('upper_limit', upper_limit);
    console.log('step_size_1', step1);
    console.log('step_size_2', step2);
    console.log('freq', f);
    console.log('amplitude', a);
    console.log('Math.PI', Math.PI);
    console.log('sin(6.28318531)', Math.sin(6.28318531));

    var i;
    var sine_val;
    for (i = 0; i <= upper_limit + (step1 / 2); i += step1) {
        lx.push(i);
        sine_val = a * Math.sin(2 * Math.PI * f * i);
        // console.log('sine_val', Math.sin(2 * Math.PI * f * i));
        ly.push(sine_val);
    }

    console.log('sine of ', 2 * Math.PI * f * lx[lx.length - 1]);
    console.log('sine of last', Math.sin(2 * Math.PI * f * lx[lx.length - 1]));
    console.log('last x:', lx[lx.length - 1]);
    console.log('last y:', ly[ly.length - 1]);

    var trace1 = {
        x: lx,
        y: ly,
        type: 'line',
        line: {
            color: '#red'
        }
    };

    var layout = {
        title: 'Sine Function',
        xaxis: {
            title: 'Time (sec)'
        },
        yaxis: {
            title: 'Amplitude'
        },
        plot_bgcolor: '#c3f0ca',
        margin: {
            t: 30,
        }
    };

    var data = [trace1];

    isPlotted = true;
    console.log('isPlotted', isPlotted);

    Plotly.newPlot('plot-container', data, layout, { responsive: true });
}

plotSine();