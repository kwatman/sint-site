<script setup lang="ts">
import {ref, computed} from "vue";
import {Form, usePage} from "@inertiajs/vue3";
import Input from "@/components/Input.vue";
import {Icon} from "@iconify/vue";
import {router} from '@inertiajs/vue3'

const submited = ref(false);

// Single source of truth: all state under `form`
const form = ref<{ name: string | null; list: string[]; accepted_policy: boolean }>({
    name: '',
    municipality: '',
    list: [''],
    accepted_policy: false,

})

// Access server-side validation errors from Inertia
const page = usePage();
const errors = computed<Record<string, string>>(() => ((page.props as any)?.errors) || {});

// Handlers to add/remove items
const addItem = () => form.value.list.push('');
const removeItem = (i: number) => form.value.list.splice(i, 1);


function submit() {
    const payload = {
        name: form.value.name,
        municipality: form.value.municipality,
        accepted_policy: form.value.accepted_policy,
        items: form.value.list.map(name => ({name}))
    };
    router.post('/wishlist', payload, {
        preserveState: true,
        onSuccess: () => {
            submited.value = true
        },
    })
}

</script>

<template>
    <div class="mx-auto my-10 bg-amber-50  border-amber-200 border rounded-md p-10 max-w-3xl w-full">
        <Form v-if="!submited" @submit.prevent="submit">
            <Input name="name" v-model="form.name" label="Naam" placeholder="vul je naam hier in"/>
            <p v-if="errors.name" class="text-destructive text-sm mt-1">{{ errors.name }}</p>

            <Input name="municipality" v-model="form.municipality" label="Gemeente"
                   placeholder="In welke gemeente woon je ?"/>
            <p v-if="errors.municipality" class="text-destructive text-sm mt-1">{{ errors.municipality }}</p>

            <div class="border-t mt-5 pt-5 border-primary">
                <div class="flex items-center justify-between mb-2">
                    <p class="text-foreground text-lg font-semibold">Wensen</p>
                </div>
                <p v-if="errors.items" class="text-destructive text-sm mb-2">{{ errors.items }}</p>

                <div v-for="i in form.list.length" :key="i" class="mb-4">
                    <div class="flex items-center gap-2">
                        <p class="text-foreground text-lg font-semibold w-4 min-w-4">{{ i }}.</p>
                        <Input v-model="form.list[i-1]" :name="`items[${i-1}][name]`"
                               placeholder="vul je wens hier in"/>
                        <div v-if="form.list.length > 1" @click="removeItem(i-1)"
                             class="cursor-pointer hover:bg-destructive/10 hover:text-destructive p-2 rounded-md">
                            <Icon class="text-2xl text-foreground "
                                  icon="material-symbols-light:delete-outline" size="2xl"/>
                        </div>
                    </div>
                    <p v-if="errors[`items.${i-1}.name`]" class="text-destructive text-sm mt-1">
                        {{ errors[`items.${i - 1}.name`] }}
                    </p>
                </div>
                <button type="button" @click="addItem" class="bg-accent text-white px-4 py-2 rounded cursor-pointer">
                    Voeg item toe
                </button>
            </div>

            <div class="mt-6 flex items-center gap-2">
                <input id="accepted_policy" name="accepted_policy" type="checkbox" v-model="form.accepted_policy"
                       class="h-4 w-4"/>
                <label for="accepted_policy" class="text-foreground">Ik ga akkoord met de privacyverklaring</label>
            </div>
            <p v-if="errors.accepted_policy" class="text-destructive text-sm mt-1">{{ errors.accepted_policy }}</p>

            <button class="bg-primary text-white px-4 py-2 rounded cursor-pointer mt-4" type="submit">Verlanglijstje
                indienen
            </button>
        </Form>
        <p v-else>
            Bedankt voor het indienen van je verlanglijstje! We hebben je wensen ontvangen en zullen ons best doen om ze
            te vervullen.
        </p>
    </div>
</template>

<style scoped>

</style>
