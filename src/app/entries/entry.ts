export class Entry {
  _id?: string;
  timestamp: Date;
  status: {
    roof: number;
    tank: number;
    inlet: number;
  }
}
