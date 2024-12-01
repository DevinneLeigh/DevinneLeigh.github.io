import Card from "./Card.js";
import VillagerList from "./VillagerList.js";

export default {
    components: {
        'Card' : Card,
        'VillagerList': VillagerList
    },
    data() {

        let villagers;

        const fetchPromise = fetch("/villagers.json");
        fetchPromise.then(response => {
            return response.json();
        }).then(villagers => {
            console.log(villagers);
            villagers = villagers;
        });

        return {
            villagers: villagers
        }


        // return villagersObject;
    }
}