<script>
    import Support from "./Support.svelte";
    import { Twitter as TwitterIcon } from "@icons-pack/svelte-simple-icons";
</script>

<footer class="columns is-multiline mb-2 mx-0 is-centered is-vcentered">
    <div class="column is-full"><hr /></div>
    <div class="column py-0 is-3-tablet is-2-desktop is-flex is-justify-content-center">
        <a alt="twitter link" class="is-flex twitter" href="https://twitter.com/Link_69">
            <div class="logo"><TwitterIcon color="#3db2ff" /></div>
            <div>Link_69</div>
        </a>
    </div>
    <div class="column py-0 is-4-tablet is-3-desktop is-flex is-justify-content-center"><Support /></div>
    <div class="column py-0 is-3-tablet is-2-desktop is-flex is-justify-content-center">
        <a class="slippi" href="https://slippi.gg" alt="slippi website">🐸 Play Melee</a>
    </div>
</footer>

<style>
    a.twitter {
        display: flex;
        align-items: center;
        color: #3db2ff;
    }

    a.slippi {
        color: #44a963;
    }

    .logo {
        margin-right: 8px;
    }

    hr {
        background-color: #ababab;
        height: 1px;
        max-width: 100px;
        margin: 10px auto;
    }
    /* @media (max-width: 768px) {
        footer > div.column:not(:last-child) {
            margin-bottom: 8px;
        }
    } */
</style>