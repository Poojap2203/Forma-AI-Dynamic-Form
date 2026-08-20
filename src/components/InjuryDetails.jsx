function InjuryDetails({ injured, person, setPerson, injury, setInjury }) {
  if (injured !== "yes") {
    return null;
  }

  return (
    <div className="injury-details">

      <div className="form-grid">

        <div className="form-group">
          <label>Who was injured?</label>

          <select
            value={person}
            onChange={(e) => setPerson(e.target.value)}
          >
            <option value="">Select person</option>
            <option value="Driver">Driver</option>
            <option value="Passenger">Passenger</option>
            <option value="Pedestrian">Pedestrian</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Describe the injury</label>

          <input
            type="text"
            value={injury}
            onChange={(e) => setInjury(e.target.value)}
            placeholder="Enter injury details"
          />
        </div>

      </div>

    </div>
  );
}

export default InjuryDetails;