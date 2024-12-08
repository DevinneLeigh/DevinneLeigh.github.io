<script setup>
import { ref, reactive } from 'vue'

const props = defineProps({
  state: Object,
})

let currentSearch = ref("");
let searchResults = reactive([]);

function search() {

    let searchedName = currentSearch.value.toLowerCase().trim();

    // Clear search results before updating
    searchResults.length = 0;

    if (searchedName === "") {
        return;
    }

    props.state.villagers.forEach(villager => {
        let vName = villager.name.toLowerCase().trim();

        if (vName.startsWith(searchedName)) {
            // push each villager we find
            searchResults.push(villager);
        }

        if (searchedName === vName) {

            // Exact match. Clear suggestions and go to villager
            searchResults.length = 0;
            props.state.villagerIndex = villager.id-1;
            props.state.selectedVillager = villager;
            props.state.houseView = false;

        }
    });

}

function setChosenVillager(villager) {
    let i = villager.id - 1;
    props.state.villagerIndex = i;
    props.state.selectedVillager = props.state.villagers[i];
    currentSearch.value = "";
    searchResults.length = 0;
    props.state.houseView = false;
}

</script>




<template>

<!-- 1
  "name": "Ace",
  "iconImage": "https://acnhcdn.com/latest/NpcIcon/brd09.png",
  "photoImage": "https://acnhcdn.com/latest/NpcBromide/NpcNmlBrd09.png",
  "houseImage": "",
  "species": "Bird",
  "gender": "Male",
  "personality": "Jock",
  "hobby": "Nature",
  "birthday": "8/11",
  "catchphrase": "ace" 
-->

<div class="search-wrapper">

  <div class="search-input-group">
    <div>
        <label for="search-input">
            Search by Name
        </label>
    </div>
    <div class="flex">
        <input type="text" 
            v-model="currentSearch"
            @keyup="search"
            id="search-input"
        >
        <div class="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
            </svg>
        </div>
    </div>
  </div>

  <div class="search-results" v-if="searchResults.length">

    <button 
        v-for="result in searchResults" :key="result.id"
        class="result"
        @click="setChosenVillager(result)"
    >
        {{ result.name }}
    </button>
    
  </div>
  

</div>

</template>
