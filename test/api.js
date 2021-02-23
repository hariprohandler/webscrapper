var http = require('http');

module.exports = {

	post: function(data, callback) {
		var req = http.request({
			hostname: 'localhost:8081',
			path: '/scrape',
			method: 'POST'
		}, function(response) {
			var data = '';
			response.on('data', function(chunk) {
				data += chunk;
			});

			response.on('end', function() {
				callback(null, JSON.parse(data));
			});
		});

		req.write(JSON.stringify(data));

		req.end();
	}
};