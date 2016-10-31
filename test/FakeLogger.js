module.exports = function() {
	var messages = [];

	function log(message) {
		messages.push(message);
	}

	function logged(message) {
		return messages.find(function(loggedMessage) {
			return message === loggedMessage;
		});
	}

	return {
		log: log,
		logged: logged
	};
}