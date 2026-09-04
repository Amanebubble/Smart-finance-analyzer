import { app, dialog, ipcMain } from 'electron';
import type { FileFilter } from 'electron';
import { IPC_CHANNELS } from '../shared/constants/ipc';

export function registerIpcHandlers(): void {
  ipcMain.handle(IPC_CHANNELS.APP_PING, () => 'pong');

  ipcMain.handle(IPC_CHANNELS.APP_GET_VERSION, () => app.getVersion());

  ipcMain.handle(IPC_CHANNELS.DIALOG_OPEN_FILE, async (_event, filters?: FileFilter[]) => {
    const result = await dialog.showOpenDialog({
      title: 'Seleccionar documento financiero',
      properties: ['openFile'],
      filters
    });
    return result.canceled ? [] : result.filePaths;
  });
}
