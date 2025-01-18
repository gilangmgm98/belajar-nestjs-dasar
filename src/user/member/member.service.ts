import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';

@Injectable()
export class MemberService {
    constructor (private moduleRef: ModuleRef) {
    }

    getConnectionName(): string {
        const connection = this.moduleRef.get(Connection)
        return connection.getName();
    } 

    sendEmail(to : string) {
        const emailService = this.moduleRef.get(MailService)
        return emailService.send(to)
    }
}
