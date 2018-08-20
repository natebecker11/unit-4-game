// $('#ulfgar').on('click', function(){
//     $('#ulfgar').clone().appendTo('#pcBox');
//     $('#ulfgar').empty();
// })



// Global variables

    // PC HP, Atk, Atk increase modifier and Name
    var pcHitPoints = 0;
    var pcAttack = 0;
    var pcAttackMod = 0;
    var pcName = '';
    // NPC HP and Counter-attack and Name
    var npcHitPoints = 0;
    var npcCounter = 0;
    var npcName = '';
    // Flag for whether the hero has been chosen
    var heroChosen = false;
    // Counter for rounds won
    var roundsWon = 0;
    
    
   


// Array of hero objects
var heroes = [
    {
        name: 'Ulfgar Frostbeard',
        id: 'ulfgar',
        hp: 160,
        atk: 8,
        counter: 20,
        hardCtr: 30

    },
    {
        name: 'Nim of Clan Turenn',
        id: 'nim',
        hp: 100,
        atk: 14,
        counter: 30,
        hardCtr: 42

    },
    {
        name: 'Ardic Arbandale',
        id: 'ardic',
        hp: 140,
        atk: 10,
        counter: 24,
        hardCtr: 35

    },
    {
        name: 'Eo of Slopbucket',
        id: 'eo',
        hp: 120,
        atk: 12,
        counter: 26,
        hardCtr: 38

    }
]


// function toggleChoose to swap from fight screen to choose screen
var toggleChoose = function() {
    // Remove current opponent from NPC Box
    $('#npcBox').empty();
    // Hide the fight screen
    $('#marquee, #fightBox, #fightBox2').addClass('invis');
    // Show the opponent select screen
    $('#heroChooser1, #heroChooser2').removeClass('invis');
}


// function toggleFight to swap from choose screen to fight screen
var toggleFight = function() {
    // Hide the opponent select screen
    $('#heroChooser1, #heroChooser2').addClass('invis');
    // Show the fight screen
    $('#marquee, #fightBox, #fightBox2').removeClass('invis');

}


// function roundWinner to move to the next round, or trigger the winner screen
var roundWinner = function() {
    // Increase the number of rounds won
    roundsWon++
    // Check to see if roundsWon is 3
    if (roundsWon === 3) {
        // Declare a winner
        gameWinner();
    // Otherwise, bring up the choose opponent screen
    } else toggleChoose();
}

// function gameWinner to declare a winner and reset 
var gameWinner = function() {
    console.log('under construction')
}

// function gameLoser to declare a loser and reset
var gameLoser = function() {
    console.log('under construction')
}

// Function to log the damage dealt each attack
var logDamage = function(attack, counter) {
    $('#attackText').text(`${pcName} attacked for ${attack} damage. ${npcName} counter-attacked for ${counter} damage.`)
} 
    

// Document ready function
$('document').ready(function() {


    // When a card from inside the hero box is clicked, select that card
    $('.hero-box').on('click', '.hero-card', function(){
        //Check to see if a hero has already been chosen, and if not
        if (heroChosen === false) {
            // Grab the id of the hero
            var heroClicked = this;
            // Send that hero to the PC Box and remove it from the Hero box
            
            $(this).clone().appendTo('#pcBox');
            $(this).empty();
            // Iterate through the heroes array looking for the one with a matching id
            var heroObj = heroes.find(function(element) {
                return element.id == heroClicked.id;
            })
            // Store the Attack, HP, and Name of the object
            pcHitPoints = heroObj.hp; 
            pcAttack = heroObj.atk;
            pcAttackMod = heroObj.atk;
            pcName = heroObj.name;
            // Change the sub-header
            $('#heroChooser1').text('Choose Your Opponent!');
            // set heroChosen = true so the next click is picking an opponent
            heroChosen = true;
            
        }        
    })


        

            // Grab the ID of the clicked hero, then iterate through the array of hero objects

            // If the id matches, send that to the PC box #pcBox, remove that hero from the hero box (id heroChooser2)

            // Set the hp and atk of that object to PC hp and PC atk, also atk->mod pcHitPoints pcAttack pcAttackMod pc name to pcName

            // Change #heroChooser1 to say 'Choose your opponent!'

            // set heroChosen = true

        // Else: (now they are choosing opponent)

            // Change #heroChooser1 to say 'Choose your next opponent!'

            // Empty the NPC box  #npcBox
        
            // Grab the ID of the clicked hero, send that to the NPC box #npcBox, remove that hero from the hero box (id heroChooser2)

            // Iterate through the heroes array, if the id matches, set hp and counter and npcName

            // Hide #heroChooser1 and #heroChooser2

            // show #marquee and #fightBox



            
    // When the attack button #atkBtn is clicked

            // Decrement npcHitPoints by pcAttack and pcHitPoints by npcCounter
            // run logDamage function 
            // pcAttack = pcAttack + pcAttackMod
            // If npcHitPoints <= 0, run roundWinner function
            // else if pcHitPoints <=0, run gameLoser function


});