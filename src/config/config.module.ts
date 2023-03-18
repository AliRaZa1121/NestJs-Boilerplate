import { Module } from '@nestjs/common';
import DatabaseConfig from './providers/database.provider';
import EnvironmentConfig from './providers/envoirment.provider';
import {
  StorageConfiguration,
  MulterConfiguration,
} from './providers/storage.provider';

@Module({
  imports: [
    DatabaseConfig,
    EnvironmentConfig,
    StorageConfiguration,
    MulterConfiguration,
  ],
  exports: [
    DatabaseConfig,
    EnvironmentConfig,
    StorageConfiguration,
    MulterConfiguration,
  ],
})
export class ConfigurationsModule {}
