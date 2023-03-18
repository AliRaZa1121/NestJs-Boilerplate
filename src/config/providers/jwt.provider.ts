import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

export const JwtConfig = JwtModule.register({
  secret: "topSecret51",
  signOptions: {
    expiresIn: "365d",
  },
});
export const PassportConfig = PassportModule.register({
  defaultStrategy: "jwt",
});
export default { JwtConfig, PassportConfig };
