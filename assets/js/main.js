/*!
 * Developed by Degiam
 * https://degiam.github.io
 * Copyright (c) 2023
 */

// Navbar
	if ( window.location.href.indexOf('#') > -1 ) {
		window.location.replace(window.location.href.split('#')[0])
	}

	function navbarOpenMenu() {
		document.getElementById('viewport').classList.add('!overflow-hidden')
		document.querySelector('.navbar').classList.remove('hidden')
		document.querySelector('.navbar-toggle').setAttribute('aria-expanded','true')
	}
	function navbarCloseMenu() {
		document.getElementById('viewport').classList.remove('!overflow-hidden')
		document.querySelector('.navbar').classList.add('hidden')
		document.querySelector('.navbar-toggle').setAttribute('aria-expanded','false')
	}
	document.querySelector('.navbar-toggle').onclick = () => {
		if ( window.location.href.indexOf('#') > -1 ) {
			history.back()
			navbarCloseMenu()
		} else {
			window.location.href = '#'
			navbarOpenMenu()
		}
	}

	window.addEventListener('popstate', () => {
		if ( window.location.href.indexOf('#') > -1 ) {
			navbarOpenMenu()
		} else {
			navbarCloseMenu()
		}
	})

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

// Scroll
	function onScroll(selector,classname,offset) {
		document.addEventListener('scroll', () => {
			let element = document.querySelector(selector)
				scrollTop = document.scrollingElement.scrollTop
				offsetY = document.body.offsetTop + offset
			if ( !document.querySelector(selector + '.' + classname) ) {
				if ( scrollTop >= offsetY ) {
					element.classList.add(classname)
				}
			} else {
				if ( scrollTop < offsetY ) {
					element.classList.remove(classname)
				}
			}
		})

		let body = document.getElementById('viewport')
		body.addEventListener('scroll', () => {
			let element = document.querySelector(selector)
				scrollTop = body.scrollTop
				offsetY = body.offsetTop + offset
			if ( !document.querySelector(selector + '.' + classname) ) {
				if ( scrollTop >= offsetY ) {
					element.classList.add(classname)
				}
			} else {
				if ( scrollTop < offsetY ) {
					element.classList.remove(classname)
				}
			}
		})
	}
	onScroll('html','scroll',100)

// Back to Top
	function backTop(selector,target) {
		document.querySelectorAll(selector).forEach(item => {
			item.addEventListener('click', () => {
				item.classList.add('active')
				setTimeout(() => item.classList.remove('active'),500)
				if ( document.body.clientWidth < 992 ) {
					document.querySelector(target).scrollTo({behavior:'smooth',top:0})
				} else {
					window.scrollTo({behavior:'smooth',top:0})
				}
			})
		})
	}
	backTop('.backtop button','#viewport')

// Pagination
	function pagin(selector) {
		document.querySelectorAll(selector).forEach(item => {
			item.addEventListener('change', (e) => {
				window.location.href = e.target.value
			})
		})
	}
	pagin('#paginator')

// Categories & Tags
	function filterProduct(path,attr) {
		let url = window.location.href
		if ( url.indexOf(path) > -1 ) {
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
