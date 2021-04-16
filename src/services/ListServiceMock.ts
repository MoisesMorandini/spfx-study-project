import { IColumnsName } from "../webparts/viewListGeneric/components/ViewListGeneric";
import { IFieldInfo } from "@pnp/sp/presets/all";
import IListService from "./IListService";

export interface ISharepointList {
    Title: string;
    Category: string;
}

class ListServiceMock implements IListService {

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

    private static _columnsName: IFieldInfo[] = [
        {
            DefaultFormula: null,
            DefaultValue: null,
            Description: "",
            Direction: "none",
            EnforceUniqueValues: false,
            EntityPropertyName: "Title",
            FieldTypeKind: 2,
            Filterable: true,
            FromBaseType: true,
            Group: "Custom Columns",
            Hidden: false,
            Id: "fa564e0f-0c70-4ab9-b863-0177e6ddd247",
            IndexStatus: 0,
            Indexed: false,
            InternalName: "Title",
            JSLink: "clienttemplates.js",
            PinnedToFiltersPane: false,
            ReadOnlyField: false,
            Required: true,
            Scope: "/sites/Mock/Lists/TestListMock",
            Sealed: false,
            ShowInFiltersPane: 0,
            Sortable: true,
            StaticName: "Title",
            Title: "Title",
            SchemaXml: null,
            TypeAsString: "Text",
            TypeDisplayName: "Single line of text",
            TypeShortDescription: "Single line of text",
            ValidationFormula: null,
            ValidationMessage: null,
        },
        {
            DefaultFormula: null,
            DefaultValue: null,
            Description: "",
            Direction: "none",
            EnforceUniqueValues: false,
            EntityPropertyName: "Category",
            FieldTypeKind: 2,
            Filterable: true,
            FromBaseType: true,
            Group: "Custom Columns",
            Hidden: false,
            Id: "fa564e0f-0c70-4ab9-b863-0177e6ddd247",
            IndexStatus: 0,
            Indexed: false,
            InternalName: "Category",
            JSLink: "clienttemplates.js",
            PinnedToFiltersPane: false,
            ReadOnlyField: false,
            Required: true,
            Scope: "/sites/Mock/Lists/TestListMock",
            Sealed: false,
            ShowInFiltersPane: 0,
            Sortable: true,
            StaticName: "Category",
            Title: "Category",
            SchemaXml: null,
            TypeAsString: "Text",
            TypeDisplayName: "Single line of text",
            TypeShortDescription: "Single line of text",
            ValidationFormula: null,
            ValidationMessage: null,
        }
    ]

    public GetListItems(): Promise<ISharepointList[]> {
        return new Promise<ISharepointList[]>((resolve) => {
            resolve(ListServiceMock._itemsList)
        })
    }

    public GetListFields(): Promise<any[]> {
        return new Promise<IColumnsName[]>((resolve) => {
            resolve(ListServiceMock._columnsName);
        })
    }
}

export default ListServiceMock;
