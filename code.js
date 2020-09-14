var code = document.getElementById('code');
var start = document.getElementById('start');
var reset = document.getElementById('reset');
var workspace = document.getElementById('workspace');
var command = document.getElementById('command');
var input_div = document.getElementById('input_div');
var slider = document.getElementById('user_input');
var ok = document.getElementById('input_button');
// var input_label = document.getElementById('input_value');
var val = document.getElementById('value');
input_div.style.display = "none";
// input_div.style.visibility = 'hidden';

var code_row_no = 0;
var work_row_no = 0;
var command_row_no = 0;
var user_input, user_variable;
var arr_img = './images/array_low.jpg';
var step_img = './images/step_low_1.jpg';

reset.disabled = true;

console.log(code);
console.log(code.rows[0]);
console.log(start);

slider.oninput = function () {
    val.innerHTML = this.value;
}
ok.onclick = () => {
    user_input = slider.value;
    input_div.style.display = 'none';
    start.disabled = false;
    userUpdateImpulseWork(user_variable, user_input, code_row_no);
};

start.onclick = function () {
    updateWorkspace('Impulse');
    if (code_row_no === 0) {
        start.innerHTML = 'Next';
        code.rows[code_row_no].className += "table-warning";
        code_row_no++;
    }
    else if (code_row_no < 6 && code_row_no > 0) {
        // start.innerHTML = 'Next';
        code.rows[code_row_no - 1].className = "";
        code.rows[code_row_no].className += "table-warning";
        code_row_no++;
    }
    else if (code_row_no > 6) {
        code.rows[code_row_no--].className = "";
        code.rows[code_row_no--].className = "";
        code.rows[code_row_no--].className = "";
        code.rows[code_row_no].className = "";
        start.disabled = true;
        reset.disabled = false;
    }
    else if (code_row_no === 6) {
        start.innerHTML = 'End';
        code.rows[code_row_no - 1].className = "";
        code.rows[code_row_no++].className += "table-warning";
        code.rows[code_row_no++].className += "table-warning";
        code.rows[code_row_no++].className += "table-warning";
        code.rows[code_row_no].className += "table-warning";
        plotImpulse();
    }
};

reset.onclick = Reset;

function Reset() {
    code_row_no = 0;
    command_row_no = 0;
    while (workspace.rows.length > 1) {
        workspace.deleteRow(1);
    }
    console.log('command.rows.length', command.rows.length);
    while (command.rows.length > 0) {
        command.deleteRow(0);
    }
    start.innerHTML = 'Start';
    start.disabled = false;
    reset.disabled = true;
    plot_container.innerHTML = "";
}

function updateWorkspace(wave) {
    if (wave === 'Impulse') {
        updateImpuseWork();
    }
    else {
        console.log('Another wave');
    }
}

function userUpdateImpulseWork(user_variable, user_input, code_row_no) {
    var row, icon, name, value;
    console.log(user_variable);
    console.log(user_input);
    console.log(code_row_no);
    switch (code_row_no) {
        case 4:
            command.rows[command_row_no - 1].cells[1].innerHTML += user_input;
            row = workspace.insertRow(-1);
            icon = row.insertCell(0);
            name = row.insertCell(1);
            value = row.insertCell(2);
            var img = document.createElement('img');
            img.src = arr_img;
            icon.appendChild(img);
            name.innerHTML = user_variable;
            value.innerHTML = '<div class="text-primary"><em>' + user_input + '</em></div>';
    }
}

function updateImpuseWork() {
    var row, icon, name, value;
    switch (code_row_no) {
        case 1:
            row = workspace.insertRow(-1);
            icon = row.insertCell(0);
            name = row.insertCell(1);
            value = row.insertCell(2);
            var img = document.createElement('img');
            img.src = arr_img;
            icon.appendChild(img);
            name.innerHTML = 't';
            value.innerHTML = '<div class="text-primary"><em>1x2001 double</em></div>';
            break;
        case 2:
            row = workspace.insertRow(-1);
            icon = row.insertCell(0);
            name = row.insertCell(1);
            value = row.insertCell(2);
            icon.innerHTML = '<div></div>';
            var img = document.createElement('img');
            img.src = arr_img;
            icon.appendChild(img);
            name.innerHTML = 'L';
            value.innerHTML = '<div class="text-primary"><em>2001</em></div>';
            break;
        case 3:
            user_variable = 'delay';
            enableInput('>> Enter the delay if any (in msec): ', -90, 90, 5);
            break;
        case 4:
            row = workspace.insertRow(-1);
            icon = row.insertCell(0);
            name = row.insertCell(1);
            value = row.insertCell(2);
            icon.innerHTML = '<div></div>';
            var img = document.createElement('img');
            img.src = arr_img;
            icon.appendChild(img);
            name.innerHTML = 'delay_in_sample';
            value.innerHTML = '<div class="text-primary"><em>1000</em></div>';
            break;
        case 5:
            row = workspace.insertRow(-1);
            icon = row.insertCell(0);
            name = row.insertCell(1);
            value = row.insertCell(2);
            icon.innerHTML = '<div></div>';
            var img = document.createElement('img');
            img.src = arr_img;
            icon.appendChild(img);
            name.innerHTML = 'impulse';
            value.innerHTML = '<div class="text-primary"><em>1x20001 double</em></div>';
            break;
    }
}

function enableInput(message, min, max, step) {
    var row, cursor, mesg;
    row = command.insertRow(-1);
    if (command_row_no > 0) {
        command.rows[command_row_no - 1].cells[0].innerHTML = '';
    }
    cursor = row.insertCell(0);
    mesg = row.insertCell(1);
    cursor.innerHTML = 'f(x)';
    mesg.innerHTML = message;
    slider.min = min;
    slider.max = max;
    slider.step = step;
    input_div.style.display = 'flex';
    start.disabled = true;
    val.innerHTML = slider.value;
    console.log('command no.:', command_row_no);
    command_row_no++;
}

// var code_interval = setInterval(() => {
//     console.log(code_row_no);
// }, 3000);
