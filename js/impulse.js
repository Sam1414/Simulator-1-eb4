var delay;

function writeImpulseCode() {
    console.log('writing impulse code');
    var row, sno, line;

    for (let i = 3; i < 14; i++) {
        row = code_table.rows[i];
        sno = row.cells[0];
        line = row.cells[1];
        sno.innerHTML = '' + (i + 1);
        switch (i) {
            case 3:
                line.innerHTML = '<samp><span style="color: green">% Unit Impulse Signal</span></samp>';
                break;
            case 4:
                line.innerHTML = '<samp>t = [-1: 0.001: 1] * 1000;</samp>';
                break;
            case 5:
                line.innerHTML = '<samp>L = length(t);</samp>';
                break;
            case 6:
                line.innerHTML = '<samp>delay = input(\'Enter the delay (in msec): \');</samp>';
                break;
            case 7:
                line.innerHTML = '<samp>n1 = (L - 1) / 2 + delay;</samp>'
                break;
            case 8:
                line.innerHTML = '<samp>n2 = (L - 1) / 2 - delay;</samp>'
                break;
            case 9:
                line.innerHTML = '<samp>impulse = [zeros(1, n1) 1 zeros(1, n2)];</samp>';
                break;
            case 10:
                line.innerHTML = '<samp>plot(t, impulse);</samp>';
                break;
            case 11:
                line.innerHTML = '<samp>xlabel(\'Time(msec)\');</samp>';
                break;
            case 12:
                line.innerHTML = '<samp>ylabel(\'Amplitude\');</samp>';
                break;
            case 13:
                line.innerHTML = '<samp>title(\'Unit Impulse Function\');</samp>';
                break;
        }
    }
    code_div.appendChild(code_table);
    start.disabled = false;
}

function impulseCodeTraverse() {
    console.log('code row no', code_row_no);
    if (code_row_no <= 3) {
        traverseInitalCode();
    }
    else if (code_row_no > 10) {
        code_table.rows[--code_row_no].className = "";
        code_table.rows[--code_row_no].className = "";
        code_table.rows[--code_row_no].className = "";
        code_table.rows[--code_row_no].className = "";
        start.disabled = true;
        reset.disabled = false;
    }
    else {
        code_table.rows[code_row_no - 1].className = "";
        code_table.rows[code_row_no].className += "table-warning";
        switch (code_row_no) {
            case 4:
                updateWorkspace('t', '1x2001 double', 'arr');
                break;
            case 5:
                updateWorkspace('L', '2001', 'arr');
                break;
            case 6:
                user_variable = 'delay';
                user_img = 'arr';
                displayCommand('>> Enter the delay (in msec): ');
                enableInput(-800, 800, 1, 0);
                // workspace updated on OK pressing.
                break;
            case 7:
                updateWorkspace('n1', 1000 + parseFloat(user_input), 'arr');
                break;
            case 8:
                updateWorkspace('n2', 1000 - parseFloat(user_input), 'arr');
                break;
            case 9:
                updateWorkspace('impulse', '1x2001', 'arr');
                break;
            case 10:
                start.innerHTML = 'End';
                code_table.rows[++code_row_no].className += "table-warning";
                code_table.rows[++code_row_no].className += "table-warning";
                code_table.rows[++code_row_no].className += "table-warning";
                plotImpulse();
                break;
        }
        code_row_no++;
    }
}

function fillImpulseVariables() {
    // only one variable
    delay = user_input;
    console.log('updating impulse variables', delay);
}

function plotImpulse() {
    console.log('called plot impulse');

    var lx = [];
    var ly = [];
    delay = parseFloat(delay);

    for (let i = -999; i <= 1000; i += 1) {
        lx.push(i);
        if (i === delay) {
            console.log('pushed 1');
            ly.push(100000);
        }
        else {
            ly.push(0);
        }
    }

    plotFigure(lx, ly, 'Unit Impulse Function', 'Time (msec)', 'Amplitude');
}
