import { Body, Controller, Post, Req } from '@nestjs/common';
import { GsiServerService } from './gsi_server.service';
import { DOTA2GSI } from 'dotagsi';

@Controller('gsi-server')
export class GsiServerController {
  constructor(private readonly gsiServerService: GsiServerService) {}

  @Post()
  processGSIData(@Body() data: DOTA2GSI, @Req() req): void {
    const token = req.body.auth.token as string;
    this.gsiServerService.processDOTAGSIData(data, token);
    return;
  }
}
