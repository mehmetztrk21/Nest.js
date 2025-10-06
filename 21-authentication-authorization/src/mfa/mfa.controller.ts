import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { MfaService } from './mfa.service';

@Controller('mfa')
export class MfaController {
    constructor(
        private readonly mfaService: MfaService
    ) { }

    @Post('generate')
    async generateMfaSecret(@Body() body: { email: string }) {
        const { secret, otpauthUrl } = await this.mfaService.generateSecret(body.email);
        if (!otpauthUrl) {
            throw new Error("Failed to generate otpauthUrl");
        }
        const qrCode = await this.mfaService.generateQrCode(otpauthUrl);
        return { secret, otpauthUrl, qrCode };
    }

    @Post('verify')
    verifyMfaToken(@Body() body: { secret: string, token: string }) {

        const isValid = this.mfaService.verifyToken(body.secret, body.token);
        if (isValid) {
            return { message: "MFA token is valid" };
        } else {
            return { message: "MFA token is invalid" };
        }
    }
}
