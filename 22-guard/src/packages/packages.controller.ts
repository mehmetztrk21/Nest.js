import { Controller, Get } from '@nestjs/common';

@Controller('packages')
export class PackagesController {

    @Get()
    getPackages() {
        return [
            { id: 1, name: 'Package 1' },
            { id: 2, name: 'Package 2' },
        ];
    }

    @Get('protected')
    getProtectedPackages() {
        return [
            { id: 1, name: 'Protected Package 1' },
            { id: 2, name: 'Protected Package 2' },
        ];
    }
}
