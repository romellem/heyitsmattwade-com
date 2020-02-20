export const once = (element, type, callback) => {
	// Purposefuly don't use an arrow function so `this` can get binded correctly
	const callbackWithRemove = function (event) {
		element.removeEventListener(type, callbackWithRemove);
		callback.call(this, event);
	};
	element.addEventListener(type, callbackWithRemove);

	// Returns a 'destroy' function that when run, immediately removes the event.
	return () => element.removeEventListener(type, callbackWithRemove);
};
