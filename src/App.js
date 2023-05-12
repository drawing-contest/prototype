/* eslint-disable no-console */
import Chat from './components/Chat/Chat';
import Drawing from './components/Drawing/Drawing';
import Image from './components/Image/Image';
// useRef allows persistent values between renders
// import io from 'socket.io-client';
// const socket = io.connect('http://localhost:3001');

function App() {
  // const sendMessage = () => {
  //   socket.emit('send message', { message: 'hello' });
  // };

  // useEffect(() => {}, [socket]);

  return (
    <div className="App">
      <Image />
      <Drawing />
      {/* <Drawing /> */}
      <Chat />
    </div>
  );
}

export default App;
