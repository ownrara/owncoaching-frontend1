import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageHeader from "../../../components/common/PageHeader/PageHeader";
import CoachNotesBox from "../../../components/coach/CoachNotesBox/CoachNotesBox";
import mockClients from "../../../data/mockClients";
import { getCheckIns, saveCheckIns } from "../../../data/checkInsStore";
import "./CoachCheckInDetails.css";

function CoachCheckInDetails() {
  const { checkInId } = useParams();

  const [checkIns, setCheckIns] = useState(() => getCheckIns());

  const checkIn = useMemo(() => {
    return checkIns.find((c) => c.id === checkInId) || null;
  }, [checkIns, checkInId]);

  const client = useMemo(() => {
    if (!checkIn) return null;
    return mockClients.find((x) => x.id === checkIn.clientId) || null;
  }, [checkIn]);

  const [draftNotes, setDraftNotes] = useState("");

  useEffect(() => {
    setDraftNotes(checkIn?.coachNotes || "");
  }, [checkInId, checkIn?.coachNotes]);

  function persist(next) {
    setCheckIns(next);
    saveCheckIns(next);
  }

  function saveNotes() {
    if (!checkIn) return;

    const next = checkIns.map((c) =>
      c.id === checkIn.id ? { ...c, coachNotes: draftNotes } : c
    );

    persist(next);
  }

  function markReviewed() {
    if (!checkIn) return;

    const next = checkIns.map((c) =>
      c.id === checkIn.id
        ? { ...c, status: "Reviewed", coachNotes: draftNotes }
        : c
    );

    persist(next);
  }

  if (!checkIn) {
    return (
      <div>
        <PageHeader
          breadcrumb="Coach / Check-Ins / Details"
          title="Check-In Details"
          subtitle={`Not found: ${checkInId}`}
        />

        <div className="card" style={{ padding: 16 }}>
          This check-in does not exist.{" "}
          <Link to="/coach/check-ins">Back to inbox</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        breadcrumb="Coach / Check-Ins / Details"
        title="Check-In Details"
        subtitle={`${client?.name || checkIn.clientId} • ${checkIn.date}`}
      />

      <div className="checkInDetailsGrid">
        <div className="checkInLeft">
          <div className="card detailsCard">
            <div className="detailsTitle">Client Submission</div>

            <div className="detailsRow">
              <div className="detailsLabel">Client</div>
              <div className="detailsValue">{client?.name || checkIn.clientId}</div>
            </div>

            <div className="detailsRow">
              <div className="detailsLabel">Date</div>
              <div className="detailsValue">{checkIn.date}</div>
            </div>

            <div className="detailsRow">
              <div className="detailsLabel">Weight</div>
              <div className="detailsValue">{checkIn.weight} kg</div>
            </div>

            <div className="detailsRow">
              <div className="detailsLabel">Energy</div>
              <div className="detailsValue">{checkIn.energy}</div>
            </div>

            <div className="detailsRow">
              <div className="detailsLabel">Adherence</div>
              <div className="detailsValue">{checkIn.adherence ?? "-"}%</div>
            </div>

            <div className="detailsNotes">
              <div className="detailsLabel">Client Notes</div>
              <div className="detailsNotesBox">{checkIn.notes || "-"}</div>
            </div>
          </div>

          <div className="backRow">
            <Link className="backLink" to="/coach/check-ins">
              ← Back to inbox
            </Link>
          </div>
        </div>

        <div className="checkInRight">
          <CoachNotesBox
            value={draftNotes}
            onChange={setDraftNotes}
            onSave={saveNotes}
            onMarkReviewed={markReviewed}
            status={checkIn.status}
          />
        </div>
      </div>
    </div>
  );
}

export default CoachCheckInDetails;
