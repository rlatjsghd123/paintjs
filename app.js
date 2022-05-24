const canvas = document.querySelector("#canvasJS");
const ctx = canvas.getContext("2d");
const selColor = document.querySelectorAll(".jsColor");
const range = document.querySelector("#jsRange");
const fill = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, 700, 700);
ctx.strokeStyle = "#2c2c2c";
ctx.fillStyle = "#2c2c2c";
ctx.lineWidth = 2.5;
let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
} 

function startPainting(){
    painting = true;
}

function onMousemove(e){
    const x = e.offsetX;
    const y = e.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y)
    } else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function selectColor(e){
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(e){
    const line = e.target.value;
    ctx.lineWidth = line;
}

function clickFillAndPaint(){
    if(filling === true){
        filling = false;
        fill.innerText = "fill";
} else{
    filling = true;
    fill.innerText = "Paint";
}
}

function clickPaint(){
    if(filling){
    ctx.fillRect(0, 0, 700, 700);
    }
}

function haddleRightClick(e){
    e.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "그림";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMousemove)
    canvas.addEventListener("mousedown", startPainting)
    canvas.addEventListener("mouseup", stopPainting)
    canvas.addEventListener("mouseleave", stopPainting)
    canvas.addEventListener("click", clickPaint)
    canvas.addEventListener("contextmenu", haddleRightClick)
}

Array.from(selColor).forEach((color) => color.addEventListener("click", selectColor));

if(range){
    range.addEventListener("input", handleRangeChange)
}

if(fill){
    fill.addEventListener("click", clickFillAndPaint)
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick)
}