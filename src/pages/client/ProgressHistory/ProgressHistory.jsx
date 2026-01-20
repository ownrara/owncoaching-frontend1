import { useEffect, useMemo, useState } from "react";
import PageHeader from "../../../components/common/PageHeader/PageHeader";
import FormCard from "../../../components/form/FormCard/FormCard";
import HistoryFilters from "../../../components/history/HistoryFilters/HistoryFilters";
import HistoryTable from "../../../components/history/HistoryTable/HistoryTable";
import { getCheckIns } from "../../../data/checkInsStore";
import { formatNumber } from "../../../utils/formatters";
import "./ProgressHistory.css";

const DEFAULT_FILTERS = {
  energy: "All",
  minAdherence: "",
  fromDate: "",
  toDate: "",
};

function ProgressHistory() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  // shared source of truth (store read)
  const [allCheckIns, setAllCheckIns] = useState(() => getCheckIns());

  // reload from store when page mounts
  useEffect(() => {
    setAllCheckIns(getCheckIns());
  }, []);

  const filtered = useMemo(() => {
    return allCheckIns.filter((c) => {
      // Energy filter
      if (filters.energy !== "All" && c.energy !== filters.energy) return false;

      // Min adherence
      if (filters.minAdherence !== "") {
        const min = Number(filters.minAdherence);
        if (!Number.isNaN(min)) {
          if (c.adherence === null || c.adherence === undefined) return false;
          if (Number(c.adherence) < min) return false;
        }
      }

      // Date range (ISO string compares safely: YYYY-MM-DD)
      if (filters.fromDate && c.date < filters.fromDate) return false;
      if (filters.toDate && c.date > filters.toDate) return false;

      return true;
    });
  }, [filters, allCheckIns]);

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
    <div>
      <PageHeader
        breadcrumb="Client / Progress History"
        title="Progress History"
        subtitle="Track your weekly check-ins over time"
      />

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
              <HistoryTable rows={filtered} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressHistory;
