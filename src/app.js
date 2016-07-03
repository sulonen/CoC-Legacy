(function() {
  'use strict';

  angular
    .module('app', ['ui.router'])
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider.state('intro', {
      url: '',
      controller: 'IntroController as intro',
      templateUrl: 'templates/intro.html'
    });
    $stateProvider.state('step1', {
      url: '/step1',
      controller: 'Step1Controller as step1',
      templateUrl: 'templates/step1.html'
    });
    $stateProvider.state('step2', {
      url: '/step2',
      controller: 'Step2Controller as step2',
      templateUrl: 'templates/step2.html'
    });
    $stateProvider.state('step3', {
      url: '/step3',
      controller: 'Step3Controller as step3',
      templateUrl: 'templates/step3.html'
    });
    $stateProvider.state('step4', {
      url: '/step4',
      controller: 'Step4Controller as step4',
      templateUrl: 'templates/step4.html'
    });
    $stateProvider.state('step5', {
      url: '/step5',
      controller: 'Step5Controller as step5',
      templateUrl: 'templates/step5.html'
    });
    $stateProvider.state('step6', {
      url: '/step6',
      controller: 'Step6Controller as step6',
      templateUrl: 'templates/step6.html'
    });
    $stateProvider.state('step7', {
      url: '/step7',
      controller: 'Step7Controller as step7',
      templateUrl: 'templates/step7.html'
    });
    $stateProvider.state('step8', {
      url: '/step8',
      controller: 'Step8Controller as step8',
      templateUrl: 'templates/step8.html'
    });
    $stateProvider.state('final', {
      url: '/final',
      controller: 'FinalController as final',
      templateUrl: 'templates/final.html'
    });
    $stateProvider.state('json', {
      url: '/json',
      controller: 'JSONController as json',
      templateUrl: 'templates/json.html'
    });
  }

  angular
    .module('app')
    .factory('dataService', dataService);

  dataService.$inject = ['$http', '$log'];

  function dataService($http, $log) {
    var vm = this;
    vm.$log = $log;

    // JSON
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
 
    var service = {
      getData: getData,
      setData: setData,
      data: vm
    };

    return service;
    
    function getData(callback) {
      $http.get('mock/seed.json')
          .then(callback);
    };

    function setData(response) {
      vm.data = response.data;

      vm.character = vm.data.character;
      vm.characteristics = vm.character.characteristics;
      vm.rolls = vm.character.rolls;
      vm.personalData = vm.character.personalData;
      vm.income = vm.character.income;
      vm.skills1 = vm.character.skills1;
      vm.skills2 = vm.character.skills2;
      vm.skills3 = vm.character.skills3;
      vm.weapons = vm.character.weapons;
      vm.ranged = vm.character.ranged;

      vm.tempSkills1 = {};
      vm.tempSkills2 = {};
      vm.tempSkills3 = {};
      vm.defaultSkillPoints = 0;

      vm.json = {};
      $log.info('Data load complete');
    }
    //angular.element(document.querySelector('.ng-scope')).injector().get('dataService')
  }

  angular
    .module('app')
    .controller('IntroController', IntroController);

  IntroController.$inject = ['$log', 'dataService'];
    
  function IntroController($log, dataService) {
    var vm = this;
    vm.$log = $log;

    dataService.getData(dataService.setData);
  }
  
  angular
    .module('app')
    .controller('Step1Controller', Step1Controller);
  
  Step1Controller.$inject = ['$document', '$log', 'dataService'];

  function Step1Controller($document, $log, dataService) {
    var vm = this;

    vm.moveThis = '';
    vm.moveValue = function(event) {
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

    vm.update = function() {
      dataService.data.characteristics.str[1]
        = parseInt($document[0].getElementById('str').value);
      dataService.data.characteristics.con[1]
        = parseInt($document[0].getElementById('con').value);
      dataService.data.characteristics.pow[1]
        = parseInt($document[0].getElementById('pow').value);
      dataService.data.characteristics.dex[1]
        = parseInt($document[0].getElementById('dex').value);
      dataService.data.characteristics.app[1]
        = parseInt($document[0].getElementById('app').value);
    };
  }

  angular
    .module('app')
    .controller('Step2Controller', Step2Controller);
  
  Step1Controller.$inject = ['$document', '$log', 'dataService'];
  
  function Step2Controller($document, $log, dataService) {
    var vm = this;

    vm.moveThis = '';
    vm.moveValue = function(event) {
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

    vm.update = function() {
      dataService.data.characteristics.siz[1]
        = parseInt($document[0].getElementById('siz').value);
      dataService.data.characteristics.int[1]
        = parseInt($document[0].getElementById('int').value);
    };
  }

  //    .controller('Step3Controller', function Step3Controller(vm, dataService) {
  //      var step3 = this;
  //
  //      vm.moveThis = '';
  //      vm.moveValue = function(event) {
  //        if (vm.moveThis == '' && event.target.value != '') {
  //          vm.moveThis = event.target.value;
  //          event.target.value = '';
  //          event.target.className = 'score';
  //        } else if (vm.moveThis != '' && event.target.value == '') {
  //          event.target.value = vm.moveThis;
  //          event.target.className += ' populated';
  //          vm.moveThis = '';
  //        }
  //      };
  //
  //      vm.update = function() {
  //        dataService.characteristics.edu[1] = parseInt(document.getElementById('edu').value);
  //      };
  //
  //      vm.calcScores = function() {
  //        dataService.personalData.age = dataService.characteristics.edu[1] + 6;
  //        dataService.characteristics.san[1] = dataService.characteristics.pow[1] * 5;
  //        dataService.rolls.idea[1] = dataService.characteristics.int[1] * 5;
  //        dataService.rolls.luck[1] = dataService.characteristics.pow[1] * 5;
  //        dataService.rolls.know[1] = dataService.characteristics.edu[1] * 5;
  //
  //        var damageCalc = dataService.characteristics.str[1] + dataService.characteristics.siz[1];
  //        if (damageCalc < 13) {
  //          dataService.rolls.damageBonus[1] = '-1d6';
  //        } else if (12 < damageCalc && damageCalc < 17) {
  //          dataService.rolls.damageBonus[1] = '-1D4';
  //        } else if (16 < damageCalc && damageCalc < 25) {
  //          dataService.rolls.damageBonus[1] = '+0';
  //        } else if (24 < damageCalc && damageCalc < 33) {
  //          dataService.rolls.damageBonus[1] = '+1D4';
  //        } else if (32 < damageCalc && damageCalc < 41) {
  //          dataService.rolls.damageBonus[1] = '+1D6';
  //        } else if (40 < damageCalc && damageCalc < 57) {
  //          dataService.rolls.damageBonus[1] = '+2D6';
  //        } else if (56 < damageCalc && damageCalc < 73) {
  //          dataService.rolls.damageBonus[1] = '+3D6';
  //        } else if (72 < damageCalc && damageCalc < 89) {
  //          dataService.rolls.damageBonus[1] = '+4D6';
  //        } else {
  //          dataService.rolls.damageBonus[1] = 'ERR';
  //        }
  //
  //        dataService.rolls.mythos99[1] = 99;
  //        dataService.rolls.hitpoints[1] = Math.ceil((dataService.characteristics.con[1]
  //            + dataService.characteristics.siz[1]) / 2);
  //        dataService.rolls.magicpoints[1] = dataService.characteristics.pow[1];
  //        dataService.rolls.sanpoints[1] = dataService.characteristics.san[1];
  //
  //        dataService.personalData.occupationPoints = dataService.characteristics.edu[1] * 20;
  //        dataService.personalData.interestPoints = dataService.characteristics.int[1] * 5;
  //        dataService.personalData.totalPoints = dataService.personalData.occupationPoints
  //            + dataService.personalData.interestPoints;
  //      };
  //    })
  //
  //    .controller('Step4Controller', function Step4Controller(vm, dataService) {
  //      var step4 = this;
  //
  //      vm.characteristics = dataService.characteristics;
  //      vm.rolls = dataService.rolls;
  //    })
  //
  //    .controller('Step5Controller', function Step5Controller(vm, dataService) {
  //      var step5 = this;
  //      vm.invalidAge = false;
  //
  //      vm.characteristics = dataService.characteristics;
  //      vm.personalData = dataService.personalData;
  //      vm.income = dataService.income;
  //
  //      vm.tempAge = vm.personalData.age;
  //      vm.tempEdu = vm.characteristics.edu[1];
  //
  //      vm.changeAge = function() {
  //        vm.tempOccupationPoints = vm.personalData.occupationPoints;
  //        var ageDifference = vm.tempAge - vm.personalData.age;
  //        //console.log('ageDifference == ' + ageDifference);
  //        if (60 > ageDifference && ageDifference > 49) {
  //          vm.tempEdu += 6;
  //          vm.tempOccupationPoints += 100;
  //        } else if (50 > ageDifference && ageDifference > 39) {
  //          vm.tempEdu += 4;
  //          vm.tempOccupationPoints += 80;
  //        } else if (40 > ageDifference && ageDifference > 29) {
  //          vm.tempEdu += 3;
  //          vm.tempOccupationPoints += 60;
  //        } else if (30 > ageDifference && ageDifference > 19) {
  //          vm.tempEdu += 2;
  //          vm.tempOccupationPoints += 40;
  //        } else if (20 > ageDifference && ageDifference > 9) {
  //          vm.tempEdu += 1;
  //          vm.tempOccupationPoints += 20;
  //        }
  //
  //        if (vm.tempAge >= 40) {
  //          vm.personalData.agePenalty[1] = Math.ceil((vm.tempAge - 40) / 10);
  //        }
  //
  //        if (vm.personalData.agePenalty[0] == 'con') {
  //          var tempCon = vm.characteristics.con[1] - vm.personalData.agePenalty[1];
  //          var tempHP = Math.ceil((tempCon + vm.characteristics.siz[1]) / 2);
  //
  //          if (tempCon > 0 && tempHP > 2) {
  //            vm.personalData.age = vm.tempAge;
  //            vm.characteristics.edu[1] = vm.tempEdu;
  //            vm.characteristics[vm.personalData.agePenalty[0]][1]
  //                -= vm.personalData.agePenalty[1];
  //
  //            dataService.personalData.occupationPoints = vm.tempOccupationPoints;
  //            dataService.personalData.totalPoints = dataService.personalData.occupationPoints
  //                + dataService.personalData.interestPoints;
  //
  //            vm.calcScores();
  //          } else {
  //            vm.invalidAge = true;
  //            vm.tempAge = vm.personalData.age;
  //            vm.tempEdu = vm.characteristics.edu[1];
  //            vm.tempOccupationPoints = vm.tempEdu * 20;
  //            vm.personalData.agePenalty = ['str', 0];
  //          }
  //        } else {
  //          vm.personalData.age = vm.tempAge;
  //          vm.characteristics.edu[1] = vm.tempEdu;
  //          vm.characteristics[vm.personalData.agePenalty[0]][1]
  //              -= vm.personalData.agePenalty[1];
  //
  //          dataService.personalData.occupationPoints = vm.tempOccupationPoints;
  //          dataService.personalData.totalPoints = dataService.personalData.occupationPoints
  //              + dataService.personalData.interestPoints;
  //
  //          vm.calcScores();
  //        }
  //      };
  //
  //      vm.getIncome = function() {
  //        var roll = Math.floor(Math.random() * 10) + 1;
  //        vm.personalData.annualIncome = vm.income[vm.personalData.era][roll][0];
  //        vm.personalData.additionalAssets = vm.income[vm.personalData.era][roll][1];
  //      };
  //
  //      vm.calcScores = function() {
  //        dataService.personalData.age = vm.personalData.age;
  //        dataService.personalData.agePenalty = vm.personalData.agePenalty;
  //
  //        dataService.rolls.know[1] = dataService.characteristics.edu[1] * 5;
  //
  //        var damageCalc = dataService.characteristics.str[1] + dataService.characteristics.siz[1];
  //        if (damageCalc < 13) {
  //          dataService.rolls.damageBonus[1] = '-1d6';
  //        } else if (12 < damageCalc && damageCalc < 17) {
  //          dataService.rolls.damageBonus[1] = '-1D4';
  //        } else if (16 < damageCalc && damageCalc < 25) {
  //          dataService.rolls.damageBonus[1] = '+0';
  //        } else if (24 < damageCalc && damageCalc < 33) {
  //          dataService.rolls.damageBonus[1] = '+1D4';
  //        } else if (32 < damageCalc && damageCalc < 41) {
  //          dataService.rolls.damageBonus[1] = '+1D6';
  //        } else if (40 < damageCalc && damageCalc < 57) {
  //          dataService.rolls.damageBonus[1] = '+2D6';
  //        } else if (56 < damageCalc && damageCalc < 73) {
  //          dataService.rolls.damageBonus[1] = '+3D6';
  //        } else if (72 < damageCalc && damageCalc < 89) {
  //          dataService.rolls.damageBonus[1] = '+4D6';
  //        } else {
  //          dataService.rolls.damageBonus[1] = 'ERR';
  //        }
  //
  //        dataService.rolls.hitpoints[1] = Math.ceil((dataService.characteristics.con[1]
  //            + dataService.characteristics.siz[1]) / 2);
  //        //console.log('hitpoints == ' + dataService.rolls.hitpoints[1]);
  //        dataService.rolls.magicpoints[1] = dataService.characteristics.pow[1];
  //        dataService.rolls.sanpoints[1] = dataService.characteristics.san[1];
  //      };
  //    })
  //
  //    .controller('Step6Controller', function Step6Controller(vm, dataService) {
  //      var step6 = this;
  //
  //      vm.personalData = dataService.personalData;
  //    })
  //
  //    .controller('Step7Controller', function Step7Controller(vm, dataService) {
  //      var step7 = this;
  //
  //      dataService.skills1.dodge[1] = dataService.characteristics.dex[1] * 2;
  //      dataService.skills3.langOwn[1] = dataService.characteristics.edu[1] * 5;
  //      if (dataService.skills3.langOwn[1] > 99) {
  //        dataService.skills3.langOwn[1] = 99;
  //      }
  //
  //      dataService.tempSkills1 = angular.copy(dataService.skills1);
  //      dataService.tempSkills2 = angular.copy(dataService.skills2);
  //      dataService.tempSkills3 = angular.copy(dataService.skills3);
  //
  //      vm.characteristics = dataService.characteristics;
  //      vm.rolls = dataService.rolls;
  //      vm.personalData = dataService.personalData;
  //      vm.skills1 = dataService.skills1;
  //      vm.skills2 = dataService.skills2;
  //      vm.skills3 = dataService.skills3;
  //      vm.weapons = dataService.weapons;
  //      vm.tempSkills1 = dataService.tempSkills1;
  //      vm.tempSkills2 = dataService.tempSkills2;
  //      vm.tempSkills3 = dataService.tempSkills3;
  //      vm.totalPoints = dataService.personalData.totalPoints;
  //      vm.availablePoints = dataService.personalData.totalPoints;
  //      vm.defaultSkillPoints = dataService.defaultSkillPoints;
  //
  //      vm.json = dataService.json;
  //
  //      vm.getDefaultSkillPoints = function() {
  //        var defaultPoints = 0;
  //        for (var skill1 in vm.skills1) {
  //          defaultPoints += vm.skills1[skill1][1];
  //        }
  //        for (var skill2 in vm.skills2) {
  //          defaultPoints += vm.skills2[skill2][1];
  //        }
  //        for (var skill3 in vm.skills3) {
  //          defaultPoints += vm.skills3[skill3][1];
  //        }
  //
  //        return defaultPoints;
  //      };
  //
  //      vm.defaultSkillPoints = vm.getDefaultSkillPoints();
  //
  //      vm.getProposedSkillPoints = function() {
  //        var proposedPoints = 0;
  //        for (var skill1 in vm.tempSkills1) {
  //          proposedPoints += vm.tempSkills1[skill1][1];
  //        }
  //        for (var skill2 in vm.tempSkills2) {
  //          proposedPoints += vm.tempSkills2[skill2][1];
  //        }
  //        for (var skill3 in vm.tempSkills3) {
  //          proposedPoints += vm.tempSkills3[skill3][1];
  //        }
  //
  //        return proposedPoints;
  //      };
  //
  //      vm.resetSkills = function() {
  //        dataService.skills1.dodge[1] = dataService.characteristics.dex[1] * 2;
  //        dataService.skills3.langOwn[1] = dataService.characteristics.edu[1] * 5;
  //
  //        vm.tempSkills1 = angular.copy(vm.skills1);
  //        vm.tempSkills2 = angular.copy(vm.skills2);
  //        vm.tempSkills3 = angular.copy(vm.skills3);
  //        vm.availablePoints = dataService.personalData.totalPoints;
  //
  //        document.getElementById('availablePoints').className = 'available-points';
  //      };
  //
  //      vm.updateAvailablePoints = function() {
  //        var displayPoints = document.getElementById('availablePoints');
  //        var proposedPoints = vm.getProposedSkillPoints();
  //        var pointsDifference = proposedPoints - vm.defaultSkillPoints;
  //        vm.availablePoints = vm.totalPoints - pointsDifference;
  //
  //        vm.availablePoints < 0 ? displayPoints.className
  //            = 'available-points red' : displayPoints.className = 'available-points';
  //        //console.log('default points == ' + vm.defaultSkillPoints);
  //        //console.log('proposed points == ' + proposedPoints);
  //        //console.log('points difference == ' + pointsDifference);
  //      };
  //
  //      vm.update = function() {
  //        dataService.skills1 = vm.tempSkills1;
  //        dataService.skills2 = vm.tempSkills2;
  //        dataService.skills3 = vm.tempSkills3;
  //
  //        dataService.weapons.fist[1] = dataService.skills2.fist[1];
  //        dataService.weapons.fist[2] = '1D3 ' + vm.rolls.damageBonus[1];
  //        dataService.weapons.grapple[1] = dataService.skills2.grapple[1];
  //        dataService.weapons.head[1] = dataService.skills2.headbutt[1];
  //        dataService.weapons.head[2] = '1D4 ' + vm.rolls.damageBonus[1];
  //        dataService.weapons.kick[1] = dataService.skills2.kick[1];
  //        dataService.weapons.kick[2] = '1D6 ' + vm.rolls.damageBonus[1];
  //
  //        dataService.json.personalData = dataService.personalData;
  //        dataService.json.characteristics = dataService.characteristics;
  //        dataService.json.rolls = dataService.rolls;
  //        dataService.json.skills1 = dataService.skills1;
  //        dataService.json.skills2 = dataService.skills2;
  //        dataService.json.skills3 = dataService.skills3;
  //        dataService.json.weapons = dataService.weapons;
  //      };
  //    })
  //
  //    .controller('Step8Controller', function Step8Controller(vm, dataService) {
  //      var step8 = this;
  //
  //      vm.name = dataService.personalData.name;
  //    })
  //
  //    .controller('FinalController', function FinalController(vm, dataService) {
  //      var final = this;
  //
  //      vm.character = dataService.character;
  //      vm.characteristics = dataService.characteristics;
  //      vm.rolls = dataService.rolls;
  //      vm.personalData = dataService.personalData;
  //      vm.skills1 = dataService.skills1;
  //      vm.skills2 = dataService.skills2;
  //      vm.skills3 = dataService.skills3;
  //      vm.weapons = dataService.weapons;
  //    })
  //
  //    .controller('JSONController', function Step4Controller(vm, dataService) {
  //      var json = this;
  //
  //      vm.personalData = dataService.personalData;
  //      vm.json = dataService.json;
  //      vm.output = JSON.stringify(vm.json, null, '\t');
  //    })
  //
  angular
    .module('app')
    .controller('Rolls1Controller', Rolls1Controller);
  
  function Rolls1Controller() {
    var vm = this;
    vm.rolls = rollDice(5, 3, 0);
    vm.reroll = function() {
      $document[0].getElementById('str').value = '';
      $document[0].getElementById('str').className = 'score';
      $document[0].getElementById('con').value = '';
      $document[0].getElementById('con').className = 'score';
      $document[0].getElementById('pow').value = '';
      $document[0].getElementById('pow').className = 'score';
      $document[0].getElementById('dex').value = '';
      $document[0].getElementById('dex').className = 'score';
      $document[0].getElementById('app').value = '';
      $document[0].getElementById('app').className = 'score';
      var list = $document[0].getElementById('rolls1').getElementsByTagName('input');
      for (var i = 0; i < list.length; i++) {
        list[i].className = 'score populated';
      }
      vm.rolls = rollDice(5, 3, 0);
    };
  }
  //
  //    .controller('Rolls2Controller', function() {
  //      this.rolls = rollDice(2, 2, 6);
  //      this.reroll = function() {
  //        document.getElementById('siz').value = '';
  //        document.getElementById('siz').className = 'score';
  //        document.getElementById('int').value = '';
  //        document.getElementById('int').className = 'score';
  //        var list = document.getElementById('rolls2').getElementsByTagName('input');
  //        for (var i = 0; i < list.length; i++) {
  //          list[i].className = 'score populated';
  //        }
  //        this.rolls = rollDice(2, 2, 6);
  //      };
  //    })
  //
  //    .controller('Rolls3Controller', function() {
  //      this.rolls = rollDice(1, 3, 3);
  //      this.reroll = function() {
  //        document.getElementById('edu').value = '';
  //        document.getElementById('edu').className = 'score';
  //        var list = document.getElementById('rolls3').getElementsByTagName('input');
  //        for (var i = 0; i < list.length; i++) {
  //          list[i].className = 'score populated';
  //        }
  //        this.rolls = rollDice(1, 3, 3);
  //      };
  //    });

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
    rolls.sort(function(a, b) {
      return b - a;
    });
    return rolls;
  }
})();
