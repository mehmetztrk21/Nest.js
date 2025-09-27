import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/create.user.dto';
import { UpdateUserDto } from 'src/dtos/update.user.dto';
import { User } from 'src/entities/user.entity';
import { Profile } from 'src/entities/user_profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { name, email, profile } = createUserDto;
        const newProfile = this.profileRepository.create(profile);
        await this.profileRepository.save(newProfile);

        const newUser = this.userRepository.create({
            name,
            email,
            profile: newProfile,
        });
        return await this.userRepository.save(newUser);
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['profile'],
        });
        if (!user) {
            throw new Error('User not found');
        }

        const { name, email, profile } = updateUserDto;

        if (name) user.name = name;
        if (email) user.email = email;
        if (profile) {
            user.profile = { ...user.profile, ...profile };
            await this.profileRepository.save(user.profile);
        }

        return await this.userRepository.save(user);
    }

    async remove(id: string): Promise<void> {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['profile'],
        });
        if (!user) {
            throw new Error('User not found');
        }
        await this.userRepository.remove(user);
        if (user.profile) {
            await this.profileRepository.remove(user.profile);
        }
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find({ relations: ['profile', 'posts'] });
    }
    async findOne(id: string): Promise<User> {
        //aşağıdaki gibi yazarsak N+1 problemine gireriz. Çünkü her user için ayrı ayrı profile sorgusu atar.
        // const user = await this.userRepository.findOne({
        //     where: { id },
        //     relations: [],
        // });
        // if (!user) throw new NotFoundException('User not found');
        // const profile = await user.profile; //lazy:true ile user sorgulandığında profile gelmez. profile'a ihtiyaç olduğunda user.profile.then() ile getirilir.
        // return {
        //     ...user,
        //     profile,
        // };
        return this.solvePlus1Problem(id);
    }

    async solvePlus1Problem(id: string): Promise<User> {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.profile', 'profile')
            .leftJoinAndSelect('user.posts', 'posts')
            .where('user.id = :id', { id })
            .getOne();
        if (!user) throw new NotFoundException('User not found');

        // Ensure profile is properly structured in the response
        const { __profile__, ...rest } = user as any;
        return {
            ...rest,
            profile: __profile__,
        };
    }
}
