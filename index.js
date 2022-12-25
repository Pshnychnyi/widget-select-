class Dropdown {
	constructor(selector, options) {
		this.$el = document.querySelector(selector)
		this.$dropdownLabel = document.querySelector('.dropdown_label')
		this.$dropdownMenu = document.querySelector('.dropdown_menu')
		this.items = options.items
		this.$dropdownLabel.insertAdjacentHTML('afterbegin', this.items[0].label)
		this.$el.addEventListener('click', event => {
			if(event.target.classList.contains('dropdown_label')) {
				if(this.$el.classList.contains('open')) {
					this.close()
				}else {
					this.open()
				}
			}else if (event.target.tagName.toLowerCase() === 'li') {
				this.$dropdownMenu.addEventListener('click', event => {
				this.$dropdownLabel.textContent = event.target.textContent
				this.close()
			})
			}
				
		})
		const itemsHTML = this.items.map(i => {
			return `<li data-id="${i.id}">${i.label}</li>`
		})
		this.$dropdownMenu.insertAdjacentHTML('afterbegin', itemsHTML.join(' '))
		
	}

	open() {
		this.$el.classList.add('open')
	}
	close() {
		this.$el.classList.remove('open')
	}
}



const dropdown = new Dropdown('#dropdown', {
	items: [
		{label: 'Москва', id: 'msk'},
		{label: 'Санкт-Петербург', id: 'spb'},
		{label: 'Новосибирск', id: 'nsk'},
		{label: 'Краснодар', id: 'krdr'},
		]
})