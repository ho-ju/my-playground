(function() {

	/**
    * Particle constructor
    * @param {int} initPos - position in chamber
    */
	var Particle = function(initPos, direction) {
		this.pos = initPos;
		this.dir = direction;
	};

	/**
    * Animation constructor, set chamber size and properties
    * @param {string} particles - input of particles
    */
	var Animation = function(particles) {
		this.size = particles.length;

		// Set other properties
		// Store array of type particles(position, direction)
		// Determine direction
		// Determin blank spaces
		// Set position
	};

	/**
    * Animate a given particle
    * @method animate
    * @param {int} speed - number of positions each particle should move
    */
	Animation.prototype.animate = function(speed) {
		// setPositions(particle) new position in chamber based on direction and speed
		// Return chamber display
	};

	/**
    * Set position of a given particle in the chamber
    * @method setPosition
    * @param {int} particle - particle to be moved
    */
	Animation.prototype.setPositions = function(particle) {
		// Determine new position
		// Determine if particle is still in chamber
	};

	/**
	* Window onload event, create test cases in console log
	*/
	window.onload = function() {
		console.log("--- READY! ---");
		var init = "RR..LRL";
		var animation = new Animation(init);
		console.log('Init new chamber with "RR..LRL"');
		console.log('Displays "XX..XXX"');
		animation.animate(3);
		console.log('Animate particle at 3rd Pos');
		console.log('Displays ".X.XX.."');
	};

})();