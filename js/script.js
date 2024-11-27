document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector(".canvas");
    const context = canvas.getContext("2d");

    // Hacer que los contenedores sean arrastrables
    document.querySelectorAll(".shape-container").forEach(container => {
        container.addEventListener("dragstart", (e) => {
            // Guardar el tipo de forma en el objeto dataTransfer
            e.dataTransfer.setData("shape", container.dataset.shape);
            console.log("Iniciando arrastre de:", container.dataset.shape);
        });
    });

    // Permitir soltar en el canvas
    canvas.addEventListener("dragover", (e) => {
        e.preventDefault(); // Necesario para permitir el "drop"
    });

    // Soltar la forma en el canvas
    canvas.addEventListener("drop", (e) => {
        e.preventDefault();

        // Obtener la forma y calcular la posición
        const shape = e.dataTransfer.getData("shape");
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        console.log(`Forma "${shape}" soltada en posición:`, x, y);

        // Dibujar la forma en el canvas
        drawShape(context, shape, x, y);
    });

    function drawShape(ctx, shape, x, y) {
        ctx.fillStyle = "black";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        switch (shape) {
            case "square":
                ctx.fillRect(x - 25, y - 25, 50, 50);
                break;
            case "rectangle":
                ctx.fillRect(x - 50, y - 25, 100, 50);
                break;
            case "circle":
                ctx.beginPath();
                ctx.arc(x, y, 25, 0, Math.PI * 2);
                ctx.fill();
                break;
            case "line":
                ctx.beginPath();
                ctx.moveTo(x - 25, y);
                ctx.lineTo(x + 25, y);
                ctx.stroke();
                break;
            case "star":
                drawStar(ctx, x, y, 5, 25, 10);
                break;
            case "triangle":
                ctx.beginPath();
                ctx.moveTo(x, y - 30);
                ctx.lineTo(x - 25, y + 20);
                ctx.lineTo(x + 25, y + 20);
                ctx.closePath();
                ctx.fill();
                break;
            case "rhombus":
                ctx.beginPath();
                ctx.moveTo(x, y - 30);
                ctx.lineTo(x + 25, y);
                ctx.lineTo(x, y + 30);
                ctx.lineTo(x - 25, y);
                ctx.closePath();
                ctx.fill();
                break;
            case "hexagon":
                drawPolygon(ctx, x, y, 25, 6);
                break;
            default:
                console.error("Forma desconocida:", shape);
        }
    }

    function drawStar(ctx, x, y, spikes, outerRadius, innerRadius) {
        let rot = Math.PI / 2 * 3;
        let cx = x;
        let cy = y;
        let step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
            ctx.lineTo(
                cx + Math.cos(rot) * outerRadius,
                cy + Math.sin(rot) * outerRadius
            );
            rot += step;

            ctx.lineTo(
                cx + Math.cos(rot) * innerRadius,
                cy + Math.sin(rot) * innerRadius
            );
            rot += step;
        }
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
        ctx.fill();
    }

    // Función para dibujar un polígono (como hexágono)
    function drawPolygon(ctx, x, y, radius, sides) {
        const angle = (2 * Math.PI) / sides;
        ctx.beginPath();
        for (let i = 0; i < sides; i++) {
            const px = x + radius * Math.cos(angle * i);
            const py = y + radius * Math.sin(angle * i);
            i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
    }

});