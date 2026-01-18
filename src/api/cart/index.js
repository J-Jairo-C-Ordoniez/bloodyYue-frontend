import cartItemsPost from "./cartItems.post";
import cartItemsGet from "./cartItems.get";
import cartItemsByIdGet from "./cartItemsById.get";
import cartItemPut from "./cartItem.put";
import cartItemDiscardedPatch from "./cartItemDiscarded.patch";

const cart = {
    cartItemsPost,
    cartItemsGet,
    cartItemsByIdGet,
    cartItemPut,
    cartItemDiscardedPatch
}

export default cart;