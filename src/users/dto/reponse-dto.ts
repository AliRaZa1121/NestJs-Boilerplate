import { ApiProperty } from "@nestjs/swagger";

export class exampleJsonObjectForService {
  services: [
    {
      name: string;
      rate: number;
    },
    {
      name: string;
      rate: number;
    }
  ];
}
