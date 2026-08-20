function SelectField({ label, options }) {
  return (
    <div className="form-group">
      <label>{label}</label>

      <select>
        <option value="">Select {label}</option>

        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;