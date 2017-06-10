export class Entry {
  _id?: string;
  timestamp: string;
  status: {
    roof: number;
    tank: number;
    inlet: number;
  }
}
