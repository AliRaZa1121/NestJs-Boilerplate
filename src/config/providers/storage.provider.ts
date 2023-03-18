import { MulterModule } from "@nestjs/platform-express";
import { ServeStaticModule } from "@nestjs/serve-static";
import path, { join } from "path";

export const StorageConfiguration = ServeStaticModule.forRoot({
  rootPath: join(__dirname, "..", "public"),
  serveRoot: "/",
});

export const MulterConfiguration = MulterModule.register({
  dest: "./public/storage",
});
