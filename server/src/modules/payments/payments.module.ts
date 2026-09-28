import { Module } from '@nestjs/common';

import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { SepayConfig } from './sepay.config';

@Module({
  controllers: [PaymentsController],
  exports: [PaymentsService, SepayConfig],
  providers: [PaymentsService, SepayConfig],
})
export class PaymentsModule {}
