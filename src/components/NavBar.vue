<template>
    <nav class="nav">
        <h1 class="nav__title">Learn Space</h1>
        <div class="search">
            <font-awesome-icon :icon="['fas', 'search']"></font-awesome-icon>
            <input class="search__input" placeholder="Search" type="text" />
        </div>
    </nav>
</template>

<script>
export default {
    name: 'NavBar',
};
</script>

<style lang="scss" scoped>
    .nav {
        position: sticky;
        height: 60px;
        background-color: #6100ed;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .nav__title {
        margin: 0;
        left: 20px;
        position: absolute;
        color: white;
        font-size: 24px;
    }

    .search {
        box-sizing: border-box;
        width: 60%;
        height: 80%;
        padding: 0 10px;
        border-radius: 5px;
        background-color: #a36eef;
        color: #e0e0e0;
        font-size: 18px;
        display: flex;
        align-items: center;
    }

    .search__input {
        margin-left: 5px;
        background: none;
        border: none;
        outline: none;
        color: #e0e0e0;
        font-size: 18px;
    }

    .search__input::-webkit-input-placeholder {
        color: #e0e0e0;
    }
</style>
