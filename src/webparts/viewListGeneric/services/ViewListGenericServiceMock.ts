import { IColumnsName } from "../components/ViewListGeneric";

export interface ISharepointList {
    Title: string;
    Category: string;
}

class ViewListGenericServiceMock {
    private static _itemsList: ISharepointList[] = [
        {
            Title: "Avengers",
            Category: "Superhero Movie",
        },
        {
            Title: "Justice League",
            Category: "Superhero Movie"
        },
        {
            Title: "The Boys",
            Category: "Superhero Serie"
        }
    ];

    private static _columnsName: IColumnsName[] = [
        {
            Title: "Title",
            InternalName: "Title",
        },
        {
            Title: "Title",
            InternalName: "Title",
        },
        {
            Title: "Title",
            InternalName: "Title",
        }
    ]


    public GetListItems(): Promise<ISharepointList[]> {
        return new Promise<ISharepointList[]>((resolve) => {
            resolve(ViewListGenericServiceMock._itemsList)
        })
    }

    public GetColumnsName(): Promise<IColumnsName[]> {
        return new Promise<IColumnsName[]>((resolve) => {
            resolve(ViewListGenericServiceMock._columnsName);
        })
    }
}

export default ViewListGenericServiceMock;
