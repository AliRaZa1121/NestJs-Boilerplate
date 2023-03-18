import { Injectable, OnModuleInit } from "@nestjs/common";

@Injectable()
export class AppService implements OnModuleInit {
  constructor() {}

  async onModuleInit() {
    // console.log(Math.floor(1000 + Math.random() * 9999))
  }
}
