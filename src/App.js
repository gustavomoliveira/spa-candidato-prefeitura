import "./styles/global.css";
import Header from './components/Header';
import Biografia from "./components/Biografia";
import Proposta from "./components/Proposta";
import Agenda from "./components/Agenda";
import Footer from "./components/Footer";

function App() {
  return (
      <div className="App">
          <Header />
          <Biografia />
          <Proposta />
          <Agenda />
          <Footer />
      </div>
  );
}

export default App;
