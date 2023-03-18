
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

export enum UserStatus {
  ACTIVE = "ACTIVE",
  DE_ACTIVATED = "DE_ACTIVATED",
  PENDING = "PENDING",
}

export enum InputTypesInDocument {
  TEXT = "text",
  SIGNATURE = "signature",
  SIGNATURE_SIGNED_DATE = "signed-date",
  CHECKBOX = "checkbox",
  RADIO = "radiobtn",
  DATE_PICKER = "datepicker",
  DROP_DOWN = "dropdown",
  NUMBER = "number",
  TIME = "time",
  PARAGRAPH = "paragraph",
  NAME = "name",
  COMPANY = "company",
  EMAIL = "email",
}

export enum TemplateRelations {
  "media" = "media",
  "user_id" = "user_id",
  "template_images" = "template_images",
  "template_details" = "template_details",
  "template_images.media" = "template_images.media",
}

export enum ActionsTypesForGuestRoutes {
  CREATE_ENVELOPE = "CREATE_ENVELOPE",
  CLONE_ENVELOPE = "CLONE_ENVELOPE",
  UPDATE_ENVELOPE = "UPDATE_ENVELOPE",
}
