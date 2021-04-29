import ILibraryService, { IDocumentLibrary } from "./ILibraryService";

export default class LibraryServiceMock implements ILibraryService {
    static _documentLibrary: IDocumentLibrary[] = [
        {
            Title: "Contracts",
            ItemCount: 1
        },
        {
            Title: "Employee",
            ItemCount: 10
        },
        {
            Title: "Folders",
            ItemCount: 123
        },
        {
            Title: "Resumes",
            ItemCount: 0
        },
        {
            Title: "Alinhamento de Itens",
            ItemCount: 123
        },
        {
            Title: "PalavraGrandeJunto",
            ItemCount: 123
        },
        {
            Title: "Folders",
            ItemCount: 123
        },
        {
            Title: "Folders",
            ItemCount: 123
        },
        {
            Title: "Folders",
            ItemCount: 123
        },
        {
            Title: "Folders",
            ItemCount: 123
        },
        {
            Title: "Folders",
            ItemCount: 123
        }
    ]

    GetLibraries(): Promise<IDocumentLibrary[]> {
        return new Promise<IDocumentLibrary[]>((resolve) => {
            resolve(LibraryServiceMock._documentLibrary);
        });
    }
}