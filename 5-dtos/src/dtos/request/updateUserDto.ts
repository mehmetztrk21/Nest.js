import { BaseUserRequestDto } from "./baseUserRequestDto";

export class UpdateUserDto extends BaseUserRequestDto {
    id: number;
    hasAccess?: boolean;
}
