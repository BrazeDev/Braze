import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UserEntity } from './util/entities/user.entity';
import { UsersModule } from './users/users.module';
import { ModsModule } from './mods/mods.module';
import { PacksModule } from './packs/packs.module';
import { SolderModule } from './solder/solder.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ModEntity } from './util/entities/mod.entity';
import { ModVersionEntity } from './util/entities/modver.entity';
import { PackEntity } from './util/entities/pack.entity';
import { PackVersionEntity } from './util/entities/packver.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mariadb',
    host: 'localhost',
    port: 3306,
    username: 'braze',
    password: 'qoP3AMxHwG746SntTFLgDMGXWipx1otS',
    database: 'braze',
    entities: [
      ModEntity,
      ModVersionEntity,
      PackEntity,
      PackVersionEntity,
      UserEntity,
    ],
    synchronize: true,
  }),
  ServeStaticModule.forRoot({
    serveRoot: '/repo',
    rootPath: join(__dirname, '..', 'static_repo')
  }),
  UsersModule,
  ModsModule,
  PacksModule,
  SolderModule,
  AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
