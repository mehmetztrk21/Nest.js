import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { CreatePlayerDto } from 'src/dtos/create.player.dto';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
    constructor(private readonly playerService: PlayerService) { }

    @Post()
    async createPlayer(@Body() body: CreatePlayerDto) {
        return this.playerService.createPlayer(body);
    }

    @Get()
    async findAllPlayers() {
        return this.playerService.findAllPlayers();
    }

    @Get(':id')
    async findPlayerById(@Param('id') id: number) {
        return this.playerService.findPlayerById(id);
    }

    @Put(':id')
    async updatePlayer(
        @Param('id') id: number,
        @Body() body: { name: string; age: number },
    ) {
        const { name, age } = body;
        return this.playerService.updatePlayer(id, name, age);
    }

    @Delete(':id')
    async deletePlayer(@Param('id') id: number) {
        return this.playerService.deletePlayer(id);
    }
}
