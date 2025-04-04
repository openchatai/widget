import type { ExternalStorage } from '../types/external-storage';

export class StorageCtx {
  private storage: ExternalStorage;
  private KEYS = {
    contactToken: 'opencx__widget__contactToken',
    externalContactId: 'opencx__widget__externalContactId',
  };

  constructor({ storage }: { storage: ExternalStorage }) {
    this.storage = storage;
  }

  setContactToken = async (token: string) => {
    await this.storage.set(this.KEYS.contactToken, token);
  };
  getContactToken = async () => {
    return this.storage.get(this.KEYS.contactToken);
  };

  setExternalContactId = async (id: string) => {
    await this.storage.set(this.KEYS.externalContactId, id);
  };
  getExternalContactId = async () => {
    return this.storage.get(this.KEYS.externalContactId);
  };
}
