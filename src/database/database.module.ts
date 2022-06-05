import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TypeOrmConfigService} from './database-config.service';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService,
        }),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule {}
