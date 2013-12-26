'use strict';
// James Dominguez
//
// Written to connect to an API endpoint at /api/v1
//
// v 0
// This draft uses $http and allows the user to view a stream of tweets,
// load more tweets, favorite tweets, retweet, and write new tweets.
// We would configure this client to use an API token to secure
// this application in a serious deployment. Server side code for
// this token exists already.

// Main controller for the twitter app.

angular.module('tweeterApp')
  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.loggedIn = false;

    // $http function for loading in the timeline of tweets.
    $scope.getTweets = function () {

      var uri = '/api/v1/users/' + $scope.userId + '/tweets';

      $http({method: 'GET', url: uri}).
        success(function(data, status) {
          $scope.stats = status;
          $scope.tweets = data;
        }).
        error(function(data, status) {
          $scope.stats = status;
          $scope.data = data;
        });
    };

    // API call to check for a logged in user, 
    // populating $scope.loggedIn and $scope.currentUser
    var init = function () {
      if ($scope.loggedIn === false) {

        $http({method: 'GET', url: 'api/v1/users'}).
          success(function(data, status) {
            if (typeof data.id === "number") {
              $scope.loggedIn = true;
              $scope.userId = data.id;

              $scope.getTweets();
            }
            else {
              $scope.loggedIn = false;
            }
          }).
          error(function(data, status){
            $scope.loggedIn = false;
          });

      }
    };

    init();

    // Send a new tweet if there is text in the input
    $scope.sendTweet = function () {
      if (this.text) {
        var request = {twitter_action: 'new', tweet: this.text};
        var uri = '/api/v1/users/' + $scope.userId + '/tweets';

        $http({method: 'POST', url: uri, data: request}).
          success(function(data, status) {
            $scope.stats = status;
            $scope.data = data;
          }).
          error(function(data, status) {
            $scope.stats = status;
            $scope.data = data;
          });
	this.text = "";
       }
   };

   // Retweet an existing tweet
   $scope.reTweet = function(tweet) {

     // Style the tweet with ngClass
     tweet.retweeted = true;

     var id = tweet.id_str;
     var request = {twitter_action: 'retweet', tweet_id: id};
     var uri = '/api/v1/users/' + $scope.userId + '/tweets';

     $http({method: 'POST', url: uri, data: request}).
       success(function(data, status) {
         $scope.stats = status;
         $scope.data = data;
       }).
       error(function(data, status){
         $scope.stats = status;
         $scope.data = data;
       });
   };

   // Favorite an existing tweet
   $scope.favoriteTweet = function(tweet) {

     // Style the tweet with ngClass
     tweet.favorited = true;

     var id = tweet.id_str;
     var request = {twitter_action: 'favorite', tweet_id: id};
     var uri = '/api/v1/users/' + $scope.userId + '/tweets';

     $http({method: 'POST', url: uri, data: request}).
       success(function(data, status) {
         $scope.stats = status;
         $scope.data = data;
       }).
       error(function(data, status) {
         $scope.stats = status;
         $scope.data = data;
       });
   };
}]);
