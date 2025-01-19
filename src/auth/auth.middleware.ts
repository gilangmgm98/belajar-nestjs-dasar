import { HttpException, Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { Logger } from 'winston';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger
  ) { }
  async use(req: any, res: any, next: () => void) {
    const username = Number(req.headers['x-username']);

    if (!username) {
      throw new HttpException('Unauthorized', 401)
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        id: username
      }
    })
    this.logger.info(user)
    if (user) {
      req.user = user
      next() 
    } else {
      throw new HttpException('Unauthorized', 401)
    }
  }
}
