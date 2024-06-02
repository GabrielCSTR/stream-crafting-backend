import { Injectable } from '@nestjs/common';
import { DOTA2GSI } from 'dotagsi';

@Injectable()
export class GsiServerService {
  private readonly GSI: DOTA2GSI;
  constructor() {
    this.GSI = new DOTA2GSI();
    this.GSI.on('data', (dota2) => this.handleGSIDOTA(dota2));
  }
  processDOTAGSIData(data: DOTA2GSI, token: string) {
    const requestData = JSON.stringify(data);
    const newdata = requestData
      .toString()
      .replace(/"(player|owner)":([ ]*)([0-9]+)/gm, '"$1": "$3"')
      .replace(/(player|owner):([ ]*)([0-9]+)/gm, '"$1": "$3"');

    const gsiData = JSON.parse(newdata);
    this.GSI.digest(gsiData);
    console.log('TOKEN', token);
  }

  handleGSIDOTA(data) {
    const draftData: DOTA2GSI = data?.draft; // get only draft
    console.log('BODY', draftData);
  }
}
