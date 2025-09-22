import { Injectable } from "@nestjs/common";
import { MsgHandler } from "./msg";

@Injectable()
export class EmailSender implements MsgHandler {
    handleMessage(msg: string): void {
        console.log(`Handling email message: ${msg}`);
    }
}