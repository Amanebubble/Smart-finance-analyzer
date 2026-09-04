import type { ReportRequest } from '../../shared/types';

export interface ExportResult {
  success: boolean;
  path: string | null;
}

export async function exportToPdf(request: ReportRequest): Promise<ExportResult> {
  void request;
  return { success: false, path: null };
}

export async function exportToExcel(request: ReportRequest): Promise<ExportResult> {
  void request;
  return { success: false, path: null };
}
