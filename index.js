let inputElement=document.querySelector('input')
const listeElement=document.querySelector('ul')
const searchContainer=document.querySelector('.search-container')
const bilderContainer=document.querySelector('.bilder');
const titleElement= document.querySelector('main>h1')
listeElement.style.display='none'
let breeds=[];
let imgArray=[];

console.log(breeds);

const lesenData= async()=>{
    try{
       
        const data= await (await fetch('https://dog.ceo/api/breeds/list/all')).json()
        console.log(data.message);
        // breeds=data.message;
for(let el in data.message){
    breeds.push(el)
}
console.log('breeds:',breeds); 
    }catch(error){
        console.log(error);
    }

}
lesenData();



const lesenDataVonBreed=async(breed)=>{
    try{
        console.log('in fetch',breed);
      const data=  await fetch(`https://dog.ceo/api/breed/${breed}/images`)
        const datajson= await data.json()
        const images=datajson.message
        console.log(images);
        let numberOfImg= images.length
        numberOfImg>10? numberOfImg=10: numberOfImg;
        imgArray=[]
        for(let i=0;i<numberOfImg;i++){
    imgArray.push(images[i])

        }
        zeigenBilder(breed);
    }catch(error){
        console.log(error);
    }
}
console.log('breeds:',breeds);
function  getBreeds(input='', breeds) {
    if(input.length){// prufft ob es user etwas geschrieben
    return breeds.filter(el=>el.toLowerCase().includes(input.toLowerCase()))}
    else{
        return breeds
    }
    
}
function displayBreeds(breed) {
    listeElement.style.display=''
    listeElement.innerHTML=''
    const gesuchteBreeds=getBreeds(breed, breeds);
    gesuchteBreeds.forEach(el=>{
        const liElement=document.createElement('li');
        liElement.classList.add('list-group-item')
        liElement.innerText=el
        listeElement.append(liElement)
    })


    
}

inputElement.addEventListener('keyup', ()=>{
    let breed=inputElement.value
    console.log(breed);
   
    displayBreeds(breed)
    
})
inputElement.addEventListener('focus', event=>{
    displayBreeds()
})


function zeigenBilder(breed) {
    listeElement.style.display='none'
    console.log('HIER!!!!!!!!!!!!!!!!!!!!!!!' , imgArray)
    //let titleElement=document.createElement('h1')
    titleElement.innerText=breed[0].toUpperCase()+breed.slice(1)
    imgArray.forEach(el=>{
        console.log(el);
        
        let img=document.createElement('img')
  
        img.src=el
        img.classList.add('shadow',  'p-3', 'mb-5' ,'bg-body-tertiary', 'rounded')
        bilderContainer.append(img)
        ;
    }
)
//mainElement.prepend(titleElement)
}


// reagiert auf einen Klick auf einen Anmen in der Liste

listeElement.addEventListener('click', (event)=>{
    let selectedBreed=event.target.outerText// speichert den namen auf den user geklickt hat.
  
    console.log(event);
    console.log('selectedBreed:', selectedBreed);
    inputElement.value=selectedBreed
    console.log(inputElement);
    listeElement.innerHTML=''
    bilderContainer.innerHTML=''
     lesenDataVonBreed(selectedBreed);
   
        
        
    })



