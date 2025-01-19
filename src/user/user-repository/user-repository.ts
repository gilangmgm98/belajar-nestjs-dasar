import { Inject, Injectable } from '@nestjs/common';
import { Connection } from '../connection/connection';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { User } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston'

@Injectable()
export class UserRepository {
    constructor(
        private prismaService: PrismaService,
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger
    ) {
        // console.info('Create User Respository')
        // ganti menggunakan logger
        this.logger.info('Create User Respository')
    }

    async save(firstName: string, lastName?: string): Promise<User> {
        // async save(firstName: string, lastName?: string)  {
        //     console.info(firstName);
        //     console.info(lastName);
        // }
        this.logger.info(`create user with firstName : "${firstName}" and lastName : "${lastName}"`)
        return await this.prismaService.user.create({
            data: {
                firstName,
                lastName
            }
        })
    }
}

