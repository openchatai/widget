export type Agent = {
  isAi: boolean;
  id: string | null;
  name: string;
  /** Avatar URL or a data URL */
  avatarUrl: string | null;
  /**
   *  Avatar URL or a data URL
   *  @deprecated Use `avatarUrl` instead
   */
  avatar?: string | null;
};
