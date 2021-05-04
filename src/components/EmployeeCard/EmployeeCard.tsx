import * as React from 'react';
import { Stack, DocumentCard, Persona, PersonaSize } from 'office-ui-fabric-react';
import styles from './EmployeeCard.module.scss';

export interface EmployeeCardProps {
    name: string;
    date: Date;
    email?: string;
    admission?: React.ReactNode;
}

const EmployeeCard: React.FunctionComponent<EmployeeCardProps> = ({ name, date, email, admission }: EmployeeCardProps): React.ReactElement => {
    const urlSharepoint: string = 'https://m365x704390.sharepoint.com/sites/RH/_layouts/15/userphoto.aspx?size=L&accountname=';
    const employeeDate = new Date(date);
    const employeeMonth: string = (employeeDate.getMonth() > 9 ? employeeDate.getMonth() + 1 : `0${employeeDate.getMonth() + 1}`) as string;
    const employeeDay: string = (employeeDate.getDate() > 9 ? employeeDate.getDate() : `0${employeeDate.getDate()}`) as string;

    return (
        <Stack className={styles.employeeCard}>
            <DocumentCard key={name} className={styles.employeeCard} >
                <Persona className={styles.persona} text={name} showSecondaryText={true} secondaryText={`${employeeMonth}/${employeeDay}`}
                    size={PersonaSize.size48} imageUrl={`${urlSharepoint}${email}`} imageAlt={`${name} photo`} >
                    {admission}
                </Persona>
            </DocumentCard>
        </Stack>
    )
}

export default EmployeeCard;