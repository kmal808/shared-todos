const blender = document.getElementById('blender')
const toggle = document.getElementById('toggle')
const hideMoon = document.getElementById('moon')
const hideSun = document.getElementById('sun')

if (!localStorage.hasOwnProperty('darkMode')) {
	localStorage.setItem('darkMode', 'enabled')
} else {
	if (localStorage.getItem('darkMode') === 'disabled') {
		blender.classList.toggle('expand')
		toggle.classList.toggle('hasZIndex')
	}
}

toggle.addEventListener('click', () => {
	if (localStorage.getItem('darkMode') === 'disabled') {
		localStorage.setItem('darkMode', 'enabled')
		blender.classList.add('expand')
		blender.classList.remove('shrink')
	} else {
		localStorage.setItem('darkMode', 'disabled')
		blender.classList.add('shrink')
		blender.classList.remove('expand')
	}
	toggle.classList.toggle('hasZIndex')
	hideMoon.classList.toggle('visible')
	hideSun.classList.toggle('visible')
})
