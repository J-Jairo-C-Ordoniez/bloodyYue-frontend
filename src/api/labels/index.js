import labelsGet from "./labels.get";
import labelsGetId from "./labelsGetId.get";
import labelsPost from "./labels.post";
import labelsPut from "./labels.put";
import labelsDelete from "./labels.delete";

const labels = {
    labelsGet: labelsGet,
    labelsGetId: labelsGetId,
    labelsPost: labelsPost,
    labelsPut: labelsPut,
    labelsDelete: labelsDelete,
}

export default labels;