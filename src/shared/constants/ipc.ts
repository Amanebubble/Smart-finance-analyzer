export const IPC_CHANNELS = {
  APP_PING: 'app:ping',
  APP_GET_VERSION: 'app:get-version',
  DIALOG_OPEN_FILE: 'dialog:open-file'
} as const;

export type IpcChannel = (typeof IPC_CHANNELS)[keyof typeof IPC_CHANNELS];
