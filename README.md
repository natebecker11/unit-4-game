# CWRU Bootcamp Assignment 4
A simple RPG game

## Summary
In this project, I will be making a super-simplistic RPG game. You'll be able to select from a group of characters, and then use that character to battle the other characters. A player wins when they reduce the Hit Points (HP) of all other opponents to zero, and loses when their own HP reaches zero.

## Core Features
Upon game start, available characters are displayed with their name, image, and starting HP. The user clicks a character, and that character becomes the Player Character (PC), while the others become Non-Player Characters (NPCs). The chosen Hero disappears and the user is prompted to select an opponent. The use clicks the opponent, then a new screen appears for combat. Combat takes place by pressing the attack button. On attack, the PC deals damage to the NPC and receives damage in return. The PC damage scales up over the course of the game, while NPC damage remains static. Each character will have different values for starting HP, starting damage done as a PC, and damage done as an NPC. 

## Stretch Features
Once core features are complete, I hope to integrate the following features.

### Special Powers
- [ ] Each character has a single, one-time-use special ability that is unique to them, and only usable if the player selects them as a PC. These might be a one-time damage boost, a temporary shield from damage, a permanent reduction in an opponent's damage, etc.
- [ ] If this is included, it would be offered to the player as part of a special 'hard mode' of the game.

### Create a character
- [ ] The player would be able to create a character of their own instead of using only the pre-made characters.
- [ ] The player would make several choices, such as Race, Class, and Weapon that would in turn determine their statistics for HP, damage, special powers, etc.

### UI Improvements
- [x] Fade in/out effect when switching between Fight and Character Select screens
- [ ] Damage numbers pop up on character images when damage is taken
- [ ] Generate and display random damage descriptors (e.g. 'Ardic stabs for 20 damage') in attack text
- [ ] On hero select, the player would be able to click a character, which then highlights the character, provides some additional info, and prompts for confirm. Future clicks on other characters would switch the highlight.
- [ ] Opponent select would work the same.
- [ ] Also, instead of empty space where a selected character was, some sort of filler image or element.
- [x] Click buttons to move back to opponent select and to start a new game
- [ ] Improve mobile layout, resize images


