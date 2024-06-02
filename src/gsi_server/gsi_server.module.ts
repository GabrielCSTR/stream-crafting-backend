import { Module } from '@nestjs/common';
import { GsiServerService } from './gsi_server.service';
import { GsiServerController } from './gsi_server.controller';

@Module({
  controllers: [GsiServerController],
  providers: [GsiServerService],
})
export class GsiServerModule {}
