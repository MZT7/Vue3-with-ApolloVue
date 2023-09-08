<script setup>
import { useQuery, useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { onMounted, watch, computed, ref, watchEffect } from 'vue';
import { RouterLink, RouterView } from 'vue-router'

const Tasks = ref(null);
const search = ref(null);
// const Query = gql`
//       query tasks {
//         tasks {
//           id
//           title
//           description
//           status
//           due_date
//         }
//       }
//     `
// onMounted(() => {

// });

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
// const { result, loading, refetch } = useQuery(Query);
// watchEffect(() => {
//     // fetchData();
//     refetch();

//     Tasks.value = result?.value?.tasks;
// })

// function fetchData() {

// }




onMounted(() => {

    // try {
    //     const response = await fetch( "https://laravel-with-graphql-production.up.railway.app/sanctum/csrf-cookie", {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'X-CSRF-TOKEN': csrfToken.value, // Include the CSRF token in the headers
    //         },
    //     }
    //     );
    //     if (response.ok) {
    //         const data = await response.json();
    //         csrfToken.value = data.csrf_token;
    //     } else {
    //         console.error("Failed to fetch CSRF token");
    //     }
    // } catch (error) {
    //     console.error("Error fetching CSRF token:", error);
    // }

    const response = fetch("https://laravel-with-graphql-production.up.railway.app/sanctum/csrf-cookie");
    const dat = response.json();
    console.log("response", dat);
    console.log("working", 'working');

    const { result, loading, refetch } = useQuery(Query);
    // refetch();
    watchEffect(() => {

        console.log(result?.value?.tasks)
        Tasks.value = result?.value?.tasks;

    });

    watch(search, () => {
        console.log('ser', search);
        console.log("task", result?.value?.tasks);
        Tasks.value = result?.value?.tasks?.filter((task) => {
            return task.title.toLowerCase().includes(search.value) || task.description.toLowerCase().includes(search.value)
        })
    })
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


    deleteTask({
        id: id
    })
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
    <div class="flex flex-col items-center justify-center w-full ">
        <h1>All Tasks</h1>

        <input type="text" v-model.trim="search" placeholder="search" />
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
                <tr v-for="task in Tasks" :key="task.id" :class="onCheckDate(task)">
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
                        {{ task?.status }}
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