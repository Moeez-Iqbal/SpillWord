import { Router } from "express";
import { sendBulkEmailsController } from "../../controller/SendBulkEmail/index.js";
import upload from "../../middleware/multer/index.js";

const SendBulkEmail = Router();


SendBulkEmail.post('/sendBulkEmails', upload.array('attachments'), sendBulkEmailsController);

export default SendBulkEmail;
