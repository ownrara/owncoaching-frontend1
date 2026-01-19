import { useParams } from "react-router-dom";
import PageHeader from "../../../components/common/PageHeader/PageHeader";

function CoachCheckInDetails() {
  const { checkInId } = useParams();

  return (
    <div>
      <PageHeader
        breadcrumb="Coach / Check-Ins / Details"
        title="Check-In Details"
        subtitle={`Check-in: ${checkInId}`}
      />

      <div className="card" style={{ padding: 16 }}>
        Placeholder. Next branch will show full details + coach notes + mark reviewed.
      </div>
    </div>
  );
}

export default CoachCheckInDetails;
