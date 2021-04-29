import ILibraryService, { IDocumentLibrary } from "./ILibraryService";
import { sp } from '@pnp/sp/presets/all';

export default class LibraryService implements ILibraryService {
    async GetLibraries(): Promise<IDocumentLibrary[]> {
        return await sp.web.lists.filter("BaseTemplate eq 101 and Hidden eq false").select("Title,ItemCount").get();
    }
}