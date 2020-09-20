var n1, n2;

function writeRampCode() {
    console.log('writing ramp code');
    var row, sno, line;

    for (let i = 3; i < 13; i++) {
        row = code_table.rows[i];
        sno = row.cells[0];
        line = row.cells[1];
        sno.innerHTML = '' + (i + 1);
        start.disabled = false;
        switch (i) {
            case 3:
                line.innerHTML = '<samp><span style="color: green">% Ramp Signal</span></samp>';
                break;
            case 4:
                line.innerHTML = '<samp> disp(\'Enter the time range:\')</samp>';
                break;
            case 5:
                line.innerHTML = '<samp>n1 = input(\'Lower limit (in Sec) = \');</samp>';
                break;
            case 6:
                line.innerHTML = '<samp>n2 = input(\'Upper limit (in Sec) = \');</samp>';
                break;
            case 7:
                line.innerHTML = '<samp>t = n1 : n2;</samp>';
                break;
            case 8:
                line.innerHTML = '<samp>x = t.*[t >= 0];</samp>';
                break;
            case 9:
                line.innerHTML = '<samp>plot(t,x);</samp>';
                break;
            case 10:
                line.innerHTML = '<samp>title(\'Ramp Signal\')</samp>';
                break;
            case 11:
                line.innerHTML = '<samp>xlabel(\'Time (Sec)\');</samp>';
                break;
            case 12:
                line.innerHTML = '<samp>ylabel(\'Amplitude\'); </samp>';
                break;
        }
    }
}

function rampCodeTraverse() {
    console.log('code row no', code_row_no);
    if (code_row_no <= 3) {
        traverseInitalCode();
    }
    else if (code_row_no > 9) {
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
                displayCommand('>> Enter the time range:');
                writeGenExplanation('display');
                break;
            case 5:
                user_variable = 'n1';
                user_img = 'arr';
                displayCommand('>> Lower limit (in sec):');
                enableInput(-50, -5, 1, -20);
                writeGenExplanation('input');
                // workspace updated on OK pressing.
                break;
            case 6:
                user_variable = 'n2';
                user_img = 'arr';
                displayCommand('>> Upper limit (in sec):');
                enableInput(5, 50, 1, 20);
                writeGenExplanation('input');
                // workspace updated on OK pressing.
                break;
            case 7:
                var dim = Math.abs(n1) + Math.abs(n2) + 1;
                updateWorkspace('t', '1x' + dim + ' double', 'arr');
                writeGenExplanation('createNoStepArr', 0);
                break;
            case 8:
                var dim = Math.abs(n1) + Math.abs(n2) + 1;
                updateWorkspace('x', '1x' + dim + ' double', 'arr');
                break;
            case 9:
                writeGenExplanation('plot');
                start.innerHTML = 'End';
                code_table.rows[++code_row_no].className += "table-warning";
                code_table.rows[++code_row_no].className += "table-warning";
                code_table.rows[++code_row_no].className += "table-warning";
                plotRamp();
                break;
        }
        code_row_no++;
    }
}

function fillRampVariables() {
    switch (user_variable) {
        case 'n1':
            n1 = parseFloat(user_input);
            break;
        case 'n2':
            n2 = parseFloat(user_input);
            break;
    }
}

function plotRamp() {
    console.log('called plot ramp');

    var lx = [];
    var ly = [];

    for (let i = n1; i <= n2; i++) {
        lx.push(i);
        if (i <= 0) {
            ly.push(0);
        }
        else {
            ly.push(i);
        }
    }

    plotFigure(lx, ly, 'Ramp Signal', 'Time (sec)', 'Amplitude');
}