// import { Injectable } from '@nestjs/common';
// import { CreateCloudinaryDto } from './dto/create-cloudinary.dto';
// import { UpdateCloudinaryDto } from './dto/update-cloudinary.dto';

// @Injectable()
// export class CloudinaryService {
//   create(createCloudinaryDto: CreateCloudinaryDto) {
//     return 'This action adds a new cloudinary';
//   }

//   findAll() {
//     return `This action returns all cloudinary`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} cloudinary`;
//   }

//   update(id: number, updateCloudinaryDto: UpdateCloudinaryDto) {
//     return `This action updates a #${id} cloudinary`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} cloudinary`;
//   }
// }


// cloudinary.service.ts

import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
