import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/product.module';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(
      'mongodb://127.0.0.1:27017/nestdemo?gssapiServiceName=mongodb',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
