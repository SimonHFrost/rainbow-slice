describe("DOM Tests", function () {
    // Phantom stuff
	console.log('Loading a web page');
	var page = require('webpage').create();
	var url = 'http://localhost:8080';

	page.open(url, function (status) {
		it('exists...', function() {
			expect(status).to.not.equal(null);
	  		console.log(status);
		});
	});
	phantom.exit();

	/* 
    var myEl = document.getElementById('myDiv');
    it("is in the DOM", function () {
        expect(myEl).to.not.equal(null);
    });
 
    it("is a child of the body", function () {
        expect(myEl.parentElement).to.equal(document.body);
    });
 
    it("has the right text", function () {
        expect(myEl.innerHTML).to.equal("Hi there!");
    });
 
    it("has the right background", function () {
        expect(myEl.style.background).to.equal("rgb(204, 204, 204)");
    });
	*/
});