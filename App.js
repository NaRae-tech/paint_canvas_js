const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const range = document.getElementById("jsRange");
const colors = document.getElementsByClassName("jsColor");

const INITIAL_COLOR = "#2c2c2c0;"
const CANVAS_SIZE = 650;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;  
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;       //그리고 있는 중이라는 신호
let filling = false;        //채우기를 실행했다는 신호

//그리고 있는 중이라면 선을 나타내고 아니면 선을 멈추기 위한 신호 변환
function startPainting() {
    painting = true;
}
function stopPainting() {
    painting = false;
}
//마우스가 움직이고 있을때
//그리기 신호가 true라면 마우스 이동 경로따라 선 그리기
//false라면 마우스 이동 위치 찾기
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
//색깔 클릭시 칠하는 색을 변경하는 함수
function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
//펜 굵기를 조절하는 함수
function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}
//채우기 or 그리기 모드로 변경시키는 함수
function handleModeClick(event) {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}
//채우기 모드일때 캔버스 클릭하면 배경색깔 변경시키는 함수
function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}
//우클릭 방지
function handleCM(event) {
    event.preventDefault();
}
//그림을 다운로드 하는 함수
function handleSaveClick() {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintjs.png";
    link.click();
}

//실행
//캔버스에 마우스의 움직임이나 클릭에 따른 이벤트 설정
if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}
//색깔 배열 클릭하면 색 변경설정
Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick)
);
//펜 굵기를 조절하는 메뉴 변동 이벤트 설정
if (range) {
    range.addEventListener("input", handleRangeChange);
}
//채우기 or 그리기와 같은 모드 변동 이벤트 설정
if (mode) {
    mode.addEventListener("click", handleModeClick);
}
//그림 저장버튼 누르면 발생하는 이벤트 설정
if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}