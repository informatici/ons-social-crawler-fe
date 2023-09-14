<script>
export default {
    props: ['entries'],
    data() {
        // console.log(this.entries);
        return {
            range: {
                start: this.entries.start,
                end: this.entries.end,
            },
            masks: {
                input: 'YYYY-MM-DD h:mm A',
            },
        };
    },
};
</script>

<template>
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8" @submit.prevent>
        <div class="mb-4">
            <h2>
                Select Range
            </h2>
            <v-date-picker v-model="range" mode="dateTime" :masks="masks" is-range @dayclick="$emit('rangeChanged', range)">
                <template v-slot="{ inputValue, inputEvents, isDragging }">
                    <div class="flex flex-col sm:flex-row justify-start items-center">
                        <div class="relative flex-grow">
                            <!-- <svg class="text-gray-600 w-4 h-full mx-2 absolute pointer-events-none" fill="none"
                                stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                                </path>
                            </svg> -->
                            <input class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full"
                                :class="isDragging ? 'text-gray-600' : 'text-gray-900'" :value="inputValue.start"
                                v-on="inputEvents.start" /> ->
                            <!-- <svg class="text-gray-600 w-4 h-full mx-2 absolute pointer-events-none" fill="none"
                                stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                                </path>
                            </svg> -->
                            <input class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full"
                                :class="isDragging ? 'text-gray-600' : 'text-gray-900'" :value="inputValue.end"
                                v-on="inputEvents.end" />
                        </div>
                    </div>
                </template>
            </v-date-picker>
        </div>
    </form>
</template>