<script setup>
import AllTask from "./Task/AllTask.vue";
import CreateTask from "./Task/CreateTask.vue";
import { ref } from 'vue'

defineProps({
    msg: String,
})

const count = ref(0)
</script>

<template>
    <div class="flex flex-col min-h-screen gap-y-20 ">
        <!-- <CreateTask />
        <AllTask /> -->
    </div>
</template>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>
