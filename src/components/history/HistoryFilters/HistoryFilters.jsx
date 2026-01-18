import TextInput from "../../form/TextInput/TextInput";
import SelectInput from "../../form/SelectInput/SelectInput";
import "./HistoryFilters.css";

function HistoryFilters({ filters, onChangeFilters, onReset }) {
  function handleChange(e) {
    const { name, value } = e.target;
    onChangeFilters((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="historyFilters">
      <div className="historyFiltersGrid">
        <SelectInput
          label="Energy"
          name="energy"
          value={filters.energy}
          onChange={handleChange}
          options={["All", "Great", "Good", "Average", "Low"]}
        />

        <TextInput
          label="Min Adherence (%)"
          name="minAdherence"
          type="number"
          value={filters.minAdherence}
          onChange={handleChange}
          placeholder="e.g. 80"
        />

        <TextInput
          label="From Date"
          name="fromDate"
          type="date"
          value={filters.fromDate}
          onChange={handleChange}
        />

        <TextInput
          label="To Date"
          name="toDate"
          type="date"
          value={filters.toDate}
          onChange={handleChange}
        />
      </div>

      <div className="historyFiltersActions">
        <button type="button" className="resetBtn" onClick={onReset}>
          Reset Filters
        </button>
      </div>
    </div>
  );
}

export default HistoryFilters;
