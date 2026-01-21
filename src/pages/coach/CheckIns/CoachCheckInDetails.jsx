import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageHeader from "../../../components/common/PageHeader/PageHeader";
import CoachNotesBox from "../../../components/coach/CoachNotesBox/CoachNotesBox";
import mockClients from "../../../data/mockClients";
import { getCheckIns, onCheckInsChange, saveCheckIns } from "../../../data/checkInsStore";
import "./CoachCheckInDetails.css";

function formatUnitLabel(u) {
  if (u === "in") return "in";
  if (u === "cm") return "cm";
  if (u === "lbs") return "lbs";
  return "kg";
}

function PhotoPreview({ label, photo }) {
  if (!photo) {
    return (
      <div className="card" style={{ padding: 12 }}>
        <div style={{ fontWeight: 800, marginBottom: 6 }}>{label}</div>
        <div style={{ color: "var(--muted)" }}>No photo</div>
      </div>
    );
  }

  const name = photo?.name || "photo";
  const src = photo?.dataUrl || "";

  return (
    <div className="card" style={{ padding: 12 }}>
      <div style={{ fontWeight: 800, marginBottom: 6 }}>{label}</div>
      {src ? (
        <img
          src={src}
          alt={name}
          style={{ width: "100%", borderRadius: 10, border: "1px solid var(--border)" }}
        />
      ) : (
        <div style={{ color: "var(--muted)" }}>{name}</div>
      )}
    </div>
  );
}

function CoachCheckInDetails() {
  const { checkInId } = useParams();

  const [checkIns, setCheckIns] = useState(() => getCheckIns());

  useEffect(() => {
    const off = onCheckInsChange(() => setCheckIns(getCheckIns()));
    return off;
  }, []);

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

  const weightUnit = formatUnitLabel(checkIn.weightUnit);
  const measureUnit = formatUnitLabel(checkIn.measureUnit);
  const body = checkIn.body || {};
  const photos = checkIn.photos || {};

  return (
    <div>
      <PageHeader
        breadcrumb="Coach / Check-Ins / Details"
        title="Check-In Details"
        subtitle={`${client?.name || checkIn.clientId} • ${checkIn.date}`}
      />

      <div className="checkInDetailsGrid">
        <div className="checkInLeft">
          {/* CLIENT SUBMISSION — match the client form sections */}
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

            {/* 1) Weight */}
            <div className="detailsRow">
              <div className="detailsLabel">Weight</div>
              <div className="detailsValue">
                {checkIn.weight ?? "-"} {weightUnit}
              </div>
            </div>

            {/* 2) Body Measurements */}
            <div style={{ marginTop: 14, fontWeight: 900 }}>Body Measurements ({measureUnit})</div>
            <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div className="detailsRow">
                <div className="detailsLabel">Left Arm</div>
                <div className="detailsValue">{body.leftArm || "-"}</div>
              </div>
              <div className="detailsRow">
                <div className="detailsLabel">Right Arm</div>
                <div className="detailsValue">{body.rightArm || "-"}</div>
              </div>

              <div className="detailsRow">
                <div className="detailsLabel">Chest</div>
                <div className="detailsValue">{body.chest || "-"}</div>
              </div>
              <div className="detailsRow">
                <div className="detailsLabel">Waist</div>
                <div className="detailsValue">{body.waist || "-"}</div>
              </div>

              <div className="detailsRow">
                <div className="detailsLabel">Hips</div>
                <div className="detailsValue">{body.hips || "-"}</div>
              </div>
              <div className="detailsRow">
                <div className="detailsLabel">Left Thigh</div>
                <div className="detailsValue">{body.leftThigh || "-"}</div>
              </div>

              <div className="detailsRow">
                <div className="detailsLabel">Right Thigh</div>
                <div className="detailsValue">{body.rightThigh || "-"}</div>
              </div>
              <div className="detailsRow">
                <div className="detailsLabel">Left Calf</div>
                <div className="detailsValue">{body.leftCalf || "-"}</div>
              </div>

              <div className="detailsRow">
                <div className="detailsLabel">Right Calf</div>
                <div className="detailsValue">{body.rightCalf || "-"}</div>
              </div>
            </div>

            {/* 3) Progress Photos */}
            <div style={{ marginTop: 16, fontWeight: 900 }}>Progress Photos</div>
            <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              <PhotoPreview label="Front" photo={photos.front} />
              <PhotoPreview label="Side" photo={photos.side} />
              <PhotoPreview label="Back" photo={photos.back} />
            </div>

            {/* 4) Compliance Notes */}
            <div className="detailsNotes" style={{ marginTop: 14 }}>
              <div className="detailsLabel">Compliance Notes</div>
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
