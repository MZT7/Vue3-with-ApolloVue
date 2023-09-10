<script setup>
// import InputError from '../../components/InputError.vue';
import InputLabel from '../../components/InputLabel.vue';
import PrimaryButton from '../../components/PrimaryButton.vue';
import TextInput from '../../components/TextInput.vue';
import Checkbox from '../../components/Checkbox.vue';
import { ref } from 'vue'
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { useRouter } from 'vue-router';

defineProps({
    msg: String,
})
// const count = ref(0)

const router = useRouter();
const form = ref({
    title: '',
    description: '',
    due_date: '',
    status: '',
});


const mutation = gql`
      mutation createTask($title: String!, $description: String!, $status:String!, $due_date:Date!){
        createTask (title:$title,description:$description,status:$status,due_date:$due_date) {
          id
        }
      }
    `;

const { mutate: createTask } = useMutation(mutation);

const submit = () => {

    createTask({
        title: form.value.title,
        description: form.value.description,
        status: form.value.status,
        due_date: form.value.due_date
    })

    router.push({ name: 'allTask' });

    // console.log(form.value);
}


</script>

<template>
    <div class="w-full px-6 py-4 mx-auto mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
        <form @submit.prevent="submit">
            <div>
                <InputLabel for="title" value="Title" />

                <TextInput id="title" type="text" class="block w-full mt-1" v-model="form.title" required autofocus
                    autocomplete="title" />

                <!-- <InputError class="mt-2" :message="form.errors.name" /> -->
            </div>

            <div class="mt-4">
                <InputLabel for="description" value="Description" />

                <!-- <T id="email" type="email" class="block w-full mt-1" v-model="form.email" required
                    autocomplete="username" /> -->

                <textarea name="description" id="description" class="block w-full mt-1" v-model="form.description" cols="30"
                    rows="10"></textarea>

                <!-- <InputError class="mt-2" :message="form.errors.email" /> -->
            </div>

            <div class="mt-4">
                <InputLabel for="due_date" value="Due_date" />

                <TextInput id="due_date" type="date" class="block w-full p-2 mt-1" v-model="form.due_date" required
                    autocomplete="due_date" />

                <!-- <InputError class="mt-2" :message="form.errors.password" /> -->
            </div>

            <div class="mt-4">
                <InputLabel for="status" value="Status" />
                <div class="flex justify-center w-full gap-x-5">
                    <div>
                        <InputLabel for="not_started" value="Not Started" />
                        <TextInput type="radio" id="not_started" name="status" checked :value="0" v-model="form.status"
                            class="block w-full mt-1" required />
                    </div>
                    <div>
                        <InputLabel for="in_progress" value="In Progress" />
                        <TextInput type="radio" id="in_progress" name="status" :value="1" v-model="form.status"
                            class="block w-full mt-1" required />
                    </div>
                    <div>
                        <InputLabel for="completed" value="Completed" />
                        <TextInput type="radio" id="completed" name="status" :value="2" v-model="form.status"
                            class="block w-full mt-1" required />
                    </div>
                </div>



                <!-- <InputError class="mt-2" :message="form.errors.password_confirmation" /> -->
            </div>

            <div class="flex items-center justify-center w-full mt-4">
                <PrimaryButton class="ml-4">
                    Create Task
                </PrimaryButton>
            </div>
        </form>
    </div>
</template>


