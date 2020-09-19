var a, f, N, step;

function writeSineCode() {
    console.log('writing Sine code');
    var row, sno, line;
    start.disabled = false;

    for (let i = 3; i < 14; i++) {
        row = code_table.rows[i];
        sno = row.cells[0];
        line = row.cells[1];
        sno.innerHTML = '' + (i + 1);
        switch (i) {
            case 3:
                line.innerHTML = '<samp><span style="color: green">% Sinusoidal Signal</span></samp>';
                break;
            case 4:
                line.innerHTML = '<samp> a = input(\'Enter Amplitude: \');</samp>';
                break;
            case 5:
                line.innerHTML = '<samp>f = input(\'Enter Frequency (Hz): \');</samp>';
                break;
            case 6:
                line.innerHTML = '<samp>N = input(\'Enter no. of cycles to generate: \'); </samp>';
                break;
            case 7:
                line.innerHTML = '<samp>step = 1 / (f * 100);</samp>';
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
                line.innerHTML = '<samp>title(\'Sine Signal\'); </samp>';
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

function sineCodeTraverse() {
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
                writeGenExplanation('input');
                // workspace updated on OK pressing.
                break;
            case 5:
                user_variable = 'f';
                user_img = 'arr';
                displayCommand('>> Enter Frequency (Hz): ');
                enableInput(0, 1000, 1, 220);
                writeGenExplanation('input');
                // workspace updated on OK pressing.
                break;
            case 6:
                user_variable = 'N';
                user_img = 'arr';
                displayCommand('>> Enter no.of cycle to generate: ');
                enableInput(1, 20, 1, 2);
                writeGenExplanation('input');
                // workspace updated on OK pressing.
                break;
            case 7:
                step = 1 / (f * 100);
                updateWorkspace('step', '' + step, 'arr');
                break;
            case 8:
                if (f === 0) {
                    updateWorkspace('t', '1xNaN', 'arr');
                }
                else {
                    var dim = N * 100 + 1;
                    updateWorkspace('t', '1x' + dim + ' double', 'arr');
                }
                writeGenExplanation('createArray');
                break;
            case 9:
                writeGenExplanation('createY');
                if (f === 0) {
                    updateWorkspace('t', '1xNaN', 'arr');
                }
                else {
                    var dim = N * 100 + 1;
                    updateWorkspace('y', '1x' + dim + ' double', 'arr');
                }
                break;
            case 10:
                writeGenExplanation('plot');
                start.innerHTML = 'End';
                code_table.rows[++code_row_no].className += "table-warning";
                code_table.rows[++code_row_no].className += "table-warning";
                code_table.rows[++code_row_no].className += "table-warning";
                plotSine();
                break;
        }
        code_row_no++;
    }
}

function fillSineVariables() {
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

function plotSine() {
    console.log('called plot Sine');

    var lx = [];
    var ly = [];

    if (f > 0) {
        var upper_limit = N * (1 / f);

        for (let i = 0; i <= upper_limit + (step / 2); i += step) {
            lx.push(i);
            var sine_val = a * Math.sin(2 * Math.PI * f * i);
            ly.push(sine_val);
        }
    }

    else {
        alert('Invalid Frequency!, Time period = 1/frequency, thus frequency cannot be 0.');
    }

    plotFigure(lx, ly, 'Sine Signal', 'Time (sec)', 'Amplitude');
}