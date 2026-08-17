import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { discoverPostTypeToApi } from '../../common/api-mapping';
import { Public } from '../../common/auth/auth.decorators';
import { PrismaService } from '../../common/prisma/prisma.service';

const weekdayLabels = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

function formatPostDate(value: Date) {
  const pad = (input: number) => input.toString().padStart(2, '0');
  return `${pad(value.getHours())}:${pad(value.getMinutes())} • ${pad(value.getDate())}/${pad(value.getMonth() + 1)}/${value.getFullYear()}`;
}

@ApiTags('catalog')
@Controller()
export class CatalogController {
  constructor(private readonly prisma: PrismaService) {}

  @ApiOperation({ summary: 'Danh sách bộ môn thể thao' })
  @Get('sports')
  @Public()
  async sports() {
    const sports = await this.prisma.sportCategory.findMany({
      orderBy: { sortOrder: 'asc' },
    });

    return sports.map((sport) => ({
      icon: sport.icon,
      id: sport.id,
      label: sport.label,
    }));
  }

  @ApiOperation({ summary: 'Bài viết ở màn Khám phá' })
  @ApiQuery({ name: 'type', required: false, example: 'offer' })
  @Get('discover/posts')
  @Public()
  async discoverPosts(@Query('type') type?: string) {
    const posts = await this.prisma.discoverPost.findMany({
      orderBy: { publishedAt: 'desc' },
    });

    return posts
      .map((post) => ({
        date: formatPostDate(post.publishedAt),
        id: post.id,
        labels: post.labels,
        publishedAt: post.publishedAt.toISOString(),
        type: discoverPostTypeToApi[post.type],
        venue: post.venueName,
        weekday: weekdayLabels[post.publishedAt.getDay()],
      }))
      .filter((post) => !type || type === 'all' || post.type === type);
  }
}
