angular.module('camomile.services', [])

.factory('Camomile', ['camomileConfig', function (camomileConfig) {

  Camomile.setURL(camomileConfig.backend);
  return Camomile;

}])

.factory('Campaign', ['campaignConfig', function(campaignConfig) {

  return campaignConfig;

}]);
