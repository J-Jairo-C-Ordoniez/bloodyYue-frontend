import rolesPost from "./roles.post";
import rolesGet from "./roles.get";
import rolesGetId from "./rolesGetId.get";
import rolesGetAllPermitsGet from "./rolesGetAllPermits.get";
import rolesAssignPermitPost from "./rolesAssignPermit.post";
import rolesRemovePermitDelete from "./rolesRemovePermit.delete";

const roles = {
    rolesPost,
    rolesGet,
    rolesGetId,
    rolesGetAllPermitsGet,
    rolesAssignPermitPost,
    rolesRemovePermitDelete,
};

export default roles;