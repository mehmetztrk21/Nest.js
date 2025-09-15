import { Module } from '@nestjs/common';
import { CustomconfigService } from './customconfig.service';
import { CUSTOM_CONFIG_PROVIDER } from './customConfig.provider';

@Module({
    providers: [CustomconfigService, CUSTOM_CONFIG_PROVIDER],
    exports: [CustomconfigService],
})
export class CustomconfigModule {}
