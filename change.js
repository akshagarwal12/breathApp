indicator=document.getElementById("indicator");
instruction=document.getElementById("instruction");
console.log(indicator);


function breatheIn(time,object){
    let scale=100
    hold=false;
    repeats=time/10
    let scaleBy=50/repeats
    let posBy=100/repeats
    let repeated=0
    instruction.innerHTML="breathe in"
    return new Promise((resolve) => {
    interval1=setInterval(() => {
        scale-=scaleBy

        repeated++
        object.setAttribute("r",scale)

        if(repeated==repeats){
            hold=true;
            try{
                resolve(true);
            }
            finally {
            clearInterval(interval1);
            }
        }
    }, 10);
})
}

async function hold(inTime,holdTime,object) {
    const awaitHold=await breatheIn(inTime,object)
    return new Promise((resolve)=>{
    if(awaitHold==true){
        timeout1=setTimeout(() =>{
        resolve(true)
        },holdTime)
    }
    })
}

async function breathe(inTime,holdTime,outTime,object){
    let scale=50
    let repeats=outTime/10
    let scaleBy=50/repeats
    let repeated=0
    const awaitOut=await hold(inTime,holdTime,object)

    if(awaitOut==true){
    instruction.innerHTML="breathe out"
    interval1=setInterval(() => {
        scale+=scaleBy

        repeated++
        object.setAttribute("r",scale)

        if(repeated==repeats){
            hold=true;

            clearInterval(interval1);
        }
    }, 10);
}
}

breatheInInput=document.getElementById("inTime")
holdInput=document.getElementById("holdTime")
breatheOutInput=document.getElementById("outTime")
button=document.getElementById("start")
button.onclick=()=>{breathe(breatheInInput.value,holdInput.value,breatheOutInput.value,indicator)}
