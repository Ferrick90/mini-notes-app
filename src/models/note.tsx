export interface Note {
    id: string;
    name: string;
    text: string;
    date: number;
    folder: string // Notes reference a folder
}