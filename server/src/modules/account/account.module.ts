import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { PaymentsModule } from '../payments/payments.module';
import { AccountController } from './account.controller';

@Module({
  imports: [AuthModule, PaymentsModule],
  controllers: [AccountController],
})
export class AccountModule {}
