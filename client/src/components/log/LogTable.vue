<script setup lang="ts">
import { Post } from '@/models'
import { ref } from 'vue';
// * props
interface IProps {
    authorId: number
    authorFirst: string
    entries: Post[]
}
const props = defineProps<IProps>()
// * date format (human-readable)
const formatDate = (d = new Date()) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const date = new Date(d)
    return {
        date: `${days[date.getDay()]}, ${date.getMonth() + 1}/${date.getDate()}`,
        time: `${date.getHours()}:${date.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2 })}`,
    }
}
// * ref
const postDate = ref(new Date())
const postBSL = ref('')
const postInsulin = ref('')
const postInsAmount = ref('')
const postBloodPressureSys = ref('')
const postBloodPressureDia = ref('')
const postWeight = ref('')
const postRemarks = ref('')
// * builds post and emits to parent
const buildPost: () => Post = () => {
    return {
        date: postDate.value,
        bsl: Number(postBSL.value) ?? 0,
        insulin: postInsulin.value,
        insAmount: Number(postInsAmount.value) ?? 0,
        bloodPressure: `${postBloodPressureSys.value}/${postBloodPressureDia.value}`,
        weight: Number(postWeight.value) ?? 0,
        remarks: postRemarks.value,
        authorId: props.authorId ?? 0, // todo add the correct user ID to the form
    }
}
</script>

<template>
    <div id="container">
        <form id="postForm" @submit.prevent="$emit('postToAdd', buildPost())">
            <label>
                Date:
                <input type="text" :placeholder="formatDate().date" disabled />
            </label>
            <label>
                Time:
                <input type="text" v-model="formatDate().time" disabled />
            </label>
            <fieldset>
                <legend>Blood Sugars and Insulin</legend>
                <label>
                    Blood Sugar Level:
                    <input type="text" v-model="postBSL" placeholder="Enter the blood sugar levels..." />
                </label>
                <label>
                    Insulin:
                    <input type="text" v-model="postInsulin" placeholder="Enter insulin name..." />
                    <input type="text" v-model="postInsAmount" placeholder="Enter the amount of insulin..." />
                </label>
            </fieldset>
            <fieldset>
                <legend>Blood Pressure</legend>
                <input type="number" v-model="postBloodPressureSys" placeholder="Enter systolic (top) #..." />
                &nbsp;/&nbsp;
                <input type="number" v-model="postBloodPressureDia" placeholder="Enter the diastolic (bottom) #..." />
            </fieldset>
            <label>
                Weight:
                <input type="number" v-model="postWeight" placeholder="Enter weight..." />
            </label>
            <label>
                Remarks:
                <textarea rows="5" cols="40" v-model="postRemarks" placeholder="Enter any additional remarks..." />
            </label>

            <button type="submit">Add Entry</button>
        </form>
        <div id="htable-container">
            <table class='htable'>
                <tr class="htable-header">
                    <th>Date</th>
                    <th>Time</th>
                    <th>Blood Sugar</th>
                    <th>Insulin</th>
                    <th>Blood Pressure</th>
                    <th>Weight</th>
                    <th>Remarks</th>
                    <th>Author</th>
                    <th>Options</th>
                </tr>
                <tr class="htable-entry" v-for="entry in props.entries" :key="entry.id">
                    <td>{{ formatDate(entry.date).date }}</td>
                    <td>{{ formatDate(entry.date).time }}</td>
                    <td>{{ entry.bsl }}</td>
                    <td v-if="entry.insulin?.length">{{ `${entry.insulin}: ${entry.insAmount}` }}μ</td>
                    <td v-if="entry.bloodPressure && entry.bloodPressure.length > 1">{{ entry.bloodPressure }}</td>
                    <td v-if="entry.weight && entry.weight > 0">{{ entry.weight }}</td>
                    <td>{{ entry.remarks }}</td>
                    <td>{{ entry.author?.first }}</td>
                    <td></td>
                    <td><button @click="$emit('postToDelete', entry.id)">Remove</button></td>
                </tr>
            </table>
        </div>
    </div>
</template>

<style scoped lang="sass">
#container
    padding: 1em 

    button
        align-self: flex-end
        height: 2.6em
        width: 6em
        margin-right: 4em
        cursor: pointer

    #postForm
        display: flex
        flex-flow: column nowrap
        align-items: flex-start
        width: 100%
        margin: 1em

        label
            display: flex
            flex-flow: column nowrap
            align-items: flex-start
            pace-content: center 
            width: 100%
            margin: 0 1em
            padding: 0.5em

            input
                height: 2.6em
                max-width: 16em
                min-width: 16em
                margin: 0.5em 0

        fieldset
            display: flex
            flex-flow: row nowrap
            place-items: center
            place-content: center
            width: 66%
            margin: 1em
            max-width: 100vw

            input
                height: 2.6em
                max-width: 16em
                margin: 0

        textarea
            margin: 0.5em 0

    #htable-container
        display: flex
        flex-flow: column nowrap
        align-content: center
        overflow: auto
        width: 100%
        overflow-x: scroll

    .htable
        border: 1px solid #000
        border-radius: .32rem
        margin: 0 1em
        padding: 1rem
        text-align: left


        .htable-header
            font-size: 1.2rem
            font-weight: 500
            border-collapse: collapse
            th
                border-bottom: 1px solid #000

        .htable-entry
            font-size: 1rem
            font-weight: 400

            td
                overflow: hidden
                overflow-x: scroll
                border-collapse: collapse
                max-width: 6em
                white-space: nowrap

            
// * shrink app to fit width of phone for width < 400px
@media (max-width: 400px), (min-device-width: 360px) and (max-device-width: 1024px)
    #container
        padding: 0
        margin: 0
        width: 100%
        height: 100%
        overflow: auto
        font-size: 0.8rem

        #postForm
            height: 100%
            width: 100%
            margin: 1em 0
            padding: 0

            label
                width: 100%
                margin: 1em 0
                padding: 0

                input
                    max-width: 100%
                    margin: 0
                    width: 10em

            fieldset
                width: 96%
                margin: 1em 0
                padding: 0 0.5em
                input
                    max-width: 100%
                    margin: 1em 0


            textarea
                width: 90%
                margin: 0
                padding: 0

            button
                width: 100%
                margin: 0
        
        #htable-container
            overflow: auto
            width: 100%
            overflow-x: scroll

        .htable
            border: none
            margin: 0
            padding: 0

            button
                align-self: flex-end
                height: 2.6em
                width: 6em
                cursor: pointer
</style>    