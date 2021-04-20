import { IFieldInfo } from "@pnp/sp/presets/all";
import IListService from './IListService'
import { sp } from '@pnp/sp'

class ListService implements IListService {
    public async GetListFields(listName: string): Promise<IFieldInfo[]> {
        return await sp.web.lists.getByTitle(listName).fields.filter(
            "ReadOnlyField eq false and Hidden eq false and FieldTypeKind ne 12 and FieldTypeKind ne 19 and InternalName ne '_ExtendedDescription'"
        ).select("Title,InternalName,FieldTypeKind").get();
    }

    public async GetListItems(listName: string, fields: IFieldInfo[]): Promise<any[]> {
        const personPickerFields: string[] = this.getFieldsPersonPicker(fields);

        const fieldsNamePrepared: string[] = this.prepareFieldsName(fields);

        return await sp.web.lists.getByTitle(listName).items.select(...fieldsNamePrepared).expand(...personPickerFields).get();
    }

    private getFieldsPersonPicker(fields: IFieldInfo[]): string[] {
        const personPickerFields: string[] = [];
        fields.forEach(field => {
            if (field.FieldTypeKind === 20)
                personPickerFields.push(field.InternalName);
        });
        return personPickerFields;
    }

    private prepareFieldsName(fields: IFieldInfo[]): string[] {
        const preparedFieldsName: string[] = [];
        fields.forEach(field => {
            field.FieldTypeKind === 20 ? preparedFieldsName.push(`${field.InternalName}/Title`) : preparedFieldsName.push(field.InternalName);
        })

        return preparedFieldsName;
    }
}

export default ListService;