import fetchClient from "../fetchClient";

export default async function commissionPut({ id, data }) {
    const response = await fetchClient(`/commissions/${id}`, {
        auth: true,
        options: {
            method: "PUT",
            body: JSON.stringify({
                title: data.title,
                content: data.content,
                description: data.description,
                price: data.price,
                terms: data.terms,
                exampleId: data.exampleId
            }),
        },
    });

    if (response.error) {
        return {
            error: true,
            message: response.body,
            typeError: response.status,
        }
    }

    return {
        error: false,
        data: response.body,
    };
}