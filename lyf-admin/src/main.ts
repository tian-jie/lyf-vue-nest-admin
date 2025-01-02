import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor.ts';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggerService } from './modules/shared/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 判断环境变量是否为开发环境
  if (process.env.NODE_ENV === 'development') {
    app.enableCors({
      origin: process.env.CORS_ORIGIN, // 允许的前端地址
      credentials: true // 允许携带 Cookie 或认证信息
    });
    console.log('CORS enabled for development');
  }

  // api前缀
  app.setGlobalPrefix('api');

  // 全局注册，统一响应格式
  app.useGlobalInterceptors(new ResponseInterceptor(new Reflector()));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 原始类型的转换，如string转化为number
      whitelist: true // 不会接受dto定义以外的属性
      // forbidNonWhitelisted: true, // 如果传入dto定义以外的属性，服务端则会报400错
    })
  );

  // execption，报错过滤器
  app.useGlobalFilters(new HttpExceptionFilter(new LoggerService()));

  // 跨域
  app.enableCors();

  // swagger文档
  const config = new DocumentBuilder()
    .setTitle('lyf-admin')
    .setDescription('lyf-admin接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  if (process.env.NODE_ENV === 'development') {
    SwaggerModule.setup('swagger', app, document);
  }

  await app.listen(process.env.APP_SERVICE_PORT ?? 3000);
}
bootstrap();
