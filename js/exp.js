var n1, n2, a, dim;

function writeExpCode() {
    console.log('writing Exp code');
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
                line.innerHTML = '<samp>clear <span style="color: blue">all</span>;</samp>';
                break;
            case 2:
                line.innerHTML = '<samp> disp(\'Enter the time range:\')</samp>';
                break;
            case 3:
                line.innerHTML = '<samp>n1 = input(\'Lower limit (in sec): \');</samp>';
                break;
            case 4:
                line.innerHTML = '<samp>n2 = input(\'Upper limit (in sec): \');</samp>';
                break;
            case 5:
                line.innerHTML = '<samp>t = n1: 0.001: n2;</samp>';
                break;
            case 6:
                line.innerHTML = '<samp>a = input(\'Enter a for function exp(a * t): \');</samp>';
                break;
            case 7:
                line.innerHTML = '<samp>y = exp(a * t);</samp>';
                break;
            case 8:
                line.innerHTML = '<samp>plot(t, y); </samp>';
                break;
            case 9:
                line.innerHTML = '<samp>title(\'Exponential Function\'); </samp>';
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

function expCodeHighlight() {
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
        plotExp();
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

function updateExpWork() {
    var row, icon, name, value;
    switch (code_row_no) {
        case 0:
            while (workspace.rows.length > 1) {
                workspace.deleteRow(1);
            }
            break;
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
            mesg.innerHTML = '>> Enter the time range: ';
            command_row_no++;
            break;
        case 2:
            user_variable = 'n1';
            enableInput('>> Lower limit (in sec): ', -10, -2, 0.5, -3);
            break;
        case 3:
            user_variable = 'n2';
            enableInput('>> Upper limit (in sec): ', 1, 5, 0.5, 1.5);
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
            dim = (Math.abs(parseFloat(n1)) + Math.abs(parseFloat(n2))) * 1000 + 1;
            value.innerHTML = '<div class="text-primary"><em>1x' + dim + ' double</em></div>';
            break;
        case 5:
            user_variable = 'a';
            enableInput('>> Enter a for function exp(a * t): ', -5, 5, 1, 1);
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
            // dim = Math.abs(parseFloat(n1)) + Math.abs(parseFloat(n2)) + 1;
            value.innerHTML = '<div class="text-primary"><em>1x' + dim + ' double</em></div>';
            break;
    }
}

function userUpdateExpWork(user_variable, user_input, code_row_no) {
    var row, icon, name, value;

    if (code_row_no - 1 === 2) {

        n1 = user_input;

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

        n2 = user_input;
        console.log(n2);
        console.log('user_input', user_input);

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
    else if (code_row_no - 1 === 5) {

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
}


var isPlotted;
var plot_container = document.getElementById('plot-container');

function plotExp() {
    console.log('called plot Exp');

    var lx = [];
    var ly = [];

    console.log('n2', n2);
    n1 = parseFloat(n1);
    n2 = parseFloat(n2);
    a = parseFloat(a);
    console.log('n1', n1);
    console.log('n2', n2);

    for (let i = n1; i <= n2 + (0.1 / 2); i += 0.1) {
        lx.push(i);
        var exp_value = Math.exp(a * i);
        ly.push(exp_value);
    }

    var trace1 = {
        x: lx,
        y: ly,
        type: 'line',
        line: {
            color: 'red'
        }
    };

    var data = [trace1];

    var layout = {
        title: 'Exponential Function',
        xaxis: {
            title: 'Time (sec)',
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

    isPlotted = true;
    console.log('isPlotted', isPlotted);

    Plotly.newPlot('plot-container', data, layout, config);
}
