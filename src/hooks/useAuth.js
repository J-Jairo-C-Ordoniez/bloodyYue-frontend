import auth from '../api/auth/index';

export default function useAuth(variant = 'login') {
  const variants = {
    login: auth.loginPost,
    register: auth.registerPost,
    codeGet: auth.codeGet,
    codeVerify: auth.codeVerifyPost,
    resetPassword: auth.resetPasswordPost,
    newToken: auth.newToken
  }

  return { auth: variants[variant] }
}