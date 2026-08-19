function BasicForm() {
  return (
    <div className="form-card">

      <div className="form-heading">
        <div className="form-icon">🚗</div>

        <div>
          <h2>Incident Details</h2>

          <p>
            Tell us more about what happened.
          </p>
        </div>
      </div>


      <div className="form-grid">

        <div className="form-group">
          <label>Incident Type</label>

          <select>
            <option>Road Accident</option>
            <option>Vehicle Theft</option>
            <option>Natural Disaster</option>
            <option>Other</option>
          </select>
        </div>


        <div className="form-group">
          <label>Date of Incident</label>

          <input type="date" />
        </div>


        <div className="form-group">
          <label>Time of Incident</label>

          <input type="time" />
        </div>


        <div className="form-group">
          <label>Location</label>

          <input
            type="text"
            placeholder="Enter incident location"
          />
        </div>

      </div>


      <div className="question">

        <label>Was anyone injured?</label>

        <div className="choice-container">

          <button className="choice active">
            😮 Yes
          </button>

          <button className="choice">
            🙂 No
          </button>

        </div>

      </div>


      <div className="form-group description">

        <label>
          Describe what happened
        </label>

        <textarea
          placeholder="Tell us what happened in your own words..."
        />

      </div>


      <div className="form-buttons">

        <button className="save">
          Save Draft
        </button>

        <button className="continue">
          Continue →
        </button>

      </div>

    </div>
  );
}

export default BasicForm;