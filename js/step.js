var delay;

function writeStepCode() {
    console.log('writing step code');
    var row, sno, line;

    // for code
    for (let i = 3; i < 11; i++) {
        row = code_table.rows[i];
        sno = row.cells[0];
        line = row.cells[1];
        sno.innerHTML = '' + (i + 1);
        start.disabled = false;
        switch (i) {
            case 3:
                line.innerHTML = '<samp><span style="color: green">% Unit Step Signal</span></samp>';
                break;
            case 4:
                line.innerHTML = '<samp>t = [-1 : 0.0001 : 1] * 1000;</samp>';
                break;
            case 5:
                line.innerHTML = '<samp>delay = input(\'Enter delay (in msec): \');</samp>';
                break;
            case 6:
                line.innerHTML = '<samp>step = (t - delay) >= 0;</samp>';
                break;
            case 7:
                line.innerHTML = '<samp>plot(t, step);</samp>';
                break;
            case 8:
                line.innerHTML = '<samp>xlabel(\'Time(msec)\');</samp>';
                break;
            case 9:
                line.innerHTML = '<samp>ylabel(\'Amplitude\');</samp>';
                break;
            case 10:
                line.innerHTML = '<samp>title(\'Unit step Signal\');</samp>';
                break;
        }
    }
}

function stepCodeTraverse() {
    console.log('code row no', code_row_no);
    if (code_row_no <= 3) {
        traverseInitalCode();
    }
    else if (code_row_no > 7) {
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
                updateWorkspace('t', '1x20001 double', 'arr');
                writeGenExplanation('createArray');
                break;
            case 5:
                user_variable = 'delay';
                user_img = 'arr';
                displayCommand('>> Enter delay (in msec): ');
                enableInput(-800, 800, 1, 0);
                writeGenExplanation('input');
                // workspace updated on OK pressing.
                break;
            case 6:
                updateWorkspace('step', '1x20001 logical', 'step');
                break;
            case 7:
                writeGenExplanation('plot');
                start.innerHTML = 'End';
                code_table.rows[++code_row_no].className += "table-warning";
                code_table.rows[++code_row_no].className += "table-warning";
                code_table.rows[++code_row_no].className += "table-warning";
                plotStep();
                break;
        }
        code_row_no++;
    }
}

function fillStepVariables() {
    delay = parseFloat(user_input);
}

function plotStep() {
    console.log('called plot ramp');

    var lx = [];
    var ly = [];

    for (let i = -1000; i < delay; i += 0.1) {
        lx.push(i);
        ly.push(0);
    }
    for (let i = delay; i <= 1000; i += 0.1) {
        lx.push(i);
        ly.push(1);
    }

    plotFigure(lx, ly, 'Unit Step Signal', 'Time (sec)', 'Amplitude');
}