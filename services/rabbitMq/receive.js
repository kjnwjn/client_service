const { findById } = require("../../model/student.query");
const queueUtils = require("./queueUtils");
const { EXCHANGE_TYPE, EXCHANGE_NAME, QUEUE } = require("../../configs/variables");

const receiver = {
    init: function () {
        receiver.getClientData();
    },
    getClientData: async function () {
        queueUtils
            .consumeExchange(EXCHANGE_NAME.DIRECT_GET_CLIENT_DATA, EXCHANGE_TYPE.DIRECT, QUEUE.getStudentData, { durable: true }, { noAck: true }, (data) => {
                console.log("🚀 ~ file: receive.js:11 ~ queueUtils.consumeExchange ~ data:", data);
            })
            .catch((error) => {
                console.log(error);
            });
        // .then((data) => console.log({ receiver: data }))
        // .catch((err) => console.log(err));
    },
};
module.exports = receiver;
