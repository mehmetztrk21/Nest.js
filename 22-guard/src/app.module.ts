import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { PackagesModule } from './packages/packages.module';
import { AuthGuard } from './auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from './admin/admin.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ItemsModule, PackagesModule, JwtModule, AdminModule, ProductModule],
  controllers: [AppController],
  providers: [AppService,
    //   {
    //   provide: 'APP_GUARD', //veya bu şekilde de global guard tanımlayabiliriz
    //   useClass: AuthGuard,
    // }
  ],
})
export class AppModule { }
