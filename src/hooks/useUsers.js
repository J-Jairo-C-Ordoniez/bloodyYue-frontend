import users from '../api/users/index';

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

    return {
        users: variants[variant]
    }
}
