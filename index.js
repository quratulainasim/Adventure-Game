#! /usr/bin/env node
import inquirer from "inquirer";
let enemies = ["Alien", "Monster", "Zombie", "Dragon"];
let oppHealth = 75;
let heroHealth = 100;
let maxHitOpp = 25;
let maxHitHero = 50;
let maxHealthPortion = 3;
let healPortion = 30;
let oppGiveHealth = 50;
let gameRum = true;
Main: while (gameRum) {
    console.log("......Welcome to Adventure Game.......\n");
    let maxOppHealth = Math.floor(Math.random() * oppHealth + 1);
    let enemyIndex = Math.floor(Math.random() * enemies.length);
    let enemy = enemies[enemyIndex];
    console.log(`your enemy ${enemy} has appeared`);
    while (maxOppHealth > 0) {
        console.log(`Our hero health is ${heroHealth}`);
        console.log(`${enemy} health is ${maxOppHealth}`);
        let operation = await inquirer.prompt([
            {
                name: "ans",
                type: "list",
                message: "select your options",
                choices: ["Attack", "Take Health portion", "Run"],
            }
        ]);
        if (operation.ans === "Attack") {
            let enemyDamage = Math.floor(Math.random() * maxHitOpp + 1);
            let heroDamage = Math.floor(Math.random() * maxHitHero + 1);
            heroHealth -= heroDamage;
            maxOppHealth -= enemyDamage;
            console.log(`Hero hits to : ${enemyDamage} times and Enemy hits to : ${heroDamage} times`);
            if (heroHealth < 1) {
                console.log(' you can not continue the game');
                break;
            }
        }
        else if (operation.ans === "Take Health portion") {
            if (maxHealthPortion > 0) {
                heroHealth += healPortion;
                maxHealthPortion--;
                console.log(`Our hero is current health ${heroHealth}`);
                console.log(`you used to health portion for ${healPortion} health`);
                console.log(`you have ${maxHealthPortion} health portion left`);
            }
            else {
                console.log('you have no health portion');
            }
        }
        else if (operation.ans === "Run") {
            console.log(`you are run away from ${enemy}`);
            continue Main;
        }
    }
    if (heroHealth < 1) {
        console.log('you are out of game');
        break;
    }
    console.log(`${enemy} was defeated ,Hero health is ${heroHealth}`);
    let randomNumber = Math.floor(Math.random() * 100 + 1);
    if (randomNumber < oppGiveHealth) {
        maxHealthPortion++;
        console.log('enemy give you health portion');
        console.log(`your health is ${heroHealth}`);
        console.log(`your health portion is ${maxHealthPortion}`);
    }
    let useroption = await inquirer.prompt([
        {
            name: "ans",
            type: "list",
            message: "What do you select option",
            choices: ["Continue", "Exit"],
        }
    ]);
    if (useroption.ans === "Continue") {
        console.log('You are continue game');
    }
    else {
        console.log("You Exit from Adventure game");
        break;
    }
}
