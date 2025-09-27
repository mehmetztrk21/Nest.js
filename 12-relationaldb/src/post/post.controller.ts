import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { UpdatePostDto } from 'src/dtos/update.post';
import { CreatePostDto } from 'src/dtos/create.post';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @Get()
    async getAllPosts() {
        return await this.postService.getPosts();
    }

    @Get(':id')
    async getPostById(@Param('id') id: string) {
        return await this.postService.getPostById(id);
    }

    @Post()
    async createPost(@Body() createPostDto: CreatePostDto) {
        return await this.postService.createPost(createPostDto);
    }

    @Put(':id')
    async updatePost(
        @Param('id') id: string,
        @Body() updatePostDto: UpdatePostDto,
    ) {
        return await this.postService.updatePost(id, updatePostDto);
    }

    @Delete(':id')
    async deletePost(@Param('id') id: string) {
        return await this.postService.deletePost(id);
    }
}
