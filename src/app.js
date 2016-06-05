'use strict';

const angular = require('angular');

let app = angular.module('app', ['ui-router']);

app.config(function ($stateProvider) {
  $stateProvider.state('intro', {
    url: '',
    controller: 'IntroCtrl as intro',
    templateUrl: 'templates/intro.html'
  });
  $stateProvider.state('step1', {
    url: '/step1',
    controller: 'Step1Ctrl as step1',
    templateUrl: 'templates/step1.html'
  });
  $stateProvider.state('step2', {
    url: '/step2',
    controller: 'Step2Ctrl as step2',
    templateUrl: 'templates/step2.html'
  });
  $stateProvider.state('step3', {
    url: '/step3',
    controller: 'Step3Ctrl as step3',
    templateUrl: 'templates/step3.html'
  });
  $stateProvider.state('step4', {
    url: '/step4',
    controller: 'Step4Ctrl as step4',
    templateUrl: 'templates/step4.html'
  });
  $stateProvider.state('step5', {
    url: '/step5',
    controller: 'Step5Ctrl as step5',
    templateUrl: 'templates/step5.html'
  });
  $stateProvider.state('step6', {
    url: '/step6',
    controller: 'Step6Ctrl as step6',
    templateUrl: 'templates/step6.html'
  });
  $stateProvider.state('step7', {
    url: '/step7',
    controller: 'Step7Ctrl as step7',
    templateUrl: 'templates/step7.html'
  });
  $stateProvider.state('step8', {
    url: '/step8',
    controller: 'Step8Ctrl as step8',
    templateUrl: 'templates/step8.html'
  });
  $stateProvider.state('final', {
    url: '/final',
    controller: 'FinalCtrl as final',
    templateUrl: 'templates/final.html'
  });
  $stateProvider.state('json', {
    url: '/json',
    controller: 'JSONCtrl as json',
    templateUrl: 'templates/json.html'
  });
});

app.service('dataService', function ($http) {
  var vm = this;
  vm.getData = function(callback) {
    $http.get('mock/seed.json')
      .then(callback);
  };

  // JSON
  vm.data = {};
  vm.character = {};
  vm.characteristics = {};
  vm.rolls = {};
  vm.personalData = {};
  vm.income = {};
  vm.skills1 = {};
  vm.skills2 = {};
  vm.skills3 = {};
  vm.weapons = {};
  vm.ranged = {};

  // Temporary
  vm.tempSkills1 = {};
  vm.tempSkills2 = {};
  vm.tempSkills3 = {};
  vm.defaultSkillPoints = 0;

  // Final
  vm.json = {};

  //angular.element(document.querySelector('.ng-scope')).injector().get('dataService')
});

app.controller('IntroCtrl', function IntroCtrl(dataService) {
  dataService.getData(function(response) {
    dataService.data = response.data;
    dataService.character = dataService.data.character;
    dataService.characteristics = dataService.character.characteristics;
    dataService.rolls = dataService.character.rolls;
    dataService.personalData = dataService.character.personalData;
    dataService.income = dataService.character.income;
    dataService.skills1 = dataService.character.skills1;
    dataService.skills2 = dataService.character.skills2;
    dataService.skills3 = dataService.character.skills3;
    dataService.weapons = dataService.character.weapons;
    dataService.ranged = dataService.character.ranged;
  });
});

app.controller('Step1Ctrl', function Step1Ctrl(dataService) {
  var vm = this;
  vm.moveThis = '';
  vm.moveValue = function (event) {
    if (vm.moveThis == '' && event.target.value != '') {
      vm.moveThis = event.target.value;
      event.target.value = '';
      event.target.className = 'score';
    } else if (vm.moveThis != '' && event.target.value == '') {
      event.target.value = vm.moveThis;
      event.target.className += ' populated';
      vm.moveThis = '';
    }
  };

  vm.update = function () {
    dataService.characteristics.str[1] = parseInt(document.getElementById('str').value);
    dataService.characteristics.con[1] = parseInt(document.getElementById('con').value);
    dataService.characteristics.pow[1] = parseInt(document.getElementById('pow').value);
    dataService.characteristics.dex[1] = parseInt(document.getElementById('dex').value);
    dataService.characteristics.app[1] = parseInt(document.getElementById('app').value);
  };
});

app.controller('Step2Ctrl', function Step2Ctrl(dataService) {
  var vm = this;

  vm.moveThis = '';
  vm.moveValue = function (event) {
    if (vm.moveThis == '' && event.target.value != '') {
      vm.moveThis = event.target.value;
      event.target.value = '';
      event.target.className = 'score';
    } else if (vm.moveThis != '' && event.target.value == '') {
      event.target.value = vm.moveThis;
      event.target.className += ' populated';
      vm.moveThis = '';
    }
  };

  vm.update = function () {
    dataService.characteristics.siz[1] = parseInt(document.getElementById('siz').value);
    dataService.characteristics.int[1] = parseInt(document.getElementById('int').value);
  };
});

app.controller('Step3Ctrl', function Step3Ctrl(dataService) {
  var vm = this;

  vm.moveThis = '';
  vm.moveValue = function (event) {
    if (vm.moveThis == '' && event.target.value != '') {
      vm.moveThis = event.target.value;
      event.target.value = '';
      event.target.className = 'score';
    } else if (vm.moveThis != '' && event.target.value == '') {
      event.target.value = vm.moveThis;
      event.target.className += ' populated';
      vm.moveThis = '';
    }
  };

  vm.update = function () {
    dataService.characteristics.edu[1] = parseInt(document.getElementById('edu').value);
  };

  vm.calcScores = function () {
    dataService.personalData.age = dataService.characteristics.edu[1] + 6;
    dataService.characteristics.san[1] = dataService.characteristics.pow[1] * 5;
    dataService.rolls.idea[1] = dataService.characteristics.int[1] * 5;
    dataService.rolls.luck[1] = dataService.characteristics.pow[1] * 5;
    dataService.rolls.know[1] = dataService.characteristics.edu[1] * 5;

    var damageCalc = dataService.characteristics.str[1] + dataService.characteristics.siz[1];
    if (damageCalc < 13) {
      dataService.rolls.damageBonus[1] = '-1d6';
    } else if (12 < damageCalc && damageCalc < 17) {
      dataService.rolls.damageBonus[1] = '-1D4';
    } else if (16 < damageCalc && damageCalc < 25) {
      dataService.rolls.damageBonus[1] = '+0';
    } else if (24 < damageCalc && damageCalc < 33) {
      dataService.rolls.damageBonus[1] = '+1D4';
    } else if (32 < damageCalc && damageCalc < 41) {
      dataService.rolls.damageBonus[1] = '+1D6';
    } else if (40 < damageCalc && damageCalc < 57) {
      dataService.rolls.damageBonus[1] = '+2D6';
    } else if (56 < damageCalc && damageCalc < 73) {
      dataService.rolls.damageBonus[1] = '+3D6';
    } else if (72 < damageCalc && damageCalc < 89) {
      dataService.rolls.damageBonus[1] = '+4D6';
    } else {
      dataService.rolls.damageBonus[1] = 'ERR';
    }

    dataService.rolls.mythos99[1] = 99;
    dataService.rolls.hitpoints[1] = Math.ceil((dataService.characteristics.con[1]
        + dataService.characteristics.siz[1]) / 2);
    dataService.rolls.magicpoints[1] = dataService.characteristics.pow[1];
    dataService.rolls.sanpoints[1] = dataService.characteristics.san[1];

    dataService.personalData.occupationPoints = dataService.characteristics.edu[1] * 20;
    dataService.personalData.interestPoints = dataService.characteristics.int[1] * 5;
    dataService.personalData.totalPoints = dataService.personalData.occupationPoints
        + dataService.personalData.interestPoints;
  };
});

app.controller('Step4Ctrl', function Step4Ctrl(dataService) {
  var vm = this;

  vm.characteristics = dataService.characteristics;
  vm.rolls = dataService.rolls;
});

app.controller('Step5Ctrl', function Step5Ctrl(dataService) {
  var vm = this;
  vm.invalidAge = false;

  vm.characteristics = dataService.characteristics;
  vm.personalData = dataService.personalData;
  vm.income = dataService.income;

  vm.tempAge = vm.personalData.age;
  vm.tempEdu = vm.characteristics.edu[1];

  vm.changeAge = function () {
    vm.tempOccupationPoints = vm.personalData.occupationPoints;
    var ageDifference = vm.tempAge - vm.personalData.age;
    //console.log('ageDifference == ' + ageDifference);
    if (60 > ageDifference && ageDifference > 49) {
      vm.tempEdu += 6;
      vm.tempOccupationPoints += 100;
    } else if (50 > ageDifference && ageDifference > 39) {
      vm.tempEdu += 4;
      vm.tempOccupationPoints += 80;
    } else if (40 > ageDifference && ageDifference > 29) {
      vm.tempEdu += 3;
      vm.tempOccupationPoints += 60;
    } else if (30 > ageDifference && ageDifference > 19) {
      vm.tempEdu += 2;
      vm.tempOccupationPoints += 40;
    } else if (20 > ageDifference && ageDifference > 9) {
      vm.tempEdu += 1;
      vm.tempOccupationPoints += 20;
    }

    if (vm.tempAge >= 40) {
      vm.personalData.agePenalty[1] = Math.ceil((vm.tempAge - 40) / 10);
    }

    if (vm.personalData.agePenalty[0] == 'con') {
      var tempCon = vm.characteristics.con[1] - vm.personalData.agePenalty[1];
      var tempHP = Math.ceil((tempCon + vm.characteristics.siz[1]) / 2);

      if (tempCon > 0 && tempHP > 2) {
        vm.personalData.age = vm.tempAge;
        vm.characteristics.edu[1] = vm.tempEdu;
        vm.characteristics[vm.personalData.agePenalty[0]][1]
            -= vm.personalData.agePenalty[1];

        dataService.personalData.occupationPoints = vm.tempOccupationPoints;
        dataService.personalData.totalPoints = dataService.personalData.occupationPoints
            + dataService.personalData.interestPoints;

        vm.calcScores();
      } else {
        vm.invalidAge = true;
        vm.tempAge = vm.personalData.age;
        vm.tempEdu = vm.characteristics.edu[1];
        vm.tempOccupationPoints = vm.tempEdu * 20;
        vm.personalData.agePenalty = ['str', 0];
      }
    } else {
      vm.personalData.age = vm.tempAge;
      vm.characteristics.edu[1] = vm.tempEdu;
      vm.characteristics[vm.personalData.agePenalty[0]][1]
          -= vm.personalData.agePenalty[1];

      dataService.personalData.occupationPoints = vm.tempOccupationPoints;
      dataService.personalData.totalPoints = dataService.personalData.occupationPoints
          + dataService.personalData.interestPoints;

      vm.calcScores();
    }
  };

  vm.getIncome = function () {
    var roll = Math.floor(Math.random() * 10) + 1;
    vm.personalData.annualIncome = vm.income[vm.personalData.era][roll][0];
    vm.personalData.additionalAssets = vm.income[vm.personalData.era][roll][1];
  };

  vm.calcScores = function () {
    dataService.personalData.age = vm.personalData.age;
    dataService.personalData.agePenalty = vm.personalData.agePenalty;

    dataService.rolls.know[1] = dataService.characteristics.edu[1] * 5;

    var damageCalc = dataService.characteristics.str[1] + dataService.characteristics.siz[1];
    if (damageCalc < 13) {
      dataService.rolls.damageBonus[1] = '-1d6';
    } else if (12 < damageCalc && damageCalc < 17) {
      dataService.rolls.damageBonus[1] = '-1D4';
    } else if (16 < damageCalc && damageCalc < 25) {
      dataService.rolls.damageBonus[1] = '+0';
    } else if (24 < damageCalc && damageCalc < 33) {
      dataService.rolls.damageBonus[1] = '+1D4';
    } else if (32 < damageCalc && damageCalc < 41) {
      dataService.rolls.damageBonus[1] = '+1D6';
    } else if (40 < damageCalc && damageCalc < 57) {
      dataService.rolls.damageBonus[1] = '+2D6';
    } else if (56 < damageCalc && damageCalc < 73) {
      dataService.rolls.damageBonus[1] = '+3D6';
    } else if (72 < damageCalc && damageCalc < 89) {
      dataService.rolls.damageBonus[1] = '+4D6';
    } else {
      dataService.rolls.damageBonus[1] = 'ERR';
    }

    dataService.rolls.hitpoints[1] = Math.ceil((dataService.characteristics.con[1]
        + dataService.characteristics.siz[1]) / 2);
    //console.log('hitpoints == ' + dataService.rolls.hitpoints[1]);
    dataService.rolls.magicpoints[1] = dataService.characteristics.pow[1];
    dataService.rolls.sanpoints[1] = dataService.characteristics.san[1];
  };
});

app.controller('Step6Ctrl', function Step6Ctrl(dataService) {
  var vm = this;

  vm.personalData = dataService.personalData;
});

app.controller('Step7Ctrl', function Step7Ctrl(dataService) {
  var vm = this;

  dataService.skills1.dodge[1] = dataService.characteristics.dex[1] * 2;
  dataService.skills3.langOwn[1] = dataService.characteristics.edu[1] * 5;
  if (dataService.skills3.langOwn[1] > 99) {
    dataService.skills3.langOwn[1] = 99;
  }

  dataService.tempSkills1 = angular.copy(dataService.skills1);
  dataService.tempSkills2 = angular.copy(dataService.skills2);
  dataService.tempSkills3 = angular.copy(dataService.skills3);

  vm.characteristics = dataService.characteristics;
  vm.rolls = dataService.rolls;
  vm.personalData = dataService.personalData;
  vm.skills1 = dataService.skills1;
  vm.skills2 = dataService.skills2;
  vm.skills3 = dataService.skills3;
  vm.weapons = dataService.weapons;
  vm.tempSkills1 = dataService.tempSkills1;
  vm.tempSkills2 = dataService.tempSkills2;
  vm.tempSkills3 = dataService.tempSkills3;
  vm.totalPoints = dataService.personalData.totalPoints;
  vm.availablePoints = dataService.personalData.totalPoints;
  vm.defaultSkillPoints = dataService.defaultSkillPoints;

  vm.json = dataService.json;

  vm.getDefaultSkillPoints = function () {
    var defaultPoints = 0;
    for (var skill1 in vm.skills1) {
      defaultPoints += vm.skills1[skill1][1];
    }
    for (var skill2 in vm.skills2) {
      defaultPoints += vm.skills2[skill2][1];
    }
    for (var skill3 in vm.skills3) {
      defaultPoints += vm.skills3[skill3][1];
    }

    return defaultPoints;
  };

  vm.defaultSkillPoints = vm.getDefaultSkillPoints();

  vm.getProposedSkillPoints = function () {
    var proposedPoints = 0;
    for (var skill1 in vm.tempSkills1) {
      proposedPoints += vm.tempSkills1[skill1][1];
    }
    for (var skill2 in vm.tempSkills2) {
      proposedPoints += vm.tempSkills2[skill2][1];
    }
    for (var skill3 in vm.tempSkills3) {
      proposedPoints += vm.tempSkills3[skill3][1];
    }

    return proposedPoints;
  };

  vm.resetSkills = function () {
    dataService.skills1.dodge[1] = dataService.characteristics.dex[1] * 2;
    dataService.skills3.langOwn[1] = dataService.characteristics.edu[1] * 5;

    vm.tempSkills1 = angular.copy(vm.skills1);
    vm.tempSkills2 = angular.copy(vm.skills2);
    vm.tempSkills3 = angular.copy(vm.skills3);
    vm.availablePoints = dataService.personalData.totalPoints;

    document.getElementById('availablePoints').className = 'available-points';
  };

  vm.updateAvailablePoints = function () {
    var displayPoints = document.getElementById('availablePoints');
    var proposedPoints = vm.getProposedSkillPoints();
    var pointsDifference = proposedPoints - vm.defaultSkillPoints;
    vm.availablePoints = vm.totalPoints - pointsDifference;

    vm.availablePoints < 0 ? displayPoints.className
        = 'available-points red' : displayPoints.className = 'available-points';
    //console.log('default points == ' + vm.defaultSkillPoints);
    //console.log('proposed points == ' + proposedPoints);
    //console.log('points difference == ' + pointsDifference);
  };

  vm.update = function () {
    dataService.skills1 = vm.tempSkills1;
    dataService.skills2 = vm.tempSkills2;
    dataService.skills3 = vm.tempSkills3;

    dataService.weapons.fist[1] = dataService.skills2.fist[1];
    dataService.weapons.fist[2] = '1D3 ' + vm.rolls.damageBonus[1];
    dataService.weapons.grapple[1] = dataService.skills2.grapple[1];
    dataService.weapons.head[1] = dataService.skills2.headbutt[1];
    dataService.weapons.head[2] = '1D4 ' + vm.rolls.damageBonus[1];
    dataService.weapons.kick[1] = dataService.skills2.kick[1];
    dataService.weapons.kick[2] = '1D6 ' + vm.rolls.damageBonus[1];

    dataService.json.personalData = dataService.personalData;
    dataService.json.characteristics = dataService.characteristics;
    dataService.json.rolls = dataService.rolls;
    dataService.json.skills1 = dataService.skills1;
    dataService.json.skills2 = dataService.skills2;
    dataService.json.skills3 = dataService.skills3;
    dataService.json.weapons = dataService.weapons;
  };
});

app.controller('Step8Ctrl', function Step8Ctrl(dataService) {
  var vm = this;

  vm.name = dataService.personalData.name;
});

app.controller('FinalCtrl', function FinalCtrl(dataService) {
  var vm = this;

  vm.character = dataService.character;
  vm.characteristics = dataService.characteristics;
  vm.rolls = dataService.rolls;
  vm.personalData = dataService.personalData;
  vm.skills1 = dataService.skills1;
  vm.skills2 = dataService.skills2;
  vm.skills3 = dataService.skills3;
  vm.weapons = dataService.weapons;

  // vm.createPDF = function() {

  // };
});

app.controller('JSONCtrl', function Step4Ctrl(dataService) {
  var vm = this;

  vm.personalData = dataService.personalData;
  vm.json = dataService.json;
  vm.output = JSON.stringify(vm.json, null, '\t');
});

app.controller('Rolls1Ctrl', function () {
  this.rolls = rollDice(5, 3, 0);
  this.reroll = function () {
    document.getElementById('str').value = '';
    document.getElementById('str').className = 'score';
    document.getElementById('con').value = '';
    document.getElementById('con').className = 'score';
    document.getElementById('pow').value = '';
    document.getElementById('pow').className = 'score';
    document.getElementById('dex').value = '';
    document.getElementById('dex').className = 'score';
    document.getElementById('app').value = '';
    document.getElementById('app').className = 'score';
    var list = document.getElementById('rolls1').getElementsByTagName('input');
    for (var i = 0; i < list.length; i++) {
      list[i].className = 'score populated';
    }
    this.rolls = rollDice(5, 3, 0);
  };
});

app.controller('Rolls2Ctrl', function () {
  this.rolls = rollDice(2, 2, 6);
  this.reroll = function () {
    document.getElementById('siz').value = '';
    document.getElementById('siz').className = 'score';
    document.getElementById('int').value = '';
    document.getElementById('int').className = 'score';
    var list = document.getElementById('rolls2').getElementsByTagName('input');
    for (var i = 0; i < list.length; i++) {
      list[i].className = 'score populated';
    }
    this.rolls = rollDice(2, 2, 6);
  };
});

app.controller('Rolls3Ctrl', function () {
  this.rolls = rollDice(1, 3, 3);
  this.reroll = function () {
    document.getElementById('edu').value = '';
    document.getElementById('edu').className = 'score';
    var list = document.getElementById('rolls3').getElementsByTagName('input');
    for (var i = 0; i < list.length; i++) {
      list[i].className = 'score populated';
    }
    this.rolls = rollDice(1, 3, 3);
  };
});

/*
 * Utility functions
 */
function rollDice(numRolls, numDice, modifier) {
  var rolls = [];
  for (var i = 0; i < numRolls; i++) {
    var roll = 0;
    for (var t = 0; t < numDice; t++) {
      roll += Math.floor(Math.random() * 6) + 1;
    }
    roll += modifier;
    rolls.push(roll);
  }
  rolls.sort(function (a, b) {
    return b - a;
  });
  return rolls;
}
