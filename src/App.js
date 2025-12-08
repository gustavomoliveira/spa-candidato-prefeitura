import "./styles/global.css";
import Header from './components/Header';
import Biografia from "./components/Biografia";
import Proposta from "./components/Proposta";
import Agenda from "./components/Agenda";

function App() {
  return (
      <div className="App">
          <Header />
          <Biografia />
          <Proposta />
          <Agenda />
      </div>
  );
}

export default App;
