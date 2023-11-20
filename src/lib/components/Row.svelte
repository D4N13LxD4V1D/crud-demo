<script lang="ts">
    export let table: string;
    export let keys: string[];
    export let row: any;

    let edit = false;

    const toggleEdit = () => {
        edit = !edit;
    };

    const onSubmit = (e: SubmitEvent) => {
        toggleEdit();
        e.preventDefault();
    };
</script>

{#if edit}
    <form class="tr" method="POST" action="?/update">
        <input type="hidden" name="table" value={table} />
        <input type="hidden" name="id" value={row[table + "_ID"]} />
        {#each keys as key}
            <span class="td">
                <input type="text" name={key} value={row[key]} />
            </span>
        {/each}
        <span class="td">
            <button type="submit" on:submit={onSubmit}>Save</button>
            <button type="button" on:click={toggleEdit}>Cancel</button>
        </span>
    </form>
{:else}
    <div class="tr">
        {#each keys as key}
            <span class="td">{row[key]}</span>
        {/each}
        <form class="td" method="POST" action="?/delete">
            <input type="hidden" name="table" value={table} />
            <input type="hidden" name="id" value={row[table + "_ID"]} />
            <button on:click={toggleEdit}>Edit</button>
            <button type="submit">Delete</button>
        </form>
    </div>
{/if}

<style>
    .tr {
        display: table-row;
    }

    .td {
        display: table-cell;
        padding: 0.5rem;
    }
</style>
