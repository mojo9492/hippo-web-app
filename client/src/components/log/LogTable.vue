<script setup lang="ts">
import { Post } from '@/models'
import { ref } from 'vue';
// * props
interface IProps {
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
const postDateFormatted = ref(formatDate().date)
const postTime = ref(formatDate().time)
const postBSL = ref('')
const postInsulin = ref('')
const postInsAmount = ref('')
const postBloodPressureSys = ref('')
const postBloodPressureDia = ref('')
const postWeight = ref('')
const postRemarks = ref('')
const postAuthorFirst = ref('')
// * builds post and emits to parent
const buildPost: () => Post = () => {
    return {
        date: postDate.value,
        time: postTime.value,
        bsl: Number(postBSL.value),
        insulin: postInsulin.value,
        insulinAmount: Number(postInsAmount.value),
        bloodPressure: `${postBloodPressureSys.value}/${postBloodPressureDia.value}`,
        weight: Number(postWeight.value),
        remarks: postRemarks.value,
        authorId: 1,
    }
}
</script>

<template>
    <div id="container">
        <form id="postForm">
            <label>
                Date:
                <input type="text" :placeholder="postDateFormatted" disabled />
            </label>
            <label>
                Time:
                <input type="text" v-model="postTime" disabled />
            </label>
            <fieldset>
                <legend>Blood Sugars and Insulin</legend>
                <label>
                    Blood Sugar Level:
                    <input type="text" v-model="postBSL" placeholder="Enter the blood sugar reading." />
                </label>
                <label>
                    Insulin:
                    <input type="text" v-model="postInsulin" placeholder="Enter the name of the insulin given." />
                    <input type="text" v-model="postInsAmount" placeholder="Enter the amount of the insulin given." />
                </label>
            </fieldset>
            <fieldset>
                <legend>Blood Pressure</legend>
                <input type="number" v-model="postBloodPressureSys" placeholder="Enter the systolic blood pressure." />
                &nbsp;/&nbsp;
                <input type="number" v-model="postBloodPressureDia" placeholder="Enter the diastolic blood pressure." />
            </fieldset>
            <label>
                Weight:
                <input type="number" v-model="postWeight" placeholder="Enter weight." />
            </label>
            <label>
                Remarks:
                <textarea rows="5" cols="40" v-model="postRemarks" placeholder="Enter any additional remarks." />
            </label>

            <button @click="$emit('postToAdd',)">Add Entry</button>
        </form>
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
                <td v-if="entry.insulin?.length">{{ `${entry.insulin}: ${entry.insAmount}` }}</td>
                <td>{{ entry.bloodPressure }}</td>
                <td>{{ entry.weight }}</td>
                <td>{{ entry.remarks }}</td>
                <td>{{ entry.author?.first }}</td>
                <td></td>
                <td><button @click="$emit('postToDelete', () => buildPost())">Remove</button></td>
            </tr>
        </table>
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
            margin: 0.5em 0
            padding: 0.5em

        fieldset
            display: flex
            flex-flow: row nowrap
            pace-items: center
            place-content: flex-start
            width: 66%
            margin: 1em
            max-width: 100vw

        input
            height: 2.6em
            max-width: 16em
            margin: 0.5em 0

        textarea
            margin: 0.5em 0

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
        width: 90vw
        height: 100%
        overflow: auto
        font-size: 0.8rem

        #postForm
            margin: 0
            height: 100%
            max-width: 90vw
            overflow: auto

            label
                width: 100%
                margin: 0

                input
                    max-width: 100vw
                    margin: 0
                    width: 10em

            fieldset
                width: 88%
                margin: 0


            textarea
                width: 100%
                margin: 0

            button
                width: 100%
                margin: 0
            
        table, thead, tbody, th, td, tr
            display: block

        /* Hide table headers (but not display: none;, for accessibility) */
        .htable-header
            position: absolute
        
        .htable-entry
            border: 1px solid #ccc
        
            td
                /* Behave  like a "row" */
                border: none
                border-bottom: 1px solid #eee
                position: relative
                padding-left: 50%

            td:before 
                /* Now like a table header */
                position: absolute
                /* Top/left values mimic padding */
                top: 6px
                left: 6px
                width: 45%
                padding-right: 10px
                white-space: nowrap
</style>