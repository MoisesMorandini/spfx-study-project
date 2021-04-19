import { IColumnsName } from "../webparts/viewListGeneric/components/ViewListGeneric";
import { IFieldInfo } from "@pnp/sp/presets/all";
import IListService from "./IListService";


class ListServiceMock implements IListService {

    private static _listItems: any[] = [
        {
            Title: "Avengers",
            Category: "Superhero Movies",
        },
        {
            Title: "The Boys",
            Category: "Superhero Series",
            Director: {
                Title: 'Eric Kripke'
            }
        },
        {
            Title: "Space Jam",
            Category: "Comedy Movie",
            Director: {
                Title: 'Joe Pytka'
            }

        }
    ];

    private static _fields: IFieldInfo[] = [
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
        },
        {
            DefaultFormula: null,
            DefaultValue: null,
            Description: "",
            Direction: "none",
            EnforceUniqueValues: false,
            EntityPropertyName: "Director",
            FieldTypeKind: 20,
            Filterable: true,
            FromBaseType: true,
            Group: "Custom Columns",
            Hidden: false,
            Id: "fa564e0f-0c70-4ab9-b863-0177e6ddd247",
            IndexStatus: 0,
            Indexed: false,
            InternalName: "Director",
            JSLink: "clienttemplates.js",
            PinnedToFiltersPane: false,
            ReadOnlyField: false,
            Required: true,
            Scope: "/sites/Mock/Lists/TestListMock",
            Sealed: false,
            ShowInFiltersPane: 0,
            Sortable: true,
            StaticName: "Director",
            Title: "Director",
            SchemaXml: null,
            TypeAsString: "Text",
            TypeDisplayName: "Single line of text",
            TypeShortDescription: "Single line of text",
            ValidationFormula: null,
            ValidationMessage: null,
        }
    ]

    public GetListItems(listName: string, fields: IFieldInfo[]): Promise<any[]> {
        return new Promise<any[]>((resolve) => {
            resolve(ListServiceMock._listItems)
        })
    }

    public GetListFields(listName: string): Promise<IFieldInfo[]> {
        return new Promise<IFieldInfo[]>((resolve) => {
            resolve(ListServiceMock._fields);
        })
    }
}

export default ListServiceMock;
