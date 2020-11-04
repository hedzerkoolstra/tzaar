<script>
export default {
 data() {
     return {
         backup: [
            {
                x: 1,
                row: [
                {y: 4, id: 14, occupied: true, role: '*J', height: 1, color: 'white'},   
                {y: 5, id: 15, occupied: true, role: '*J', height: 1, color: 'black'},   
                {y: 6, id: 16, occupied: true, role: '*J', height: 1, color: 'black'},   
                {y: 7, id: 17, occupied: true, role: '*J', height: 1, color: 'black'},
                {y: 8, id: 18, occupied: true, role: '*J', height: 1, color: 'black'}
                ]
            },
            {
                x: 2,
                row: [
                {y: 3, id: 23, occupied: true, role: '*J', height: 1, color: 'white'},   
                {y: 4, id: 24, occupied: true, role: '*Q', height: 1, color: 'white'},   
                {y: 5, id: 25, occupied: true, role: '*Q', height: 1, color: 'black'},   
                {y: 6, id: 26, occupied: true, role: '*Q', height: 1, color: 'black'},
                {y: 7, id: 27, occupied: true, role: '*Q', height: 1, color: 'black'},   
                {y: 8, id: 28, occupied: true, role: '*J', height: 1, color: 'white'}
                ]
            },
            {
                x: 3,
                row: [
                {y: 2, id: 32, occupied: true, role: '*J', height: 1, color: 'white'},   
                {y: 3, id: 33, occupied: true, role: '*Q', height: 1, color: 'white'},   
                {y: 4, id: 34, occupied: true, role: '*K', height: 1, color: 'white'},   
                {y: 5, id: 35, occupied: true, role: '*K', height: 1, color: 'black'},
                {y: 6, id: 36, occupied: true, role: '*K', height: 1, color: 'black'},   
                {y: 7, id: 37, occupied: true, role: '*Q', height: 1, color: 'white'},   
                {y: 8, id: 38, occupied: true, role: '*J', height: 1, color: 'white'}
                ]
            },
            {
                x: 4,
                row: [
                {y: 1, id: 41, occupied: true, role: '*J', height: 1, color: 'white'},   
                {y: 2, id: 42, occupied: true, role: '*Q', height: 1, color: 'white'},   
                {y: 3, id: 43, occupied: true, role: '*K', height: 1, color: 'white'},   
                {y: 4, id: 44, occupied: true, role: '*J', height: 1, color: 'white'},
                {y: 5, id: 45, occupied: true, role: '*J', height: 1, color: 'black'},   
                {y: 6, id: 46, occupied: true, role: '*K', height: 1, color: 'white'},   
                {y: 7, id: 47, occupied: true, role: '*Q', height: 1, color: 'white'},   
                {y: 8, id: 48, occupied: true, role: '*J', height: 1, color: 'white'}
                ]
            },
            {
                x: 5,
                row: [
                {y: 0, id: 50, occupied: true, role: '*J', height: 1, color: 'black'},   
                {y: 1, id: 51, occupied: true, role: '*Q', height: 1, color: 'black'},   
                {y: 2, id: 52, occupied: true, role: '*K', height: 1, color: 'black'},   
                {y: 3, id: 53, occupied: true, role: '*J', height: 1, color: 'black'},
                {y: 4, id: 54, occupied: false, role: '', height: 0, color: 'transparent'},   
                {y: 5, id: 55, occupied: true, role: '*J', height: 1, color: 'white'},   
                {y: 6, id: 56, occupied: true, role: '*K', height: 1, color: 'white'},   
                {y: 7, id: 57, occupied: true, role: '*Q', height: 1, color: 'white'},
                {y: 8, id: 58, occupied: true, role: '*J', height: 1, color: 'white'}
                ]
            },
            {
                x: 6,
                row: [
                {y: 0, id: 60, occupied: true, role: '*J', height: 1, color: 'black'},   
                {y: 1, id: 61, occupied: true, role: '*Q', height: 1, color: 'black'},   
                {y: 2, id: 62, occupied: true, role: '*K', height: 1, color: 'black'},   
                {y: 3, id: 63, occupied: true, role: '*J', height: 1, color: 'white'},
                {y: 4, id: 64, occupied: true, role: '*J', height: 1, color: 'black'},   
                {y: 5, id: 65, occupied: true, role: '*K', height: 1, color: 'black'},   
                {y: 6, id: 66, occupied: true, role: '*Q', height: 1, color: 'black'},   
                {y: 7, id: 67, occupied: true, role: '*J', height: 1, color: 'black'}
                ]
            },
            {
                x: 7,
                row: [
                {y: 0, id: 70, occupied: true, role: '*J', height: 1, color: 'black'},   
                {y: 1, id: 71, occupied: true, role: '*Q', height: 1, color: 'black'},   
                {y: 2, id: 72, occupied: true, role: '*K', height: 1, color: 'white'},   
                {y: 3, id: 73, occupied: true, role: '*K', height: 1, color: 'white'},
                {y: 4, id: 74, occupied: true, role: '*K', height: 1, color: 'black'},   
                {y: 5, id: 75, occupied: true, role: '*Q', height: 1, color: 'black'},   
                {y: 6, id: 76, occupied: true, role: '*J', height: 1, color: 'black'}
                ]
            },
            {
                x: 8,
                row: [
                {y: 0, id: 80, occupied: true, role: '*J', height: 1, color: 'black'},   
                {y: 1, id: 81, occupied: true, role: '*Q', height: 1, color: 'white'},   
                {y: 2, id: 82, occupied: true, role: '*Q', height: 1, color: 'white'},   
                {y: 3, id: 83, occupied: true, role: '*Q', height: 1, color: 'white'},
                {y: 4, id: 84, occupied: true, role: '*Q', height: 1, color: 'black'},   
                {y: 5, id: 85, occupied: true, role: '*J', height: 1, color: 'black'}
                ]
            },
            {
                x: 9,
                row: [
                {y: 0, id: 90, occupied: true, role: '*J', height: 1, color: 'white'},   
                {y: 1, id: 91, occupied: true, role: '*J', height: 1, color: 'white'},   
                {y: 2, id: 92, occupied: true, role: '*J', height: 1, color: 'white'},   
                {y: 3, id: 93, occupied: true, role: '*J', height: 1, color: 'white'},
                {y: 4, id: 94, occupied: true, role: '*J', height: 1, color: 'black'}
                ]
            }]
     }
 }
}
</script>

<style>

</style>