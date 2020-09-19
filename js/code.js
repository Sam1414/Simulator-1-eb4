var code = document.getElementById('code');
var start = document.getElementById('start');
var reset = document.getElementById('reset');
var workspace = document.getElementById('workspace');
var command = document.getElementById('command');
var input_div = document.getElementById('input_div');
var slider = document.getElementById('user_input');
var ok = document.getElementById('input_button');
var wave_selector = document.getElementById('wave_selector');
var selected_wave = document.getElementById('selected_wave');
var heading = document.getElementById('heading');
// var code_frame = document.getElementById('code-frame');
var code_div = document.getElementById('code-div');
var code_body = document.getElementById('code-body');
var code_card = document.getElementById('code-card');
var plot_container = document.getElementById('plot-container');
var header_div = document.getElementById('header-div');
// var input_label = document.getElementById('input_value');
var val = document.getElementById('value');
// input_div.style.display = "none";
input_div.style.visibility = 'hidden';
// header_div.style.visibility = 'hidden';
heading.style.visibility = 'hidden';
// heading.style.visibility = 'visible';

var code_table = document.getElementById('code-table');
var work_table = document.getElementById('work-table');
var command_table = document.getElementById('command-table');

var wave;
var code_row_no = 0;
var work_row_no = 1;
var command_row_no = 0;
var code_length = 0;
var user_input;
var user_variable;
var user_img;
var arr_img = './images/array_low.jpg';
var step_img = './images/step_low_1.jpg';

start.disabled = true;
reset.disabled = true;
createEmptyCodeTable();
createEmptyWorkTable();
createEmptyCommandTable();

wave_selector.onchange = () => {
    // heading.style.visibility = 'visible';
    // code_div.innerHTML = '';
    // code_body.innerHTML = '';
    // Reset();

    clearCodeTable();
    start.innerHTML = 'Start';

    wave = wave_selector.value;
    console.log('Wave:', wave);

    writeInitialCode();

    switch (wave) {
        case 'impulse':
            heading.innerHTML = 'Unit Impulse Signal';
            writeImpulseCode();
            break;
        case 'ramp':
            heading.innerHTML = 'Ramp Signal';
            writeRampCode();
            break;
        case 'step':
            heading.innerHTML = 'Unit Step Signal';
            writeStepCode();
            break;
        case 'sine':
            heading.innerHTML = 'Sine Signal';
            writeSineCode();
            break;
        case 'cos':
            heading.innerHTML = 'Cosine Signal';
            writeCosCode();
            break;
        case 'exp':
            heading.innerHTML = 'Exponential';
            writeExpCode();
            break;
        default:
            clearCodeTable();
            Reset();
            break;
    }
    // header_div.visibility = 'inherit';
    heading.style.visibility = 'visible';
}


slider.oninput = function () {
    val.innerHTML = this.value;
}

ok.onclick = () => {
    user_input = slider.value;
    input_div.style.visibility = 'hidden';
    start.disabled = false;
    switch (wave) {
        case 'impulse':
            updateWorkspace(user_variable, '' + user_input, user_img);
            command_table.rows[command_row_no - 1].cells[1].innerHTML += user_input;
            fillImpulseVariables();
            break;
        case 'ramp':
            updateWorkspace(user_variable, '' + user_input, user_img);
            command_table.rows[command_row_no - 1].cells[1].innerHTML += user_input;
            fillRampVariables();
            break;
        case 'step':
            updateWorkspace(user_variable, '' + user_input, user_img);
            command_table.rows[command_row_no - 1].cells[1].innerHTML += user_input;
            fillStepVariables();
            break;
        case 'sine':
            updateWorkspace(user_variable, '' + user_input, user_img);
            command_table.rows[command_row_no - 1].cells[1].innerHTML += user_input;
            fillSineVariables();
            break;
        case 'cos':
            updateWorkspace(user_variable, '' + user_input, user_img);
            command_table.rows[command_row_no - 1].cells[1].innerHTML += user_input;
            fillCosVariables();
            break;
        case 'exp':
            updateWorkspace(user_variable, '' + user_input, user_img);
            command_table.rows[command_row_no - 1].cells[1].innerHTML += user_input;
            fillExpVariables();
            break;
    }
    // userUpdateImpulseWork(user_variable, user_input, code_row_no);
};

start.onclick = function () {
    switch (wave) {
        case 'impulse':
            impulseCodeTraverse();
            break;
        case 'ramp':
            rampCodeTraverse();
            break;
        case 'step':
            stepCodeTraverse();
            break;
        case 'sine':
            sineCodeTraverse();
            break;
        case 'cos':
            cosCodeTraverse();
            break;
        case 'exp':
            expCodeTraverse();
            break;
    }
    // updateWorkspace('Impulse');
    // impulseCodeHighlight();
};

function clearCodeTable() {
    // clear code table --- just the contents.
    console.log('clearing code table');
    code_row_no = 0;
    for (let i = 0; i < 14; i++) {
        var row, sno, line;
        row = code_table.rows[i];
        row.className = '';
        sno = row.cells[0];
        line = row.cells[1];
        sno.innerHTML = '';
        line.innerHTML = '';
    }
}

function createEmptyCodeTable() {
    code_row_no = 0;
    for (let i = 0; i < 17; i++) {
        var row, sno, line;
        row = code_table.insertRow(i);
        sno = row.insertCell(0);
        line = row.insertCell(1);
        sno.innerHTML = (i + 1);
        line.innerHTML = '';
    }
}

function clearWorkTable() {
    console.log('clearing work table');
    work_row_no = 0;
    // clear work table --- just the contents.
    for (let i = 1; i <= 8; i++) {
        var row, icon, name, value;
        row = work_table.rows[i];
        icon = row.cells[1];
        name = row.cells[2];
        value = row.cells[3];
        icon.innerHTML = '';
        name.innerHTML = '';
        value.innerHTML = '';
    }
}

function createEmptyWorkTable() {
    work_row_no = 0;
    for (let i = 1; i <= 8; i++) {
        var row, sno, img, name, value;
        row = work_table.insertRow(i);
        sno = row.insertCell(0);
        img = row.insertCell(1);
        name = row.insertCell(2);
        value = row.insertCell(3);
        sno.innerHTML = (i);
        img.innerHTML = '';
        name.innerHTML = '';
        value.innerHTML = '';
    }
}

function clearCommand() {
    console.log('clearing command table');
    command_row_no = 0;
    // clear command table --- just the contents.
    for (let i = 0; i < 5; i++) {
        var row, col1, col2;
        row = command_table.rows[i];
        col1 = row.cells[0];
        col2 = row.cells[1];
        col1.innerHTML = '*';
        col2.innerHTML = '';
    }
    input_div.style.visibility = 'hidden';
}

function createEmptyCommandTable() {
    command_row_no = 0;
    for (let i = 0; i < 5; i++) {
        var row, col1, col2;
        row = command_table.insertRow(i);
        col1 = row.insertCell(0);
        col2 = row.insertCell(1);
        col1.innerHTML = '*';
        col2.innerHTML = '';
    }
}

function displayCommand(message) {
    var row, col1, col2;

    // Removing f(x) from previous line
    if (command_row_no > 0) {
        command_table.rows[command_row_no - 1].cells[0].innerHTML = '*';
    }

    row = command_table.rows[command_row_no];
    col1 = row.cells[0];
    col2 = row.cells[1];
    col1.innerHTML = '<em>f<sub>x</sub></em>';
    col2.innerHTML = message;
    command_row_no++;
}

function writeInitialCode() {
    console.log('writing initial code');
    for (let i = 0; i < 3; i++) {
        var row, sno, line;
        row = code_table.rows[i];
        sno = row.cells[0];
        line = row.cells[1];
        sno.innerHTML = '' + (i + 1);
        switch (i) {
            case 0:
                // clc;
                line.innerHTML = '<samp>clc;</samp>';
                break;
            case 1:
                // clear all;
                line.innerHTML = '<samp>clear <span style="color: blue">all;</span></samp>';
                break;
            case 2:
                // close
                line.innerHTML = '<samp>close;</samp>';
                break;
        }
    }
}

function traverseInitalCode() {
    console.log('traversing initial code');
    switch (code_row_no) {
        case 0:
            start.innerHTML = 'Next';
            clearCommand();
            break;
        case 1:
            console.log(code_table.rows[code_row_no - 1].className);
            code_table.rows[code_row_no - 1].className = "";
            clearWorkTable();
            break;
        case 2:
            code_table.rows[code_row_no - 1].className = "";
            clearPlot();
            break;
        case 3:
            code_table.rows[code_row_no - 1].className = "";
            break;
    }
    code_table.rows[code_row_no].className += "table-warning";
    code_row_no++;
}

function updateWorkspace(n, v, i) {
    work_row_no++;
    var row, icon, name, value;
    var img = document.createElement('img');
    if (i === 'arr') {
        img.src = arr_img;
    }
    else {
        img.src = step_img;
    }
    row = work_table.rows[work_row_no];
    icon = row.cells[1];
    name = row.cells[2];
    value = row.cells[3];
    icon.appendChild(img);
    name.innerHTML = n;
    value.innerHTML = v;
}

reset.onclick = Reset;

function Reset() {
    code_row_no = 0;
    start.innerHTML = 'Start';
    start.disabled = false;
    reset.disabled = true;
}

function clearPlot() {
    plot_container.innerHTML = "";
}


function enableInput(min, max, step, default_val) {
    slider.min = min;
    slider.max = max;
    slider.step = step;
    slider.value = default_val;
    input_div.style.visibility = 'visible';
    start.disabled = true;
    val.innerHTML = slider.value;
}

function plotFigure(lx, ly, plotTitle, xlabel, ylabel) {
    var trace = {
        x: lx,
        y: ly,
        type: 'line',
        line: {
            color: 'red'
        }
    };

    var data = [trace];

    var layout = {
        title: plotTitle,
        xaxis: {
            title: xlabel,
            showspikes: true,
        },
        yaxis: {
            title: ylabel,
            showspikes: true,
        },
        plot_bgcolor: '#c3f0ca',
        margin: {
            l: 70,
            r: 20,
            t: 90,
            b: 70,
        },
    };

    // Plot Configurations
    var config = {
        responsive: true,
        scrollZoom: true,
        displayModeBar: true,
        displaylogo: false,
        modeBarButtonsToRemove: ['resetScale2d'],
    }

    Plotly.newPlot('plot-container', data, layout, config);
}

// window.onresize = () => {
//     console.log('resized window');
//     console.log('window inner width', window.innerWidth);
//     console.log('window outer width', window.outerWidth);
//     if (isPlotted === true && (window.innerWidth < 800)) {
//         plotImpulse();
//         // Plotly.newPlot('plot-container', data);
//     }
// }

// var code_interval = setInterval(() => {
//     console.log(code_row_no);
// }, 3000);
