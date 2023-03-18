import { ConfigModule } from "@nestjs/config";
export default ConfigModule.forRoot({
  isGlobal: true, // no need to import into other modules
  cache: true,
  load: [],
  envFilePath: `${process.cwd()}/${process.env.NODE_ENV}.env`,
});
