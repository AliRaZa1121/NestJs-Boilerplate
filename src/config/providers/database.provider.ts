import { TypeOrmModule } from "@nestjs/typeorm";

export default TypeOrmModule.forRootAsync({
  useFactory: () => ({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    autoLoadEntities: Boolean(process.env.DB_AUTO_LOAD_ENTITIES),
    synchronize: Boolean(process.env.SYNCHRONIZE),
  }),
});
