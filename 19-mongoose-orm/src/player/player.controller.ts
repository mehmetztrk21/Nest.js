import {
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Body,
} from '@nestjs/common';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
    constructor(private readonly playerService: PlayerService) { }

    @Get()
    async findAll() {
        return this.playerService.findAll();
    }
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.playerService.findOne(id);
    }
    @Post()
    async create(@Body() body: { name: string; age: number }) {
        return this.playerService.create(body.name, body.age);
    }
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.playerService.delete(id);
    }
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() body: { name: string; age: number },
    ) {
        return this.playerService.update(id, body.name, body.age);
    }
}
