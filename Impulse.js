var isPlotted;
var plot_container = document.getElementById('plot-container');

function plotImpulse() {
    console.log('called plot impulse');

    var lx = [];
    var ly = [];

    for (let i = -100; i <= 100; i += 0.5) {
        lx.push(i);
        if (i === 0) {
            ly.push(1);
        }
        else {
            ly.push(0);
        }
    }

    var trace1 = {
        x: lx,
        y: ly,
        type: 'line'
    };

    var data = [trace1];

    isPlotted = true;
    console.log('isPlotted', isPlotted);

    Plotly.newPlot('plot-container', data);
}


window.onresize = () => {
    console.log('resized window');
    console.log('window inner width', window.innerWidth);
    console.log('window outer width', window.outerWidth);
    if (isPlotted === true && (window.innerWidth < 800)) {
        plotImpulse();
        // Plotly.newPlot('plot-container', data);
    }
}