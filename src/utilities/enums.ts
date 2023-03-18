export enum MediaType {
  FILE = "FILE",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
}

export enum RefreshTokenStatus {
  ALIVE = "ALIVE",
  EXPIRED = "EXPIRED",
}

export enum RefreshTokenType {
  OTP = "OTP",
  UUID = "UUID",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  DE_ACTIVATED = "DE_ACTIVATED",
  PENDING = "PENDING",
}

export enum BatchStatus {
  ACTIVE = "ACTIVE",
  TERMINATED = "TERMINATED",
  COMPLETED = "COMPLETED",
}

export enum BatchStudentStatus {
  ACTIVE = "ACTIVE",
  DE_ACTIVATED = "DE_ACTIVATED",
}
