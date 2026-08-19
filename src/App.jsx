import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import BasicForm from "./components/BasicForm";

import "./App.css";

function App() {
  return (
    <div className="app">

      <Sidebar />

      <main className="main">

        <Header />

        <div className="step-title">

          <div className="step active-step">
            1
          </div>

          <span>Incident Details</span>

          <div className="line"></div>

          <div className="step">
            2
          </div>

          <span>Vehicle & Damage</span>

          <div className="line"></div>

          <div className="step">
            3
          </div>

          <span>Review</span>

        </div>

        <BasicForm />

      </main>

    </div>
  );
}

export default App;