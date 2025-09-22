import { Injectable } from '@nestjs/common';

@Injectable()
export class PropertyService {
    logProperty(): void {
        console.log('PropertyService logProperty method called.');
    }
}
