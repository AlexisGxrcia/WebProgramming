const mainElement = document.querySelector('.calculator');
const output = document.getElementById('output');
const buttons = mainElement.querySelectorAll('button');

const historyElement = document.querySelector('.history');

buttons.forEach(b => {
    b.addEventListener('click', () => {
        if (b.textContent === 'AC') output.textContent = '0';
        else if (b.textContent === '<-') {
            if (output.textContent.length === 1) {
                output.textContent = '0'
                return;
            }
            output.textContent = output.textContent.slice(0, output.textContent.length - 1)
        } else if (b.textContent === '=') {
            if (!output.textContent.includes('%') && !output.textContent.includes('/') && !output.textContent.includes('*') && !output.textContent.includes('-') && !output.textContent.includes('+')) return;

            try {
                const backup = output.textContent;
                output.textContent = eval(output.textContent);
                const p = document.createElement('p');
                p.textContent = backup + ' =' + output.textContent;
                historyElement.appendChild(p);
            } catch (error) {
                alert('Hubo un error en la operacion');
                output.textContent = '0';
            }
        }

        if (b.textContent !== 'AC' && b.textContent !== '<-' && b.textContent !== '=') {
            if (output.textContent === '0') output.textContent = b.textContent;
            else output.textContent += b.textContent;
        }
    });
})