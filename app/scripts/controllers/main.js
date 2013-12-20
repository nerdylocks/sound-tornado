'use strict';

LikeStream.controller('UserMgmt', function($scope, $rootScope, $route, $http, $route, $cookies, $cookieStore){
    OAuth.initialize('bKANLpsjGu9trGEcW-ZxuFpbkiM');

    var API_ENDPOINT = 'https://api.soundcloud.com/';
    var me = 'me.json?oauth_token=';
    var users = 'ueser?oauth_token=';

    $rootScope.LogIn = function () {
        OAuth.popup('soundcloud', function (error, result) {
            //use result.access_token in your API request
            if (error) {
                alert(error);
            } else {
                // Get access token, store it in cookies
                $cookies.access_token = result.access_token;
                $rootScope.GetUserProfile(result.access_token);
            }
        });
    }

    $rootScope.LogOut = function(){
        $cookieStore.remove($cookies.access_token);
        $cookieStore.remove("access_token");
        $rootScope.User = "";
        $route.reload();
    }

    $rootScope.GetUserProfile = function(access_token){
        $http.get(API_ENDPOINT + me + access_token).success(function(data){
            $cookieStore.put(access_token, data);
            $rootScope.User = $cookieStore.get(access_token);
            console.log($rootScope.User);
            $route.reload();
        });
    }

    $rootScope.User =  $cookieStore.get($cookies.access_token);
    console.log($rootScope.User);
});
LikeStream.controller('MainCtrl', function ($scope, $http, $rootScope, $cookies, $cookieStore) {

    var widgetIframe = document.getElementById('sc-widget'),
        widget       = SC.Widget(widgetIframe);

    if($rootScope.User){
        $http.get($rootScope.User.uri + '/followings.json?oauth_token=' + $cookies.access_token).success(function(data){
            $scope.followers = data;
        });
    }
    $scope.getLikes = function(user_id){
        $http.get('https://api.soundcloud.com/users/' + user_id + '/favorites.json?oauth_token=' + $cookies.access_token).success(function(data){
            $scope.favs = data;
        });
    }
    
    $scope.togglePlay = function(track){

        widget.load(track, {
            show_artwork: false,
            auto_play:true,
            show_comments:false,
            buying:false,
            liking:false,
            sharing:false,
            show_playcount:false,
            show_user:false,
        });

    }

});

LikeStream.controller('Likes', function ($scope, $rootScope,$routeParams, $http, $cookies) {
    if($rootScope.User){

    }
});
