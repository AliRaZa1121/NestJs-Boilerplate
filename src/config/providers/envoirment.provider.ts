import { ConfigModule } from "@nestjs/config";
export default ConfigModule.forRoot({
  cache: true, // no need to import into other modules
  envFilePath: `${process.cwd()}/${process.env.NODE_ENV}.env`,
  // load: [MAIL_ENV],
  isGlobal: true,
});
