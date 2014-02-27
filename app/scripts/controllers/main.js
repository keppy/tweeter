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
//
// CHAPTER 0 | :godmode:
//
// AND IT CAME TO PASS THAT IN THOS3 LANDZ THERE WAS A YOUNG HAK$ BY THE NAME
// OF OOOFLA AJANAL OBAMA KAHLIL, AND HE DID REIGHN TI PAIN
// FOR AT LEAST ANOTHER ROUND OF HAXOR SCOTCH THERE WERE NO WAYS TO GET OUT OF TRAP TRAP
// DIAMOND 11221112332
/*
                   ~III777II777I?+==++==+:
                  ???I7I???I7II++=====++===
                 ??+??????????+===~~=+++??==+
                ??+??II??????+==~=~~=+++++==++
               I+?????????+?+====~=~==+==++?==?
              ?????II?????+++++=======?===~~~~==
            ,?????II????????++++====~===::~~~~:~
            I?I??II?+++??+?+++==~~~~:~:~:,:,,:::~
           I??????+==+???++++=~~:~:~:,:::,:,,,,,::
          +I?++++=+=+????+++=~~:~~:::,,,,::,,,:,:
          I??+?+====+???+++===~~::::,::,:,,,,,,::
         I????=~===++?+=+=~==~:~~:,,,,,,,.,,,,,:~
        =??+?=~~~~??+?+===~~==,==~~~~,,,,..,,,.:=
        II++==~~=++++++=~~=~,~+=?+?=I?++=..,.,,:
     IIII?+?=====+~+++~=~~~:::=~+~===:,,,,,.,.::
    I?=?I+??+=~=~?I?=+=~~~::,~~=~::~=::,,,,,,::       ---------------
    ?+I??++=++~,::+++~~~:::,,=~~=,~,..,::.:          / It's a trap! /
    ++=+?++~=:~::I+,~=:~,:,,,,:~~......::~,,,        ---------------
     ~=~=:.++~:,.,~=::::.,,:,.:~,:=...==~,::              /
     =~?++??+=~~,.:?~.:,:,,,.,::,,~:=~=::,~              /
     ++~~:~===~:~,.~::,~=~.:,..,:,,:==:.,:7             /
     ~~,::...:=:,::+:~:.,~,...,.,,,,::~,,::~=          /
      =~===+=~~,.::,,,:::,..,,,,,,,,,,,:,..,=+?
      ~=~=~::~~~::,.,,,~:.+,..,,,,..,,,,...,+I?
      ~==~:~~:~~,~=~~:,:~,:,,,,,,....,,,..+?I?I
      ~=~=+,:~:=,:~~~~~~::::,.,,.,,.,,,..~+????I
      ~=~==~=:~~:,~~~~~:::,::,.,,,..,,,I77I?+??II
      +I7:::~~=~:,::~~~~.=.,~,,,,...,~7III?+??II7
     777?+~:=~=~~:,::~~:::.,,,,,,,,,777II??I777777
     777I==:=~::~~~~::~:::,:,:~:::,777I???777777777
    7777+,~===~:~:~~~~:::,.~:=,,:777II???77777777777=?
    777I~,~~~=~::~:,:,,,:=~~,,:7777I???I7777777777+=++
  I7777I,,:,.==::::,:,,,,::::7777I+??I77777777777??I7I7,
 ,77777I::,..~~:,,,,,,.,:~I7777I+??I777777777777?I7777777,
 77777777,...~~:,,,,,.,77777I7???II777777777777+?7777777777
77777777777:,~~~,,=7777777I???II777777777777777+77777777777
77777777777777777777777I+7?7II77777777777777777+777777777777
*/
// LITERALLY THIS WILL CONTINUE ON TILL THE PLAYGROUND IS A ASCII MODE FOR TWEETER 
// AND WE CAN JUST DUMP ASCII ALL DAY BRO

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
