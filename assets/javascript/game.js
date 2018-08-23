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
    // Flag for whether the hero/opponent is selected
    var isPCSelected = false;
    var isOpponentSelected = false;
    // Some fun testy global vars
    var heroClicked = null;
    var heroSent = false;
    
    
    
   


// Array of hero objects
var heroes = [
    {
        name: 'Ulfgar Frostbeard',
        id: 'ulfgar',
        hp: 160,
        atk: 8,
        counter: 12,
        hardCtr: 34
        

    },
    {
        name: 'Nim of Clan Turenn',
        id: 'nim',
        hp: 100,
        atk: 20,
        counter: 25,
        hardCtr: 45

    },
    {
        name: 'Ardic Arbandale',
        id: 'ardic',
        hp: 140,
        atk: 10,
        counter: 14,
        hardCtr: 37

    },
    {
        name: 'Eo of Slopbucket',
        id: 'eo',
        hp: 120,
        atk: 11,
        counter: 16,
        hardCtr: 38

    }
]


// Array of combat actions
var combatActions = [
    ' attacked ',
    ' sucker-punched ',
    ' bit and clawed ',
    ' smashed and bashed ',
    ' threw a piece of furniture ',
    ' swept the leg ',
    ' landed a fierce blow ',
    ' stabbed with their dagger ',
    ' shoulder charged ',
    ' body slammed '
]


// function to pick a random combat action
var randomAction = function() {
    var actionNumber = Math.floor(Math.random() * combatActions.length);
    return combatActions[actionNumber];
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
    // Otherwise, show the next opponent button, log congrats text to the textbox
     else {
        $('#nextBtn').removeClass('invis');
        $('#atkBtn').addClass('temp-hide');        
        $('#attackText').text(`${pcName} finished off ${npcName}!!! Another opponent awaits!`)
    }
}

// function gameWinner to declare a winner and reset 
var gameWinner = function() {
    $('#attackText').text(`${pcName} has defeated all and reigns supreme!!`)
    $('#atkBtn').addClass('temp-hide');
    $('#refreshBtn').removeClass('invis');
    $('.hp-box').addClass('temp-hide');
    $('#vsBox').text('WINNER!!!');
}

// function gameLoser to declare a loser and reset
var gameLoser = function() {
    $('#attackText').text(`${pcName} has fallen! Better luck next time!`)
    $('#atkBtn').addClass('temp-hide'); 
    $('#refreshBtn').removeClass('invis');
    $('#vsBox').text('LOSER!!!');
}

// Function to log the damage dealt each attack and display damage on hero images
var logDamage = function(attack, counter) {
    $('#attackText').text(`${pcName} ${randomAction()} for ${attack} damage. ${npcName} ${randomAction()} for ${counter} damage.`)
    var dmgDone = $('<p>');
    $(dmgDone).text('- ' + counter).addClass('font-weight-bold slow-fader');
    setTimeout(function(){
        $(dmgDone).css({'opacity': 0, 'position': 'absolute', 'top': '50px', 'left': '60px', 'font-size': '50px', 'color': '#8b0000'});
    })
    $('#pcBox').find('.hero-card').append(dmgDone);
    
    var dmgDone2 = $('<p>');
    $(dmgDone2).text('- ' + attack).addClass('font-weight-bold slow-fader');
    setTimeout(function(){
        $(dmgDone2).css({'opacity': 0, 'position': 'absolute', 'top': '50px', 'left': '60px', 'font-size': '50px', 'color': '#8b0000'});
    })
    $('#npcBox').find('.hero-card').append(dmgDone2);
} 
    
// Function to fade out of Choose and into Fight
var toFight = function() {
    // Ensure Fight screen is transparent
    $('#marquee, #fightBox').css('opacity', 0);
    // Fade Choose screen over .5s
    $('#heroChooser2, #heroChooser1, #heroChooser3').css('opacity', 0);
    // After .5s display Fight and hide Choose
    setTimeout(function() {
        $('#heroChooser2, #heroChooser1, #heroChooser3').addClass('invis');
        $('#marquee, #fightBox').removeClass('invis');
        
    }, 500);
    // Then after another .04s fade in Fight
    setTimeout(function() {
        $('#marquee, #fightBox').css('opacity', 1);
    }, 540);    
}

// Function to fade out of Fight screen and into Choose screen
var toChoose = function() {
    // Ensure Choose screen is transparent
    $('#heroChooser2, #heroChooser1, #heroChooser3').css('opacity', 0);
    // Fade Fight screen over .5s
    $('#marquee, #fightBox').css('opacity', 0);
    // After .5s display Choose and hide Fight
    setTimeout(function() {
        $('#marquee, #fightBox').addClass('invis');
        $('#heroChooser2, #heroChooser1, #heroChooser3').removeClass('invis');
    }, 500);
    // Then after another .04s fade in Choose
    setTimeout(function() {
        $('#heroChooser2, #heroChooser1, #heroChooser3').css('opacity', 1);
    }, 540); 
}

// Document ready function
$('document').ready(function() {


    // When a card from inside the hero box is clicked, select that card
    $('.hero-box').on('click', '.hero-card', function(){    
        // Check to see if that hero has already battled or is the locked PC (class .hasBattled/.lockedPC)
        if ($(this).hasClass('hasBattled' || 'lockedPC') || $(this).parent().hasClass('lockedPC')) {
            // Return            
            return;
        }          
        // Check to see if that hero is the currently selected opponent 
        else if ($(this).hasClass('selectedOpponent')) {            
            // De-select that hero
            $(this).removeClass('selectedOpponent');
            // Change Chooser Header
            $('#heroChooser1').text('Choose Your Opponent!').removeClass('confirmer');            
            // Toggle the selected Opponent flag to false
            isOpponentSelected = false;
            // Hide the fight button
            $('#fightBtn').addClass('temp-hide');
            // Allow for PC to be de-selected
            $('.lockedPC').removeClass('lockedPC');
            
        }
        // Check to see if opponent is selected already when clicking another hero
        else if (isOpponentSelected) return;


        // Check to see if this is the selected PC and the opponent is not selected
        else if ($(this).hasClass('selectedPC')) {
            if (isPCSelected) return;
            // Remove this from being the selected PC
            $(this).removeClass('selectedPC');
            // Toggle the selected PC flag 
            isPCSelected = false;
            // Change chooser header
            $('#heroChooser1').text('Choose Your Hero!!!')            
        }
        // Check to see if the PC has been selected, if yes
        else if (isPCSelected) {
            // Make this card the currently selected opponent
            $(this).addClass('selectedOpponent');
            // Toggle the selected Opponent flag to true
            isOpponentSelected = true;
            // Prevent the PC to be de-selected
            $('.selectedPC').addClass('lockedPC');
            // Change the Chooser Header to 'Click here to begin!'
            $('#heroChooser1').text('Get Ready To Rumble!!!')
            // Show the Fight Button
            $('#fightBtn').removeClass('temp-hide');
            // Change the heroClicked var
            heroClicked = $('.lockedPC')
        }
        // Else make this the selected PC
        else {
            // Toggle the selected PC flag to true
            isPCSelected = true;
            // Make this the selected PC
            $(this).addClass('selectedPC');
            // Change chooser header
            $('#heroChooser1').text('Choose Your Opponent!');

        }

    });

    // When the confirmer button is clicked 
    $('#fightBtn').on('click', function() {
        $('#fightBtn').addClass('temp-hide');
        if (!heroSent) {
            heroSent = true;
            // The PC.. 
            $(heroClicked)
                                      
            // Clone them
                .clone()
            // Attach to pcBox
                .appendTo('#pcBox');
            // Iterate through the heroes array looking for the one with the matching ID
            var heroObj = heroes.find(function(element) {
                return element.id == heroClicked.attr('id');
            });
            console.log(heroObj);
            // Store the Attack, HP, Name
            pcHitPoints = heroObj.hp;
            pcAttack = heroObj.atk;
            pcAttackMod = heroObj.atk;
            pcName = heroObj.name;
        }

        // Grab the element of the  selected NPC
        var npcClicked = $('.selectedOpponent');
        // Clone them, add to npc box
        $(npcClicked)
            .clone()
            .appendTo('#npcBox');
        // Add has battled
        $(npcClicked).addClass('hasBattled').removeClass('selectedOpponent');        
        // Iterate through the heroes array looking for the one with the matching ID
        var npcObj = heroes.find(function(element) {
            return element.id == npcClicked.attr('id');
        });
        // Store the counterAttack, HP, Name
            npcHitPoints = npcObj.hp;
            npcCounter = npcObj.counter;
            npcName = npcObj.name;
        

        // Start the fight!
        isOpponentSelected = false;
        toFight();
    });

            
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


    // When the next button is clicked #nextBtn
    $('#nextBtn').on('click', function() {
        // Switch to choose screen
        toChoose();
        // Change the Chooser header to "Choose Opponent"
        $('#heroChooser1').text('Choose Your Opponent!')
        // Display the current PC HP on the Chooser screen
        $('.hero-box').find('.lockedPC').find('.hp-box').addClass('text-danger font-weight-bold').removeClass('text-muted').text(pcHitPoints + ' HP');
        setTimeout(function() {
            // Reset buttons
            $('#nextBtn').addClass('invis');
            $('#atkBtn').removeClass('temp-hide');
            // Clear the attack box
            $('#attackText').empty();
            // Clear the npcBox
            $('#npcBox').empty();
             
        }, 600)
        

    });

    // When the refresh button is clicked #refreshBtn
    $('#refreshBtn').on('click', function() {
        location.reload();
    })


});