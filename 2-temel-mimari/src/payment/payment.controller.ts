import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Req,
  Res,
  UseFilters,
} from '@nestjs/common';
import type { Request, Response } from 'express'; //type import ederken type anahtar kelimesini kullanıyoruz
import { CustomExceptionFilter } from 'src/utils/customExceptionFilter';

@Controller('payment')
@UseFilters(CustomExceptionFilter) //bu controllerdaki tüm route'larda bu filter'ı kullan
export class PaymentController {
  @Get()
  getPayment(@Req() req: Request, @Res() res: Response) {
    console.log(req.headers, req.ip);
    return res
      .status(200)
      .json({ message: 'This action returns all payment methods' });
  }

  @Get(':id')
  @HttpCode(202) // bu şekilde de status kodu belirleyebiliriz
  getPaymentById(@Param('id') id: number) {
    return `This action returns payment method #${id}`;
  }

  @Post()
  createPayment() {
    return 'This action creates a new payment method';
  }

  @Put(':id')
  updatePayment(@Param('id') id: number, @Res() res: Response) {
    if (id == 1) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Payment method not found',
      });
    }
    if (id == 2) {
      throw new HttpException('Hata alındı', HttpStatus.BAD_REQUEST);
    }
    return res.status(200).json({
      statusCode: 200,
      message: `Payment method #${id} updated successfully`,
    });
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
