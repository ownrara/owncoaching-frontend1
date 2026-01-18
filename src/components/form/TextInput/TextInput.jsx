import "./TextInput.css";

function TextInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="formField">
      <label className="formLabel">{label}</label>
      <input
        className="formInput"
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

export default TextInput;
