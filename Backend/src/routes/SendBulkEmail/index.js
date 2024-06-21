import { Router } from "express";
import { sendBulkEmailsController } from "../../controller/SendBulkEmail/index.js";

const SendBulkEmail = Router();


SendBulkEmail.post('/sendBulkEmails', sendBulkEmailsController);

export default SendBulkEmail;
