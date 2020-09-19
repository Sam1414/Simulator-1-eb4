var n1, n2, a, dim;

function writeExpCode() {
    console.log('writing Exp code');
    var row, sno, line;

    // var code_table = document.createElement('table');
    // code_table.className = 'table table-sm table-hover';
    // code_table.id = 'code';
    // code_table.style = 'font-size: clamp(10px, 1.5vw, 14px);';
    // code_card.style = 'height: fit-content;';
    // code_body.style = 'font-size: clamp(10px, 1.7vw, 14px);';
    // code_div.style = 'font-size: clamp(10px, 1.7vw, 14px);';
    // code_div.appendChild(code_table);

    // var col_grp = document.createElement('colgroup');
    // col_grp.innerHTML = '<col style="width: 1px; background-color: #C0C0C0;">';
    // code_table.appendChild(col_grp);

    // var tbody = document.createElement('tbody');
    // code_table.appendChild(tbody);

    for (let i = 3; i < 14; i++) {
        row = code_table.rows[i];
        sno = row.cells[0];
        line = row.cells[1];
        sno.innerHTML = '' + (i + 1);
        start.disabled = false;
        switch (i) {
            case 3:
                // comment
                line.innerHTML = '<samp><span style="color: green">% Exponential Signal</span></samp>';
                break;
            case 4:
                line.innerHTML = '<samp> disp(\'Enter the time range:\')</samp>';
                break;
            case 5:
                line.innerHTML = '<samp>n1 = input(\'Lower limit (in sec): \');</samp>';
                break;
            case 6:
                line.innerHTML = '<samp>n2 = input(\'Upper limit (in sec): \');</samp>';
                break;
            case 7:
                line.innerHTML = '<samp>t = n1: 0.001: n2;</samp>';
                break;
            case 8:
                line.innerHTML = '<samp>a = input(\'Enter a for function exp(a * t): \');</samp>';
                break;
            case 9:
                line.innerHTML = '<samp>y = exp(a * t);</samp>';
                break;
            case 10:
                line.innerHTML = '<samp>plot(t, y); </samp>';
                break;
            case 11:
                line.innerHTML = '<samp>title(\'Exponential Signal\'); </samp>';
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

function expCodeTraverse() {
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
                displayCommand('>> Enter the time range:');
                writeGenExplanation('display');
                break;
            case 5:
                user_variable = 'n1';
                user_img = 'arr';
                displayCommand('>> Lower limit (in sec):');
                enableInput(-5, -1, 0.5, -3);
                writeGenExplanation('input');
                // workspace updated on OK pressing.
                break;
            case 6:
                user_variable = 'n2';
                user_img = 'arr';
                displayCommand('>> Upper limit (in sec):');
                enableInput(0, 5, 0.5, 1.5);
                writeGenExplanation('input');
                // workspace updated on OK pressing.
                break;
            case 7:
                var dim = (Math.abs(n1) + Math.abs(n2)) * 1000 + 1;
                updateWorkspace('t', '1x' + dim + ' double', 'arr');
                writeGenExplanation('createArray');
                break;
            case 8:
                user_variable = 'a';
                displayCommand('>> Enter a for function exp(a * t): ');
                enableInput(-5, 5, 1, 1);
                writeGenExplanation('input');
                // workspace updated on OK pressing.
                break;
            case 9:
                var dim = (Math.abs(n1) + Math.abs(n2)) * 1000 + 1;
                updateWorkspace('y', '1x' + dim + ' double', 'arr');
                writeGenExplanation('createY');
                break;
            case 10:
                writeGenExplanation('plot');
                start.innerHTML = 'End';
                code_table.rows[++code_row_no].className += "table-warning";
                code_table.rows[++code_row_no].className += "table-warning";
                code_table.rows[++code_row_no].className += "table-warning";
                plotExp();
                break;
        }
        code_row_no++;
    }
}

function fillExpVariables() {
    switch (user_variable) {
        case 'n1':
            n1 = parseFloat(user_input);
            break;
        case 'n2':
            n2 = parseFloat(user_input);
            break;
        case 'a':
            a = parseFloat(user_input);
            break;
    }
}

function plotExp() {
    console.log('called plot exponential');

    var lx = [];
    var ly = [];

    for (let i = n1; i <= n2 + (0.001 / 2); i += 0.001) {
        lx.push(i);
        ly.push(Math.exp(a * i));
    }

    plotFigure(lx, ly, 'Exponential Signal', 'Time (sec)', 'Amplitude');
}