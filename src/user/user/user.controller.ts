import { Body, Controller, Get, Header, HostParam, HttpCode, HttpException, HttpRedirectResponse, Inject, Ip, Param, ParseIntPipe, Post, Query, Redirect, Req, Res, UseFilters, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { request, Request, Response } from 'express';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../user-repository/user-repository';
import { MemberService } from '../member/member.service';
import { User } from '@prisma/client';
import { ValidationFilter } from 'src/validation/validation.filter';
import { LoginUserRequest, loginUserRequestValidation } from 'src/model/login.model';
import { ValidationPipe } from 'src/validation/validation.pipe';
import { TimeInterceptor } from 'src/time/time.interceptor';
import { Auth } from 'src/auth/auth.decorator';
import { first } from 'rxjs';
import { RoleGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/role.decorator';

@Controller('/api/users')
export class UserController {
    constructor(
        private service: UserService,
        private connection: Connection,
        private mail: MailService,
        @Inject('EmailService') private emailService: MailService,
        private userRepository: UserRepository,
        private memberService: MemberService,
    ) { }

    @Get('/current')
    // @UseGuards(RoleGuard)
    @Roles(['admin','supervisor','manager'])
    current(@Auth() user: User) : Record <string, any>{
        return {
            data : `Hello User ${user.firstName} ${user.lastName}`
        }
    }

    @Get('/connection')
    async getConnection(): Promise<string> {
        // this.userRepository.save()
        this.mail.send('Saheim')
        this.emailService.send('Syx')
        return await this.connection.getName()
    }

    @Get('/connection/member')
    async getConnectionMember(): Promise<string> {
        console.info(this.memberService.getConnectionName())
        this.memberService.sendEmail('bartos')
        return await this.connection.getName()
    }

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
    @Post('/create')
    async create(@Body() userData: { firstName: string; lastName?: string }): Promise<User> {
        // async create(@Body() userData: { firstName: string; lastName?: string }) {
        if (!userData.firstName) {
            throw new HttpException(
                {
                    status: 400,
                    error: 'First Name is required'
                },
                400,
            )
        }
        return this.userRepository.save(
            userData.firstName,
            userData.lastName,
        )
    }

    @Get('/sayHello')
    // dicomment mengunakan global filter pada main file
    // @UseFilters(ValidationFilter)
    sayHelloUserService(
        @Query('name') name: string,
    ): string {
        return this.service.sayHello(name)
    }

    // tidak di rekomendasikan untuk langssung menggunakan express request dan lebih baik gunakan decorator
    // @Get('/:id')
    // getUserById(@Req() request : Request ) : string {
    //     return `User with ID: ${request.params.id}`;
    // }

    @Get('/:id')
    getUserById(@Param('id', ParseIntPipe) id: number): string {
        return `Param ID: ${id}`;
    }

    @Get('/get')
    async get(): Promise<string> {
        return 'Hello NestJS User';
    }

    @UsePipes(new ValidationPipe(loginUserRequestValidation))
    @Post('/login')
    @Header('Content-Type', 'application/json')
    @UseInterceptors(TimeInterceptor)
    login(
        @Query('name') name: string,
        @Body() request: LoginUserRequest
    ) {
        if (name) {
            return {
                data: `Hello ${request.username} with params ${name}`
            }
        } else {
            return {
                data: `Hello ${request.username}`
            }
        }
    }
}
