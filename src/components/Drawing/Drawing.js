import { useEffect, useRef, useState } from 'react';

function Drawing() {
    const [mouseData, setMouseData] = useState({ x: 0, y: 0 });
    const canvasRef = useRef(null);
    const [canvasCTX, setCanvasCTX] = useState(null);
    const [color, setColor] = useState('#000000');
    const [size, setSize] = useState(10);
    const [image, setImage] = useState(null);
    const [imageState, setImageState] = useState(null);
    const [realTimeImageState, setRealTimeImageState] = useState(null);
    const [dummy, setDummy] = useState(null);
    // const [imagedata, setImageData] = useState();
    let restoreImageData = null;
  
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
  
      // real time saving
      const x = ctx.getImageData(0, 0, 500, 500);
      setRealTimeImageState(x);
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
  
    // function used to take in a 
    function putImageData(
      ctx,
      imageData,
      dx,
      dy,
      dirtyX,
      dirtyY,
      dirtyWidth,
      dirtyHeight
    ) {
      const data = imageData.data;
      const height = imageData.height;
      const width = imageData.width;
      dirtyX = dirtyX || 0;
      dirtyY = dirtyY || 0;
      dirtyWidth = dirtyWidth !== undefined ? dirtyWidth : width;
      dirtyHeight = dirtyHeight !== undefined ? dirtyHeight : height;
      const limitBottom = dirtyY + dirtyHeight;
      const limitRight = dirtyX + dirtyWidth;
      for (let y = dirtyY; y < limitBottom; y++) {
        for (let x = dirtyX; x < limitRight; x++) {
          const pos = y * width + x;
          ctx.fillStyle = `rgba(${data[pos * 4 + 0]}, ${data[pos * 4 + 1]}, ${
            data[pos * 4 + 2]
          }, ${data[pos * 4 + 3] / 255})`;
          ctx.fillRect(x + dx, y + dy, 1, 1);
        }
      }
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
  
            {/* state version */}
            <button 
              onClick={() => {
                const ctx = canvasCTX;
                const restoreImageData = ctx.getImageData(0, 0, 500, 500);
                setImageState(restoreImageData);
                console.log(imageState);
              }}
            >
              Save?
            </button>
            <button 
              onClick={() => {
                // grab canvas
                const ctx = canvasCTX;
                // console log image object
                // clear canvas
                ctx.clearRect(
                  0,
                  0,
                  canvasRef.current.width,
                  canvasRef.current.height
                );
                // put saved image object onto canvas
                putImageData(ctx, imageState, 0, 0, 0, 0, 500, 500);
  
              }}
            >
                      Restore Dummy State
            </button>
  
            <button 
              onClick={() => {
                if (realTimeImageState) {
                  console.log(realTimeImageState);
                }
              }}
            >
                      Check Real Time
            </button>
  
          </div>
          <img src={img}>
          </img>
        </div>
        
      </>
  
      
  
    );
  }
  
  export default Drawing;
  