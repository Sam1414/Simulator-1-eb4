var delay;

function writeImpulseCode() {
    console.log('writing impulse code');
    var row, sno, line;

    var code_table = document.createElement('table');
    code_table.className = 'table table-sm table-hover';
    code_table.id = 'code';
    // code_table.style = 'font-size: clamp(10px, 1.5vw, 14px);';
    // code_div.appendChild(code_table);

    var col_grp = document.createElement('colgroup');
    col_grp.innerHTML = '<col style="width: 1px; background-color: #C0C0C0;">';
    code_table.appendChild(col_grp);

    var tbody = document.createElement('tbody');
    code_table.appendChild(tbody);

    for (let i = 1; i <= 10; i++) {
        row = code_table.insertRow(-1);
        sno = row.insertCell(0);
        line = row.insertCell(1);
        sno.innerHTML = '' + i;
        switch (i) {
            case 1:
                line.innerHTML = '<samp># Unit impulse</samp>';
                break;
            case 2:
                line.innerHTML = '<samp>t = [-1: 0.005: 1] * 100;</samp>';
                break;
            case 3:
                line.innerHTML = '<samp>L = length(t);</samp>';
                break;
            case 4:
                line.innerHTML = '<samp>delay = input(\'Enter the delay if any(in msec): \');</samp>';
                break;
            case 5:
                line.innerHTML = '<samp>delay_in_sample = delay / 0.1;</samp>';
                break;
            case 6:
                line.innerHTML = '<samp>impulse = [zeros(1, (L-1) / 2 + delay_in_sample) 1 zeros(1, (L - 1) / 2 - delay_in_sample)];</samp>';
                break;
            case 7:
                line.innerHTML = '<samp>plot(t, impulse);</samp>';
                break;
            case 8:
                line.innerHTML = '<samp>xlabel(\'Time(msec)\');</samp>';
                break;
            case 9:
                line.innerHTML = '<samp>ylabel(\'Amplitude\');</samp>';
                break;
            case 10:
                line.innerHTML = '<samp>title(\'Unit Impulse Function\');</samp>';
                break;
        }
    }
    code_div.appendChild(code_table);
    start.disabled = false;
}

function impulseCodeHighlight() {
    var code = document.getElementById('code');
    if (code_row_no === 0) {
        start.innerHTML = 'Next';
        code.rows[code_row_no].className += "table-warning";
        code_row_no++;
    }
    else if (code_row_no < 6 && code_row_no > 0) {
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
            enableInput('>> Enter the delay if any (in msec): ', -95, 95, 1, 0);
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

function userUpdateImpulseWork(user_variable, user_input, code_row_no) {
    var row, icon, name, value;
    console.log(user_variable);
    console.log(user_input);
    console.log(code_row_no);
    delay = user_input;
    if (code_row_no === 4) {

        command.rows[command_row_no - 1].cells[0].style = 'width: 1px;';
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

var isPlotted;
var plot_container = document.getElementById('plot-container');

function plotImpulse() {
    console.log('called plot impulse');

    var lx = [];
    var ly = [];

    for (let i = -100; i <= 100; i += 0.5) {
        lx.push(i);
        if (i === parseInt(delay)) {
            console.log('pushed 1');
            ly.push(1);
        }
        else {
            ly.push(0);
        }
    }

    var trace1 = {
        x: lx,
        y: ly,
        type: 'line',
        mode: 'lines',
        name: 'Impulse'
    };

    var layout = {
        title: 'Unit Impulse Function',
        xaxis: {
            title: 'Time (msec)'
        },
        yaxis: {
            title: 'Amplitude'
        }
    };

    var config = {
        responsive: true
    }

    var data = [trace1];

    isPlotted = true;
    console.log('isPlotted', isPlotted);

    Plotly.newPlot('plot-container', data, layout, config);
}
