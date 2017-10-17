(function() {

	/**
    * Return String with unique letters, in order from given string
    * @method get_letters
    * @param {string} sentence - string to manipulate
    */
	var get_letters = function(sentence) {

		var result = "";
		
		// Check input is of type String
		if(typeof sentence === 'string' || sentence instanceof String) {
			// Firstly, remove all special chars and numbers with Regex from string
			// Secondly, convert string to lower case
			var myString = sentence.replace(/[^A-Za-z]+/g, '').toLowerCase();

			// Loop through string to check if char exists, if not - add to resulting string
			for(var i=0; i < myString.length; i++) {
				if(result.indexOf(myString.charAt(i))==-1){
					result += myString.charAt(i);
				}
			}

			// Split the result to use Array sort function by char, then join string
			result = result.split('').sort().join('');

		} else {
			result = 'Input was not a String';
		}
		
		return result;
	};

	/**
	* Window onload event, create test cases in console log
	*/
	window.onload = function() {
		console.log("--- READY! ---");
		console.log("+++ Test Case 1 +++");
		console.log("Input: A quick brown fox jumps over the lazy dog");
		console.log("Output: abcdefghijklmnopqrstuvwxyz");
		console.log("Result: " + get_letters("A quick brown fox jumps over the lazy dog"));
		console.log("+++ Test Case 2 +++");
		console.log("Input: A slow yellow fox crawls under the proactive dog");
		console.log("Output: acdefghilnoprstuvwxy");
		console.log("Result: " + get_letters("A slow yellow fox crawls under the proactive dog"));
		console.log("+++ Test Case 3 +++");
		console.log("Input: Lions, and tigers, and bears, oh my!");
		console.log("Output: abdeghilmnorsty");
		console.log("Result: " + get_letters("Lions, and tigers, and bears, oh my!"));
		console.log("+++ Test Case 4 +++");
		console.log("Input: Hello, my name is 12-345");
		console.log("Output: aehilmnosy");
		console.log("Result: " + get_letters("Hello, my name is 1234"));
		console.log("+++ Test Case 5 +++");
		console.log("Input:             1122288$$(((**$$$$");
		console.log("Output: ");
		console.log("Result: " + get_letters("             1122288$$(((**$$$$"));
		console.log("+++ Test Case 6 +++");
		console.log("Input: Array object []");
		console.log("Output: Error");
		console.log("Result: " + get_letters(['hi','my','name','is']));
	};

})();