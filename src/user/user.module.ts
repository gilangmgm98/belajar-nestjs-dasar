import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { Connection, createConnection, monggoDBConnection, mySQLConnection } from './connection/connection';
import { mailService, MailService } from './mail/mail.service';
import { UserRepository } from './user-repository/user-repository';
import { MemberService } from './member/member.service';
import { ConfigService } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserRepository,
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
    // tidak dipakai karena tidak menggunakan repository lagi
    // {
    //   provide: UserRepository,
    //   useFactory: createUserRepository,
    //   inject: [Connection]
    // },
    {
      provide: 'EmailService',
      useExisting: MailService
    },
    MemberService,
  ],
  exports : [UserService]
})
export class UserModule { }
