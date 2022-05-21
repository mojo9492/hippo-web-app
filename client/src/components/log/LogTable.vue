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
// * refs
const now = new Date()
const postMonth = ref(now.getMonth())
const postDate = ref(now.getDate())
const postYear = ref(now.getFullYear())
const postHour = ref(now.getHours())
const postMinute = ref(now.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2 }))
const nowDateChecked = ref(true)
const postBSL = ref('')
const postInsulin = ref('')
const postInsAmount = ref('')
const postBloodPressureSys = ref('')
const postBloodPressureDia = ref('')
const postWeight = ref('')
const postRemarks = ref('')
// * enables editable date
const enableDateEdit = () => {
    nowDateChecked.value = !nowDateChecked.value
}
// * builds post and emits to parent
const buildPost: () => Post = () => {
    let date = now
    if (!nowDateChecked.value) { // * then we need to build a new date based on user input
        date = new Date(postYear.value - 1, postMonth.value, postDate.value, postHour.value, Number(postMinute.value))
    }
    return {
        date,
        bsl: Number(postBSL.value) ?? 0,
        insulin: postInsulin.value,
        insAmount: Number(postInsAmount.value) ?? 0,
        bloodPressure: `${postBloodPressureSys.value}/${postBloodPressureDia.value}`,
        weight: Number(postWeight.value) ?? 0,
        remarks: postRemarks.value,
        authorId: props.authorId ?? 0, // todo add the correct user ID to the form
    }
}
// * date format (human-readable)
const formatDate = (d = new Date()) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const date = new Date(d)
    return {
        date: `${days[date.getDay()]}, ${date.getMonth() + 1}/${date.getDate()}`,
        time: `${date.getHours()}:${date.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2 })}`,
        hours: date.getHours(),
        minutes: date.getMinutes()
    }
}
</script>
<template>
    <div id="container">
        <form id="postForm" @submit.prevent="$emit('postToAdd', buildPost())">
            <label>
                Date:
                <div class="postForm-date">
                    <label for="month">Month</label>
                    <select id="month" v-model="postMonth" :default="postMonth" :disabled="nowDateChecked">
                        <option value="0">Janurary</option>
                        <option value="1">Feburary</option>
                        <option value="2">March</option>
                        <option value="3">April</option>
                        <option value="4">May</option>
                        <option value="5">June</option>
                        <option value="6">July</option>
                        <option value="7">August</option>
                        <option value="8">September</option>
                        <option value="9">October</option>
                        <option value="10">November</option>
                        <option value="11">December</option>
                    </select>
                    <label for="day">Day</label>
                    <input id="day" type="number" inputmode="numeric" v-model="postDate" :disabled="nowDateChecked" />
                    <label for="year">Year</label>
                    <input id="year" type="number" inputmode="numeric" v-model="postYear" :disabled="nowDateChecked" />
                </div>
            </label>
            <label>
                Time:
                <div class="postForm-time">
                    <label for="hour">Hour</label>
                    <input id="hour" type="number" inputmode="numeric" v-model="postHour" :disabled="nowDateChecked" />
                    :
                    <label for="minute">Minute</label>
                    <input id="minute" type="number" inputmode="numeric" v-model="postMinute"
                        :disabled="nowDateChecked" />
                </div>
            </label>
            <label class="postForm-now-input">
                Now
                <div>
                    <input type="checkbox" v-model="nowDateChecked" @click="enableDateEdit" />
                </div>
                Uncheck to edit date/time
            </label>
            <fieldset>
                <legend>Blood Sugars and Insulin</legend>
                <label>
                    Blood Sugar Level:
                    <label for="bsl"></label>
                    <input type="number" inputmode="numeric" v-model="postBSL"
                        placeholder="Enter blood sugar level..." />
                </label>
                <label>
                    Insulin:
                    <input type="text" v-model="postInsulin" placeholder="Enter insulin name..." />
                    <label for="insAmount">Amount Given</label>
                    <input id="insAmount" type="text" v-model="postInsAmount" placeholder="Enter amount..." />
                </label>
            </fieldset>
            <fieldset>
                <legend>Blood Pressure</legend>
                <input type="number" inputmode="numeric" v-model="postBloodPressureSys"
                    placeholder="Enter top #..." />
                &nbsp;/&nbsp;
                <input type="number" inputmode="numeric" v-model="postBloodPressureDia"
                    placeholder="Enter bottom #..." />
            </fieldset>
            <label>
                Weight:
                <input type="number" inputmode="numeric" v-model="postWeight" placeholder="Enter weight..." />
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
                    <td>{{ entry.insulin?.length && `${entry.insulin}: ${entry.insAmount}` }}μ</td>
                    <td>{{ entry.bloodPressure && entry.bloodPressure.length > 1 && entry.bloodPressure }}</td>
                    <td>{{ entry.weight && entry.weight > 0 && entry.weight }}</td>
                    <td>{{ entry.remarks }}</td>
                    <td>{{ entry.author?.first }}</td>
                    <td><button @click="$emit('postToDelete', entry.id)">Remove</button></td>
                </tr>
            </table>
        </div>
    </div>
</template>

<style scoped lang="sass">
@use '@/_lib' as lib

input
    font-size: lib.$font-size-base

%postForm-dual-inputs
    display: flex
    flex-flow: row nowrap
    justify-content: flex-start
    place-items: center
    margin: 1em 0
    padding: 0

%dual-input
    margin: 0 1em
    width: 8em                
    height: 3em
    margin: 0.5em 1

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

        .postForm-date
            @extend %postForm-dual-inputs

            select
                @extend %dual-input
            input
                @extend %dual-input

        .postForm-time
            @extend %postForm-dual-inputs

            input
                @extend %dual-input

        .postForm-now-input
            @extend %postForm-dual-inputs
            margin: 0 2em 1em

            input
                height: 2em
                width: 2em
                margin: 0 2em

        label
            display: flex
            flex-flow: column nowrap
            align-items: flex-start
            place-content: center 
            width: 100%
            margin: 0 1em
            padding: 0.5em
            font-size: 1.2rem
            font-weight: 500

        fieldset
            display: flex
            flex-flow: row nowrap
            place-items: center
            place-content: center
            width: 66%
            margin: 1em
            max-width: 100vw

            legend
                font-size: lib.$font-size-lg
                font-weight: 500
                margin: 0 1em

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
        border-collapse: collapse

        .htable-header
            font-size: 1.2rem
            font-weight: 500

            th
                border: 1px solid #000
                padding: 0 0.8rem

        .htable-entry
            font-size: 1rem
            font-weight: 400

            td
                overflow: hidden
                overflow-x: scroll
                border-collapse: collapse
                max-width: 6em
                white-space: nowrap
                padding: 1rem
 
// * shrink app to fit width of phone for width < 400px
@media (max-width: 400px), (min-device-width: 360px) and (max-device-width: 1024px)
    %m-postForm-dual-inputs
        display: flex
        flex-flow: row nowrap
        justify-content: space-around
        place-items: center
        margin: 1em 0
        padding: 0

    %mobile-dual-input
        display: flex
        flex-flow: row nowrap
        justify-content: flex-start
        place-items: center
        font-size: 1rem
        margin: 1em 0
        padding: 0
        width: 96%
        
    #container
        padding: 0
        margin: 0 0.5em
        width: 100%
        height: 100%
        overflow: auto

        #postForm
            height: 100%
            width: 100%
            margin: 1em 0
            padding: 0

            .postForm-date
                @extend %m-postForm-dual-inputs
                flex-wrap: wrap

                select
                    @extend %mobile-dual-input
                input
                    @extend %mobile-dual-input
            
            .postForm-time
                @extend %m-postForm-dual-inputs

                input
                    @extend %mobile-dual-input

            .postForm-now-input
                @extend %m-postForm-dual-inputs

                input
                    @extend %mobile-dual-input

            label
                width: 90%
                margin: 1em 0
                padding: 0

                input
                    max-width: 100%
                    margin: 0
                    width: 10em

            fieldset
                width: 90%
                margin: 1em 0
                padding: 0 0.5em
                // border: none

                input
                    @extend %mobile-dual-input

            textarea
                width: 90%
                margin: 0
                padding: 0
                font-size: lib.$font-size-base

            button
                width: 100%
                margin: 1em 0 4em
        
        #htable-container
            width: 100%
            overflow: auto
            overflow-x: scroll
            overflow-y: scroll

            .htable
                border: none
                margin: 0
                padding: 0

                .htable-header
                    font-size: lib.$font-size-base
                    font-weight: 300
                
                .htable-entry
                    font-size: 0.8rem

                button
                    align-self: center
                    height: 2.6em
                    width: 6em
                    cursor: pointer
</style>    