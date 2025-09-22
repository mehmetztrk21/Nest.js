import { Injectable } from "@nestjs/common";

/*
1. Singleton (Varsayılan) – Cache / Config Servisi

Gerçek hayatta:

Uygulama genelinde aynı kalacak bir yapı kullanmak istediğinde işine yarar.

Örn: ConfigService, CacheService

@Injectable()
export class ConfigService {
  private readonly settings = {
    apiKey: '123456',
    dbConnection: 'postgres://...',
  };

  get(key: string) {
    return this.settings[key];
  }
}

--------------

2. Request Scope – Kullanıcıya Özel Trace/Logger

Gerçek hayatta:

Her HTTP isteğine özel context taşıman gerektiğinde kullanılır.

Örn: Her request için traceId üretip loglara eklemek.

@Injectable({ scope: Scope.REQUEST })
export class RequestLogger {
  private readonly traceId: string;

  constructor() {
    this.traceId = crypto.randomUUID();
  }

  log(message: string) {
    console.log(`[${this.traceId}] ${message}`);
  }
}

--------------

3. Transient Scope – İşlem Bazlı Servis

Gerçek hayatta:

Servisin her kullanımda tamamen ayrı bir bağımsız nesne olması gerektiğinde işine yarar.

Örn: Dinamik olarak farklı kullanıcıya mail göndermek veya background job çalıştırmak.

@Injectable({ scope: Scope.TRANSIENT })
export class MailService {
  constructor() {
    console.log('Yeni MailService instance');
  }

  sendMail(to: string, subject: string) {
    console.log(`Mail sent to ${to}: ${subject}`);
  }
}

@Controller('users')
export class UsersController {
  constructor(private readonly moduleRef: ModuleRef) {}

  @Post(':id/notify')
  async notify(@Param('id') id: string) {
    const mailer = await this.moduleRef.resolve(MailService, { strict: false });
    mailer.sendMail('user@example.com', 'Welcome!');
  }
}




*/


@Injectable() //default olarak singletondır. Yani uygulama boyunca tek bir instance'ı olur. Belleği yönetimi açısından faydalıdır.
// Eğer her kullanımda yeni bir instance istenirse @Injectable({scope: Scope.TRANSIENT}) şeklinde tanımlanabilir. 
// Scope.REQUEST ise her http requestte yeni bir instance oluşturur.
// Ancak bu iki kullanım belleği daha fazla kullanır.
//@Injectable({scope: Scope.TRANSIENT})
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