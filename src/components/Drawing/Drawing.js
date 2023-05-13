import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

export default function Drawing() {
  const [mouseData, setMouseData] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const socketRef = useRef(null);
  const [canvasCTX, setCanvasCTX] = useState(null);
  const [color, setColor] = useState('#000000');
  const [size, setSize] = useState(10);

  const [imageState, setImageState] = useState(null);

  const SERVER_URL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3001'
      : 'https://prototype-backend.herokuapp.com/';

  useEffect(() => {
    socketRef.current = io.connect(SERVER_URL);

    socketRef.current.on('draw', (data) => {
      const ctx = canvasCTX;

      ctx.lineCap = 'round';

      ctx.beginPath();
      ctx.moveTo(data.x0, data.y0);
      ctx.lineTo(data.x1, data.y1);
      ctx.strokeStyle = data.color;
      ctx.lineWidth = data.size;
      ctx.stroke();
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [SERVER_URL, canvasCTX]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;
    setCanvasCTX(ctx);
  }, [canvasRef]);

  const setPos = (e) => {
    let rect = canvasRef.current.getBoundingClientRect();
    setMouseData({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const draw = (e) => {
    if (e.buttons !== 1) return;
    const ctx = canvasCTX;
    ctx.beginPath();
    ctx.moveTo(mouseData.x, mouseData.y);
    let rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMouseData({ x, y });
    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = 'round';
    ctx.stroke();
    const drawData = {
      x0: mouseData.x,
      y0: mouseData.y,
      x1: x,
      y1: y,
      color: color,
      size: size,
    };
    socketRef.current.emit('draw', drawData);
  };

  return (
    <>
      <div>Welcome to my game!</div>
      <div>
        <canvas
          id="drawing-area"
          ref={canvasRef}
          onMouseEnter={(e) => setPos(e)}
          onMouseMove={(e) => draw(e)}
          onMouseDown={(e) => setPos(e)}
        ></canvas>
        <div
          className="control-panel"
          style={{
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
              ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }}
          >
            Clear
          </button>
          {/* // state version */}
          <button
            onClick={() => {
              const ctx = canvasCTX;
              const restoreImageData = ctx.getImageData(0, 0, 500, 500);
              setImageState(restoreImageData);
              // eslint-disable-next-line no-console
              console.log(imageState);
            }}
          >
            Save?
          </button>
        </div>
      </div>
    </>
  );
}
