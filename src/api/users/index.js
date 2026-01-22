import meProfileGet from "./meProfile.get";
import meProfilePut from "./meProfile.put";
import meTestimoniesGet from "./meTestimonies.get";
import meTestimoniesPost from "./meTestimonies.post";
import meTestimoniesPut from "./meTestimonies.put";
import meTestimoniesDelete from "./meTestimonies.delete";
import testimoniesGet from "./testimonies.get";
import usersGet from "./users.get";
import usersStatusPatch from "./usersStatus.patch";

const users = {
    meProfileGet,
    meProfilePut,
    meTestimoniesGet,
    meTestimoniesPost,
    meTestimoniesPut,
    meTestimoniesDelete,
    testimoniesGet,
    usersGet,
    usersStatusPatch,
};

export default users;