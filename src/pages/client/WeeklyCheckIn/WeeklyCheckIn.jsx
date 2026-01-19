import { useState } from "react";
import PageHeader from "../../../components/common/PageHeader/PageHeader";
import FormCard from "../../../components/form/FormCard/FormCard";
import TextInput from "../../../components/form/TextInput/TextInput";
import UnitToggle from "../../../components/checkin/UnitToggle/UnitToggle";
import MeasurementsGrid from "../../../components/checkin/MeasurementsGrid/MeasurementsGrid";
import PhotoUploadBox from "../../../components/checkin/PhotoUploadBox/PhotoUploadBox";
import mockWeeklyCheckIn from "../../../data/mockWeeklyCheckIn";
import "./WeeklyCheckIn.css";

function WeeklyCheckIn() {
  const [weightUnit, setWeightUnit] = useState(mockWeeklyCheckIn.weightUnit);
  const [measureUnit, setMeasureUnit] = useState(mockWeeklyCheckIn.measureUnit);

  const [weight, setWeight] = useState(mockWeeklyCheckIn.current.weight);

  const [body, setBody] = useState(mockWeeklyCheckIn.body);

  const [photos, setPhotos] = useState(mockWeeklyCheckIn.photos);

  const [complianceNotes, setComplianceNotes] = useState(mockWeeklyCheckIn.complianceNotes);

  function handleSubmit(e) {
    e.preventDefault();

    if (!weight) {
      alert("Please enter your weight.");
      return;
    }

    // Mock submit only
    alert("Weekly check-in submitted (mock).");
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
