import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from 'src/dtos/create.post';
import { UpdatePostDto } from 'src/dtos/update.post';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }

    async createPost(createPostDto: CreatePostDto): Promise<Post> {
        const user = await this.userRepository.findOneBy({
            id: createPostDto.userId,
        });
        if (!user) throw new NotFoundException('User not found');
        const post = this.postRepository.create(createPostDto);
        return await this.postRepository.save(post);
    }

    async getPosts(): Promise<Post[]> {
        return await this.postRepository.find({ relations: ['author'] });
    }

    async getPostById(id: string): Promise<Post> {
        const post = await this.postRepository.findOne({
            where: { id },
            relations: ['author'],
        });
        if (!post) throw new NotFoundException('Post not found');
        return post;
    }

    async updatePost(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
        const user = await this.userRepository.findOneBy({
            id: updatePostDto.userId,
        });
        if (!user) throw new NotFoundException('User not found');
        const post = await this.getPostById(id);
        if (!post) throw new NotFoundException('Post not found');
        await this.postRepository.update(id, updatePostDto);
        return this.getPostById(id);
    }

    async deletePost(id: string): Promise<void> {
        const post = await this.getPostById(id);
        if (!post) throw new NotFoundException('Post not found');
        await this.postRepository.delete(id);
    }
}
