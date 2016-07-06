angular.module('camomileApp.controllers.evidence', [
    "ngSanitize",
  ])
  .controller(
    'EvidenceCtrl', ['$scope', '$sce', 'Camomile', 'Campaign',
    function ($scope, $sce, Camomile, Campaign) {

    // campaign corpus
    $scope.corpus = undefined;

    // evidence status
    $scope.evidence = {};

    // list of names
    $scope.evidence.names = [];

    $scope.evidence.images = {};

    // get campaign corpus
    var getCorpus = function () {

      var options = {
        returns_id: true,
        filter: {name: Campaign.name}
      };

      var callback = function (err, data) {

        var corpora;
        if (err) {
          corpora = [];
        } else {
          corpora = data;
        }

        if (corpora.length == 1) {
          var corpus_id = corpora[0];
          $scope.$apply(function () {
            $scope.corpus = corpus_id;
          });
        }
      };

      Camomile.getCorpora(callback, options);

    };

    // update list of names
    var getNames = function () {
      var path = 'annotation.evidence';
      var corpus = $scope.corpus;
      Camomile.getCorpusMetadataKeys(corpus, path, function (err, data) {
        var names;
        if (err) {
          names = [];
        } else {
          names = data.sort();
        }

        // nested in $scope.$apply to make sure a change event is triggered
        $scope.$apply(function () {
          $scope.evidence.names = names;
        });
      });
    };

    function getImagesCallback(name) {
      var callback = function (err, image) {
        var image;
        if (err) {
          console.log('Cannnot retrieve image for ' + name + '.');
          return;
        } else {
          console.log('Retrieved image for ' + name + '.')
          image = 'data:image/png;base64,' + image.data;
          // image = Base64.decode(image.data);
        }

        // nested in $scope.$apply to make sure a change event is triggered
        $scope.$apply(function () {
          $scope.evidence.images[name] = image;
        });
      };
      return callback
    }


    // update images
    var getImages = function() {
      for (var i = 0; i < $scope.evidence.names.length; i++) {
        var name = $scope.evidence.names[i];
        var path = 'annotation.evidence.' + name + '.0.image';
        var corpus = $scope.corpus;
        Camomile.getCorpusMetadata(corpus, path, getImagesCallback(name));
      }
    };

    // get campaign corpus on load
    getCorpus();

    // make sure to update corpus on login/logout
    $scope.$parent.onLogInOrOut(getCorpus);

    // update list of evidences
    $scope.$watch('corpus', function () {
      console.log('About to getNames');
      getNames();
    });

    // update list of evidences
    $scope.$watch('evidence.names', function () {
      console.log('About to getImages');
      getImages();
    });


    // $scope.$watch('browse.medium', function () {
    //   $scope.browse.mediumSrc = [{
    //     src: $sce.trustAsResourceUrl(Camomile.getMediumURL($scope.browse.medium, "mp4")),
    //     type: "video/mp4"
    //   }, {
    //     src: $sce.trustAsResourceUrl(Camomile.getMediumURL($scope.browse.medium, "ogg")),
    //     type: "video/ogg"
    //   }];
    // });

  }]);
