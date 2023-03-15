const amqplib = require('amqplib');
const amqp_url_docker = 'amqp://localhost'
const sendQueue = async({msg}) =>{
    try{
        // create connection
        const connection = await amqplib.connect(amqp_url_docker);
        // create channel
        const channel = await connection.createChannel();
        const queueName = "test-queue";
        // create queue
      
        await channel.assertQueue(queueName, {
            durable : false
        });
        await channel.sendToQueue(queueName, Buffer.from(msg))
        // close connection
        // await connection.close();
    }catch(e){
        console.log(e);
    }
}
// const msg = process.argv.slice(2).join(' ') || 'hello';

// sendQueue({msg});

module.exports = { sendQueue };
