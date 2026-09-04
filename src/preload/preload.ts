import { contextBridge, ipcRenderer } from 'electron';
import type { FileFilter } from 'electron';
import { IPC_CHANNELS } from '../shared/constants/ipc';
import type { SfaApi } from '../shared/types/api';

const api: SfaApi = {
  ping: () => ipcRenderer.invoke(IPC_CHANNELS.APP_PING),
  getAppVersion: () => ipcRenderer.invoke(IPC_CHANNELS.APP_GET_VERSION),
  openFileDialog: (filters?: FileFilter[]) =>
    ipcRenderer.invoke(IPC_CHANNELS.DIALOG_OPEN_FILE, filters)
};

contextBridge.exposeInMainWorld('sfaApi', api);
