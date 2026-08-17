import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public } from './common/auth/auth.decorators';
import { PrismaService } from './common/prisma/prisma.service';

@ApiTags('health')
@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @ApiOperation({ summary: 'Kiểm tra API và kết nối cơ sở dữ liệu' })
  @Get('health')
  @Public()
  async health() {
    const venues = await this.prisma.venue.count();
    return { database: 'up', status: 'ok', venues };
  }
}
