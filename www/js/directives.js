/**
 * Created by ben on 4/8/15.
 */

angular.module('starter.directives', [])

  .directive('stars', function () {
    var directive = {
      restrict: 'E',
      scope: {
        rating: '=',
        class: '@'
      },
      transclude: 'element'
    };

    directive.link = function (scope, element, attributes, controllers, transcludeFn) {
      var container = angular.element('<div class="star-container"></div>').addClass(scope.class);

      scope.$watch('rating', function (newRating) {
        container.empty();

        transcludeFn(scope, function (compile) {
          for (var i = 0; i < newRating; i += 1) {
            container.append('<i class="icon ion-ios-star"></i>');
          }

          for (i = newRating; i < 5; i += 1) {
            container.append('<i class="icon ion-ios-star-outline"></i>');
          }

          element.after(container);
        });
      });
    };

    return directive;
  })

  .directive('starInput', function () {
    var directive = {
      restrict: 'E',
      scope: {
        rating: '='
      },
      templateUrl: 'templates/directives/star-input.html',
      link: function (scope, element, attributes) {
        scope.options = [1, 2, 3, 4, 5];

        scope.rate = function (value) {
          scope.rating = value;
        }
      }
    };

    return directive;
  });
