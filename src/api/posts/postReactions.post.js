import fetchClient from '../fetchClient';
import useAuthStore from '../../store/auth.store';

export default async function postReactionsPost({ postId }) {
    if (!useAuthStore.getState().user) {
        return {
            error: true,
            message: 'No autenticado',
            typeError: 401,
        }
    }

    const data = await fetchClient(`/posts/${postId}/reactions`, {
        auth: true,
        options: {
            method: 'POST',
            body: JSON.stringify({
                postId: postId
            })
        }
    });


    if (data.error) {
        return {
            error: true,
            message: data.body,
            typeError: data.status,
        }
    }

    return {
        error: false,
        data: data.body,
    };
};