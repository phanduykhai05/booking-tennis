import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Public } from '../../common/auth/auth.decorators';
import { VenuesService } from './venues.service';

@ApiTags('venues')
@Controller('venues')
export class VenuesController {
  constructor(private readonly venuesService: VenuesService) {}

  @ApiOperation({
    summary: 'Danh sách sân gần bạn, lọc theo bộ môn và từ khoá',
  })
  @ApiQuery({ name: 'sport', required: false })
  @ApiQuery({ name: 'q', required: false })
  @ApiQuery({ name: 'lat', required: false })
  @ApiQuery({ name: 'lng', required: false })
  @Get()
  @Public()
  list(
    @Query('sport') sport?: string,
    @Query('q') q?: string,
    @Query('lat') lat?: string,
    @Query('lng') lng?: string,
  ) {
    return this.venuesService.list({
      lat: lat === undefined ? undefined : Number(lat),
      lng: lng === undefined ? undefined : Number(lng),
      q,
      sport,
    });
  }

  @ApiOperation({ summary: 'Toạ độ sân dùng cho bản đồ' })
  @Get('map')
  @Public()
  mapMarkers() {
    return this.venuesService.mapMarkers();
  }

  @ApiOperation({ summary: 'Chi tiết sân kèm sự kiện bán vé' })
  @Get(':venueId')
  @Public()
  detail(@Param('venueId') venueId: string) {
    return this.venuesService.detail(venueId);
  }

  @ApiOperation({ summary: 'Lưới lịch theo sân của một ngày' })
  @ApiQuery({ name: 'date', required: true, example: '2026-08-17' })
  @Get(':venueId/schedule')
  @Public()
  schedule(@Param('venueId') venueId: string, @Query('date') date: string) {
    return this.venuesService.schedule(venueId, date);
  }
}
