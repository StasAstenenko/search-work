export interface HistogramResponse {
  histogram: Histogram;
  __CLASS__?: string;
}

export interface Histogram {
  histogram: Record<string, number>;
}
