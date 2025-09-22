import { Injectable } from "@nestjs/common";
import { MsgHandler } from "./msg";

@Injectable()
export class SmsSender implements MsgHandler {
    handleMessage(msg: string): void {
        console.log(`Handling SMS message: ${msg}`);
    }
}