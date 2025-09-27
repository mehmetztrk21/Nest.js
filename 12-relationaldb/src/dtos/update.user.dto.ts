export class UpdateUserDto {
    name?: string;
    email?: string;
    profile?: {
        bio?: string;
        phone?: string;
    };
}
