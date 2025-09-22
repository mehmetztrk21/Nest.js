import { Inject, Injectable } from '@nestjs/common';
import { MsgHandler } from './msg';

@Injectable()
export class MessageService {
    constructor(@Inject('MSG_HANDLER') private readonly msgHandler: MsgHandler[]) { }

    sendMessage(msg: string): void {
        this.msgHandler.forEach(handler => handler.handleMessage(msg));
    }
}
