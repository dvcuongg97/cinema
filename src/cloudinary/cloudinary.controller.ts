// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { CloudinaryService } from './cloudinary.service';
// import { CreateCloudinaryDto } from './dto/create-cloudinary.dto';
// import { UpdateCloudinaryDto } from './dto/update-cloudinary.dto';

// @Controller('cloudinary')
// export class CloudinaryController {
//   constructor(private readonly cloudinaryService: CloudinaryService) {}

//   @Post()
//   create(@Body() createCloudinaryDto: CreateCloudinaryDto) {
//     return this.cloudinaryService.create(createCloudinaryDto);
//   }

//   @Get()
//   findAll() {
//     return this.cloudinaryService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.cloudinaryService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateCloudinaryDto: UpdateCloudinaryDto) {
//     return this.cloudinaryService.update(+id, updateCloudinaryDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.cloudinaryService.remove(+id);
//   }
// }


// app.controller.ts

import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
// ... other imports

@Controller('image')
export class AppController {
  // ... Constructor
  constructor(
    private cloudinaryService: CloudinaryService
  ) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.cloudinaryService.uploadFile(file);
  }
  // app.controller.ts

  @Post('uploads')
  @UseInterceptors(FilesInterceptor('file[]', 5))
  uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    //... handle multiple files
  }
}
