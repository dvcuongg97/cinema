import { Global, Module } from '@nestjs/common';
import { ValidationService } from 'src/validations/validation.service';

@Global()
@Module({
    exports: [ValidationService],
    providers: [ValidationService],
})
export class ValidationModule { }
