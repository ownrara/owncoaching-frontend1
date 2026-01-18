import "./FormCard.css";

function FormCard({ title, children }) {
  return (
    <section className="formCard">
      <h3 className="formCardTitle">{title}</h3>
      <div className="formCardBody">{children}</div>
    </section>
  );
}

export default FormCard;
