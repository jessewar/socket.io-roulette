$(function () {
	var username = prompt('Type a username');
	var $chatInput = $('.chatInput');

	// Events
	$(window).keypress(function (e) {
		var enter = e.keyCode === 13;
		if (enter) {
			var text = $chatInput.val();
			$chatInput.val('');
			sendMessage(text);
		}
	});

	$(window).click(function () {
		$chatInput.focus();
	});

	function sendMessage (message) {
		// Socketio stuff
		postMessage(username, message);
	}

	function postMessage (username, message) {
		var $usernameArea = $('<div/>').addClass('username').html(username);
		var $messageArea = $('<div/>').addClass('messageArea').html(message);
		$('<li/>').html($usernameArea + $messageArea);
		// $('.chatArea').append()

		// Scroll to bot
	}
});