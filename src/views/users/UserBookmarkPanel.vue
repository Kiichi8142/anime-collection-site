<script setup>
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/solid';
import { computed, defineAsyncComponent, ref } from 'vue';
import { useUserStore } from "../../stores/userStore";
import { storeToRefs } from 'pinia';

const bookmarkForm = defineAsyncComponent(() =>
    import('../../components/users/BookmarkForm.vue')
)

const userStore = useUserStore()
const { watchlist } = storeToRefs(userStore)
const { deleteWatchList } = userStore
const hasItems = computed(() => userStore?.watchlist?.length || 0)

const showModal = ref(false)

const hideModal = () => {
    showModal.value = false
}

const currentBookmark = ref(null)

const forms = ref({
    status: null,
    progress: 0,
    score: 0,
})

const editBookmark = (id) => {
    currentBookmark.value = watchlist.value.find((i) => i.id === id);
    if (currentBookmark) {
        forms.value = {
            id: currentBookmark.value.id,
            status: currentBookmark.value.status,
            score: currentBookmark.value.score,
            progress: currentBookmark.value.progress,
            episodes: currentBookmark.value.episodes,
            data: currentBookmark.value.data,
        }
        showModal.value = true
    }
}

const updateBookmark = () => {
    const bookmark = {
        id: forms.value.id,
        status: forms.value.status,
        score: forms.value.score,
        progress: forms.value.progress,
        episodes: forms.value.episodes,
        data: forms.value.data,
    }
    watchlist.value = watchlist.value.map((b) => {
        if (b.id === bookmark.id) {
            b = bookmark
        }
        return b
    });
    hideModal()
}

</script>

<template>
    <div class="text-neutral-50 rounded-md">
        <div>
            <div v-if="hasItems" class="flex flex-col gap-4 mt-2">
                <div v-for="(item, key) in userStore.watchlist" :key="key"
                    class="flex items-center p-4 h-auto md:h-20 border border-neutral-700 rounded-md">
                    <img :src="item.data.images.webp.image_url" alt=""
                        class="self-start w-24 md:w-auto md:h-full shrink-0 object-cover">
                    <div class="grid grid-cols-1 md:grid-cols-2 items-center w-full gap-1 justify-center p-4">
                        <div class="flex flex-col">
                            <p class="font-medium truncate md:col-span-2">{{ item.data.title }}</p>
                            <p class="font-sm text-green-600">{{ item.status }}</p>
                        </div>
                        <div class="flex gap-x-1 md:gap-x-2 items-center">
                            <p class="font-semibold md:text-2xl">{{ userStore.getProgress(item.id) }}</p>
                            <p class="text-neutral-400 text-sm md:text-base font-medium">Episode watched</p>
                        </div>
                    </div>
                    <div class="flex space-x-2">
                        <button class="group h-full" @click="editBookmark(item.id)">
                            <PencilSquareIcon class="size-5 group-hover:text-green-500" />
                        </button>
                        <button class="group h-full" @click="deleteWatchList(item.id)">
                            <TrashIcon class="size-5 group-hover:text-red-500" />
                        </button>
                    </div>
                </div>
            </div>
            <div v-else>
                <p class="text-neutral-600 font-semibold text-lg">You have no bookmark.</p>
            </div>
        </div>
        <Modal v-if="showModal" @close="hideModal" title="Update Bookmark">
            <bookmarkForm v-model:form-status="forms.status" v-model:form-progress="forms.progress"
                v-model:form-score="forms.score" @hide-modal="hideModal" @update-bookmark="updateBookmark" />
        </Modal>
    </div>
</template>