import { classToPlain, instanceToPlain } from 'class-transformer';
import { BaseEntity } from 'typeorm';

export abstract class BaseModel extends BaseEntity {
  created_at;
  updated_at;
  deleted_at;

  public Fill(obj: any): any {
    const restrictedFields = this._GetRestrictedFields();

    //Todo:it will be discussed
    let keys: string[] = Object.keys(obj);
    for (let i = 0; i < restrictedFields.length; i++) {
      if (keys.includes(restrictedFields[i])) {
        delete obj[restrictedFields[i]];
      }
    }
    keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] in this && (obj[keys[i]] || obj[keys[i]] === 0)) {
        this[keys[i]] = obj[keys[i]];
      }
    }
    return this;
  }

  protected _GetRestrictedFields(): string[] {
    return ['id'];
  }

  toJSON() {
    return instanceToPlain(this);
  }
}
