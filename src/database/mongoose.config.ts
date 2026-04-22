import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

let cachedConnection: any = null;

export const mongooseConfig: MongooseModuleAsyncOptions = {
  useFactory: (configService: ConfigService) => ({
    uri: configService.get<string>('MONGODB_URI'),
    connectionFactory: (connection: any) => {
      if (cachedConnection) {
        return cachedConnection;
      }
      cachedConnection = connection;
      return connection;
    },
  }),
  inject: [ConfigService],
};
