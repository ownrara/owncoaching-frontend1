import { useState } from "react";
import PageHeader from "../../../components/common/PageHeader/PageHeader";
import FormCard from "../../../components/form/FormCard/FormCard";
import TextInput from "../../../components/form/TextInput/TextInput";
import UnitToggle from "../../../components/checkin/UnitToggle/UnitToggle";
import MeasurementsGrid from "../../../components/checkin/MeasurementsGrid/MeasurementsGrid";
import PhotoUploadBox from "../../../components/checkin/PhotoUploadBox/PhotoUploadBox";
import mockWeeklyCheckIn from "../../../data/mockWeeklyCheckIn";
import { getCheckIns, saveCheckIns } from "../../../data/checkInsStore";
import "./WeeklyCheckIn.css";

// Course-level mock: assume logged-in client is c1
const CURRENT_CLIENT_ID = "c1";

function isoToday() {
  return new Date().toISOString().slice(0, 10);
}

// Convert File -> { name, dataUrl } so it can be stored in localStorage safely
function fileToDataUrl(file) {
  return new Promise((resolve) => {
    if (!file) return resolve(null);

    // If it's already stored (object with dataUrl), keep it
    if (typeof file === "object" && file.dataUrl && file.name) {
      return resolve(file);
    }

    // If it's a real File
    if (file instanceof File) {
      const reader = new FileReader();
      reader.onload = () => resolve({ name: file.name, dataUrl: reader.result });
      reader.onerror = () => resolve({ name: file.name, dataUrl: "" });
      reader.readAsDataURL(file);
      return;
    }

    resolve(null);
  });
}

async function normalizePhotosForStorage(photos) {
  const front = await fileToDataUrl(photos?.front || null);
  const side = await fileToDataUrl(photos?.side || null);
  const back = await fileToDataUrl(photos?.back || null);

  return { front, side, back };
}

function WeeklyCheckIn() {
  const [weightUnit, setWeightUnit] = useState(mockWeeklyCheckIn.weightUnit);
  const [measureUnit, setMeasureUnit] = useState(mockWeeklyCheckIn.measureUnit);

  const [weight, setWeight] = useState(mockWeeklyCheckIn.current.weight);
  const [body, setBody] = useState(mockWeeklyCheckIn.body);
  const [photos, setPhotos] = useState(mockWeeklyCheckIn.photos);
  const [complianceNotes, setComplianceNotes] = useState(
    mockWeeklyCheckIn.complianceNotes
  );

  async function handleSubmit(e) {
    e.preventDefault();

    if (!weight) {
      alert("Please enter your weight.");
      return;
    }

    const all = getCheckIns();

    // IMPORTANT: convert photos to storable structure
    const photosStored = await normalizePhotosForStorage(photos);

    const newCheckIn = {
      id: `ci_${Date.now()}`,
      clientId: CURRENT_CLIENT_ID,
      date: isoToday(),

      // HistoryTable fields (keep)
      weight: Number(weight),
      waist: body?.waist ? Number(body.waist) : null,
      sleepHours: null,
      energy: "Average",
      adherence: null,

      // Client compliance notes
      notes: complianceNotes || "",

      // Coach will fill this later
      coachNotes: "",
      status: "Pending",

      // Full client submission (this is what coach must see)
      weightUnit,
      measureUnit,
      body: body || {},
      photos: photosStored,
    };

    const next = [newCheckIn, ...all];
    saveCheckIns(next);

    alert("Weekly check-in submitted.");

    // reset (course simple)
    setWeight("");
    setBody(mockWeeklyCheckIn.body);
    setPhotos(mockWeeklyCheckIn.photos);
    setComplianceNotes("");
  }

  return (
    <div>
      <PageHeader
        breadcrumb="Dashboard / Weekly Check-In"
        title="Weekly Check-In"
        subtitle="Submit your weekly progress update"
      />

      <form onSubmit={handleSubmit}>
        <div className="weeklyLayout">
          {/* LEFT COLUMN */}
          <div className="weeklyLeft">
            <div className="weeklySectionTitle">1. Current Measurements</div>
            <FormCard>
              <div className="weightRow">
                <div className="weightInput">
                  <TextInput
                    label="Weight"
                    name="weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder=""
                  />
                </div>

                <div className="weightToggle">
                  <UnitToggle
                    value={weightUnit}
                    options={[
                      { value: "lbs", label: "lbs" },
                      { value: "kg", label: "kg" },
                    ]}
                    onChange={setWeightUnit}
                  />
                </div>
              </div>
            </FormCard>

            <div className="weeklySectionTitle">2. Body Measurements</div>
            <FormCard>
              <MeasurementsGrid
                unit={measureUnit}
                onUnitChange={setMeasureUnit}
                values={body}
                onValueChange={setBody}
              />
            </FormCard>
          </div>

          {/* RIGHT COLUMN */}
          <div className="weeklyRight">
            <div className="weeklySectionTitle">3. Progress Photos</div>
            <FormCard>
              <div className="photosGrid">
                <PhotoUploadBox
                  label="Front"
                  value={photos.front}
                  onChange={(file) => setPhotos((p) => ({ ...p, front: file }))}
                />
                <PhotoUploadBox
                  label="Side"
                  value={photos.side}
                  onChange={(file) => setPhotos((p) => ({ ...p, side: file }))}
                />
                <PhotoUploadBox
                  label="Back"
                  value={photos.back}
                  onChange={(file) => setPhotos((p) => ({ ...p, back: file }))}
                />
              </div>
            </FormCard>

            <div className="weeklySectionTitle">4. Compliance</div>
            <FormCard>
              <div className="compliancePrompt">
                How compliant were you with your diet & training plan?
              </div>

              <textarea
                className="weeklyTextArea"
                value={complianceNotes}
                onChange={(e) => setComplianceNotes(e.target.value)}
                placeholder="Any other comments or information you'd like to share..."
                rows={6}
              />
            </FormCard>

            <div className="submitRow">
              <button className="weeklySubmitBtn" type="submit">
                Submit Check-In
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default WeeklyCheckIn;
