import loginPost from "./login.post";
import registerPost from "./register.post";
import codeGet from "./code.get";
import codeVerifyPost from "./codeVerify.post";
import resetPasswordPost from "./resetPassword.post";
import newToken from "./newToken";
import logoutPost from "./logout.post";
import changeRolePost from "./changeRole.post";
import changeStatusPatch from "./changeStatus.patch";

const auth = {
    loginPost,
    registerPost,
    codeGet,
    codeVerifyPost,
    resetPasswordPost,
    newToken,
    logoutPost,
    changeRolePost,
    changeStatusPatch
};

export default auth;