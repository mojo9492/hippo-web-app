<script setup lang="ts">
import { Post } from '@/models'

interface IProps {
    entries: Post[]
}
const props = defineProps<IProps>()
</script>

<template>
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
        </tr>
        <tr class="htable-entry" v-for="entry in props.entries" :key="entry.id">
            <td>{{ entry.date.toLocaleDateString() }}</td>
            <td>7:00 A.M</td>
            <td>{{ entry.bsl }}</td>
            <td>{{ `${entry.insulin}: ${entry.insAmount}` }}</td>
            <td>{{ entry.bloodPressure }}</td>
            <td>{{ entry.weight }}</td>
            <td>{{ entry.remarks }}</td>
            <td>{{ entry.author?.email }}</td>
        </tr>
    </table>
</template>

<style scoped lang="sass">
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
				max-width: 5em
				white-space: nowrap
</style>