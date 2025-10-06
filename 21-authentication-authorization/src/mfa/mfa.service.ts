import { Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';
@Injectable()
export class MfaService {

    generateSecret(email: string) {
        const secret = speakeasy.generateSecret({
            name: `MyApp (${email})`,
            issuer: 'MyApp'
        });

        return { secret: secret.base32, otpauthUrl: secret.otpauth_url };
    }

    async generateQrCode(otpauthUrl: string) {
        try {
            return await qrcode.toDataURL(otpauthUrl);
        } catch (err) {
            throw new Error('Failed to generate QR code');
        }
    }

    verifyToken(secret: string, token: string) {
        console.log("Verifying token:", token, "with secret:", secret);
        return speakeasy.totp.verify({
            secret: secret,
            encoding: 'base32',
            token: token,
            window: 1 // Allow a 1-step window for clock drift
        });
    }

}
