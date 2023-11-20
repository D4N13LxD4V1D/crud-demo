import * as db from '$lib/server/database';
import type { PageServerLoad, Actions } from './$types';

const tables: string[] = ["Employee", "Client", "Contract", "Timeline", "Team", "Project", "Software", "Team_Software"];

const headers: Record<string, string[]> = {
    "Employee": [
        "ID",
        "Name",
        "Position",
        "Salary",
        "Reports To",
    ],
    "Client": [
        "ID",
        "Company Name",
        "Company Representative",
        "Address",
        "Contact Number",
        "Email",
    ], "Contract": [
        "ID",
        "Development Duration",
        "Maintenance Years",
        "Fully Paid",
        "Client ID",
    ], "Timeline": [
        "ID",
        "Start Date",
        "Expected Finish Date",
        "Finish Date",
        "Days Left",
    ], "Team": [
        "ID",
        "Name",
        "Team Leader",
    ], "Project": [
        "ID",
        "Name",
        "Description",
        "Type",
        "Budget",
        "Status",
        "Timeline ID",
        "Team ID",
        "Contract ID",
    ], "Software": [
        "Name",
        "Version",
        "Type",
        "OS",
        "Size",
        "Publisher",
        "License",
    ], "Team_Software": [
        "Team ID",
        "Software Name",
        "Software Version",
    ]
};

const keys: Record<string, string[]> = {
    "Employee": [
        "Employee_ID",
        "Employee_Name",
        "Employee_Position",
        "Employee_Salary",
        "Employee_ReportsTo",
    ], "Client": [
        "Client_ID",
        "Client_CompanyName",
        "Client_CompanyRep",
        "Client_Address",
        "Client_Contact",
        "Client_Email",
    ], "Contract": [
        "Contract_ID",
        "Contract_DevelopmentDuration",
        "Contract_MaintenanceYears",
        "Contract_FullyPaid",
        "Contract_Client_ID",
    ], "Timeline": [
        "Timeline_ID",
        "Timeline_StartDate",
        "Timeline_ExpectedFinishDate",
        "Timeline_FinishDate",
        "Timeline_DaysLeft",
    ], "Team": [
        "Team_ID",
        "Team_Name",
        "Team_Leader_ID",
    ], "Project": [
        "Project_ID",
        "Project_Name",
        "Project_Description",
        "Project_Type",
        "Project_Budget",
        "Project_Status",
        "Project_Timeline_ID",
        "Project_Team_ID",
        "Project_Contract_ID",
    ], "Software": [
        "Software_Name",
        "Software_Version",
        "Software_Type",
        "Software_OS",
        "Software_Size",
        "Software_Publisher",
        "Software_License",
    ], "Team_Software": [
        "Team_ID",
        "Software_Name",
        "Software_Version",
    ]
};

export const load: PageServerLoad = async ({ fetch, params }) => {
    const rows: Record<string, any[]> = {};
    for (const table of tables)
        rows[table] = await db.get(table);

    return {
        tables: tables,
        keys: keys,
        headers: headers,
        rows: rows,
    };
};

export const actions: Actions = {
    update: async ({ cookies, request }) => {
        const formData = await request.formData();
        const table = formData.get("table") as string;
        const id = formData.get("id") as string;
        const keys = formData.keys();
        keys.next();
        keys.next();

        const values = formData.values();
        values.next();
        values.next();

        await db.update(table, id, keys, values);
        return { success: true };
    },
    delete: async ({ cookies, request }) => {
        const formData = await request.formData();
        const table = formData.get("table") as string;
        const id = formData.get("id") as string;

        await db.remove(table, id);
        return { success: true };
    },
    insert: async ({ cookies, request }) => {
        const formData = await request.formData();
        const table = formData.get("table") as string;
        const data = formData.values();
        data.next();

        await db.insert(table, data);
        return { success: true };
    },
};