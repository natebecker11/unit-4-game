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
        counter: 12,
        hardCtr: 30

    },
    {
        name: 'Nim of Clan Turenn',
        id: 'nim',
        hp: 100,
        atk: 13,
        counter: 19,
        hardCtr: 42

    },
    {
        name: 'Ardic Arbandale',
        id: 'ardic',
        hp: 140,
        atk: 10,
        counter: 15,
        hardCtr: 35

    },
    {
        name: 'Eo of Slopbucket',
        id: 'eo',
        hp: 120,
        atk: 11,
        counter: 17,
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
    // Clear the damage text display
    $('#attackText').text('');
    // Increase the number of rounds won
    roundsWon++
    // Check to see if roundsWon is 3
    if (roundsWon === 3) {
        // Declare a winner
        gameWinner();
    }
    // Check if PC died while defeating last opponent
    else if (pcHitPoints <= 0) {
        gameLoser();
    }
    // Otherwise, bring up the choose opponent screen
     else {
        alert(pcName + ' defeated ' + npcName + '! Choose your next opponent!')
        toggleChoose();
    }
}

// function gameWinner to declare a winner and reset 
var gameWinner = function() {
    alert(pcName + ' has emerged as the baddest member of the Dark Vision Crew! Press OK to play again!');
    location.reload();
}

// function gameLoser to declare a loser and reset
var gameLoser = function() {
    alert('Oh no, you have lost! Press OK to play again!');
    location.reload();
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
            // Grab the element of the hero
            var heroClicked = this;
            // Send that hero to the PC Box and remove it from the Hero box
            
            $(this).clone().appendTo('#pcBox');
            $(this).addClass('invis');
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
        
        else {
            // Grab the element of the hero
            var heroClicked = this;
            // Send that hero to the NPC box and hide it in the Hero box
            $(this).clone().appendTo('#npcBox');
            $(this).addClass('invis');
            // Iterate through the heroes array looking for the matching ID
            var heroObj = heroes.find(function(element) {
                return element.id == heroClicked.id;
            })
            // Store the Counter-Atk, HP, and Name of the object
            npcHitPoints = heroObj.hp;
            npcCounter = heroObj.counter;
            npcName = heroObj.name;
            // Change the sub-header to say 'Choose your next opponent!'
            $('#heroChooser1').text('Choose Your Next Opponent!');
            // Toggle the fight screen
            toggleFight();
        }
    })
            
    // When the attack button #atkBtn is clicked
    $('#atkBtn').on('click', function() {
            // Decrement PC HP by NPC attack and vice versa
            npcHitPoints -= pcAttack;
            pcHitPoints -= npcCounter;            
            // Display HP for NPC and PC and change font style
            $('#npcBox').find('.hp-box').addClass('text-danger font-weight-bold').removeClass('text-muted').text(npcHitPoints + ' HP');
            $('#pcBox').find('.hp-box').addClass('text-danger font-weight-bold').removeClass('text-muted').text(pcHitPoints + ' HP');
            // Display damage dealt 
            logDamage(pcAttack, npcCounter);
            // Scale PC damage up for next attack
            pcAttack = pcAttack + pcAttackMod;
            // If NPC is dead, bring on the next opponent
            if (npcHitPoints <= 0) roundWinner();
            // Else if PC is dead, game over
            else if (pcHitPoints <= 0) gameLoser();
    });


});