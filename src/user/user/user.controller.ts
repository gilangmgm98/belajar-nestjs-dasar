import { Controller, Get, Header, HostParam, HttpCode, HttpRedirectResponse, Ip, Param, Post, Query, Redirect, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';

@Controller('/api/users')
export class UserController {
    constructor(private service: UserService) { }
    
    @Get('/helloService')
    sayHelloService(
        @Query('first_name') first_name: string,
        @Query('last_name') last_name: string
    ): string {
        return this.service.sayHello(first_name || last_name)
    }

    @Get('/view/hello')
    viewHello(
        @Query('name') name: string,
        @Res() response: Response,
    ) {
        response.render('index.html', {
            title: 'Template Engine Mustache',
            name: name
        })
        // response.status(200).json({
        //     success: true,
        //     message: `Hello, ${name}!`
        // });
    }

    @Get('/set-cookie')
    setCookie(
        @Query('name') name: string,
        @Res() response: Response
    ): void {
        response.cookie('name', name)
        response.status(200).json({
            success: true,
            message: 'Cookie has been set'
        })
    }

    @Get('/get-cookie')
    getCookie(
        @Req() request: Request,
        @Res() response: Response,
    ): void {
        const name = request.cookies['name'];
        response.status(200).json({
            success: true,
            message: `Cookie 'name' is ${name}`
        })
    }

    @Get('/remove-cookie')
    removeCookie(
        @Query('name') name: string,
        @Res() response: Response
    ): void {
        response.clearCookie('name')
        response.status(200).json({
            success: true,
            message: 'Cookie has been Removed'
        })
    }

    // support juga untuk asynchronous dengan async sebelum method dan Promise untuk outputnya / return nya
    @Get('/')
    async getHome(): Promise<Record<string, any>> {
        return {
            success: true,
            message: 'Welcome to the User API',
            version: '1.0.0',
            author: 'Muhammad Gilang Murdiyanto',
            description: 'This API provides user related operations'
        };
    }

    @Get('/sampleRes')
    @Header('Content-Type', 'application/json')
    @HttpCode(200)
    sampleResponse(): Record<string, string> {
        return {
            data: 'Hello Sample Response'
        }
    }

    @Get('/redirect')
    @Redirect()
    redirect(): HttpRedirectResponse {
        return {
            url: '/api/users',
            statusCode: 301,
        };
    }

    @Get('/hello')
    sayHello(
        @Query('first_name') first_name: string,
        @Query('last_name') last_name: string
    ): string {
        if (!first_name) {
            return `Hello Guest!`;
        } else if (!last_name) {
            return `Hello ${first_name}!`;
        } else {
            return `Hello ${first_name} ${last_name}`;
        }
    }

    @Get('/ipaddress')
    getIPAddress(
        @Ip() ip: string
    ): string {
        return ip
    }

    @Get('/host')
    getHost(
        @HostParam() host: string
    ): string {
        return host
    }

    @Post('/post')
    post(): string {
        return 'Post User';
    }

    // tidak di rekomendasikan untuk langssung menggunakan express request dan lebih baik gunakan decorator
    // @Get('/:id')
    // getUserById(@Req() request : Request ) : string {
    //     return `User with ID: ${request.params.id}`;
    // }

    @Get('/:id')
    getUserById(@Param('id') id: number): string {
        return `Param ID: ${id}`;
    }

    @Get('/get')
    async get(): Promise<string> {
        return 'Hello NestJS User';
    }
}
