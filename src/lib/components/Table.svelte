<script lang="ts">
    import Row from "./Row.svelte";

    export let table: string;
    export let headers: string[];
    export let keys: string[];
    export let rows: any[];
</script>

<div class="table">
    <div class="tr">
        {#each headers as header}
            <span class="td">{header}</span>
        {/each}
        <span class="td">Actions</span>
    </div>
    {#each rows as row}
        <Row {table} {keys} {row} />
    {/each}
    <form class="tr" method="POST" action="?/insert">
        <input type="hidden" name="table" value={table} />
        {#each keys as key}
            <span class="td">
                <input type="text" name={key} />
            </span>
        {/each}
        <span class="td">
            <button type="submit">Add</button>
        </span>
    </form>
</div>

<style>
    .table {
        display: table;
        width: 100%;
    }

    .tr {
        display: table-row;
    }

    .td {
        display: table-cell;
        padding: 0.5rem;
    }
</style>
