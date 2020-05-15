
const  weather =document.querySelector('form');
const locat =document.querySelector('input');
const Message1=document.querySelector('#message-1');
const Message2=document.querySelector('#message-2');

weather.addEventListener('submit',(e)=>{
    e.preventDefault();
    Message1.textContent="loading......";
    Message2.textContent=" "
    // if(!locat.value)
    // Message1.textContent="please try again!!!!";

        fetch(`/weather?address=${locat.value}`).then((response)=>{
            response.json().then(data=>{
                if(data.error){
                    Message1.textContent=data.error;
                    //Message2.textContent=" please try again later"

                }
                else
                {
                Message1.textContent= data.address
                Message2.textContent= data.forcast}
            })
        })
    
})