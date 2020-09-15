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
// var code_frame = document.getElementById('code-frame');
var code_div = document.getElementById('code-div');
// var input_label = document.getElementById('input_value');
var val = document.getElementById('value');
input_div.style.display = "none";
// input_div.style.visibility = 'hidden';

var wave;
var code_row_no = 0;
var work_row_no = 0;
var command_row_no = 0;
var user_input, user_variable;
var arr_img = './images/array_low.jpg';
var step_img = './images/step_low_1.jpg';

start.disabled = true;
reset.disabled = true;

// console.log(code);
// console.log(code.rows[0]);
// console.log(start);
// console.log(wave_selector);

wave_selector.onchange = () => {
    code_div.innerHTML = '';
    Reset();
    wave = wave_selector.value;
    console.log('Wave:', wave);
    switch (wave) {
        case 'impulse':
            writeImpulseCode();
            break;
        case 'ramp':
            writeRampCode();
            break;
        case 'step':
            writeStepCode();
            break;
        case 'sine':
            writeSineCode();
            break;
        case 'cos':
            writeCosCode();
            break;
        case 'exp':
            writeExpCode();
            break;
        default:
            code_div.innerHTML = '';
            Reset();
            break;
    }
}


slider.oninput = function () {
    val.innerHTML = this.value;
}

ok.onclick = () => {
    user_input = slider.value;
    input_div.style.display = 'none';
    start.disabled = false;
    switch (wave) {
        case 'impulse':
            userUpdateImpulseWork(user_variable, user_input, code_row_no);
            break;
        case 'ramp':
            userUpdateRampWork(user_variable, user_input, code_row_no);
            break;
        case 'step':
            userUpdateStepWork(user_variable, user_input, code_row_no);
            break;
        case 'sine':
            userUpdateSineWork(user_variable, user_input, code_row_no);
            break;
        case 'cos':
            userUpdateCosWork(user_variable, user_input, code_row_no);
            break;
        case 'exp':
            userUpdateExpWork(user_variable, user_input, code_row_no);
            break;
    }
    // userUpdateImpulseWork(user_variable, user_input, code_row_no);
};

start.onclick = function () {
    switch (wave) {
        case 'impulse':
            updateImpuseWork();
            impulseCodeHighlight();
            break;
        case 'ramp':
            updateRampWork();
            rampCodeHighlight();
            break;
        case 'step':
            updateStepWork();
            stepCodeHighlight();
            break;
        case 'sine':
            updateSineWork();
            sineCodeHighlight();
            break;
        case 'cos':
            updateCosWork();
            cosCodeHighlight();
            break;
        case 'exp':
            updateExpWork();
            expCodeHighlight();
            break;
    }
    // updateWorkspace('Impulse');
    // impulseCodeHighlight();
};

reset.onclick = Reset;

function Reset() {
    code_row_no = 0;
    command_row_no = 0;
    while (workspace.rows.length > 1) {
        workspace.deleteRow(1);
    }
    while (command.rows.length > 0) {
        command.deleteRow(0);
    }
    start.innerHTML = 'Start';
    start.disabled = false;
    reset.disabled = true;
    plot_container.innerHTML = "";
    input_div.style.display = "none";
}


function enableInput(message, min, max, step, default_val) {
    var row, cursor, mesg;
    row = command.insertRow(-1);
    if (command_row_no > 0) {
        command.rows[command_row_no - 1].cells[0].innerHTML = '';
    }
    cursor = row.insertCell(0);
    mesg = row.insertCell(1);
    cursor.innerHTML = '<em>f(x)</em>';
    cursor.style = 'width: 1px;'
    mesg.innerHTML = message;
    slider.min = min;
    slider.max = max;
    slider.step = step;
    slider.value = default_val;
    input_div.style.display = 'flex';
    start.disabled = true;
    val.innerHTML = slider.value;
    console.log('command no.:', command_row_no);
    command_row_no++;
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
