$('#ulfgar').on('click', function(){
    $('#ulfgar').clone().appendTo('#pcBox');
    $('#ulfgar').empty();
})



// Global variables
    

// Array of hero objects
const heroes = [
    {
        name: 'Ulfgar Frostbeard',
        id: '#ulfgar',
        hp: 160,
        atk: 8,
        counter: 20,
        hardCtr: 30

    },
    {
        name: 'Nim of Clan Turenn',
        id: '#nim',
        hp: 100,
        atk: 14,
        counter: 30,
        hardCtr: 42

    },
    {
        name: 'Ardic Arbandale',
        id: '#ardic',
        hp: 140,
        atk: 10,
        counter: 24,
        hardCtr: 35

    },
    {
        name: 'Eo of Slopbucket',
        id: '#eo',
        hp: 120,
        atk: 12,
        counter: 26,
        hardCtr: 38

    }
]




// When a card from the hero box is clicked

    //Check to see if heroChosen = false:

        // Grab the ID of the clicked hero, then iterate through the array of hero objects

        // If the id matches, send that to the PC box #pcBox, remove that hero from the hero box (id heroChooser2)

        // Set the hp and atk of that object to PC hp and PC atk

        // Change #heroChooser1 to say 'Choose your opponent!'

        // set heroChosen = true

    // Else: (now they are choosing opponent)

        // Change #heroChooser1 to say 'Choose your next opponent!'

        // Empty the NPC box  #npcBox
    
        // Grab the ID of the clicked hero, send that to the NPC box #npcBox, remove that hero from the hero box (id heroChooser2)

        // Iterate through the heroes array, if the id matches, set hp and counter

        // Hide heroChooser1 and heroChooser2

        // show #marquee and #fightBox



        
// When the attack button #atkBtn is clicked

        // Decrement 