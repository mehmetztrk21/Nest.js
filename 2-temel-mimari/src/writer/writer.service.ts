import { Injectable } from '@nestjs/common';

export interface IWriter {
    writeLog(msg: string): void;
}

@Injectable()
export class WriterService implements IWriter {
    writeLog(msg: string): void {
        console.log(msg);
    }
}

@Injectable()
export class WriterFileService implements IWriter {
    writeLog(msg: string): void {
        // Dosyaya log yazma işlemi burada yapılacak
        console.log('Dosyaya log yazıldı: ' + msg);
    }
}
