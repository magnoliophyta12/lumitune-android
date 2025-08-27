export interface Region {
    id: string;
    name: string;
    type: "COUNTRY" | "CITY";
    parentId: string | null;
  }