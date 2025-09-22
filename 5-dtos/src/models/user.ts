export class IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    hasAccess: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}