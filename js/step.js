var delay;

function writeStepCode() {
    console.log('writing step code');
    var row, sno, line;

    var code_table = document.createElement('table');
    code_table.className = 'table table-sm table-hover';
    code_table.id = 'code';
    code_table.style = 'font-size: clamp(10px, 1.5vw, 14px);';
    // code_div.appendChild(code_table);

    var col_grp = document.createElement('colgroup');
    col_grp.innerHTML = '<col style="width: 1px; background-color: #C0C0C0;">';
    code_table.appendChild(col_grp);

    var tbody = document.createElement('tbody');
    code_table.appendChild(tbody);

    // for code
    for (let i = 1; i <= 8; i++) {
        row = code_table.insertRow(-1);
        sno = row.insertCell(0);
        line = row.insertCell(1);
        sno.innerHTML = '' + i;
        switch (i) {
            case 1:
                line.innerHTML = '<samp>clear;</samp>';
                break;
            case 2:
                line.innerHTML = '<samp>t = [-1 : 0.0001 : 1] * 1000;</samp>';
                break;
            case 3:
                line.innerHTML = '<samp>delay = input(\'Enter the delay if any (in msec): \');</samp>';
                break;
            case 4:
                line.innerHTML = '<samp>step = (t - delay) >= 0;</samp>';
                break;
            case 5:
                line.innerHTML = '<samp>plot(t, step);</samp>';
                break;
            case 6:
                line.innerHTML = '<samp>xlabel(\'Time(msec)\');</samp>';
                break;
            case 7:
                line.innerHTML = '<samp>ylabel(\'Amplitude\');</samp>';
                break;
            case 8:
                line.innerHTML = '<samp>title(\'Unit step function\');</samp>';
                break;

        }
    }
    code_div.appendChild(code_table);
    start.disabled = false;
}

function stepCodeHighlight() {
    var code = document.getElementById('code');
    if (code_row_no === 0) {
        start.innerHTML = 'Next';
        code.rows[code_row_no].className += "table-warning";
        code_row_no++;
    }
    else if (code_row_no < 4 && code_row_no > 0) {
        code.rows[code_row_no - 1].className = "";
        code.rows[code_row_no].className += "table-warning";
        code_row_no++;
    }
    else if (code_row_no === 4) {
        start.innerHTML = 'End';
        code.rows[code_row_no - 1].className = "";
        code.rows[code_row_no++].className += "table-warning";
        code.rows[code_row_no++].className += "table-warning";
        code.rows[code_row_no++].className += "table-warning";
        code.rows[code_row_no].className += "table-warning";
        plotStep();
    }
    else if (code_row_no > 4) {
        code.rows[code_row_no--].className = "";
        code.rows[code_row_no--].className = "";
        code.rows[code_row_no--].className = "";
        code.rows[code_row_no].className = "";
        start.disabled = true;
        reset.disabled = false;
    }
}

// being called
function updateStepWork() {
    var row, icon, name, value;
    switch (code_row_no) {
        case 0:
            while (workspace.rows.length > 1) {
                workspace.deleteRow(1);
            }
            break;
        case 1:
            row = workspace.insertRow(-1);
            icon = row.insertCell(0);
            name = row.insertCell(1);
            value = row.insertCell(2);
            icon.innerHTML = '<div></div>';
            var img = document.createElement('img');
            img.src = arr_img;
            icon.appendChild(img);
            name.innerHTML = 't';
            value.innerHTML = '<div class="text-primary"><em>1x20001 double</em></div>';
            break;
        case 2:
            user_variable = 'delay';
            enableInput('>> Enter the delay if any (in msec): ', -500, 500, 1, 0);
            break;
        case 3:
            row = workspace.insertRow(-1);
            icon = row.insertCell(0);
            name = row.insertCell(1);
            value = row.insertCell(2);
            icon.innerHTML = '<div></div>';
            var img = document.createElement('img');
            img.src = step_img;
            icon.appendChild(img);
            name.innerHTML = 'step';
            value.innerHTML = '<div class="text-primary"><em>1x20001 logical</em></div>';
            break;
    }
}

function userUpdateStepWork(user_variable, user_input, code_row_no) {
    var row, icon, name, value;

    if (code_row_no - 1 === 2) {

        delay = user_input;

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

function plotStep() {
    console.log('called plot step');

    var lx = [];
    var ly = [];

    delay = parseFloat(delay);
    for (let i = -1000.1; i < delay; i += 0.1) {
        lx.push(i);
        ly.push(0);
    }
    for (let i = delay; i <= 1000; i += 0.1) {
        lx.push(i);
        ly.push(1);
        console.log(i);
    }

    var trace1 = {
        x: lx,
        y: ly,
        type: 'line',
        line: {
            color: 'red'
        }
    };

    var layout = {
        title: 'Unit Step Function',
        xaxis: {
            title: 'Time (msec)',
            showspikes: true,
        },
        yaxis: {
            title: 'Amplitude',
            showspikes: true,
        },
        plot_bgcolor: '#c3f0ca',
        margin: {
            l: 70,
            r: 10,
            t: 90,
            b: 70,
        },
    };

    var data = [trace1];

    isPlotted = true;
    console.log('isPlotted', isPlotted);

    Plotly.newPlot('plot-container', data, layout, config);
}
