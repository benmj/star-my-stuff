angular.module('starter.services', [])

  .factory('Chats', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
      id: 0,
      name: 'Ben Sparrow',
      lastText: 'You on your way?',
      face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
    }, {
      id: 1,
      name: 'Max Lynx',
      lastText: 'Hey, it\'s me',
      face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
    }, {
      id: 2,
      name: 'Andrew Jostlin',
      lastText: 'Did you get the ice cream?',
      face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
    }, {
      id: 3,
      name: 'Adam Bradleyson',
      lastText: 'I should buy a boat',
      face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
    }, {
      id: 4,
      name: 'Perry Governor',
      lastText: 'Look at my mukluks!',
      face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
    }];

    return {
      all: function () {
        return chats;
      },
      remove: function (chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function (chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      }
    };
  })

  .factory('DataService', function ($http, $q) {
    var data = {
      "items": {
        "abcd": {
          "title": "Showering",
          "description": "Showering would be more fun if there wasn't so much soap. Maybe if there was soup instead. That would be grand.",
          "stars": 3,
          "dateCreated": "2015-04-08T05:06:33.340Z",
          "imgUrl": "http://cdn.meme.am/instances/56160411.jpg"
        },
        "efgh": {
          "title": "Books",
          "description": "I read a book once. This book was called The Great Gatsby. What happened in it? Don't remember. But they made a movie, so it can't be that bad.",
          "stars": 4,
          "dateCreated": "2015-04-08T05:06:33.340Z",
          "imgUrl": "http://previewcf.turbosquid.com/Preview/2014/08/01__15_05_14/MMDBK001a.jpg47e400e2-3cb8-4600-808d-e6aa90bcdd96Larger.jpg"
        },
        "hijk": {
          "title": "Bacon",
          "description": "Showering would be more fun if there wasn't so much soap. Maybe if there was soup instead. That would be grand.",
          "stars": 5,
          "dateCreated": "2015-04-08T05:06:33.340Z",
          "imgUrl": "http://blog.estately.com/assets/kevin-bacon-art-jason-mecier.jpg"
        }
      }
    };

    return {
      query: function () {
        return $q.when(data);
      },
      get: function (id) {
        return $q.when(data.items[id]);
      },
      post: function (newStar) {
        var id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 4);

        data.items[id] = newStar;

        return $q.when(data);
      },
      /**
       * Update the star on the server
       * @param {number} id
       * @param {object} star
       * @returns {Promise}
       */
      update: function (id, star) {
        data.items[id] = star;
        return $q.when(data);
      },
      remove: function (id) {
        delete data.items[id];
        return $q.when(data);
      }
    };
  })

  .factory('CameraSvc', ['$q', function ($q) {
    return {
      getPicture: function (options) {
        var q = $q.defer();
        console.log(options);

        navigator.camera.getPicture(function (result) {
          // Do any magic you need
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        }, options);

        return q.promise;
      }
    }
  }])

  .factory('TakePhotoActionSheet', function ($q, $ionicActionSheet) {
    return {
      getPhoto: function () {
        var dfd = $q.defer();

        $ionicActionSheet.show({
          buttons: [{
            'text': 'Take photo'
          }, {
            'text': 'Choose from Library'
          }],
          cancelText: 'Cancel',
          buttonClicked: function (index) {
            CameraSvc.getPicture({
              allowEdit: true,
              sourceType: index === 0 ? Camera.PictureSourceType.CAMERA : Camera.PictureSourceType.PHOTOLIBRARY
            }).then(function (imageURI) {
              dfd.resolve(imageURI);
            }, function (err) {
              console.err(err);
            });
          }
        });

        return dfd.promise;
      }
    }
  });
