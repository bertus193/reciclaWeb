import { Position } from "./position";

export interface StoragePoint {
    id: number;
    name: string;
    storages: Storage[];
    position: Position;
}