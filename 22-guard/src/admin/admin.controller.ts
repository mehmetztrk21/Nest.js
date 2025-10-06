import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthAndRole } from 'src/authAndRoleGuard/authAndRoleGuard';
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
    // @Roles('admin') // Sadece 'admin' rolüne sahip kullanıcılar erişebilir
    @AuthAndRole('manager') // AuthGuard ve RolesGuard birlikte kullanılır. Bu şekilde guard ları  birlikte kullanabiliriz tek tek controller veya method üzerinde.
    getAdminSettings() {
        return { message: 'Admin Settings Page' };
    }
}
