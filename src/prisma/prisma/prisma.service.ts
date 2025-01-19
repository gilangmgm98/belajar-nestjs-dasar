import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService 
    extends PrismaClient 
    implements OnModuleInit, OnModuleDestroy  {
    constructor() {
        super();
        console.info('Create Prisma Service')
    }

    onModuleInit() {
        console.info('Initialize Prisma Service')
        this.$connect
    }
    
    onModuleDestroy() {
        console.info('Destroy Prisma Service')
        this.$disconnect
    }
}
