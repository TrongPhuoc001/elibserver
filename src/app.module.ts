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
import {DatabaseModule} from './database/database.module';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        DatabaseModule,
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
