import { useEffect, useRef, useState } from 'react';
// useRef allows persistent values between renders

function App() {
  const [mouseData, setMouseData] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const [canvasCTX, setCanvasCTX] = useState(null);
  const [color, setColor] = useState('#000000');
  const [size, setSize] = useState(10);
  const [image, setImage] = useState(null);

  let myImageData;
  useEffect(() => {
    const canvas = canvasRef.current;
    // console.log(canvasCTX);
    const ctx = canvas.getContext('2d');
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    canvas.width = 500;
    canvas.height = 500;
    // console.log(ctx);
    setCanvasCTX(ctx);
  }, [canvasRef]);

  const setPos = (e) => {
    setMouseData({
      x: e.clientX,
      y: e.clientY,
    });
  };
  // getImageData(0,0,100)
  // pass canvas.width and canvas.height
  const draw = (e) => {
    if (e.buttons !== 1) return;
    const ctx = canvasCTX;
    // console.log(ctx);
    ctx.beginPath();
    ctx.moveTo(mouseData.x, mouseData.y);
    setMouseData({
      x: e.clientX,
      y: e.clientY,
    });
    ctx.lineTo(e.clientX, e.clientY);
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    // Set the line cap to round
    ctx.lineCap = 'round';


    // find whats being saved per stroke
    // console.log(ctx);
    //


    ctx.stroke();
  };
  let img;
  if (img) {
    let blob = new Blob([image.buffer], { type: 'image/jpeg' });
    let urlCreator = window.URL || window.webkitURL;
    let imageUrl = urlCreator.createObjectU (blob);
    let img = document.querySelector('#photo');
    img.src = imageUrl;
    console.log(imageUrl);
  }


  return (
    <>
      <div>
        Welcome to my game!
      </div>
      <div>
        <canvas
          id='drawing-area'
          ref={canvasRef}
          onMouseEnter={(e) => setPos(e)}
          onMouseMove={(e) => draw(e)}
          onMouseDown={(e) => setPos(e)}
        ></canvas>
        <div
          className='control-panel'
          style={{
            // position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
          }}
        >
          <input
            type="range"
            value={size}
            max={40}
            onChange={(e) => {
              setSize(e.target.value);
            }}
          />
          <input
            type="color"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
            }}
          />
          <button
            onClick={() => {
              const ctx = canvasCTX;
              ctx.clearRect(
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
              );
            }}
          >
                    Clear
          </button>
          
          <button
            onClick={() => {
              const ctx = canvasCTX;
              const myImageData = ctx.getImageData(0, 0, 500, 500);
              // imageData is image object, imageData.data gives Uint8ClampedArray, imageData.height = 500, imageData.width = 500  
              console.log(myImageData);
            }}
          >
                    Save?
          </button>
          <button
            onClick={(myImageData) => {
              const ctx = canvasCTX;
              ctx.clearRect(
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
              );
              ctx.putImageData(myImageData, 500, 500);
            }}
          >
                    Restore
          </button>
        </div>
        <img src={img}>
        </img>
      </div>
      
    </>

    

  );
}

export default App;
