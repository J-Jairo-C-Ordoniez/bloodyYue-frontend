import auth from '../api/auth/index';

export default function useAuth(variant = 'login') {
  const variants = {
    login: auth.loginPost,
  }

  return { auth: variants[variant]}
}