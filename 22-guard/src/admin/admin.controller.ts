import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('admin')
@UseGuards(RolesGuard)
export class AdminController {

    @Get("dashboard")
    @Roles('admin', 'manager') // 'admin' veya 'manager' rolüne sahip kullanıcılar erişebilir
    getAdminDashboard() {
        return { message: 'Welcome to the Admin Dashboard' };
    }

    @Get("settings")
    @Roles('admin') // Sadece 'admin' rolüne sahip kullanıcılar erişebilir
    getAdminSettings() {
        return { message: 'Admin Settings Page' };
    }
}
