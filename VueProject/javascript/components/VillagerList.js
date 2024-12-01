export default {
    template: `
        <ul>
            <li v-for="villager in villagers" :key="villager.name">
                {{ villager.name }}
            </li>
        </ul>
    `,

    // props: {
    //     villagers: Array
    // },
    
    data() {
        return {


        };
    }
}