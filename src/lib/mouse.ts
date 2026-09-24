let mousePos = { x: 0, y: 0 };

document.addEventListener("mousemove", (event) => {
    mousePos = { x: event.clientX, y: event.clientY };
});

export function getNormalizedMousePos() {
    return {
        x: mousePos.x / window.innerWidth,
        y: mousePos.y / window.innerHeight,
    };
}
