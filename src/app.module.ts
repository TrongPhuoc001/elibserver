import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {BookModule} from './book/book.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from './auth/auth.module';
import {GenresModule} from './genres/genres.module';
import {AuthorModule} from './author/author.module';
import {BookShelfModule} from './book-shelf/book-shelf.module';
import {WaitingListModule} from './waiting-list/waiting-list.module';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            port: 5432,
            host: process.env.DB_HOST,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            autoLoadEntities: true,
            synchronize: true,
        }),
        UserModule,
        BookModule,
        AuthModule,
        GenresModule,
        AuthorModule,
        BookShelfModule,
        WaitingListModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
