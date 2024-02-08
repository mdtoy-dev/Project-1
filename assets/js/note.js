document.addEventListener("DOMContentLoaded", function(){

const inputBox=document.getElementById("input");

days.addEventListener("click", function(event){
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


const noteValue1=document.getElementById("noteValue");
console.log(noteValue1)
noteValue1.textContent=localStorage.getItem("userKey")