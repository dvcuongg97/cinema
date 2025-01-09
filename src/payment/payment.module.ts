import { Global, Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { UserService } from 'src/user/user.service';

@Global()
@Module({
  controllers: [PaymentController],
  providers: [PaymentService, UserService],
})
export class PaymentModule { }
