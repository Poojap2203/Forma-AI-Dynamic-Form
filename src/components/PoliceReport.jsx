function PoliceReport({ policeReport, setPoliceReport }) {
  return (
    <div className="question police-question">

      <label>
        Police Report Filed?
      </label>

      <div className="choice-container">

        <button
          type="button"
          className={
            policeReport === "yes"
              ? "choice active"
              : "choice"
          }
          onClick={() => setPoliceReport("yes")}
        >
          Yes
        </button>

        <button
          type="button"
          className={
            policeReport === "no"
              ? "choice active"
              : "choice"
          }
          onClick={() => setPoliceReport("no")}
        >
          No
        </button>

      </div>

    </div>
  );
}

export default PoliceReport;