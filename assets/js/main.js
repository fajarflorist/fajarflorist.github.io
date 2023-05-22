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
	function filterProduct(path,params,attr) {
		let url = window.location.href
		if ( url.indexOf(path) > -1 ) {
			if ( url.indexOf(params) > -1 ) {
				let query = url.split(params)
				document.querySelectorAll('[' + attr + '="' + query[1].replace(/[+]/g,' ') + '"]').forEach(item => {
					item.classList.remove('hidden')
				})
			} else {
				document.querySelectorAll('.empty').forEach(item => {
					item.classList.remove('hidden')
				})
			}
		}
	}
	filterProduct('/kategori/','?q=','data-category')
	filterProduct('/label/','?q=','data-tag')

// Search
	function generateRandomly(length) {
		let string = ''
			db = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
			dbsize = db.length
		for ( var i = 0; i < length; i++ ) {
			string += db.charAt(Math.floor(Math.random() * dbsize))
		}
		return string
	}

	function sjs() {
		let searchKeyword = document.querySelector('#search-input')
			searchResult = document.querySelector('.result')
			searchProduct = '/assets/json/products.json?v=' + generateRandomly(10)
			searchNotFound = ''
			searchTemplate = `<article class="product-item">
			<a class="block border-b border-slate-100 {stock}" href="{url}">
				<picture class="block skeleton">
					<img src="{thumbnail}" alt="{title}" class="w-full h-full object-cover aspect-square" width="600" height="600" loading="lazy" onload="this.closest('.skeleton').classList.remove('skeleton')" />
				</picture>
			</a>
			<a class="product-body" href="{url}">
				<div class="product-attribute mb-2 md:mb-3 {attributeHide}">
					<span>{attribute}</span>
				</div>
				<h3 class="text-sm md:text-lg 2xl:text-xl line-clamp-2 max-md:font-normal">{title}</h3>
				<div class="product-price my-1">
					<div class="current">
						Rp <span class="currency">{priceCurrent}</span>
					</div>
					<div class="line-through past -ml-1 {priceHide}">
						&nbsp;Rp <span class="currency">{pricePast}</span>&nbsp;
					</div>
					<div class="discount {priceHide}">
						Diskon <span>{priceDiscount}%</span>
					</div>
				</div>
				<div class="mt-auto">
					<button type="button" class="button mt-3 mb-0">Pesan</button>
				</div>
			</a>
		</article>`

		let sjs = SimpleJekyllSearch({
			searchInput: searchKeyword,
			resultsContainer: searchResult,
			json: searchProduct,
			searchResultTemplate: searchTemplate,
			noResultsText: searchNotFound
		})

		return sjs
	}

	function searchCounter(selector) {
		document.querySelectorAll(selector).forEach(item => {
			item.querySelector('span').innerText = document.querySelectorAll('.product article').length
		})
	}

	function searchForm(path,params,selector) {
		let url = window.location.href
		if ( url.indexOf(path) > -1 ) {
			if ( url.indexOf(params) > -1 ) {
				let query = url.split(params)
				document.querySelectorAll('#search-input').forEach(item => {
					item.value = query[1].replace(/[+]/g,' ')
					let search = sjs()
					setTimeout(() => {
						search.search(item.value)
						price('.currency')
						searchCounter('.result-counter')
						document.querySelector('.result-counter').classList.remove('hidden')
					},500)
				})
			}
			document.querySelectorAll(selector).forEach(item => {
				item.querySelector('input').addEventListener('keyup', (e) => {
					searchCounter('.result-counter')
					let counter = document.querySelector('.result-counter')
					if ( e.target.value != '' ) {
						counter.classList.remove('hidden')
						price('.currency')
					} else {
						counter.classList.add('hidden')
					}
				})
			})
		}
		document.querySelectorAll(selector).forEach(item => {
			item.addEventListener('submit', (e) => {
				e.preventDefault()
				let query = item.querySelector('input').value.replace(/[ ]/g,'+')
				window.location.href = path + params + query
			})
		})
		document.querySelectorAll('.result').forEach(() => {
			sjs()
			price('.currency')
		})
	}
	searchForm('/cari/','?q=','.search')

	function searchNavbar(trigger,target,url) {
		document.querySelectorAll(trigger).forEach(item => {
			item.addEventListener('click', () => {
				let input = document.querySelector(target)
				if ( input ) {
					input.focus()
				} else {
					window.location.href = url
				}
			})
		})
	}
	searchNavbar('.navbar-search','#search-input','/cari/')

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

	function price(selector) {
		document.querySelectorAll(selector).forEach(item => {
			let currency = numberWithCommas(item.innerHTML)
			item.innerHTML = currency
		})
	}
	price('.currency')

// Product Order
	function order(number,chat,product,url) {
		if ( document.body.clientWidth < 768 ) {
			window.open('https://api.whatsapp.com/send?phone=' + number + '&text=' + chat + '*' + encodeURIComponent(product) + '*%0A' + url, '_self').focus()
		} else {
			window.open('https://api.whatsapp.com/send?phone=' + number + '&text=' + chat + '*' + encodeURIComponent(product) + '*%0A' + url, '_blank').focus()
		}
	}
