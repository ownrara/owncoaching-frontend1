import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import FormCard from "../../../../components/form/FormCard/FormCard";
import HistoryFilters from "../../../../components/history/HistoryFilters/HistoryFilters";
import HistoryTable from "../../../../components/history/HistoryTable/HistoryTable";

import { getCheckIns } from "../../../../data/checkInsStore";
import { formatNumber } from "../../../../utils/formatters";

const DEFAULT_FILTERS = {
  energy: "All",
  minAdherence: "",
  fromDate: "",
  toDate: "",
};

function CoachClientProgressTab() {
  const { clientId } = useParams();

  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  // Shared source of truth
  const allCheckIns = useMemo(() => getCheckIns(), []);

  // Filter to THIS client only
  const clientRows = useMemo(() => {
    return allCheckIns
      .filter((c) => c.clientId === clientId)
      // newest first
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [allCheckIns, clientId]);

  // Apply same filters as client Progress History
  const filtered = useMemo(() => {
    return clientRows.filter((c) => {
      if (filters.energy !== "All" && c.energy !== filters.energy) return false;

      if (filters.minAdherence !== "") {
        const min = Number(filters.minAdherence);
        if (!Number.isNaN(min)) {
          if (c.adherence === null || c.adherence === undefined) return false;
          if (Number(c.adherence) < min) return false;
        }
      }

      // ISO date compares safely: YYYY-MM-DD
      if (filters.fromDate && c.date < filters.fromDate) return false;
      if (filters.toDate && c.date > filters.toDate) return false;

      return true;
    });
  }, [clientRows, filters]);

  const summary = useMemo(() => {
    const count = filtered.length;
    if (count === 0) return { count: 0, avgWeight: null };

    const totalWeight = filtered.reduce(
      (sum, c) => sum + Number(c.weight || 0),
      0
    );
    const avgWeight = totalWeight / count;

    return { count, avgWeight: Math.round(avgWeight * 10) / 10 };
  }, [filtered]);

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
  }

  return (
    <div className="section">
      <div className="progressLayout">
        <div className="progressLeft">
          <div className="section">
            <HistoryFilters
              filters={filters}
              onChangeFilters={setFilters}
              onReset={resetFilters}
            />
          </div>

          <div className="section">
            <FormCard title="Summary (Filtered)">
              <div className="summaryRow">
                <div className="summaryItem">
                  <div className="summaryLabel">Check-ins</div>
                  <div className="summaryValue">{summary.count}</div>
                </div>

                <div className="summaryItem">
                  <div className="summaryLabel">Avg Weight</div>
                  <div className="summaryValue">
                    {formatNumber(summary.avgWeight, " kg")}
                  </div>
                </div>
              </div>
            </FormCard>
          </div>
        </div>

        <div className="progressRight">
          <div className="section">
            {/* Reused component: includes Coach Notes column already */}
            <HistoryTable rows={filtered} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoachClientProgressTab;
