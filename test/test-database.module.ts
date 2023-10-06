import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const mongoMemoryServer = await MongoMemoryServer.create();
        const mongoUri = mongoMemoryServer.getUri();

        return {
          uri: mongoUri,
        };
      },
    }),
  ],
})
export class TestDatabaseModule { }
