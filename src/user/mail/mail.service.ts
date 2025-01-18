import { Injectable } from '@nestjs/common';

export class MailService {
    send(toPerson: string) {
        console.log(`Sending Email to ${toPerson}`);
    }
}

export const mailService = new MailService();