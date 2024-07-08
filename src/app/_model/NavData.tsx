// To parse this data:
//
//   import { Convert } from "./file";
//
//   const navData = Convert.toNavData(json);

export interface NavData {
    id:   number;
    name: string;
    link: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toNavData(json: string): NavData[] {
        return JSON.parse(json);
    }

    public static navDataToJson(value: NavData[]): string {
        return JSON.stringify(value);
    }
}
