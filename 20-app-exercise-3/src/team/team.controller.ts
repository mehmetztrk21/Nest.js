import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
    constructor(
        private readonly teamService: TeamService
    ) { }

    @Get()
    async findAll() {
        return this.teamService.findAll();
    }
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.teamService.findOne(id);
    }
    @Post()
    async create(@Body() body: any) {
        return this.teamService.create(body);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: any) {
        return this.teamService.update(id, body);
    }
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.teamService.delete(id);
    }
}
