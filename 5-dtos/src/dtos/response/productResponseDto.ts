import { Expose } from "class-transformer";

export class ProductResponseDto {
    @Expose() //name ve price alanlarının serileştirilmesini sağlar mapping için
    name: string;
    @Expose()
    price: number;
}