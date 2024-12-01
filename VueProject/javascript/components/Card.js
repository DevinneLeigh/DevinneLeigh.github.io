export default {
    template: `
        <div style="border: 2px solid #ddd; border-radius: 6px; box-shadow: 0 0 10px -10px #333; padding: 20px;">

                <div>photoImage</div>

                <div>species</div>

                <div>gender</div>

                <div>personality</div>


            <slot />
        </div>
    
    `,

    // props: {

    // },
    
    data() {
        return {


        };
    }
}