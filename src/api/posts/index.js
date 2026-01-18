import postPost from "./post.post";
import postListGet from "./postList.get";
import postGetIdGet from "./postGetId.get";
import postFilterLabelGet from "./postFilterLabel.get";
import postFilterTitleGet from "./postFilterTitle.get";
import postDelete from "./post.delete";
import postRandomGet from "./postRandom.get";
import postPut from "./post.put";
import postLabelsPut from "./postLabels.put";
import postReactionsPost from "./postReactions.post";
import postReactionsGet from "./postReactions.get";
import postReactionsDelete from "./postReactions.delete";

const posts = {
    postPost,
    postListGet,
    postGetIdGet,
    postFilterLabelGet,
    postFilterTitleGet,
    postDelete,
    postRandomGet,
    postPut,
    postLabelsPut,
    postReactionsPost,
    postReactionsGet,
    postReactionsDelete,
};

export default posts;