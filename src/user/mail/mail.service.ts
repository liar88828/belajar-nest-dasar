import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
  send() {
    console.info("Send Email");
  }
}

export const mailServiceProvide = new MailService();
