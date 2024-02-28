<template>
    <div class="q-pa-md q-gutter-sm">
        <q-pagination v-model="currentPage" :max="lastPage"  direction-links />
    </div>
</template>

<script>

export default {
    computed: {
        currentPage: {
            get() {
                return 5
            }
        },
        lastPage: {
            get() {
                return 5
            }
        },
    }
}
</script>

