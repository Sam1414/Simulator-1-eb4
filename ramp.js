var t1, t2;

function writeRampCode() {
    console.log('writing ramp code');
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

    for (let i = 1; i <= 10; i++) {
        row = code_table.insertRow(-1);
        sno = row.insertCell(0);
        line = row.insertCell(1);
        sno.innerHTML = '' + i;
        switch (i) {
            case 1:
                line.innerHTML = '<samp># Unit Ramp</samp>';
                break;
            case 2:
                line.innerHTML = '<samp> disp(\'Enter the time range for generating ramp function below:\')</samp>';
                break;
            case 3:
                line.innerHTML = '<samp>t1 = input(\'Lower limit (in Sec) = \');</samp>';
                break;
            case 4:
                line.innerHTML = '<samp>t2 = input(\'Upper limit (in Sec) = \');</samp>';
                break;
            case 5:
                line.innerHTML = '<samp>t = t1 : t2;</samp>';
                break;
            case 6:
                line.innerHTML = '<samp>x = t.*[t >= 0];</samp>';
                break;
            case 7:
                line.innerHTML = '<samp>plot(t,x);</samp>';
                break;
            case 8:
                line.innerHTML = '<samp>title(\'Unit Ramp Function\')</samp>';
                break;
            case 9:
                line.innerHTML = '<samp>xlabel(\'Time(Sec)\');</samp>';
                break;
            case 10:
                line.innerHTML = '<samp>ylabel(\'Amplitude\'); </samp>';
                break;
        }
    }

    code_div.appendChild(code_table);
    start.disabled = false;
}

function rampCodeHighlight() {
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
    else if (code_row_no === 6) {
        start.innerHTML = 'End';
        code.rows[code_row_no - 1].className = "";
        code.rows[code_row_no++].className += "table-warning";
        code.rows[code_row_no++].className += "table-warning";
        code.rows[code_row_no++].className += "table-warning";
        code.rows[code_row_no].className += "table-warning";
        plotRamp();
    }
    else if (code_row_no > 6) {
        code.rows[code_row_no--].className = "";
        code.rows[code_row_no--].className = "";
        code.rows[code_row_no--].className = "";
        code.rows[code_row_no].className = "";
        start.disabled = true;
        reset.disabled = false;
    }
}

function updateRampWork() {
    var row, icon, name, value;
    switch (code_row_no) {
        case 1:
            var row, cursor, mesg;
            row = command.insertRow(-1);
            if (command_row_no > 0) {
                command.rows[command_row_no - 1].cells[0].innerHTML = '';
            }
            cursor = row.insertCell(0);
            mesg = row.insertCell(1);
            cursor.innerHTML = '<em>f(x)</em>';
            cursor.style = 'width: 1px;'
            mesg.innerHTML = '>> Enter the time range for generating ramp function below: ';
            command_row_no++;
            break;
        case 2:
            user_variable = 't1';
            enableInput('>> Lower limit (in sec): ', -50, -5, 1, -20);
            break;
        case 3:
            user_variable = 't2';
            enableInput('>> Upper limit (in sec): ', 5, 50, 1, 20);
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
            name.innerHTML = 't';
            var dim = Math.abs(parseInt(t1)) + Math.abs(parseInt(t2)) + 1;
            value.innerHTML = '<div class="text-primary"><em>1x' + dim + ' double</em></div>';
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
            name.innerHTML = 'x';
            var dim = Math.abs(parseInt(t1)) + Math.abs(parseInt(t2)) + 1;
            value.innerHTML = '<div class="text-primary"><em>1x' + dim + ' double</em></div>';
            break;
    }
}

function userUpdateRampWork(user_variable, user_input, code_row_no) {
    var row, icon, name, value;

    if (code_row_no - 1 === 2) {

        t1 = user_input;

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

        t2 = user_input;

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

function plotRamp() {
    console.log('called plot ramp');

    var lx = [];
    var ly = [];

    t1 = parseInt(t1);
    t2 = parseInt(t2);
    for (let i = t1; i <= t2; i += 1) {
        lx.push(i);
        if (i <= 0) {
            console.log('pushed 0');
            ly.push(0);
        }
        else {
            ly.push(i);
        }
    }

    var trace1 = {
        x: lx,
        y: ly,
        type: 'line'
    };

    var data = [trace1];

    var layout = {
        title: 'Unit Ramp Function',
        xaxis: {
            title: 'Time (sec)'
        },
        yaxis: {
            title: 'Amplitude'
        }
    };

    var config = {
        responsive: true
    }

    isPlotted = true;
    console.log('isPlotted', isPlotted);

    Plotly.newPlot('plot-container', data, layout, config);
}
