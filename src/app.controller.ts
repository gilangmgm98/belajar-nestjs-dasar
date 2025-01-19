import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // agar bisa menggunakan service dari module lain maka pada module tersebut harus exports service tersebut
    private userService: UserService
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
