export interface RequestData {
  data: {
    map_name: string;
    weapons: {
      Kill: string[];
      T: { Allowed: string[]; Forbidden: string[] };
      CT: { Allowed: string[]; Forbidden: string[] };
    };
    classes: {
      Kill: string[];
      T: { Allowed: string[]; Forbidden: string[] };
      CT: { Allowed: string[]; Forbidden: string[] };
    };
    positions: { CT: string[]; T: string[] };
    use_weapons_classes: { CT: string; T: string; Kill: string };
    times: { start: number; end: number };
  };
  performScan: boolean;
}
