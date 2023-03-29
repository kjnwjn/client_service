const { findById } = require("../../model/student.query");
const queueUtils = require("./queueUtils");
const { EXCHANGE_TYPE, EXCHANGE_NAME, QUEUE } = require("../../configs/variables");

const receiver = {
    init: function () {
        receiver.getClientData();
    },
    getClientData: async function () {
        queueUtils
            .consumeExchange(EXCHANGE_NAME.DIRECT_GET_CLIENT_DATA, EXCHANGE_TYPE.DIRECT, QUEUE.getStudentData, { durable: true }, { noAck: true }, async (msg) => {
                console.log("🚀 ~ file: receive.js:11 ~ queueUtils.consumeExchange ~ msg:", msg);
                if (msg) {
                    const student = await findById(msg.data.id_student);
                    if (student) {
                        receiver.showClientData(student);
                    } else {
                        console.log("student not found");
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    },
    showClientData: async (student = null) => {
        queueUtils
            .publishMessageToExchange(
                EXCHANGE_NAME.FAN_OUT_SHOW_CLIENT_DATA,
                EXCHANGE_TYPE.FANOUT,
                "",
                { durable: false },
                { noAck: true },
                {
                    data: student,
                }
            )
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                next(error);
            });
    },
};
module.exports = receiver;
