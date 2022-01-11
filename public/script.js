let about = document.querySelector('#about')
let aboutBtn = document.querySelector('#about-btn')
let enLink = document.querySelector('#about-link-en')
let chLink = document.querySelector('#about-link-ch')
let enAbout = document.querySelector('#about-en')
let chAbout = document.querySelector('#about-ch')
let lang = document.querySelector('#language')
let input = document.querySelector('input')
let aboutOpen = false

aboutBtn.addEventListener('click', () => {
  if (!aboutOpen) {
    aboutOpen = true
    switchLang("inline") 
    enShow()
  } else {
    aboutOpen = false
    switchLang("none") 
    hideAll()
  }
})

about.addEventListener('mouseover', () => {
  if (!aboutOpen) {switchLang("inline") }
})
about.addEventListener('mouseout', () => {
  if (!aboutOpen) {switchLang("none") }
})

enLink.addEventListener('click', () => {
  aboutOpen = true
  enShow()
})
chLink.addEventListener('click', () => {
  aboutOpen = true
  chShow()
})

input.addEventListener('click', () => {
  aboutOpen = false
  switchLang("none") 
  hideAll()
})




function chShow() {
  chAbout.style.display = "block"
  chLink.className = "border"
  enAbout.style.display = "none"
  enLink.className = ""
}
function enShow() {
  enAbout.style.display = "block"
  enLink.className = "border"
  chAbout.style.display = "none"
  chLink.className = ""
}
function hideAll() {
  chAbout.style.display = "none"
  chLink.className = ""
  enAbout.style.display = "none"
  enLink.className = ""
}
function switchLang(value) {
  lang.style.display = value
}