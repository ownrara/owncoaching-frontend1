import { useParams } from "react-router-dom";
import PageHeader from "../../../../components/common/PageHeader/PageHeader";

function CoachClientNutritionEdit() {
  const { clientId } = useParams();

  return (
    <div>
      <PageHeader
        breadcrumb="Coach / Clients / Nutrition / Edit"
        title="Edit Nutrition Plan"
        subtitle={`Client: ${clientId}`}
      />
      <div className="card" style={{ padding: 16 }}>
        Placeholder. Next: build Nutrition edit like Training edit.
      </div>
    </div>
  );
}

export default CoachClientNutritionEdit;
