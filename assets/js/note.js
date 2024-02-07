document.addEventListener("DOMContentLoaded", function(){

const inputBox=document.getElementById("input");
const days = document.querySelector(".days");
days.addEventListener("click", function(event){

    console.log("this is days", days)
    console.log("this is event", event)
    if(event.target.tagName==="LI"){
// const number=event.target.textContent.trim()
// inputBox.value=number
     inputBox.style.display="block"
    }
});
inputBox.addEventListener("input",function(event){
    const userValue=event.target.value
    console.log(userValue)
} )

})