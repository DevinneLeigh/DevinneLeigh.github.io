<script setup>
import { ref } from 'vue'

const props = defineProps({
  state: Object,
})

function showChosenVillager(villager) {
  props.state.villagerIndex = villager.id-1;
  props.state.selectedVillager = villager;
  props.state.listView = false;
  props.state.houseView = false;
}

</script>




<template>

  <div class="villager-list">
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Species</th>
          <th>Personality</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody>
        
        <tr v-for="villager in state.villagers" :key="villager.id"
            @click="showChosenVillager(villager)"
        
        >
          <td class="icon-td"><img :src="villager.iconImage" class="villager-icon"></td>
          <td>{{ villager.name }}</td>
          <td>{{ villager.species }}</td>
          <td>{{ villager.personality }}</td>
          <td>{{ villager.gender }}</td>
        </tr>
      </tbody>
    </table>

  </div>
  
</template>
