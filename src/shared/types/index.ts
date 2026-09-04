export type IngestSource = 'ocr-ia' | 'manual' | 'plantilla';

export interface FinancialRecord {
  id: string;
  period: string;
  description: string;
  amount: number;
  account?: string;
  source: IngestSource;
  createdAt: string;
}

export type ComparisonType = 'MoM' | 'YoY';

export interface PeriodComparison {
  current: number;
  previous: number;
  difference: number;
  growthRate: number;
  comparisonType: ComparisonType;
}

export type ReportFormat = 'pdf' | 'excel';

export interface ReportRequest {
  format: ReportFormat;
  period: string;
  data: FinancialRecord[];
}
