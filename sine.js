var a, f, N, step;

function writeSineCode() {
    console.log('writing Sine code');
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

    for (let i = 1; i <= 11; i++) {
        row = code_table.insertRow(-1);
        sno = row.insertCell(0);
        line = row.insertCell(1);
        sno.innerHTML = '' + i;
        switch (i) {
            case 1:
                line.innerHTML = '<samp># Sine Wave</samp>';
                break;
            case 2:
                line.innerHTML = '<samp> a = input(\'Enter Amplitude: \');</samp>';
                break;
            case 3:
                line.innerHTML = '<samp>f = input(\'Enter Frequency (in Hz): \');</samp>';
                break;
            case 4:
                line.innerHTML = '<samp>N = input(\'Enter no. of cycles to generate: \'); </samp>';
                break;
            case 5:
                line.innerHTML = '<samp>Step_size = 1 / (100 * f);</samp>';
                break;
            case 6:
                line.innerHTML = '<samp>t = 0: Step_size: N*Step_size * 100;</samp>';
                break;
            case 7:
                line.innerHTML = '<samp>y = a * sin(2 * pi * f * t);</samp>';
                break;
            case 8:
                line.innerHTML = '<samp>plot(t, y); </samp>';
                break;
            case 9:
                line.innerHTML = '<samp>title(\'Sine Function\'); </samp>';
                break;
            case 10:
                line.innerHTML = '<samp>xlabel(\'Time (sec)\'); </samp>';
                break;
            case 11:
                line.innerHTML = '<samp>ylabel(\'Amplitude\'); </samp>';
                break;

        }
    }

    code_div.appendChild(code_table);
    start.disabled = false;
}

function sineCodeHighlight() {
    var code = document.getElementById('code');
    if (code_row_no === 0) {
        start.innerHTML = 'Next';
        code.rows[code_row_no].className += "table-warning";
        code_row_no++;
    }
    else if (code_row_no < 7 && code_row_no > 0) {
        code.rows[code_row_no - 1].className = "";
        code.rows[code_row_no].className += "table-warning";
        code_row_no++;
    }
    else if (code_row_no === 7) {
        start.innerHTML = 'End';
        code.rows[code_row_no - 1].className = "";
        code.rows[code_row_no++].className += "table-warning";
        code.rows[code_row_no++].className += "table-warning";
        code.rows[code_row_no++].className += "table-warning";
        code.rows[code_row_no].className += "table-warning";
        plotSine();
    }
    else if (code_row_no > 7) {
        code.rows[code_row_no--].className = "";
        code.rows[code_row_no--].className = "";
        code.rows[code_row_no--].className = "";
        code.rows[code_row_no].className = "";
        start.disabled = true;
        reset.disabled = false;
    }
}

function updateSineWork() {
    workspace.style = 'font-size: clamp(10px, 1.5vw, 14px);';
    var row, icon, name, value;
    switch (code_row_no) {
        case 1:
            user_variable = 'a';
            enableInput('>> Enter Amplitude: ', 1, 5, 1, 2);
            break;
        case 2:
            user_variable = 'f';
            enableInput('>> Enter Frequency (in Hz): ', 10, 30, 1, 20);
            break;
        case 3:
            user_variable = 'N';
            enableInput('>> Enter no.of cycle to generate: ', 1, 4, 1, 2);
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
            name.innerHTML = 'Step_size';
            step = 1 / (100 * parseInt(f));
            value.innerHTML = '<div class="text-primary"><em>' + step + '</em></div>';
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
            name.innerHTML = 't';
            var dim = ((Math.abs(parseInt(N)) * step * 100) / step) + 1;
            value.innerHTML = '<div class="text-primary"><em>1x' + dim + ' double</em></div>';
            break;
        case 6:
            row = workspace.insertRow(-1);
            icon = row.insertCell(0);
            name = row.insertCell(1);
            value = row.insertCell(2);
            icon.innerHTML = '<div></div>';
            var img = document.createElement('img');
            img.src = arr_img;
            icon.appendChild(img);
            name.innerHTML = 'y';
            var dim = ((Math.abs(parseInt(N)) * step * 100) / step) + 1;
            value.innerHTML = '<div class="text-primary"><em>1x' + dim + ' double</em></div>';
            break;
    }
}

function userUpdateSineWork(user_variable, user_input, code_row_no) {
    var row, icon, name, value;

    if (code_row_no - 1 === 1) {

        a = user_input;

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
    else if (code_row_no - 1 === 2) {

        f = user_input;

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
    else if (code_row_no - 1 === 3) {

        N = user_input;

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

function plotSine() {
    console.log('called plot Sine');

    var lx = [];
    var ly = [];

    a = parseInt(a);
    f = parseInt(f);
    N = parseInt(N);

    var limit = N * step * 100;
    for (let i = 0; i <= limit; i += step) {
        lx.push(i);
        var sine_val = a * Math.sin(2 * Math.PI * f * i);
        ly.push(sine_val);
    }

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
        plot_bgcolor: '#c3f0ca'
    };

    var data = [trace1];

    isPlotted = true;
    console.log('isPlotted', isPlotted);

    Plotly.newPlot('plot-container', data, layout, config);
}