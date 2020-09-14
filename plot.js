// import plotlyLatestMin from "./plotly-latest.min";
// import Plotly from './plotly-latest.min.js';

var lx = [], ly1 = [], ly2 = [];
for (let i = 0; i < 10; i += 0.1) {
    lx.push(i);
    ly1.push(10 * Math.sin(i));
    ly2.push(10 * Math.cos(i));
}
var trace1 = {
    x: lx,
    y: ly1,
    type: 'line'
};

var trace2 = {
    x: lx,
    y: ly2,
    type: 'scatter'
};

var data = [trace1, trace2];

Plotly.newPlot('myDiv', data);
