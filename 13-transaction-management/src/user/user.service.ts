import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppDataSource } from 'src/app.module';
import { User } from 'src/entities/user.entity';
import { Profile } from 'src/entities/user_profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    ) { }

    async createUser(userData: any): Promise<User> {
        // Bu şekilde ilişkili işlemler için transaction kullanıyoruz
        //veya app.module e gidip AppdataSource.initialize() yapabiliriz.
        const queryRunner = this.userRepository.manager.connection
            .createQueryBuilder()
            .connection.createQueryRunner();

        try {
            const { email, name, profile } = userData;

            const user = new User();
            user.email = email;
            user.name = name;

            await queryRunner.manager.save(user);

            const newProfile = new Profile();
            newProfile.bio = profile.bio;

            await queryRunner.manager.save(newProfile);

            user.profile = newProfile;

            await queryRunner.manager.save(user);

            await queryRunner.commitTransaction();
            return user;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
    }

    // Repository ile transaction kullanımı. En kolay yöntem.
    async createUserWithRepo(userData: any): Promise<User> {
        const { email, name, profile } = userData;

        return this.userRepository.manager.transaction(async (manager) => {
            const user = new User();
            user.email = email;
            user.name = name;
            await manager.save(user);

            const newProfile = new Profile();
            newProfile.bio = profile.bio;
            await manager.save(newProfile);
            user.profile = newProfile;

            return manager.save(user);
        });
    }

    async createUserNestedTransaction(userData: any): Promise<User> {
        userData = {
            name: 'TEST',
            email: '55jkullanıcı@mail.com',
            profile: {
                bio: '21bio yer alır',
            },
        };

        const queryRunner = this.userRepository.manager.connection
            .createQueryBuilder()
            .connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const { email, name, profile } = userData;

            const user = new User();
            user.name = name;
            user.email = email;

            await queryRunner.manager.save(user);
            //Şunu yapıyor: Profil kaydetmeden önce bir SAVEPOINT oluşturuyor. Yani bir nevi geçici kayıt noktası. Eğer profil kaydetme işlemi başarısız olursa, bu SAVEPOINT'e geri dönülüyor ve kullanıcı kaydı korunmuş oluyor.
            //Profil ekleme işlemi başarısız olursa, kullanıcı kaydı korunur.
            await queryRunner.query('SAVEPOINT profilesavepoint');
            try {
                const newProfile = new Profile();
                newProfile.bio = profile.bio;
                throw new Error('Transaction failed');
                await queryRunner.manager.save(newProfile);

                user.profile = newProfile;
                await queryRunner.manager.save(user);
            } catch (error) {
                // Profil ekleme işlemi başarısız olursa, kullanıcı kaydı korunur.
                await queryRunner.query('ROLLBACK TO SAVEPOINT profilesavepoint');
            }
            await queryRunner.commitTransaction();
            return user;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.log('error', error);
            throw new Error('Transaction failed');
        } finally {
            await queryRunner.release();
        }
    }
}
