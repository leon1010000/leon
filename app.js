console.log("app.js succeeded");
const canvas=document.createElement("canvas");
document.body.appendChild(canvas);
const ctx=canvas.getContext("2d");
const CANVAS_WIDTH=600;canvas.width=CANVAS_WIDTH;
const CANVAS_HEIGHT=600;canvas.height=CANVAS_HEIGHT;
let mouseDown=()=>{};
let draw=()=>{};

let startPage={
  circles:[]
};
const createStartPage=()=>{
  startPage={
    circles:[]
  }
  draw=()=>{
    startPage.circles.forEach(v=>{
      ctx.fillStyle="black";
      ctx.fillRect(v.x-5,v.y-5,10,10);
    })
  }
  canvas.removeEventListener("mousedown",mouseDown);
  mouseDown=ev=>{
    console.log("mouseDown");
    startPage.circles.push({x:ev.offsetX,y:ev.offsetY});
  }
  canvas.addEventListener("mousedown",mouseDown);
}
createStartPage();

const loop=()=>{
  console.log("loop");
  ctx.strokeStyle="black";
  ctx.strokeRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
  draw();
  requestAnimationFrame(loop);
};
loop();