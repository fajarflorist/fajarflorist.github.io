/*!
 * Orderio
 * Designed by Degiam [https://degiam.github.io]
 * Copyright (c) 2023
 */

// Navbar
	function navbarToggleMenu() {
		document.getElementById('viewport').classList.toggle('!overflow-hidden')
		document.querySelector('.navbar').classList.toggle('hidden')
		let button = document.querySelector('.navbar-toggle')
		if ( button.getAttribute('aria-expanded') == 'false' ) {
			button.setAttribute('aria-expanded','true')
		} else {
			button.setAttribute('aria-expanded','false')
		}
	}
	document.querySelector('.navbar-toggle').onclick = () => {
		navbarToggleMenu()
	}

	function navbarAutoHeight(selector) {
		if ( document.body.clientWidth < 768 ) {
			document.querySelector(selector).style.maxHeight = window.innerHeight + 'px'
		}
	}

	function navbarResponsive(selector,breakpoint) {
		navbarAutoHeight('.navbar')
		window.addEventListener('resize', () => {
			navbarAutoHeight('.navbar')
			if ( document.querySelector(selector).getAttribute('aria-expanded') == 'true' ) {
				if ( window.innerWidth >= breakpoint ) {
					document.querySelector(selector).click()
				}
			}
		})
	}
	navbarResponsive('.navbar-toggle',768)

	function dropdown(trigger,target) {
		document.querySelectorAll(trigger).forEach(item => {
			item.querySelector('button').onclick = () => {
				item.classList.toggle('show')
				item.querySelector(target).classList.toggle('hidden')
			}
		})
		document.addEventListener('click', function(e) {
			document.querySelectorAll(trigger + '.show').forEach(item => {
				if ( !item.contains(e.target) ) {
					item.classList.toggle('show')
					item.querySelector(target).classList.toggle('hidden')
				}
			})
		})
	}
	dropdown('.navbar-dropdown','ul')

// Categories & Tags
	function filterProduct(path,attr) {
		let url = window.location.href
		if ( window.location.href.indexOf(path) > -1 ) {
			let query = url.split('?q=')
			document.querySelectorAll('[' + attr + '="' + query[1].replace(/[+]/g,' ') + '"]').forEach(item => {
				item.classList.remove('hidden')
			})
		}
	}
	filterProduct('/kategori/?q=','data-category')
	filterProduct('/label/?q=','data-tag')

// Product Slider
	for (let i=0; i<document.getElementsByClassName('splide').length; i++) {
		new Splide('.splide', {
			pagination: false,
		}).mount()
	}

// Product Zoom
	if ( document.querySelector('.zoom') ) {
		$('.zoom').zoom({
			on: 'mouseover',
			touch: false,
		})
	}

// Product Currency
	function numberWithCommas(num) {
	  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g,'.')
	}

	document.querySelectorAll('.currency').forEach(item => {
		let currency = numberWithCommas(item.innerHTML)
		item.innerHTML = currency
	})

// Product Order
	function order(number,chat,product,url) {
		if ( document.body.clientWidth < 768 ) {
			window.open('https://api.whatsapp.com/send?phone=' + number + '&text=' + chat + encodeURIComponent(product) + '%0A' + url, '_self').focus()
		} else {
			window.open('https://api.whatsapp.com/send?phone=' + number + '&text=' + chat + encodeURIComponent(product) + '%0A' + url, '_blank').focus()
		}
	}
