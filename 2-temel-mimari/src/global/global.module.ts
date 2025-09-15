import { Global, Module } from '@nestjs/common';
import { GlobalService } from './global.service';

@Global() // global modül tanımı. Böylece bu modülün sağlayıcıları (providers) uygulamanın her yerinde kullanılabilir hale gelir. Sadece app module'de import edilir.
@Module({
  providers: [GlobalService],
  exports: [GlobalService],
})
export class GlobalModule {}
