<script setup>
import { useRoute, useRouter } from 'vue-router'
import InputLabel from '../../components/InputLabel.vue';
import PrimaryButton from '../../components/PrimaryButton.vue';
import TextInput from '../../components/TextInput.vue';
import Checkbox from '../../components/Checkbox.vue';
import { ref, reactive, onMounted, watch, computed, onBeforeUnmount, watchEffect } from 'vue';
import { useMutation, useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
const route = useRoute()
const router = useRouter();
const ide = parseInt(route.params.id)

// console.log(ide);
const variables = ref({
    id: ide,
});
const form = ref(null);

const Query = gql`
      query task($id:ID!) {
        task(id:$id) {
          id
          title
          description
          status
          due_date
        }
      }
    `
const { result, loading } = useQuery(Query, variables);

watchEffect(() => {
    form.value = {
        title: result?.value?.task?.title ?? '',
        description: result?.value?.task?.description ?? '',
        status: result?.value?.task?.status ?? '',
        due_date: result?.value?.task?.due_date ?? '',
    };

    // console.log("NewV", newt)
    // console.log("OldV",)
})

const mutation = gql`
      mutation updateTask($id: ID!,$title: String!, $description: String!, $status:String!, $due_date:Date!){
        updateTask (id: $id,title:$title,description:$description,status:$status,due_date:$due_date) {
          id
        }
      }
    `;

const { mutate: updateTask } = useMutation(mutation);

const submit = () => {
    updateTask({
        id: ide,
        title: form.value.title,
        description: form.value.description,
        status: form.value.status,
        due_date: form.value.due_date,
    });

    router.push({ name: 'allTask' });
};







</script>

<template>
    <!-- <h1>task{{ ide }}</h1>
    <h2>{{ Task.title }}</h2>
    <h2>{{ Task.description }}</h2>
    <h2>{{ Task.status }}</h2>
    <h2>{{ Task.due_date }}</h2> -->
    <!-- <h1>{{ editedValue }}</h1>
    <h1>{{ Task }}</h1> -->
    <!-- <h1>{{ result?.task }}</h1> -->

    <div v-if="loading">Loading...</div>

    <div v-else-if="result && result?.task"
        class="w-full px-6 py-4 mx-auto mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
        <form @submit.prevent="submit">
            <div>
                <InputLabel for="title" value="Title" />

                <TextInput id="title" type="text" class="block w-full mt-1" v-model="form.title" required autofocus
                    autocomplete="title" />


            </div>

            <div class="mt-4">
                <InputLabel for="description" value="Description" />



                <textarea name="description" id="description" class="block w-full mt-1" v-model="form.description" cols="30"
                    rows="10"></textarea>


            </div>

            <div class="mt-4">
                <InputLabel for="due_date" value="Due_date" />

                <TextInput id="due_date" type="date" class="block w-full p-2 mt-1" v-model="form.due_date" required
                    autocomplete="due_date" />


            </div>

            <div class="mt-4">
                <InputLabel for="status" value="Status" />
                <div class="flex justify-center w-full gap-x-5">
                    <div>
                        <InputLabel for="not_started" value="Not Started" />
                        <TextInput :checked="form.status == 0" type="radio" id="not_started" name="status" :value="0"
                            v-model="form.status" class="block w-full mt-1" required />
                    </div>
                    <div>
                        <InputLabel for="in_progress" value="In Progress" />
                        <TextInput :checked="form.status == 1" type="radio" id="in_progress" name="status" :value="1"
                            v-model="form.status" class="block w-full mt-1" required />
                    </div>
                    <div>
                        <InputLabel for="completed" value="Completed" />
                        <TextInput :checked="form.status == 2" type="radio" id="completed" name="status" :value="2"
                            v-model="form.status" class="block w-full mt-1" required />
                    </div>
                </div>

            </div>

            <div class="flex items-center justify-center w-full mt-4">
                <PrimaryButton class="ml-4">
                    Edit Task
                </PrimaryButton>
            </div>
        </form>
    </div>
</template>