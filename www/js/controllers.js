angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope) {  })

  .controller('StarsCtrl', function ($scope, $state, $ionicModal, CameraSvc, TakePhotoActionSheet, DataService) {
    var vm = this;

    // SET UP DATA
    DataService.query().then(function (data) {
      vm.stars = data;
    });

    $ionicModal.fromTemplateUrl('templates/add-star.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      vm.modal = modal;
    });

    // UI ACTIONS
    vm.remove = function (id) {
      DataService.remove(id).then(function (data) {
        vm.stars = data;
      });
    };

    vm.showModal = function () {
      $scope.newStar = {
        stars: 1
      };
      vm.modal.show();
    };

    $scope.dismissModal = function () {
      vm.modal.hide();
    };

    $scope.save = function (newStar) {
      // you can't seem to use "controller as" syntax with the ionic modals
      DataService.post(
        angular.extend(newStar, {dateCreated: new Date()})
      ).then(function () {
          vm.modal.hide();
          $state.reload();
        });
    };

    $scope.showPhotoActionSheet = function () {
      TakePhotoActionSheet.getPhoto().then(function (imageURI) {
        $scope.newStar.imgUrl = imageURI;
      });
    };
  })


  .controller('StarsDetailCtrl', function ($state, $log, $stateParams, $ionicHistory, $ionicActionSheet, TakePhotoActionSheet, DataService, star) {
    var vm = this;

    vm.star = star;
    vm.id = $stateParams.starId;

    // ACTIONS
    vm.toggleEdit = function (editMode) {
      vm.editMode = editMode;
    };

    vm.showPhotoActionSheet = function () {
      TakePhotoActionSheet.getPhoto().then(function (imageURI) {
        vm.star.imageUrl = imageURI;
      });
    };

    vm.showDeletePhotoActionSheet = function () {
      var hideSheet = $ionicActionSheet.show({
        destructiveText: 'Delete photo',
        cancelText: 'Cancel',
        destructiveButtonClicked: function () {
          vm.star.imgUrl = null;
          hideSheet();
        }
      });
    };

    vm.showDeleteActionSheet = function () {
      $ionicActionSheet.show({
        destructiveText: 'Delete star',
        cancelText: 'Cancel',
        destructiveButtonClicked: function () {
          DataService.remove(vm.id).then(function () {
            $ionicHistory.nextViewOptions({
              disableBack: true,
              historyRoot: true,
              disableAnimate: true,
            });
            $state.go('tab.stars', {reload: true});
          });
        }
      })
    };

    vm.save = function () {
      DataService.update(vm.id, vm.star).then(function () {
        vm.editMode = false;
      });
    };
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });


