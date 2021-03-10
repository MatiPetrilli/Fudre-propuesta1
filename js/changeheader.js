	
	$(window).on("scroll", function () {
		$('#header_nav').toggleClass('hdr-small', $(document).scrollTop() > 10);

		// var offset = $("#header_nav").height();
		// consola( offset );
	});

	function consola(s){
		if(console)
			console.log(s);
	}