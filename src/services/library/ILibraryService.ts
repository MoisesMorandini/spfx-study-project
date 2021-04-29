import { IListInfo } from "@pnp/sp/presets/all";

export interface IDocumentLibrary {
    Title: string,
    ItemCount: number,
}

export default interface ILibraryService {
    GetLibraries(): Promise<IDocumentLibrary[]>;
}