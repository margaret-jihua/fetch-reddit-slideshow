const body = document.querySelector('body')
const searchBar = document.querySelector('.search-bar')
const submit = document.querySelector('.search-btn')
const slideShow = document.querySelector('.slide-show')
const picture = document.querySelector('.picture')
const stopSlideShow = document.querySelector('.stop')
let input
let pictureUrls = []
let slidesIndex = 0
let interval

function changePic() {
    console.log(pictureUrls[slidesIndex]);
    slidesIndex ++
    picture.setAttribute('src', pictureUrls[slidesIndex])    
    if (slidesIndex > pictureUrls.length) {
        slidesCount = 0
    }
}

submit.addEventListener('click', function() {
    input = document.querySelector('.search-input').value
    let endpoint = 'https://www.reddit.com/search.json?q=' + input + '+nsfw:no'
    // console.log(endpoint);
    fetch(endpoint)
    .then(response => {
        return response.json()
    })
    .then(jsonData => {
        let data = jsonData.data
        let children = data.children
        
        children.forEach(eachChild => {
            let childData = eachChild.data
            let pictureUrl = childData.thumbnail
            if (pictureUrl !== 'self'){
                pictureUrls.push(pictureUrl)
            }        
        })
        picture.setAttribute('src', pictureUrls[0])
        searchBar.style.display = 'none'
        slideShow.style.display = 'block'        
        interval = setInterval(changePic, 2000);
    })
})

stopSlideShow.addEventListener('click', function() {
    slideShow.style.display = 'none'
    searchBar.style.display = 'block'
    pictureUrls = []
    clearInterval(interval)
})