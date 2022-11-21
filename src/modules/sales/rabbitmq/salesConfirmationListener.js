import ampq from "amqplib/callback_api.js";

import { RABBIT_MQ_URL } from "../../../config/contants/secrets.js";
import { SALES_CONFIRMATION_QUEUE } from '../../../config/rabbitmq/queue.js';
import OrderService from '../service/OrderService.js';

export function listenToSalesConfirmationQueue() {

    ampq.connect(RABBIT_MQ_URL, (error, connection) => {

        if (error) {
            throw error;
        }

        console.info("listening to sales Confirmation queue.");

        connection.createChannel((error, channel) => {
            if (error) {
                throw error;
            }
            channel.consume(SALES_CONFIRMATION_QUEUE, message => {
                console.info(`Receving message from queue: ${message.content.toString()}`);
                OrderService.updateOrder(message.content.toString());
            }, { noAck: true });
        });


    });
}