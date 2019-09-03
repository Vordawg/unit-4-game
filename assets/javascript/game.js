var starWarsCharacters = [];
var attacherId = -1;
var defenderId = -1;

function getRandomInt(max) {
    var randomNumber = Math.floor(Math.random() * Math.floor(max));
    return randomNumber;
}

function getHealthPoints() {
    var myRandomNumber = getRandomInt(100) + 100;

    if (starWarsCharacters.length > 0) {
        var healthPointsArray = [];
        for (var loop = 0; loop < starWarsCharacters.length; loop++) {
            healthPointsArray.push(starWarsCharacters[loop].getHealthPoints)
        }

        while (healthPointsArray.indexOf(myRandomNumber) >= 0) {
            myRandomNumber = getRandomInt(100) + 100;
        }
    }

    return myRandomNumber;
}

function getAttackPower() {
    var myRandomNumber = getRandomInt(9) + 1;

    if (starWarsCharacters.length > 0) {
        var attackPowerArray = [];
        for (var loop = 0; loop < starWarsCharacters.length; loop++) {
            attackPowerArray.push(starWarsCharacters[loop].getAttackPower)
        }

        while (attackPowerArray.indexOf(myRandomNumber) >= 0) {
            myRandomNumber = getRandomInt(9) + 1;
        }
    }

    return myRandomNumber
}

function getCounterAttackPower() {

    var myRandomNumber = getRandomInt(25) + 1;

    if (starWarsCharacters.length > 0) {
        var counterAttackPowerArray = [];
        for (var loop = 0; loop < starWarsCharacters.length; loop++) {
            counterAttackPowerArray.push(starWarsCharacters[loop].counterAttackPower)
        }

        while (counterAttackPowerArray.indexOf(myRandomNumber) >= 0) {
            myRandomNumber = getRandomInt(25) + 1;
        }
    }

    return myRandomNumber
}

function setupCharacter(characterName) {
    var warriors = {
        name: "",
        healthPoints: 0,
        attackPowerBase: 0,
        attackPower: 0,
        counterAttackPower: 0,
        value: 0,
        attacker: false,

        setName: function (input) {
            this.name = input;
        },

        setHealthPoints: function (input) {
            this.healthPoints = input;
        },

        setAttackPowerBase: function (input) {
            this.attackPowerBase = input;
            this.setAttackPower();
        },

        setAttackPower: function () {
            this.attackPower += this.attackPowerBase;
        },

        setCounterAttackPower: function (input) {
            this.counterAttackPower = input;
        },

        setValue: function () {
            this.value = starWarsCharacters.length - 1;
        },

        resetCharacterOnScreen: function () {
            var imageName = this.name.replace(" ", "");
            imageName = imageName.replace("-", "");

            var characterID = starWarsCharacters.length - 1;

            var characterHtml = "";

            characterHtml = '<div class="card border-success border-30" style="width:200px; height:180px">';
            characterHtml += '<div class="card-body">';
            characterHtml += '<p class="card-title text-center">' + this.name + '</p>';
            characterHtml += '<img src="assets/images/' + imageName + '.jpg" style="width:150px; height:80px" class="card-img-top"';
            characterHtml += 'id="' + starWarsCharacters[characterID] + '">';
            characterHtml += '<p class="text-center">' + this.healthPoints + '</p>'
            characterHtml += '</div>';
            characterHtml += '</div>';

            var characterNameID = "#characterChoice" + characterID;
            $(characterNameID).html(characterHtml);
        }
    };

    warriors.setName(characterName);
    warriors.setHealthPoints(getHealthPoints());
    warriors.setAttackPowerBase(getAttackPower());
    warriors.setCounterAttackPower(getCounterAttackPower());
    starWarsCharacters.push(warriors);
    warriors.setValue();
    warriors.resetCharacterOnScreen();
}

function initCharacters() {

    $("#characterChoice0").html("");
    $("#characterChoice1").html("");
    $("#characterChoice2").html("");
    $("#characterChoice3").html("");

    $("#availableEnemyCharacter0").html("");
    $("#availableEnemyCharacter1").html("");
    $("#availableEnemyCharacter2").html("");
    $("#availableEnemyCharacter3").html("");

    $("#attackingCharacter").html("");
    $("#defendingCharacter").html("");

    while (starWarsCharacters.length > 0) {
        starWarsCharacters.pop();
    }

    attacherId = -1;
    defenderId = -1;

    setupCharacter("Obi-Wan Kenobi");
    console.log(starWarsCharacters[0]);
    setupCharacter("Luke Skywalker");
    console.log(starWarsCharacters[1]);
    setupCharacter("Darth Sidious");
    console.log(starWarsCharacters[2]);
    setupCharacter("Darth Maul");
    console.log(starWarsCharacters[3]);
}

function setAttackingCharacterOnScreen(input) {
    var imageName = starWarsCharacters[input].name.replace(" ", "");
    imageName = imageName.replace("-", "");

    var characterHtml = "";

    characterHtml = '<div class="card border-success border-30" style="width:200px; height:180px">';
    characterHtml += '<div class="card-body">';
    characterHtml += '<p class="card-title text-center">' + starWarsCharacters[input].name + '</p>';
    characterHtml += '<img src="assets/images/' + imageName + '.jpg" style="width:150px; height:80px" class="card-img-top"';
    characterHtml += 'id="' + starWarsCharacters[input] + '">';
    characterHtml += '<p class="text-center">' + starWarsCharacters[input].healthPoints + '</p>'
    characterHtml += '</div>';
    characterHtml += '</div>';

    $("#attackingCharacter").html(characterHtml);
}

function setAvailableDefendingCharacterOnScreen(input) {
    var imageName = starWarsCharacters[input].name.replace(" ", "");
    imageName = imageName.replace("-", "");

    var characterHtml = "";

    characterHtml = '<div class="card border-dark bg-danger border-30" style="width:200px; height:180px">';
    characterHtml += '<div class="card-body">';
    characterHtml += '<p class="card-title text-center">' + starWarsCharacters[input].name + '</p>';
    characterHtml += '<img src="assets/images/' + imageName + '.jpg" style="width:150px; height:80px" class="card-img-top"';
    characterHtml += 'id="' + starWarsCharacters[input] + '">';
    characterHtml += '<p class="text-center">' + starWarsCharacters[input].healthPoints + '</p>'
    characterHtml += '</div>';
    characterHtml += '</div>';

    var characterNameID = "#availableEnemyCharacter" + input;
    $(characterNameID).html(characterHtml);
}

function setDefendingCharacterOnScreen(input) {
    var imageName = starWarsCharacters[input].name.replace(" ", "");
    imageName = imageName.replace("-", "");

    var characterHtml = "";

    characterHtml = '<div class="card border-sucess bg-dark text-white border-30" style="width:200px; height:180px">';
    characterHtml += '<div class="card-body">';
    characterHtml += '<p class="card-title text-center">' + starWarsCharacters[input].name + '</p>';
    characterHtml += '<img src="assets/images/' + imageName + '.jpg" style="width:150px; height:80px" class="card-img-top"';
    characterHtml += 'id="' + starWarsCharacters[input] + '">';
    characterHtml += '<p class="text-center">' + starWarsCharacters[input].healthPoints + '</p>'
    characterHtml += '</div>';
    characterHtml += '</div>';

    var characterNameID = "#defendingCharacter";
    $(characterNameID).html(characterHtml);
}

$("#resetButton").on("click", function () {
    initCharacters();
});

$(".initCharacters").on("click", function () {
    console.log(this.id);
    $("#characterChoice0").html("");
    $("#characterChoice1").html("");
    $("#characterChoice2").html("");
    $("#characterChoice3").html("");

    attacherId = this.id[this.id.length - 1];
    setAttackingCharacterOnScreen(attacherId);

    for (var loop = 0; loop < starWarsCharacters.length; loop++) {
        if (loop != attacherId) {
            setAvailableDefendingCharacterOnScreen(loop);
        }
    }

});

$(".enemyCharacters").on("click", function () {
    if (defenderId < 0) {
        console.log(this.id);
        defenderId = this.id[this.id.length - 1];

        var removeEnemy = "#" + this.id;
        $(removeEnemy).html("");
        setDefendingCharacterOnScreen(defenderId);
    }
});

$("#attackButton").on("click", function () {
    if (attacherId >= 0 && defenderId >= 0) {
        starWarsCharacters[defenderId].healthPoints -= starWarsCharacters[attacherId].attackPower;
        starWarsCharacters[attacherId].healthPoints -= starWarsCharacters[defenderId].counterAttackPower;

        var userMessage = "";
        var defenderMessage = "";
        var winLossMessage = "";

        if (starWarsCharacters[defenderId].healthPoints > 0 && starWarsCharacters[attacherId].healthPoints > 0) {
            userMessage = "You attacked " + starWarsCharacters[defenderId].characterName + " for " + starWarsCharacters[attacherId].attackPower;
            defenderMessage = starWarsCharacters[defenderId].name + " attacked you back for " + starWarsCharacters[defenderId].counterAttackPower;
            setAttackingCharacterOnScreen(attacherId);
            setDefendingCharacterOnScreen(defenderId);
        }
        else if (starWarsCharacters[defenderId].healthPoints <= 0) {
            winLossMessage = "You have defeated " + starWarsCharacters[defenderId].name + ", you can chose another enemy.";
            defenderId = -1;
        }
        else if (starWarsCharacters[defenderId].healthPoints <= 0) {
            winLossMessage = "You Won!!! GAME OVER!!!";
        }



        starWarsCharacters[attacherId].setAttackPower();
    }
});

initCharacters();
