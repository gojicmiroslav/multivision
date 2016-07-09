// put toastr global variable in the service dependency injection
angular.module('app').value('mvToastr', toastr);

// creating notifier service base on that
angular.module('app').factory('mvNotifier', function(mvToastr){
	return {
		notify: function(msg) {
			mvToastr.success(msg);
			console.log(msg);
		}
	}
});