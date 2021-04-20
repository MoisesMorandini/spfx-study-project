import { IFieldInfo } from "@pnp/sp/presets/all";

export default interface IListInterface {
    /**
     * 
     * @param listName Sharepoint List Name
     * 
     * @param fields Fields of list
     */
    GetListItems(listName: string, fields: IFieldInfo[]): Promise<any[]>


    /**
     * 
     * @param listName Sharepoint List Name
     */
    GetListFields(listName: string): Promise<IFieldInfo[]>;
}