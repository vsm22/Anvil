/**
 * Draw a spinner
 */
export default function CurtainSpinner(canvas) {
    const ctx = canvas.getContext("2d");

    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    window.onresize = function () {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    }

    let colWidth = 50;
    let numCols = canvas.width / colWidth;
    let colProps = [];
    let t = Date.now();
    let throttleInterval = 10;

    for (let i = 0; i < numCols; i++) {
        colProps.push({
            colLength: generateColLength(),
            rate: generateColRate()
        });
    }

    function generateColLength() {
        return Math.floor(Math.random() * 12) + 5;
    }

    function generateColRate() {
        return Math.random() * 0.1;
    }

    function draw() {
        if (Date.now() - t >= throttleInterval) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            t = Date.now();
            let l = 0; // lightness

            for (let i = 0; i < numCols; i++) {
                for (let j = 0; j < colProps[i].colLength; j++) {

                    l = Math.abs(100 - (colProps[i].rate * t % 200)) * j;

                    ctx.beginPath();
                    ctx.fillStyle = "hsl(210, 100%," + l + "%)";
                    ctx.rect(i * colWidth, j * colWidth, colWidth, colWidth);
                    ctx.fill();
                }
            }
        }

        window.requestAnimationFrame(draw);
    }

    draw();
}
