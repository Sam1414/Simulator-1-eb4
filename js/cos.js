var a, f, N, step;

function writeCosCode() {
    console.log('writing Cos code');
    var row, sno, line;

    for (let i = 3; i < 14; i++) {
        row = code_table.rows[i];
        sno = row.cells[0];
        line = row.cells[1];
        sno.innerHTML = '' + (i + 1);
        start.disabled = false;
        switch (i) {
            case 3:
                line.innerHTML = '<samp><span style="color: green">% Cosine Signal</span></samp>';
                break;
            case 4:
                line.innerHTML = '<samp> a = input(\'Enter Amplitude: \');</samp>';
                break;
            case 5:
                line.innerHTML = '<samp>f = input(\'Enter Frequency(in Hz): \');</samp>';
                break;
            case 6:
                line.innerHTML = '<samp>N = input(\'Enter no. of cycles to generate: \'); </samp>';
                break;
            case 7:
                line.innerHTML = '<samp>step = 1 / (100 * f);</samp>';
                break;
            case 8:
                line.innerHTML = '<samp>t = 0: step: N * step * 100;</samp>';
                break;
            case 9:
                line.innerHTML = '<samp>y = a * sin(2 * pi * f * t);</samp>';
                break;
            case 10:
                line.innerHTML = '<samp>plot(t, y); </samp>';
                break;
            case 11:
                line.innerHTML = '<samp>title(\'Cos Function\'); </samp>';
                break;
            case 12:
                line.innerHTML = '<samp>xlabel(\'Time (sec)\'); </samp>';
                break;
            case 13:
                line.innerHTML = '<samp>ylabel(\'Amplitude\'); </samp>';
                break;

        }
    }
}

function cosCodeTraverse() {
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
                user_variable = 'a';
                user_img = 'arr';
                displayCommand('>> Enter Amplitude: ');
                enableInput(0, 1000, 1, 500);
                // workspace updated on OK pressing.
                break;
            case 5:
                user_variable = 'f';
                user_img = 'arr';
                displayCommand('>> Enter Frequency (in Hz): ');
                enableInput(1, 1000, 1, 220);
                // workspace updated on OK pressing.
                break;
            case 6:
                user_variable = 'N';
                user_img = 'arr';
                displayCommand('>> Enter no.of cycle to generate: ');
                enableInput(1, 20, 1, 2);
                // workspace updated on OK pressing.
                break;
            case 7:
                step = 1 / (f * 100);
                updateWorkspace('step', '' + step, 'arr');
                break;
            case 8:
                var dim = N * 100 + 1;
                updateWorkspace('t', '1x' + dim + ' double', 'arr');
                break;
            case 9:
                var dim = N * 100 + 1;
                updateWorkspace('y', '1x' + dim + ' double', 'arr');
                break;
            case 10:
                start.innerHTML = 'End';
                code_table.rows[++code_row_no].className += "table-warning";
                code_table.rows[++code_row_no].className += "table-warning";
                code_table.rows[++code_row_no].className += "table-warning";
                plotCos();
                break;
        }
        code_row_no++;
    }
}

function fillCosVariables() {
    switch (user_variable) {
        case 'a':
            a = parseFloat(user_input);
            break;
        case 'f':
            f = parseFloat(user_input);
            break;
        case 'N':
            N = parseFloat(user_input);
            break;
    }
}

function plotCos() {
    console.log('called plot Cos');

    var lx = [];
    var ly = [];

    var upper_limit = N * (1 / f);

    var i;
    var cos_val;
    for (i = 0; i <= upper_limit + (step / 2); i += step) {
        lx.push(i);
        cos_val = a * Math.cos(2 * Math.PI * f * i);
        ly.push(cos_val);
    }

    plotFigure(lx, ly, 'Cosine Signal', 'Time (sec)', 'Amplitude');
}