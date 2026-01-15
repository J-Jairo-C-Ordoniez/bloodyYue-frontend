import loginPost from "./login.post";
import registerPost from "./register.post";
import codeGet from "./code.get";
import codeVerifyPost from "./codeVerify.post";
import resetPasswordPost from "./resetPassword.post";

const auth = {
    loginPost,
    registerPost,
    codeGet,
    codeVerifyPost,
    resetPasswordPost
};

export default auth;