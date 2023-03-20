const responseJson = function ({ status = false, statusCode = 200, msg = {}, data = null, res }) {
    return res.status(statusCode).json({
        status: status,
        statusCode: statusCode,
        msg: msg,
        data: data,
        timeStamp: new Date().getTime(),
    });
};
module.exports = { responseJson };
