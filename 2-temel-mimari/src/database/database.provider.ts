import { Injectable } from "@nestjs/common";

@Injectable()
export class DatabaseService {
    constructor(private readonly connectionString: string) {
        console.log('Database connected with connection string:', this.connectionString);
    }

    connect() {
        console.log("Sql bağlantısı kuruldu:", this.connectionString);
    }
}

export const DATABASE_PROVIDER = {
    provide: 'DATABASE_CONNECTION',
    useFactory: () => { //dinamic olarak instance oluşturmak için useFactory kullanılır.
        const connectionString = process.env.MODE == 'development' ? 'your-development-database-connection-string' : 'your-production-database-connection-string';
        return new DatabaseService(connectionString);
    }
};