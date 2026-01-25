import users from '../api/users/index';
import mediaUserPost from '../api/media/mediaUser.post';

export default function useUsers(variant = 'meProfileGet') {
    const variants = {
        meProfileGet: users.meProfileGet,
        meProfilePut: users.meProfilePut,
        meTestimoniesGet: users.meTestimoniesGet,
        meTestimoniesPost: users.meTestimoniesPost,
        meTestimoniesPut: users.meTestimoniesPut,
        meTestimoniesDelete: users.meTestimoniesDelete,
        testimoniesGet: users.testimoniesGet,
    }

    const updateProfile = async (data) => {
        return await users.meProfilePut({ data });
    }

    const uploadMedia = async ({ file, context }) => {
        return await mediaUserPost({ file, context });
    }

    // Keep legacy behavior if needed, but preferably use specific functions
    return {
        users: variants[variant],
        updateProfile,
        uploadMedia,
    }
}
