<template>
    <div>
        <div class="left-top-center toast-title">{{ title }}</div>
    </div>
</template>

<script>
export default {
    name: 'toast',

    data() {
        return {
        }
    },

    created() {

    },

    methods: {}
}
</script>

<style scoped lang="scss">
    .toast-title {
        background-color: rgba(0, 0, 0, .7);
        padding: 10px 30px;
        border-radius: 4px;
        color: $white;
    }
</style>
