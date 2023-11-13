<script lang="ts">
    export let headers: string[];
    export let rows: any;
</script>

<div class="table">
    <div class="tr">
        {#each headers as header}
            <span class="td">{header}</span>
        {/each}
        <span class="td">Actions</span>
    </div>
    {#each rows as row}
        <div class="tr">
            {#each row as cell}
                <span class="td">{cell}</span>
            {/each}
            <span class="td">
                <button
                    on:click={() => {
                        console.log(row);
                    }}
                >
                    Edit
                </button>
                <button
                    on:click={() => {
                        console.log(row);
                    }}
                >
                    Delete
                </button></span
            >
        </div>
    {/each}
    <form class="tr" on:submit|preventDefault={() => {}}>
        {#each headers as header}
            <span class="td">
                <input type="text" placeholder={header} />
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
