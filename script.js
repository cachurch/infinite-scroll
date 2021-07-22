const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false
let imagesLoaded = 0
let totalImages = 0
let photosArray = [];

//Unsplash API
const count = 15
const apiKey = MY_KEY
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

//Check if all images were loaded
 function imageLoaded() {
     console.log('image loaded')
     imagesLoaded++
     if (imagesLoaded === totalImages) {
         ready = true;
         loader.hidden = true
         console.log('ready =', ready)
     }
 }

//Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

//Create elements for links and photos and add to the DOM
function displayPhotos() {
    imagesLoaded = 0
    totalImages = photosArray.length
    console.log('totalImages =', totalImages)
    photosArray.forEach((photo) => {
        //create <a> to link to unsplash
        const item = document.createElement('a')
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })
        //create <img> for photo
        const img = document.createElement('img')
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        //Event listener, check when each photo is finished loading
        img.addEventListener('load', imageLoaded )
        //put <img> inside <a>, then put both inside image-container element
        item.appendChild(img)
        imageContainer.appendChild(item)
    })
}
 
// //Create elements for links and photos and add to the DOM
// function displayPhotos() {
//     photosArray.forEach((photo) => {
//         //create <a> to link to unsplash
//         const item = document.createElement('a')
//         item.setAttribute('href', photo.links.html)
//         item.setAttribute('target', '_blank')
//         //create <img> for photo
//         const img = document.createElement('img')
//         img.setAttribute('src', photo.urls.regular)
//         img.setAttribute('alt', photo.alt_description)
//         img.setAttribute('title', photo.alt_description)
//         //put <img> inside <a>, then put both inside image-container element
//         item.appendChild(img)
//         imageContainer.appendChild(item)
//     })
// }

//get photos from unsplash API

async function getPhotos() {
    try {
        const res = await fetch( apiUrl)
        photosArray = await res.json()
        displayPhotos()
    } catch (error) {
        console.error(error)
    }
}

//Check if the scroll bar is near the bottom of the page
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        getPhotos()
        ready = false
        console.log('load more photos')
    }
}) 

//On Load 
getPhotos()