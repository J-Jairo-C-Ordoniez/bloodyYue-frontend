import commissionPost from "./commission.post";
import commissionListGet from "./commissionList.get";
import commissionByIdGet from "./commissionById.get";
import commissionFilterLabelGet from "./commissionFilterLabel.get";
import commissionFilterTitleGet from "./commissionFilterTitle.get";
import commissionFilterPriceGet from "./commissionFilterPrice.get";
import commissionPut from "./commission.put";
import commissionLabelsPut from "./commissionLabels.put";

const commissions = {
    commissionPost,
    commissionListGet,
    commissionByIdGet,
    commissionFilterLabelGet,
    commissionFilterTitleGet,
    commissionFilterPriceGet,
    commissionPut,
    commissionLabelsPut,
}

export default commissions;