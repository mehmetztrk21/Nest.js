import { Module } from '@nestjs/common';
import { WriterService } from './writer.service';

@Module({
    providers: [
        { provide: 'WRITE', useClass: WriterService }, // İstersek buraya WriterFileService de verebiliriz. Sadece burayı değiştirerek tüm projede loglama şeklini değiştirmiş oluruz.
    ],
    exports: ['WRITE'],
})
export class WriterModule { }
