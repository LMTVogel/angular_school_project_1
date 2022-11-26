import { Band } from "./band.model";

export interface Artist {
    id: number;
    name: string;
    bands: Band[];
}