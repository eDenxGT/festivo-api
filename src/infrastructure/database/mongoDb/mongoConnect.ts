import mongoose from 'mongoose';
import envConfig from '../../../shared/config';
import logger from '../../../shared/utils/logger';

export class MongoConnect {
  private _dbUri: string;

  constructor() {
    this._dbUri = envConfig.database.URI;
  }

  async connectDb(): Promise<void> {
    try {
      await mongoose.connect(this._dbUri);

      logger.success('MongoDB Connected');

      mongoose.connection.on('disconnected', () => {
        logger.log('MongoDB Disconnected');
      });
    } catch (error) {
      logger.error('Error connecting to MongoDB:', error);
      process.exit(1);
    }
  }
  public async disconnectDb(): Promise<void> {
    try {
      await mongoose.connection.close();
      logger.log('MongoDB Disconnected');
    } catch (err) {
      logger.error('Error Disconnecting MongoDB:', err);
    }
  }
}
