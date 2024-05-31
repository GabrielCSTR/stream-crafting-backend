import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiResponse({
    status: 201,
    description: 'The record has been return status machine.',
  })
  @Get('/status/health')
  healthCheck(): string {
    return this.appService.getStatus();
  }
}
