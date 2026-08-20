import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import BasicForm from "./components/BasicForm";
import VehicleDamage from "./components/VehicleDamage";
import ReviewForm from "./components/ReviewForm";

import "./App.css";


function App() {

  const [step, setStep] = useState(1);


  // Incident Details
  const [incidentData, setIncidentData] = useState({
    incidentType: "",
    date: "",
    time: "",
    location: "",
    injured: "",
    person: "",
    injury: "",
    policeReport: "",
    description: ""
  });


  // Vehicle & Damage
  const [vehicleData, setVehicleData] = useState({
    vehicleMake: "",
    vehicleModel: "",
    registration: "",
    damageType: "",
    severity: "",
    damageDescription: ""
  });


  return (
    <div className="app">

      <Sidebar />

      <main className="main">

        <Header />


        {/* =========================
            PROGRESS
        ========================= */}

        <div className="step-title">

          <div
            className={
              step >= 1
                ? "step active-step"
                : "step"
            }
          >
            1
          </div>

          <span>Incident Details</span>


          <div className="line"></div>


          <div
            className={
              step >= 2
                ? "step active-step"
                : "step"
            }
          >
            2
          </div>

          <span>Vehicle & Damage</span>


          <div className="line"></div>


          <div
            className={
              step >= 3
                ? "step active-step"
                : "step"
            }
          >
            3
          </div>

          <span>Review</span>

        </div>



        {/* =========================
            STEP 1
        ========================= */}

        {step === 1 && (

          <BasicForm

            initialData={incidentData}

            onContinue={(data) => {

              setIncidentData(data);

              setStep(2);

            }}

          />

        )}



        {/* =========================
            STEP 2
        ========================= */}

        {step === 2 && (

          <VehicleDamage

            initialData={vehicleData}

            onBack={() => setStep(1)}

            onContinue={(data) => {

              setVehicleData(data);

              setStep(3);

            }}

          />

        )}



        {/* =========================
            STEP 3
        ========================= */}

        {step === 3 && (

          <ReviewForm

            incidentData={incidentData}

            vehicleData={vehicleData}

            onBack={() => setStep(2)}

            onEditIncident={() => setStep(1)}

            onEditVehicle={() => setStep(2)}

          />

        )}

      </main>

    </div>
  );
}


export default App;