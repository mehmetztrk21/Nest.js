import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

@Controller('payment')
export class PaymentController {
  @Get()
  getPayment() {
    return 'This action returns all payment methods';
  }

  @Get(':id')
  getPaymentById(@Param('id') id: number) {
    return `This action returns payment method #${id}`;
  }

  @Post()
  createPayment() {
    return 'This action creates a new payment method';
  }

  @Put(':id')
  updatePayment(@Param('id') id: number) {
    return `This action updates payment method #${id}`;
  }

  @Patch(':id')
  partialUpdatePayment(@Param('id') id: number) {
    return `This action partially updates payment method #${id}`;
  }

  @Delete(':id')
  deletePayment(@Param('id') id: number) {
    return `This action removes payment method #${id}`;
  }
}
