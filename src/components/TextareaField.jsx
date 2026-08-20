function TextareaField({ label, placeholder }) {
  return (
    <div className="form-group">
      <label>{label}</label>

      <textarea
        placeholder={placeholder}
      ></textarea>
    </div>
  );
}

export default TextareaField;