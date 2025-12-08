import "./styles/global.css";
import Header from './components/Header';
import Biografia from "./components/Biografia";
import Proposta from "./components/Proposta";

function App() {
  return (
      <div className="App">
          <Header />
          <Biografia />
          <Proposta />
      </div>
  );
}

export default App;
