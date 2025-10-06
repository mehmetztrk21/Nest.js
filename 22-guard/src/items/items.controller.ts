import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from 'src/api-key/api-key.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { Policy } from 'src/policy/policy.decorator';

@Controller('items')
// @UseGuards(AuthGuard) // İtem için Tüm route'larda AuthGuard'ı kullan
export class ItemsController {

    @Get()
    @UseGuards(ApiKeyGuard) // (AuthGuard, ApiKeyGuard) şeklinde birden fazla guard eklenebilir.
    getItems() {
        return [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
        ];
    }

    @Get('protected')
    @UseGuards(AuthGuard) // Sadece bu route için AuthGuard'ı kullan. Birden fazla guard eklenebilir.
    getProtectedItems() {
        return [
            { id: 1, name: 'Protected Item 1' },
            { id: 2, name: 'Protected Item 2' },
        ];
    }

    @Get("policy")
    @Policy({
        action: "read",
        resource: "items"
    })
    getPolict() {
        return [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
        ];
    }

}
