'use-strict';

juke.directive("albumList", function () {
	return {
		restrict: "E",
		scope: {
			albums: '='
		},
		templateUrl: "/js/albumList/templates/albumList.html"
	};
})