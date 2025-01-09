// import { Module } from '@nestjs/common';
// import { CloudinaryService } from './cloudinary.service';
// import { CloudinaryController } from './cloudinary.controller';
// import { Cloudinary } from './cloudinary/cloudinary';

// @Module({
//   controllers: [CloudinaryController],
//   providers: [CloudinaryService, Cloudinary],
// })
// export class CloudinaryModule {}
// cloudinary.module.ts
import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryProvider, CloudinaryService]
})
export class CloudinaryModule { }
