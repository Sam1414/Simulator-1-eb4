var graph = new Graph({
    appendTo: "container",
    canvasWidth: 800,
    canvasHeight: 800 / Math.sqrt(2),
    title: "Sine And Cosine Functions",
    xAxisTitle: "x (rad)",
    yAxisTitle: "sin(x), cos(x)"
});

var py = [], px = [];

for (var x = 0; x < 2 * Math.PI; x += 0.01) {
    py.push(Math.sin(x));
    px.push(x);
}

graph.plot(py, px);

px.length = 0;
py.length = 0;

for (var x = 0; x < 2 * Math.PI; x += 0.01) {
    py.push(Math.cos(x));
    px.push(x);
}

graph.plot(py, px);