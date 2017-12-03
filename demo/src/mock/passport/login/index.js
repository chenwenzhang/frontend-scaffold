module.exports = function(req){
    const username = req.body.username;
    const password = req.body.password;
    let result = {
        error: false,
        message: ""
    };
    if (username === "chenwenzhang" && password === "888888") {
        result.message = "登录成功";
    } else {
        result.error = true;
        result.message = "用户名或密码错误";
    }
    return result;
};