document.addEventListener("DOMContentLoaded", function(){

const inputBox=document.getElementById("input");
const days = document.querySelector(".days");
days.addEventListener("click", function(event){

    console.log("this is days", days)
    console.log("this is event", event)
    if(event.target.tagName==="LI"){

     inputBox.style.display="block"
    }
});
inputBox.addEventListener("input",function(event){
    
    const userValue=event.target.value
    console.log(userValue)
    localStorage.setItem("userKey", userValue)
    const noteValue1=document.getElementById("noteValue");
console.log(noteValue1)
noteValue1.textContent=localStorage.getItem("userKey")
})

})
