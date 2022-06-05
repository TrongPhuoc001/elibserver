import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import compression from 'compression';
import {setupSwagger} from './setup-swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(compression());
    app.setGlobalPrefix('api');
    app.enableCors();

    if (process.env.API_DOCS) {
        setupSwagger(app);
    }

    await app.listen(process.env.PORT || 5000, process.env.HOST || '0.0.0.0');
}
bootstrap();
