const dataSliderBar = document.querySelector('#data-slider-bar')
let action = false;
runAll()
function runAll() {
    getDataBar()
    .then((item) => { addClick(item) })
    renderDataField(2)
    toggleBar ()
}

async function getDataBar() {
    const response = await fetch(`https://app-travel-api.herokuapp.com/list-menu`)
    const data = await response.json()
    const value = await data.data
    let inner = "";
     value.forEach(element => {
        inner += `
            <li data-id="${element.id}" class="borderFade snip1582 ${element.active == true ? 'btn-active' : ""}">
                ${element.name}
            </li>
            `
    });
     dataSliderBar.innerHTML = inner
    return btnClick = document.querySelectorAll('#data-slider-bar li')
}
/*render body*/ 
async function renderDataField(id) {
    const response = await fetch(`https://app-travel-api.herokuapp.com/list-travel/-${id}`)
    const data = await response.json()
    const value = await data.data
    const dataField = document.getElementById('dataField')
    let inner = ""
    value.forEach((item) => {
        inner += `
        <div 
        class="boxes"
        style="background-image:url(${item.thumb}) ;">
                <p >
                ${item.title}
                </p>
        </div>      
        `
    })
    dataField.innerHTML = inner;
    document.getElementById("load").style.display = "none";
}
/*/render body*/
/* add Click*/ 
function addClick(data) {
    data.forEach(item => {
        item.addEventListener('click', async (e) => {
            document.getElementById('dataField').innerHTML ="";
            document.getElementById('load').style.display="block"
            const tg = e.target
            const id = tg.getAttribute("data-id")
            data.forEach((item)=>{
                item.classList.contains('btn-active') ? item.classList.remove('btn-active'):"" ;
            })
            tg.classList.add('btn-active')
             renderDataField(id).then(()=> document.getElementById('load').style.display="none").catch(()=> alert("false"))

        })
    })

}
/* btn-mobie action*/ 
//dataSliderBar
function toggleBar (){
    const btn = document.querySelector('.cst-btn-bar')
    btn.addEventListener('click',(e)=>{
        action = !action
        action ? dataSliderBar.style.maxHeight=  "0px" : dataSliderBar.style.maxHeight = "500px" ;
        
    })
}
window.addEventListener('resize', (e)=>   e.target.innerWidth >=  767.98 ? dataSliderBar.style.maxHeight = "500px" : dataSliderBar.style.maxHeight = "0px");

