import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { FileHelperModule } from './file-helper/file-helper.module';
import { SummarizeModule } from './summarize/summarize.module';
import { UsersModule } from './users/users.module';

@Global()
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => {
        return {
          type: 'sqlite',
          database: './data/db.sql',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
          logging: true,
        };
      },
    }),
    UsersModule,
    AuthModule,
    SummarizeModule,
    FileHelperModule,
  ],
})
export class AppModule {}
