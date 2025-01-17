import { Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('/api/users')
export class UserController {

    @Get('/hello')
    sayHello(
        @Query('first_name') first_name: string,
        @Query('last_name') last_name: string
    ): string {
        if (!first_name) {
            return `Hello Guest!`;
        }else if (!last_name) {
            return `Hello ${first_name}!`;
        }else{
            return `Hello ${first_name} ${last_name}`;
        }
    }

    @Post('/post')
    post(): string {
        return 'Post User';
    }

    // tidak di rekomendasikan untuk langssung menggunakan express request
    // @Get('/:id')
    // getUserById(@Req() request : Request ) : string {
    //     return `User with ID: ${request.params.id}`;
    // }

    @Get('/:id')
    getUserById(@Param('id') id: number): string {
        return `Param ID: ${id}`;
    }

    @Get('/get')
    get(): string {
        return 'Hello NestJS User';
    }
}
