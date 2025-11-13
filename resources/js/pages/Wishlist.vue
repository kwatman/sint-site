<script setup lang="ts">
import {ref, computed} from "vue";
import {Form, usePage} from "@inertiajs/vue3";
import Input from "@/components/Input.vue";
import {Icon} from "@iconify/vue";
import {router} from '@inertiajs/vue3'
import TextArea from "../components/TextArea.vue";

const submited = ref(false);

// Single source of truth: all state under `form`
const form = ref<{ name: string | null; list: string[]; accepted_policy: boolean }>({
    name: '',
    municipality: '',
    list: [''],
    comment: '',
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
        comment: form.value.comment,
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
    <div class="min-h-screen flex flex-col">
        <header class="bg-gradient-to-b from-[#700000] to-[#d40000] h-40 md:h-60 lg:h-70 xl:h-72 2xl:h-80">
            <div
                class="bg-[url('/img/banner.png')] h-full bg-repeat-x [background-position:center_bottom] [background-size:100%_auto] pt-5">
                <h1 class="text-5xl  md:text-7xl  font-vivaldi text-sinthuis-yellow">Sinthuis Boutersem</h1>
            </div>
        </header>
        <div
            class="flex-1 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0.5)_100%),url('/img/background.jpg')] bg-repeat bg-top h-full">
            <div
                class="mx-auto  bg-amber-50  border-destructive border-5 border-t-0 p-10 pb-5 max-w-3xl w-full bg-opacity-25 shadow-2xl">
                <p class="mb-5">
                    Welkom in het Sinthuis van Boutersem!
                    Sinterklaas en zijn Pieten zijn superblij dat jij hier bent.
                    Heb jij al een verlanglijstje klaar? Vul je naam in, vertel waar je woont en schrijf al je wensen
                    op.
                    Zo weet Sinterklaas precies wat jij graag wilt. Vergeet ook niet of je nog iets extra wil vertellen!
                    Klik daarna op Verlanglijstje indienen en… wie weet ligt het straks in de grote boek van Sinterklaas
                </p>
                <Form v-if="!submited" @submit.prevent="submit">
                    <Input  name="name" v-model="form.name" label="Naam" placeholder="vul je naam hier in"/>
                    <p v-if="errors.name" class="text-destructive text-sm mt-1">{{ errors.name }}</p>

                    <Input name="municipality" v-model="form.municipality" label="Gemeente"
                           placeholder="In welke gemeente woon je ?"/>
                    <p v-if="errors.municipality" class="text-destructive text-sm mt-1">{{ errors.municipality }}</p>

                    <div class="border-t mt-5 pt-5 border-primary">
                        <div class="flex items-center justify-between mb-2">
                            <p class="text-foreground text-lg font-semibold">Wat wens je graag in je schoen?</p>
                        </div>
                        <p v-if="errors.items" class="text-destructive text-sm mb-2">{{ errors.items }}</p>

                        <div v-for="i in form.list.length" :key="i" class="mb-4">
                            <div class="flex items-center gap-2">
                                <p class="text-foreground text-lg font-semibold w-4 min-w-4">{{ i }}.</p>
                                <Input v-model="form.list[i-1]" :name="`items[${i-1}][name]`"
                                       placeholder="vul je wens hier in"/>
                                <div v-show="form.list.length > 1" @click="removeItem(i-1)"
                                     class="cursor-pointer hover:bg-destructive/10 hover:text-destructive p-2 rounded-md">
                                    <Icon class="text-2xl text-foreground "
                                          icon="material-symbols-light:delete-outline" size="2xl"/>
                                </div>
                            </div>
                            <p v-if="errors[`items.${i-1}.name`]" class="text-destructive text-sm mt-1">
                                {{ errors[`items.${i - 1}.name`] }}
                            </p>
                        </div>
                        <button type="button" @click="addItem"
                                class="bg-accent text-white px-4 py-2 rounded cursor-pointer">
                            Voeg wens toe
                        </button>
                    </div>

                    <text-area name="comment" v-model="form.comment" label="Wat moeten de sint en pieten zeker weten?"
                               placeholder="Heb je nog extra opmerkingen? Vul ze hier in." class="mt-6"/>

                    <div class="mt-6 flex items-center gap-2">
                        <input id="accepted_policy" name="accepted_policy" type="checkbox"
                               v-model="form.accepted_policy"
                               class="h-4 w-4"/>
                        <label for="accepted_policy" class="text-foreground">Ik ga akkoord met de
                            privacyverklaring</label>
                    </div>
                    <p v-if="errors.accepted_policy" class="text-destructive text-sm mt-1">{{
                            errors.accepted_policy
                        }}</p>

                    <button class="bg-primary text-white px-4 py-2 rounded cursor-pointer mt-4" type="submit">
                        Verlanglijstje
                        indienen
                    </button>
                </Form>
                <p v-else>
                    Bedankt voor het indienen van je verlanglijstje! We hebben je wensen ontvangen en zullen ons best
                    doen
                    om ze
                    te vervullen.
                </p>
                <div class="mx-auto max-w-3xl text-center text-sm text-foreground/70 mt-5">
                    Site gemaakt door <a href="https://www.gbboutersem.be/coderdojo" class="text-primary underline"
                                         target="_blank">CoderDojo
                    Boutersem</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
