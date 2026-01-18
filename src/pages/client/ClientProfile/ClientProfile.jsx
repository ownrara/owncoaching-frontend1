import { useState } from "react";
import PageHeader from "../../../components/common/PageHeader/PageHeader";
import ProfileCard from "../../../components/profile/ProfileCard/ProfileCard";
import ReadOnlyField from "../../../components/profile/ReadOnlyField/ReadOnlyField";
import TextInput from "../../../components/form/TextInput/TextInput";
import PrimaryButton from "../../../components/common/PrimaryButton/PrimaryButton";
import mockClientProfile from "../../../data/mockClientProfile";
import "./ClientProfile.css";

function ClientProfile() {
  const [profile, setProfile] = useState(mockClientProfile);
  const [isEditing, setIsEditing] = useState(false);

  const [draft, setDraft] = useState(profile);

  function startEdit() {
    setDraft(profile);
    setIsEditing(true);
  }

  function cancelEdit() {
    setDraft(profile);
    setIsEditing(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  }

  function saveProfile() {
    // course-level: local update only (backend later)
    setProfile({
      ...draft,
      age: Number(draft.age),
      heightCm: Number(draft.heightCm),
      currentWeightKg: Number(draft.currentWeightKg),
    });
    setIsEditing(false);
  }

  return (
    <div>
      <PageHeader
        breadcrumb="Client / Profile"
        title="Client Profile"
        subtitle="View and manage your personal information"
      />

      <div className="section">
        <div className="profileActions">
          {!isEditing ? (
            <PrimaryButton onClick={startEdit}>Edit Profile</PrimaryButton>
          ) : (
            <div className="profileBtnRow">
              <PrimaryButton onClick={saveProfile}>Save</PrimaryButton>
              <PrimaryButton variant="secondary" onClick={cancelEdit}>
                Cancel
              </PrimaryButton>
            </div>
          )}
        </div>
      </div>

      <div className="section">
        <ProfileCard title="Personal Information">
          {!isEditing ? (
            <div className="profileGrid2">
              <ReadOnlyField label="Full Name" value={profile.fullName} />
              <ReadOnlyField label="Email" value={profile.email} />
              <ReadOnlyField label="Phone" value={profile.phone} />
              <ReadOnlyField label="Age" value={profile.age} />
            </div>
          ) : (
            <div className="profileGrid2">
              <TextInput
                label="Full Name"
                name="fullName"
                value={draft.fullName}
                onChange={handleChange}
              />
              <TextInput
                label="Email"
                name="email"
                value={draft.email}
                onChange={handleChange}
              />
              <TextInput
                label="Phone"
                name="phone"
                value={draft.phone}
                onChange={handleChange}
              />
              <TextInput
                label="Age"
                name="age"
                type="number"
                value={draft.age}
                onChange={handleChange}
              />
            </div>
          )}
        </ProfileCard>
      </div>

      <div className="section">
        <ProfileCard title="Fitness Details">
          {!isEditing ? (
            <div className="profileGrid2">
              <ReadOnlyField label="Height (cm)" value={profile.heightCm} />
              <ReadOnlyField
                label="Current Weight (kg)"
                value={profile.currentWeightKg}
              />
              <ReadOnlyField label="Goal" value={profile.goal} />
              <ReadOnlyField
                label="Training Experience"
                value={profile.trainingExperience}
              />
              <ReadOnlyField label="Injuries" value={profile.injuries} />
              <ReadOnlyField label="Preferences" value={profile.preferences} />
            </div>
          ) : (
            <div className="profileGrid2">
              <TextInput
                label="Height (cm)"
                name="heightCm"
                type="number"
                value={draft.heightCm}
                onChange={handleChange}
              />
              <TextInput
                label="Current Weight (kg)"
                name="currentWeightKg"
                type="number"
                value={draft.currentWeightKg}
                onChange={handleChange}
              />
              <TextInput
                label="Goal"
                name="goal"
                value={draft.goal}
                onChange={handleChange}
              />
              <TextInput
                label="Training Experience"
                name="trainingExperience"
                value={draft.trainingExperience}
                onChange={handleChange}
              />
              <TextInput
                label="Injuries"
                name="injuries"
                value={draft.injuries}
                onChange={handleChange}
              />
              <TextInput
                label="Preferences"
                name="preferences"
                value={draft.preferences}
                onChange={handleChange}
              />
            </div>
          )}
        </ProfileCard>
      </div>
    </div>
  );
}

export default ClientProfile;
