import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { Connection, createConnection, monggoDBConnection, mySQLConnection } from './connection/connection';
import { mailService, MailService } from './mail/mail.service';
import { createUserRepository, UserRepository } from './user-repository/user-repository';
import { MemberService } from './member/member.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    // Ganti Menuggunakan useFactiory
    // {
    //   provide: Connection,
    //   useClass: process.env.DATABASE == 'mysql' ? mySQLConnection : monggoDBConnection,
    // },
    {
      provide: Connection,
      useFactory: createConnection,
      inject: [ConfigService],
    },
    {
      provide: MailService,
      useValue: mailService
    },
    {
      provide: UserRepository,
      useFactory: createUserRepository,
      inject: [Connection]
    },
    {
      provide: 'EmailService',
      useExisting: MailService
    },
    MemberService
  ]
})
export class UserModule { }
