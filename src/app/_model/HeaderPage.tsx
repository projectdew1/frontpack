// To parse this data:
//
//   import { Convert } from "./file";
//
//   const headerPage = Convert.toHeaderPage(json);

export interface HeaderPage {
    id:         string;
    name:       string;
    enID:       string;
    localImage: string;
    fileImage:  string;
    items:      number;
    product:    number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toHeaderPage(json: string): HeaderPage[] {
        return JSON.parse(json);
    }

    public static headerPageToJson(value: HeaderPage[]): string {
        return JSON.stringify(value);
    }
}
