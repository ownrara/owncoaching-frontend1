import { useState } from "react";
import PageHeader from "../../../components/common/PageHeader/PageHeader";
import FormCard from "../../../components/form/FormCard/FormCard";
import TextInput from "../../../components/form/TextInput/TextInput";
import SelectInput from "../../../components/form/SelectInput/SelectInput";
import mockCheckIns from "../../../data/mockCheckIns";
import "./WeeklyCheckIn.css";

function WeeklyCheckIn() {
  const [checkIns, setCheckIns] = useState(mockCheckIns);

  const [form, setForm] = useState({
    date: "",
    weight: "",
    waist: "",
    sleepHours: "",
    energy: "Good",
    adherence: "",
    notes: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.date || !form.weight) {
      alert("Please fill in at least Date and Weight.");
      return;
    }

    const newCheckIn = {
      id: `c${checkIns.length + 1}`,
      date: form.date,
      weight: Number(form.weight),
      waist: form.waist ? Number(form.waist) : null,
      sleepHours: form.sleepHours ? Number(form.sleepHours) : null,
      energy: form.energy,
      adherence: form.adherence ? Number(form.adherence) : null,
      notes: form.notes,
    };

    setCheckIns((prev) => [newCheckIn, ...prev]);

    setForm({
      date: "",
      weight: "",
      waist: "",
      sleepHours: "",
      energy: "Good",
      adherence: "",
      notes: "",
    });
  }

  return (
    <div>
      <PageHeader
        breadcrumb="Client / Weekly Check-In"
        title="Weekly Check-In"
        subtitle="Submit your weekly progress update"
      />

      <form onSubmit={handleSubmit}>
        <FormCard title="Check-In Details">
          <div className="checkInGrid2">
            <TextInput
              label="Date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
            />

            <TextInput
              label="Weight (kg)"
              name="weight"
              type="number"
              value={form.weight}
              onChange={handleChange}
              placeholder="e.g. 79.2"
            />

            <TextInput
              label="Waist (cm)"
              name="waist"
              type="number"
              value={form.waist}
              onChange={handleChange}
              placeholder="e.g. 82"
            />

            <TextInput
              label="Sleep Hours"
              name="sleepHours"
              type="number"
              value={form.sleepHours}
              onChange={handleChange}
              placeholder="e.g. 7"
            />

            <SelectInput
              label="Energy"
              name="energy"
              value={form.energy}
              onChange={handleChange}
              options={["Great", "Good", "Average", "Low"]}
            />

            <TextInput
              label="Adherence (%)"
              name="adherence"
              type="number"
              value={form.adherence}
              onChange={handleChange}
              placeholder="0 - 100"
            />
          </div>

          <div>
            <label className="formLabel">Notes</label>
            <textarea
              className="textArea"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Anything your coach should know..."
              rows={4}
            />
          </div>

          <button className="submitBtn" type="submit">
            Submit Check-In
          </button>
        </FormCard>
      </form>

      <FormCard title="Previous Check-Ins (Local Mock)">
        <div className="historyList">
          {checkIns.map((c) => (
            <div key={c.id} className="historyItem">
              <div className="historyTop">
                <strong>{c.date}</strong>
                <span>{c.weight} kg</span>
              </div>
              <div className="historyMeta">
                Energy: {c.energy} • Adherence: {c.adherence ?? "-"}%
              </div>
              {c.notes ? <div className="historyNotes">{c.notes}</div> : null}
            </div>
          ))}
        </div>
      </FormCard>
    </div>
  );
}

export default WeeklyCheckIn;
