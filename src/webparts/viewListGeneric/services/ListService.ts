import { IFieldInfo, IList, SPRest } from "@pnp/sp/presets/all";

class ListService {
    public async getList(sp: SPRest, listName: string): Promise<IList> {
        return await sp.web.lists.getByTitle(listName);
    }

    public async getListItems(list: IList, fields: IFieldInfo[]): Promise<any[]> {
        const personPickerFields: string[] = this.getFieldsPersonPicker(fields);

        const fieldsNamePrepared: string[] = this.prepareFieldsName(fields);

        return await list.items.select(...fieldsNamePrepared).expand(...personPickerFields).get();
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

    public async getColumnsName(list: IList): Promise<IFieldInfo[]> {
        return await list.fields.filter(
            "ReadOnlyField eq false and Hidden eq false and FieldTypeKind ne 12 and FieldTypeKind ne 19 and InternalName ne '_ExtendedDescription'"
        ).select("Title,InternalName,FieldTypeKind").get();
    }
}

export default ListService;