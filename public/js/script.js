const logInBtn  = document.getElementById(`logInBtn`)
const body      = document.querySelector('[data-body]')
const logInDiv  = document.querySelector('[data-log-in-div]')
const signUpDiv = document.querySelector('[data-sign-up]')
    

window.addEventListener('DOMContentLoaded',checkIfUserIsAuthenticated)

async function checkIfUserIsAuthenticated () {                          
    const url = "http://127.0.0.1:3000/users/login/authenticated"
    const response = await fetch(url, {method : 'GET'})
    .catch (err => {console.log(err)})
    
    if(response.status === 401){
        logInBtn.innerHTML = "Log In"
        return false;
    }
    if (response.status = 200) {
        logInBtn.innerHTML = "Log Out"
        return true;	
    }
}


async function checkBagProducts () {
     const url = "http://127.0.0.1:3000/products"
     await fetch(url,{method : "GET"})
     .then(res => res.json())
     .then(products => {
        const bagCountDisplay = document.querySelector('[data-bag-span]')
        let total = 0 
        for(let i=0;i<products.length;i++) {
            total += products[i].quantity
        } 
        bagCountDisplay.innerHTML = `${total} products`
    })
}

checkBagProducts();

logInBtn.addEventListener('click', () => {
    event.preventDefault()
    if (logInBtn.innerHTML !== 'Log In')  {
            logOut()
            alert("You have been logged out !")
        }
    if (logInBtn.innerHTML === 'Log In'){
        displayContent(signUpDiv,"animate__fadeInRight","animate__fadeOutRight")
    }  
    
})


function displayContent (div,addClass,removeClass) {
    body.classList.toggle('hide-body')
    logInDiv.classList.add("log-in-div-show")
    div.classList.remove("animate__animated",removeClass)
    div.classList.add("animate__animated",addClass)
    logInDiv.addEventListener("animationend",appendDiv)

    function appendDiv () {
        div.style.display="block"
        this.append(div)
        this.removeEventListener("animationend",appendDiv)
    }
}


async function logOut() {
    try {
            await fetch('http://127.0.0.1:3000/users/logout',{ method : 'POST'})
            logInBtn.innerHTML = 'Log In'
        } catch (err){
            console.log(err)
        }
    }


const addToBagBtns = document.querySelectorAll("[data-addbag-btn]")
addToBagBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        event.preventDefault()
        const parent = btn.parentElement.parentElement
        const img = parent.childNodes[1]
        const imgSrc = img.getAttribute("src")
        console.log(imgSrc)
        addProduct()

        async function addProduct () {
            const url = "http://127.0.0.1:3000/products"
            const product = {
                quantity : 1,
                src : imgSrc,
                price : 1000 
            }
            
            await fetch(url,{
                method : 'POST',
                headers : {
                    'Content-type': 'application/json ; charset=utf-8'
                },
                body : JSON.stringify(product)
            })
            .then(res =>res.json())
            .then(products => {
                const bagCountDisplay = document.querySelector('[data-bag-span]')
                let total =0;
                for(let i = 0;i<products.products.length;i++){
                   total += products.products[i].quantity
                }
                bagCountDisplay.innerHTML = `${total} products`
            })
            .catch(err => console.error(err))
        }
        
    })
})


async function getProduct() {
    const url = "http://127.0.0.1:3000/products"

    await fetch (url, { method : "GET"}).catch(err =>{console.log(err)})
}


async function deleteProduct() {
    const url = "http://127.0.0.1:3000/products/delete"
    const response = await fetch (url,{
        method : 'DELETE'
    }).catch(err => {console.log(err)})
    console.log(response.status)
    
}
const searchBtn = document.querySelector('[data-search-btn]')
const searchDiv = document.querySelector('[data-search-div]')

searchBtn.addEventListener("click", () =>{
    displayContent(searchDiv,"animate__fadeInLeft","animate__fadeOutLeft")
})


//CLOSE LOG-IN BTN
const closeBtnSignUp = document.querySelector('[data-close-btn-sign-up]')

function close (btn,div,addClass,removeClass){
    btn.addEventListener("click", () => {
    event.preventDefault()
    body.classList.toggle("hide-body")
    div.classList.remove("animate__animated",removeClass)
    div.classList.add("animate__animated",addClass)
    logInDiv.addEventListener("animationend",returnToOriginalState)
    })

    function returnToOriginalState() {
        this.classList.remove("log-in-div-show")
        this.removeChild(div)
        this.removeEventListener("animationend",returnToOriginalState)
    } 
}


close(closeBtnSignUp,signUpDiv,"animate__fadeOutRight","animate__fadeInRight")

 

//CLOSE SEARCH-BTN
const closeBtnSearch = document.querySelector('[data-close-btn-search]')

close(closeBtnSearch,searchDiv,"animate__fadeOutLeft","animate__fadeInLeft")


// VISIT MEN GALLERY  -  BTN/FOOTER
 const visitGalleryBtn = document.querySelectorAll("[data-visit-gallery-btn]") 
 const galleryWrapperDiv = document.querySelector('[data-gallery-wrapper-div]')

visitGalleryBtn.forEach(btn => {
    btn.addEventListener("click",() =>{
        event.preventDefault()
        checkIfUserIsAuthenticated().then(res => {
            if (res === true) {
                displayContent(galleryWrapperDiv,"animate__slideInUp","animate__slideOutDown")
            }   else {
                    alert ('Please Log In to visit gallery!')
                    return
            }
        })
    })
})

// VISIT WOMEN GALLERY  -  BTN/FOOTER
const visitGalleryBtn2 = document.querySelectorAll("[data-visit-gallery-btn-2]")
const galleryWrapperDiv2 = document.querySelector('[data-gallery-wrapper-div-women]')

visitGalleryBtn2.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        checkIfUserIsAuthenticated().then(res => {
            if (res === true ) {
                displayContent(galleryWrapperDiv2,"animate__slideInUp","animate__slideOutDown")
            } else {
                alert ('Please Log In to visit gallery!')
                    return
            }
        })
        
    })
   
})

//VISI ABOUT US 
const aboutUsLi = document.querySelector('[data-about-us-li]')
const aboutUsDiv = document.querySelector('[data-about-us-div]')
aboutUsLi.addEventListener("click", ()=> {
    displayContent(aboutUsDiv,"animate__fadeInUpBig","animate__fadeOutDownBig")
})



//BACK TO HOME PAGE FROM GALLERY - MEN
const backToHomePage = document.querySelectorAll('[data-home-page]')
 
backToHomePage.forEach(btn => {
    close(btn,galleryWrapperDiv,"animate__slideOutDown","animate__slideInUp")
})

//BACK TO HOME PAGE FROM GALLERY - WOMEN
const backToHomePage2 = document.querySelectorAll('[data-home-page-2]')

backToHomePage2.forEach(btn => {
  close(btn,galleryWrapperDiv2,"animate__slideOutDown","animate__slideInUp")
})

//BACK TO HOME PAGE FROM ABOUT US 
const backToHomePage3 = document.querySelectorAll('[data-home-page-3]')

backToHomePage3.forEach(btn => {
    close(btn,aboutUsDiv,"animate__fadeOutDownBig","animate__fadeInUpBig")
})


//SWAP LOG IN/REGISTRATION FORMS 


const formLog = document.getElementById('form_log_in');
const formReg = document.getElementById('form_register');

register_span.addEventListener('click', swapLogRegister);
  
function swapLogRegister () {
    formLog.classList.remove("animate__animated", "animate__fadeInUp")
    formLog.classList.add("animate__animated", "animate__fadeOutDown")
    formLog.style.pointerEvents = "none";
    formReg.classList.remove("animate__animated","animate__fadeOutUp")
    formReg.classList.add("animate__animated","animate__fadeInDown")
    formReg.style.pointerEvents = "auto";
}

log_in.addEventListener ('click', swapRegisterLog);

function swapRegisterLog () {
    formLog.classList.remove("animate__animated", "animate__fadeOutDown")
    formLog.classList.add("animate__animated", "animate__fadeInUp")
    formLog.style.pointerEvents = "auto";
    formReg.classList.remove("animate__animated","animate__fadeInDown")
    formReg.classList.add("animate__animated","animate__fadeOutUp")
    formReg.style.pointerEvents = "none" ; 
}
/* ===================================================
   HANDLE USER /LOGIN,REGISTER,AUTHENTICATE
   =================================================== */

 //CREATE USER OBJ WITH FORM DATA

const firstName = document.getElementById('firstName') 
const lastName = document.getElementById('lastName') 
const email = document.getElementById('email')   
const password = document.getElementById('password')
const repeatPassword = document.getElementById('repeatPassword')

 function UserReg(firstName,lastName,email,password) {
    this.firstName = firstName.value,
    this.lastName = lastName.value,
    this.email =email.value,
    this.password = password.value
}  

//SEND REGISTRATION POST REQUEST WITH USER INFO

formReg.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = "http://127.0.0.1:3000/users/register"
    const userInput = new UserReg(firstName,lastName,email,password)
    if (checkPasswordMatch(password,repeatPassword) === true) {
        const response = await 
        fetch(url, {
            method : 'POST',
            headers : {
                'Content-type' : 'application/json; charset=utf-8'
            },
            body : JSON.stringify(userInput),
            }).catch (err => {console.log(err)}) 
   
            if(response.status === 500){
                alert ("email is already in use");
            }
            if (response.status === 201){
                alert("Registration succesful!")
                swapRegisterLog();
            }
            firstName.value = '';
            lastName.value = '';
            email.value = '';
            password.value = '';
            repeatPassword.value ='';
            
            } else {
                return
            }
}) 



//SEND LOG IN POST REQUEST WITH USER INFO
 
const emailLog = document.getElementById('email_log')
const passwordLog = document.getElementById('password_log')

function UserLog(email,password){
    this.email = email.value,
    this.password = password.value
} 

formLog.addEventListener("submit", async (e) => {
    e.preventDefault()
    const url = "http://127.0.0.1:3000/"
    const userLog = new UserLog(emailLog,passwordLog) 
    const response = await  
    fetch(url, {
        method : 'POST' ,
        headers : {
            'Content-type' :  'application/json; charset=utf-8'
        },
        body : JSON.stringify(userLog),
    }).catch (err => {console.log(err)})
        if (response.status === 401) {
            alert ("User doesent exist!Please register!")
            swapLogRegister();
        } 
       
        if  (response.status === 201) {
            const changeLoginToLogOut = document.getElementById(`logInBtn`)
            changeLoginToLogOut.innerHTML = "Log Out"
            closeClose(signUpDiv,"animate__fadeOutRight","animate__fadeInRight")
        }
            
            emailLog.value = '';
            passwordLog.value = '';
})



function closeClose (div,addClass,removeClass){
    body.classList.toggle("hide-body")
    div.classList.remove("animate__animated",removeClass)
    div.classList.add("animate__animated",addClass)
    logInDiv.addEventListener("animationend",returnToOriginalState)
    
    function returnToOriginalState() {
        this.classList.remove("log-in-div-show")
        this.removeChild(div)
        this.removeEventListener("animationend",returnToOriginalState)
    } 
}

function checkPasswordMatch (password,repeatPassword) {
    if (password.value !== repeatPassword.value) {
        alert ("Passwords didnt match!")
        password.value = '';
        repeatPassword.value = '';
        return false;
    } else {
        return true;
    }
}


const cartBtn = document.querySelector('[data-cart-btn]')
cartBtn.addEventListener('click',() => {
event.preventDefault()
displayCartContent()
})

async function displayCartContent() {
    const url = "http://127.0.0.1:3000/products"
     await fetch (url,{method : "GET"})
    .then(res=>res.json())
    .then(products => {
        createBagBody()
        const checkOut = document.createElement("div")
        checkOut.classList.add("btns-wrapper")
        checkOut.style.paddingTop= "5vh"; 
        checkOut.style.paddingBottom= "5vh"; 
        checkOut.style.background = "white";
        checkOut.innerHTML = ` 
            	<a href="#" class="btn" data-a1>Check Out</a>
                <a href="#" class="btn" data-a2>Clear Bag</a>
        
        `
        const divUlwrap = document.createElement("div")
        divUlwrap.style.margin = '5vh 5vw';
        const ul = document.createElement("ul")
        ul.classList.add('cart-grid')
        products.forEach(product => {
            const price = product.price * product.quantity
            ul.innerHTML += `
                         <li class ="grid-item">
                            <img style="width : 100% ; height : 100px" src = ${product.src}>
                            <p>Quantity : ${product.quantity}</p>
                            <p>Price : ${price}$
                        </li>
                        `
        })
        let total=0;
        for(let i =0;i<products.length;i++) {
           total += products[i].price * products[i].quantity
        }
        const totalPrice = document.createElement("p")
        totalPrice.innerHTML = `TOTAL PRICE : ${total}$`
        totalPrice.style.marginTop = "5vh"
        divUlwrap.append(ul)
        divUlwrap.append(totalPrice)
        const homePage = document.createElement("div")
        homePage.classList.add("home-page")
        homePage.innerHTML = `
        <a href="" data-home-page-4><i class="backward icon"></i><span class="black">Home</span><span class="orange">Page</span></a>
        `
        homePage.style.paddingTop = "3vh"
        logInDiv.append(checkOut)
        logInDiv.append(divUlwrap)
        logInDiv.append(homePage)
        const deleteBtn = document.querySelector('[data-a2]')
        deleteBtn.addEventListener('click',() => {
            if (total ===0) {
                alert ("Your Bag is empty")
            } else {
                deleteProduct()
                const bagCountDisplay = document.querySelector('[data-bag-span]')
                bagCountDisplay.innerHTML = `0 products`
                total = 0
                totalPrice.innerHTML = `TOTAL PRICE : ${total}$`
                ul.remove()
                
                
            }
        })
        
        
        const checkOutBtn = document.querySelector('[data-a1]')
        checkOutBtn.addEventListener('click',()=> {
            if(!total) {
                alert ("Your Bag is empty!")
                return
            } else {
                alert ("Thank you for your purchase")
            }
        })

        
        const homePageBtn = document.querySelector('[data-home-page-4]')
        homePageBtn.addEventListener('click', ()=> {
            event.preventDefault()
            removeBagBody()
            ul.remove()
            totalPrice.remove()
            divUlwrap.remove()
            checkOut.remove()
            homePage.remove()
        })
       
    }).catch(err => console.log(err))
}


function createBagBody() {
    body.classList.toggle('hide-body')
    logInDiv.classList.add("log-in-div-show")
    logInDiv.style.background = "white"
}

function removeBagBody() {
    body.classList.toggle('hide-body')
    logInDiv.classList.remove('log-in-div-show')
}


function displayBagProductsCount () {

}

/* ===================================================
    INTERSECTION OBSERVERS
   =================================================== */
   function createObserverAndAnimate (obj ,classname) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                obj.classList.add("animate__animated", classname)
            } else {
                obj.classList.remove("animate__animated", classname)
            }
        })
    })
            observer.observe(obj);
} 


const navbar = document.querySelector('.nav')
const divCollection = document.querySelector('.collection-content')

const options = {
    rootMargin : "-100px 0px 0px 0px"
}


    const divCollectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(!entry.isIntersecting){
               navbar.style.backgroundColor = "#333"
            } else {
                navbar.style.backgroundColor = "transparent"
            }
        })
    }  ,options )

    divCollectionObserver.observe(divCollection)


//PRESENTATION-PARAGRAPH
const PresentationP = document.querySelector('[data-p]')
createObserverAndAnimate(PresentationP,"animate__zoomIn")

//PRESENTATION TITLE-DIV
const divShowcaseTitleh4 = document.querySelector('[data-h1]')
createObserverAndAnimate(divShowcaseTitleh4,"animate__fadeInDown")

//SHOWCASE-TITLE DIV
const showcaseTitleh4 = document.querySelector('[data-showcaseh1]')
createObserverAndAnimate(showcaseTitleh4,"animate__rotateInUpLeft")


//CITIES TITLE
const citiesTitleH4 = document.querySelector('[data-cities-h1]')
createObserverAndAnimate(citiesTitleH4,"animate__slideInLeft")

//REVIEWS TITLE
const reviewsTitleh1 = document.querySelector('[data-reviews-title-h1]')
createObserverAndAnimate(reviewsTitleh1,"animate__lightSpeedInRight")

//REVIEWS COMMENTS
const comments = document.querySelectorAll(".person")
comments.forEach(comment => {
    createObserverAndAnimate(comment,"animate__rotateIn")
})

//TOUGHNESS DIV
const toughnessH3 = document.querySelector('[data-toughness-h1]')
createObserverAndAnimate(toughnessH3,"animate__rotateInDownLeft")

const toughnessH1 = document.querySelector('[data-toughness-h3]')
createObserverAndAnimate(toughnessH1,"animate__slideInLeft")

const toughnessP = document.querySelector('[data-toughness-p]')
createObserverAndAnimate(toughnessP,"animate__slideInRight")

const beingTestedP = document.querySelector('[data-being-tested-p]')
createObserverAndAnimate(beingTestedP,"animate__lightSpeedInLeft")

const beingCreatedP = document.querySelector('[data-being-created-p]')
createObserverAndAnimate(beingCreatedP,"animate__lightSpeedInRight")

const finalWords = document.querySelector('[data-final-words]')

const testedTitle = document.querySelector('[data-tested-title]')
createObserverAndAnimate(testedTitle,"animate__flip") 

const finalTitle = document.querySelector('[data-final-title]')
createObserverAndAnimate(finalTitle,"animate__heartBeat")

const h3 = document.querySelector("[data-h3]")
createObserverAndAnimate(h3,"animate__jackInTheBox")


