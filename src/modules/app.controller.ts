import { PrometheusController } from '@willsoto/nestjs-prometheus';
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { Public } from './auth/decorators/public.decorator';

@Controller()
export class MyPrometheusController extends PrometheusController {
  @Public()
  @Get()
  async index(@Res() response: Response) {
    await super.index(response);
  }
}
