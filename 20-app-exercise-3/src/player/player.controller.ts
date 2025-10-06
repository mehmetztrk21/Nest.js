import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
    constructor(
        private readonly playerService: PlayerService
    ) { }

    @Get()
    async findAll() {
        return this.playerService.findAll();
    }
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.playerService.findOne(id);
    }
    @Post()
    async create(@Body() body: any) {
        return this.playerService.create(body);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: any) {
        return this.playerService.update(id, body);
    }
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.playerService.delete(id);
    }
    @Get('team/:teamId')
    async findByTeam(@Param('teamId') teamId: string) {
        return this.playerService.findByTeam(teamId);
    }
}
