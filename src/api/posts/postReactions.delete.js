import fetchClient from "../fetchClient";

export default async function postReactionsDelete({ id }) {
    const data = await fetchClient(`/posts/${id}/reactions`, {
        auth: true,
        options: {
            method: "DELETE",
        },
    });
}