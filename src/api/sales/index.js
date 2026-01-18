import salesPost from "./sales.post";
import salesGetLisGet from "./salesGetList.get";
import salesMeGet from "./salesMe.get";
import salesByIdGet from "./salesById.get";
import salesSoldGet from "./salesSold.get";
import salesPeriodGet from "./salesPeriod.get";
import salesDetailsGet from "./salesDetails.get";
import salesStatusPatch from "./salesStatus.patch";
import salesDetailsStatusPatch from "./salesDetailsStatus.patch";

const sales = {
    salesPost,
    salesGetLisGet,
    salesMeGet,
    salesByIdGet,
    salesSoldGet,
    salesPeriodGet,
    salesDetailsGet,
    salesStatusPatch,
    salesDetailsStatusPatch
}

export default sales;