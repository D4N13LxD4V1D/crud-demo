<script lang="ts">
    import type { PageServerData } from "./$types";
    import { Table } from "$lib/components";

    export let data: PageServerData;
</script>

<h1>One Twenty Seven</h1>

<h2>Employees</h2>
<Table
    headers={["ID", "Name", "Position", "Salary", "Reports To"]}
    rows={data.employees}
/>
