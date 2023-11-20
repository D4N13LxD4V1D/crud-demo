<script lang="ts">
    import type { PageServerData } from "./$types";
    import { Table } from "$lib/components";

    export let data: PageServerData;

    let currentTable = data.tables[0];
</script>

<h1>One Twenty Seven</h1>

<select bind:value={currentTable}>
    {#each data.tables as value}<option {value}>{value}</option>{/each}
</select>
<Table
    table={currentTable}
    headers={data.headers[currentTable]}
    keys={data.keys[currentTable]}
    rows={data.rows[currentTable]}
/>
