import Chat from './components/Chat/Chat';
import Drawing from './components/Drawing/Drawing';
// useRef allows persistent values between renders

function App() {
  return (
    <div className="App">
      <Drawing />
      {/* <Drawing /> */}
      <Chat />
    </div>
  );
}

export default App;
