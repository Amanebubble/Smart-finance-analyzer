import type { FinancialRecord, IngestSource } from '../../shared/types';

export interface IngestResult {
  records: FinancialRecord[];
  skipped: number;
  source: IngestSource;
  message: string;
}

const RECORD_LINE = /^(\d{4}-\d{2}-\d{2})\s*;\s*(.+?)\s*;\s*(-?\d+(?:[.,]\d+)?)$/;

export function ingestFromOcrText(text: string, source: IngestSource = 'ocr-ia'): IngestResult {
  const records: FinancialRecord[] = [];
  let skipped = 0;

  for (const line of text.split(/\r?\n/)) {
    const match = line.trim().match(RECORD_LINE);
    if (!match) {
      if (line.trim()) skipped++;
      continue;
    }
    records.push({
      id: `ocr-${records.length + 1}-${Date.now()}`,
      period: match[1],
      description: match[2],
      amount: Number(match[3].replace(',', '.')),
      source,
      createdAt: new Date().toISOString()
    });
  }

  return {
    records,
    skipped,
    source,
    message: `Registros ingestados: ${records.length}${skipped > 0 ? ` · nota: ${skipped} líneas sin formato` : ''}`
  };
}

export function ingestManual(
  rows: Array<Omit<FinancialRecord, 'id' | 'source' | 'createdAt'>>
): FinancialRecord[] {
  return rows.map((row, index) => ({
    ...row,
    id: `manual-${index + 1}-${Date.now()}`,
    source: 'manual' as const,
    createdAt: new Date().toISOString()
  }));
}

export function ingestFromTemplate(parsedRows: string[][]): FinancialRecord[] {
  const records: FinancialRecord[] = [];
  for (let i = 0; i < parsedRows.length; i++) {
    const [period, description, amount] = parsedRows[i];
    if (!period || !description || !amount) continue;
    const numericAmount = Number(amount.replace(',', '.'));
    if (Number.isNaN(numericAmount)) continue;
    records.push({
      id: `template-${i + 1}-${Date.now()}`,
      period,
      description,
      amount: numericAmount,
      source: 'plantilla',
      createdAt: new Date().toISOString()
    });
  }
  return records;
}
