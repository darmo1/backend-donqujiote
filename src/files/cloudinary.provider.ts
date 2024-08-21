import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY } from './constants';
import { ConfigService } from '@nestjs/config';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  },
};

// export class CloudinaryProvider {
//   constructor(private readonly configService: ConfigService) {}

//   configuration() {
//     return {
//       provide: CLOUDINARY,
//       useFactory: () => {
//         return cloudinary.config({
//           cloud_name: this.configService.get('CLOUDINARY_NAME='),
//           api_key: this.configService.get('CLOUDINARY_API_KEY'),
//           api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
//         });
//       },
//     };
//   }
// }
