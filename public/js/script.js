const addToBagBtn = document.querySelector("[data-addbag-btn]")
const img = document.querySelector("[data-addbag-img]")

addToBagBtn.addEventListener('click', (e) => {
    e.preventDefault()
        addProduct()
} )

async function addProduct () {
    const url = "http://127.0.0.1:3000/products"
    const product = {
        quantity : 5,
        src : img.src.replace("http://127.0.0.1:3000",""),
        price : 1000 
    }
    
    await fetch(url,{
        method : 'POST',
        headers : {
            'Content-type': 'application/json ; charset=utf-8'
        },
        body : JSON.stringify(product)
    }).catch(err => console.error(err))
}

async function getProduct() {
    const url = "http://127.0.0.1:3000/products"

    await fetch (url, { method : "GET"})
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

/* ===================================================
   EVENT LISTENERS FOR BUTTONS
   =================================================== */
    const body      = document.querySelector('[data-body]')
    const logInDiv  = document.querySelector('[data-log-in-div]')
    const signUpDiv = document.querySelector('[data-sign-up]')
    const logInBtn  = document.getElementById(`logInBtn`)

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

    
    async function logOut() {
        try {
                await fetch('http://127.0.0.1:3000/users/logout',{ method : 'POST'})
                logInBtn.innerHTML = 'Log In'
            } catch (err){
                console.log(err)
            }
        }

    
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


    async function checkIfUserIsAuthenticated () {                          
        const url = "http://127.0.0.1:3000/users/login/authenticated"
        const response = await fetch(url, {method : 'GET'})
        .catch (err => {console.log(err)})
        
        if(response.status === 401){
            return false;
        }
        if (response.status = 201) {
            return true;	
        }
    }




//SEARCH BTN
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

