import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { SmsSender } from './sms';
import { EmailSender } from './email';

@Module({
  providers: [
    {
      provide: 'MSG_HANDLER',
      useValue: [new SmsSender(), new EmailSender()]
    },
    MessageService
  ],
  exports: [MessageService],
})
export class MessageModule { }
