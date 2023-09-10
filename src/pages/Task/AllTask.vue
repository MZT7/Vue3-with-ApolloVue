<script setup>
import { useQuery, useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { onMounted, watch, computed, ref, watchEffect } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router'

const Tasks = ref(null);
const search = ref(null);
const router = useRouter();

const Query = gql`
      query tasks {
        tasks {
          id
          title
          description
          status
          due_date
        }
      }
    `
const { result, loading, refetch, onResult } = useQuery(Query);
watchEffect(() => {

    // console.log(result?.value?.tasks)
    Tasks.value = result?.value?.tasks;

});

watch(search, () => {
    // console.log('ser', search);
    // console.log("task", result?.value?.tasks);
    Tasks.value = result?.value?.tasks?.filter((task) => {
        return task.title.toLowerCase().includes(search.value) || task.description.toLowerCase().includes(search.value)
    })
})
onMounted(() => {

    refetch();

});

const mutation = gql`
      mutation deleteTask($id: ID!){
        deleteTask (id: $id) {
          id
        }
      }
    `;
const { mutate: deleteTask } = useMutation(mutation);


const onDelete = (id) => {
    // console.log("id", id);


    const chck = deleteTask({
        id: id
    });
    // console.log(chck);
    refetch()


}

const refreshPage = () => {
    router.go(0);
}

const onCheckDate = computed(() => {
    return (task) => {
        const due_date = new Date(task.due_date);
        const currentDate = new Date();

        const timeDiff = due_date - currentDate;
        const dayDiff = timeDiff / (1000 * 3600 * 24);
        // console.log("day", dayDiff);
        if (dayDiff <= 3) {
            return "bg-yellow-700"
        }
        return ""


    }
});



</script>

<template>
    <div class="flex flex-col items-center justify-center w-full gap-y-5 ">
        <h1>All Tasks</h1>

        <input type="text" v-model.trim="search" class="p-2" placeholder="search" />
        <table>
            <thead>
                <tr>
                    <th>
                        id
                    </th>
                    <th>
                        Title
                    </th>
                    <th>
                        description
                    </th>
                    <th>
                        Status
                    </th>
                    <th>
                        Due_date
                    </th>
                    <th>
                        Actions
                    </th>
                </tr>

            </thead>
            <tbody>
                <!-- <div v-for=""></div> -->
                <div v-if="loading">Loading...</div>

                <tr v-else-if="Tasks" v-for="task in Tasks" :key="task.id" :class="onCheckDate(task)">
                    <td>
                        {{ task?.id }}
                    </td>
                    <td>
                        {{ task?.title }}
                    </td>
                    <td>
                        {{ task?.description }}
                    </td>
                    <td>
                        {{ task?.status == 0 ? 'Not Started' : task?.status == 1 ? 'In Progress' : 'Completed' }}
                    </td>
                    <td>
                        {{ task?.due_date }}
                    </td>
                    <td>
                        <div class="flex gap-x-5">
                            <RouterLink :to="`/editTask/${task.id}`"> <button
                                    class="px-4 py-2 bg-green-400 rounded-sm">edit</button></RouterLink>

                            <button @click="onDelete(task.id)" class="px-4 py-2 bg-red-400 rounded-sm">delete</button>
                        </div>
                    </td>


                </tr>
            </tbody>
        </table>
    </div>
</template>