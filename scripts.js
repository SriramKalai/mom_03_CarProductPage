// gobal variable
let product;
let filteredproduct;
const productCard=document.querySelector(".productlist")
let locationDetails;
let cityplaceholder;

let filter={
    type:[],
    people:[],
    price:[],
    perpage:[7]
}

// adjust the value of the perpage
 if (window.matchMedia("(min-width: 1439px)").matches) {
    filter.perpage [0]=9; 
}

else {
    filter.perpage [0]=7;
}


// banner place holder value 
if ((window.matchMedia("(min-width: 767px) and (max-width: 1024px)").matches) || (window.innerWidth > 1367)) {
    cityplaceholder = "Select your city";
} else {
    cityplaceholder = "Semarang";
}


// fetching Bannerdeatils
function bannerdeatils() {
    let uri = "https://poised-bat-bathing-suit.cyclic.app/bannerdetails";
    fetch(uri) 
      .then(response => response.json())
      .then(data => {
        locationDetails = data; 
       console.log(locationDetails["Pick-up"]); 
       renderpickfun();
       locaationdropdown();
       locatinpickup();
       header();
      })
      .catch(error => {
        console.error('Error fetching JSON data:', error);
      });
  }

document.addEventListener("DOMContentLoaded", bannerdeatils);










// fetching the infomation from json

function fetchData() {
    let uri = "https://poised-bat-bathing-suit.cyclic.app/cars";
    fetch(uri) 
      .then(response => response.json())
      .then(data => {
        product = data; 
       console.log(product); 
        displayCarTypes();
        displayCarCapacities();
        filteredproduct=filterProducts(product, filter)    
        totalitem();
        productview() ;
      })
      .catch(error => {
        console.error('Error fetching JSON data:', error);
      });
  }

document.addEventListener("DOMContentLoaded", fetchData);

// product







// Function to display the unique car
function displayCarTypes() {
    
    var carTypes = {};
    for (var i = 0; i < product.length; i++) {
        var car = product[i];
        var carType = car.type;

        if (carType in carTypes) {
            carTypes[carType]++;
        } else {
            carTypes[carType] = 1;
        }
    }

    var carTypesElement = document.getElementById("carTypes");
    var carTypesHTML = `<ul>`;

    for (var type in carTypes) {
        carTypesHTML += `<li><label class="cursor-pointer flex pl-[2px]  mt-[32px] items-center"><input class="w-[20px] h-[20px] mr-10px rounded-[4px]" type='checkbox' name='carType' value='${type}' onchange='updateFilter(this)'>  
        <span class="text-[21px] ml-[9px] text-[#596780] tracking-[-0.02em] font-[600] mt-[-7px]">${type}</span>  
        <span class="text-[21px] text-[#90A3BF] tracking-[-0.02em] font-[600] mt-[-7px]">&nbsp;(${carTypes[type]})</span></label></li>`;
    }

    carTypesHTML += `</ul>`;
    carTypesElement.innerHTML = carTypesHTML;
}

// Function to display the unique car capacities with counts
function displayCarCapacities() {
  
    var carCapacities = {};
    for (var i = 0; i < product.length; i++) {
        var car = product[i];
        var capacity = car.capcity;

        if (capacity in carCapacities) {
            carCapacities[capacity]++;
        } else {
            carCapacities[capacity] = 1;
        }
    }

    // Display the car capacities and their counts
    var carCapacitiesElement = document.getElementById("carCapacities");
    var carCapacitiesHTML = `<ul>`;

    for (var capacity in carCapacities) {
        if (capacity<8){
        carCapacitiesHTML += `<li><label class="cursor-pointer flex pl-[2px]  mt-[32px] items-center"><input  class="w-[20px] h-[20px] mr-10px rounded-[4px]" type='checkbox' name='carCapacity' value="${capacity}" onchange='updateFilter(this)'>  
        <span class="text-[21px] ml-[9px] text-[#596780] tracking-[-0.02em] font-[600] mt-[-7px]">${capacity} Person</span>  
        <span class="text-[21px] text-[#90A3BF] tracking-[-0.02em] font-[600] mt-[-7px]">&nbsp;(${carCapacities[capacity]})</span></label></li>`;}
        else{
            carCapacitiesHTML += `<li><label class="cursor-pointer flex pl-[2px]  mt-[32px] items-center"><input  class="w-[20px] h-[20px] mr-10px rounded-[4px]" type='checkbox' name='carCapacity' value="${capacity}" onchange='updateFilter(this)'> 
            <span class="text-[21px] ml-[9px] text-[#596780] tracking-[-0.02em] font-[600] mt-[-7px]"> ${capacity}  or More </span> 
            <span class="text-[21px] text-[#90A3BF] tracking-[-0.02em] font-[600] mt-[-7px]">&nbsp;(${carCapacities[capacity]})</span></label></li>`;
        }
    }

    carCapacitiesHTML += `</ul>`;
    carCapacitiesElement.innerHTML = carCapacitiesHTML;
}

// Function to update the filter object based on checkbox changes
function updateFilter(checkbox) {
    var value = checkbox.value;
    var filterName = checkbox.name;

    if (filterName === "carType") {
        if (checkbox.checked) {
            filter.type.push(value);
        } else {
            var index = filter.type.indexOf(value);
            if (index > -1) {
                filter.type.splice(index, 1);
            }
        }
    } else if (filterName === "carCapacity") {
        if (checkbox.checked) {
            filter.people.push(value);
        } else {
            var index = filter.people.indexOf(value);
            if (index > -1) {
                filter.people.splice(index, 1);
            }
        }
    }
    filteredproduct=filterProducts(product, filter) ;
    console.log(filteredproduct)
    productview() ;

    console.log(filter);
}

// gendropdown for location

function gendropdown(info){
    let data=locationDetails[`${info}`]
    let template=``
    data.forEach((value)=>{
        template+=`<li data-value="1" class="${info}__list-item"><span class="dropdowntext md:text-[16px]">${value}</span></li>`
    })
    return template
}

// gen
function gentimedetails(info){
    let data=locationDetails["time"]
    let template=``
    console.log(data);
    data.forEach((value)=>{
        template+=`<li data-value="1" class="${info}__list-item"><span class="dropdowntext md:text-[16px]">${value}</span></li>`
    })
    return template
}



// function for pick and drop

function pickupfun(x){
    let y;
    let time;
    let dropdowndetail;
    if (x=="Pick - Up"){
        y="Pick-up";
        time="pickupTime";
        dropdowndetail=gendropdown("Pick-up");
    }
    else{
        y="Drop-Off";
        time="dropoffTime";
        dropdowndetail=gendropdown("Drop-Off");
    }
    let timedetail=gentimedetails(time);

    console.log(x)
    return `
    <div class="w-full h-[120px] flex bg-white flex-col rounded-[10px] p-[16px] lg:h-[132px] lg:p-[24px]">
            <div class="flex items-center gap-2 mt-[-2px]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="16" height="16" rx="8" fill="#3563E9" fill-opacity="0.3"/>
                    <circle cx="8" cy="8" r="4" fill="#3563E9"/>
                    </svg>
                <span class="text-[17px] tracking-[-0.02em] text-[#1A202C] font-[600]">${x}</span>
            </div>
            <div class="flex justify-between mt-[20px] lg:mt-[10px]">
                <div class="flex flex-col w-full mt-[20ox]">
                    <div class="flex flex-col">
                        <span class="font-[700]">Locations</span>
                        <div class="${y}">
                            <button href="#" role="button" data-value="" class="${y}__button" id="${y}swap">
                            <span class="text-[13px] text-[#90A3BF] tracking-[-0.01em] font-[400]">
                                <p>${cityplaceholder}</p>                              
                            </span>
                            <i class="downarrow cd:mr-[14px]">
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.00015 5.3997C4.65016 5.3997 4.30015 5.2647 4.03515 4.9997L0.775155 1.7397C0.630155 1.5947 0.630155 1.3547 0.775155 1.2097C0.920155 1.0647 1.16015 1.0647 1.30515 1.2097L4.56515 4.4697C4.80515 4.7097 5.19516 4.7097 5.43515 4.4697L8.69515 1.2097C8.84015 1.0647 9.08015 1.0647 9.22515 1.2097C9.37016 1.3547 9.37016 1.5947 9.22515 1.7397L5.96516 4.9997C5.70016 5.2647 5.35015 5.3997 5.00015 5.3997Z" fill="#1A202C" stroke="#1A202C" stroke-width="0.5"/>
                                </svg>                            
                            </i>
                            </button>
                            <ul class="${y}__list">
                                ${dropdowndetail}
                            </ul>
                        </div>                        
                    </div>
                </div>
                <div class="w-[1px] h-[48px] bg-[#C3D4E9] ml-[24px] lg:ml-[11px]"></div>
                <div class="flex flex-col justify-start w-full min-w-[127px] px-[20px]">
                    <span class="font-[700]">Date</span>
                    <div class="">
                        <form action="/action_page.php">
                            <input aria-label="date" type="date" id="${y}-date" name="pickupdate" class="${y}_date cursor-pointer text-[13px] text-[#90A3BF] tracking-[-0.01em] font-[400] clickable-date" placeholder="dd-mm-yyyy">
                        </form>
                    </div> 
                </div>
                <div class="w-[1px] h-[48px] bg-[#C3D4E9] mr-[20px] lg:mr-[15px]"></div>
                <div class="flex flex-col w-full">
                    <span class="font-[700]">Time</span>
                    <div class="${time}">
                        <button href="#" role="button" data-value="" class="${time}__button" id="${time}swap">
                        <span class="text-[13px] text-[#90A3BF] tracking-[-0.01em] font-[400]">
                            <p class="md:hidden lg:block cd:hidden">07:00</p>
                            <p class="hidden md:block lg:hidden cd:block">Select your time</p>
                        </span>
                        
                        <i class="downarrow cd:mr-[17px]">
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.00015 5.3997C4.65016 5.3997 4.30015 5.2647 4.03515 4.9997L0.775155 1.7397C0.630155 1.5947 0.630155 1.3547 0.775155 1.2097C0.920155 1.0647 1.16015 1.0647 1.30515 1.2097L4.56515 4.4697C4.80515 4.7097 5.19516 4.7097 5.43515 4.4697L8.69515 1.2097C8.84015 1.0647 9.08015 1.0647 9.22515 1.2097C9.37016 1.3547 9.37016 1.5947 9.22515 1.7397L5.96516 4.9997C5.70016 5.2647 5.35015 5.3997 5.00015 5.3997Z" fill="#1A202C" stroke="#1A202C" stroke-width="0.5"/>
                            </svg>                            
                        </i>
                        </button>
                        <ul class="${time}__list">
                            ${timedetail}
                        </ul>
                    </div> 
                </div>
            </div>
        </div>`
}
const pickup=document.querySelector(".pickup")
const dropoff=document.querySelector(".dropoff")

function renderpickfun(){
    pickup.innerHTML=pickupfun("Pick - Up")
    dropoff.innerHTML=pickupfun("Drop - Off")
}



// red heart
function heartchange(info){
    const path = document.getElementById(`myPath${info}`);        
    if (path.classList.contains('heart')) {
        path.removeAttribute('fill');
        path.setAttribute('stroke', '#90A3BF');
        path.classList.remove("heart")
        
    } else {
        path.setAttribute('fill', '#ED3F3F');
        path.setAttribute('stroke', 'none');
        path.classList.add("heart")
    }
    
}
// total number of cars
let totalcarpresnt;
function totalitem(){
    const total=document.querySelector(".totalitems")
    totalcarpresnt=product.length;
    console.log(totalcarpresnt)
    total.innerHTML=`${totalcarpresnt} car`;
  }



// product template
function productview(){

    let template = ''; 
  
    filteredproduct.forEach(product => {
      template += `
      <div class="bg-white min-w-[300px] w-full h-[240px] rounded-[10px] p-[16px] lg:h-[388px] lg:px-[24px] lg:py-[22px] lg:w-[97%]">
            <div class="justify-between flex">
                <div class="flex flex-col">
                    <span class="text-[16px] text-[#1A202C] font-[600] tracking-[-0.02em] lg:text-[22px] lg:tracking-[-0.03]"><a href="/#">${product.name}</a></span>
                    <span class="text-[12px] lg:text-[16px] text-[#90A3BF] font-[500] mt-[-3px] tracking-[-0.02em]">${product.type}</span>
                </div>
                <button class="flex mt-[3px] h-[15px]" id="myButton${product.id}" aria-label="heartbutton" onclick="heartchange(${product.id})">
                    <svg class="lg:w-[24px] lg:h-[26px]" width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="myPath${product.id}" d="M8.41334 12.8733C8.18668 12.9533 7.81334 12.9533 7.58668 12.8733C5.65334 12.2133 1.33334 9.45998 1.33334 4.79332C1.33334 2.73332 2.99334 1.06665 5.04001 1.06665C6.25334 1.06665 7.32668 1.65332 8.00001 2.55998C8.67334 1.65332 9.75334 1.06665 10.96 1.06665C13.0067 1.06665 14.6667 2.73332 14.6667 4.79332C14.6667 9.45998 10.3467 12.2133 8.41334 12.8733Z" stroke="#90A3BF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            <div class="flex h-[130px] justify-center lg:block lg:h-[230px] cursor-pointer" >                
                <div class="flex justify-between items-center  lg:justify-center lg:h-[160px] lg:items-end ">
                    <div class="flex justify-center flex-col">
                        <div class="flex justify-center ml-[-20px] lg:ml-[0px] h-[70px] lg:h-[auto]">
                            <img src="${product.image}" class="min-h-[52px] max-h-[68px] h-fit max-w-[166px] w-fit lg:max-h-[160px] lg:max-w-[252px]" alt="${product.name}">
                        </div>
                        <div class="imggradient flex w-[221px] h-[44px] mt-[-41px]  lg:w-[264px] lg:h-[66px]">
                        </div>
                    </div>
                </div> 
                <div class="flex flex-col pt-[6px] lg:pl-[4px] gap-[9px] lg:flex-row  lg:gap-[24px] lg:mt-[16px]">
                    <div class="flex items-center gap-[4px]">
                        <svg class="lg:w-[24px] lg:h-[24px] w-[14px] h-[14px]" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.0317 5.4425L11.865 4.85916C11.6492 4.75416 11.3808 4.83583 11.2758 5.05166C11.165 5.27333 11.2525 5.53583 11.4683 5.64083L12.3958 6.10166V8.89583L10.2083 8.90166V2.91666C10.2083 1.75 9.42666 1.16666 8.45832 1.16666H3.79166C2.82332 1.16666 2.04166 1.75 2.04166 2.91666V12.3958H1.16666C0.92749 12.3958 0.729156 12.5942 0.729156 12.8333C0.729156 13.0725 0.92749 13.2708 1.16666 13.2708H11.0833C11.3225 13.2708 11.5208 13.0725 11.5208 12.8333C11.5208 12.5942 11.3225 12.3958 11.0833 12.3958H10.2083V9.77666L12.8333 9.77083C13.0783 9.77083 13.2708 9.5725 13.2708 9.33333V5.83333C13.2708 5.67 13.1775 5.51833 13.0317 5.4425ZM3.49999 4.01916C3.49999 3.20833 3.99582 2.91666 4.60249 2.91666H7.65332C8.25416 2.91666 8.74999 3.20833 8.74999 4.01916V4.73666C8.74999 5.54166 8.25416 5.83333 7.64749 5.83333H4.60249C3.99582 5.83333 3.49999 5.54166 3.49999 4.73083V4.01916ZM3.79166 7.14583H5.54166C5.78082 7.14583 5.97916 7.34416 5.97916 7.58333C5.97916 7.8225 5.78082 8.02083 5.54166 8.02083H3.79166C3.55249 8.02083 3.35416 7.8225 3.35416 7.58333C3.35416 7.34416 3.55249 7.14583 3.79166 7.14583Z" fill="#90A3BF"/>
                        </svg>
                        <span class="text-[16px] text-[#90A3BF] font-[500] tracking-[-0.02rem] lg:text-[14px]">${product.liter}</span>
                    </div>
                    <div class="flex items-center gap-[4px]">
                        <svg class="lg:w-[24px] lg:h-[24px] w-[14px] h-[14px]" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 1C3.688 1 1 3.688 1 7C1 10.312 3.688 13 7 13C10.312 13 13 10.312 13 7C13 3.688 10.318 1 7 1Z" fill="#90A3BF"/>
                            <rect x="2" y="2" width="10" height="10" rx="5" fill="white"/>
                            <path d="M7 3C4.792 3 3 4.792 3 7C3 9.208 4.792 11 7 11C9.208 11 11 9.208 11 7C11 4.792 9.212 3 7 3Z" fill="#90A3BF"/>
                            <rect x="8" y="6" width="4" height="2" fill="#90A3BF"/>
                            <rect x="2" y="6" width="4" height="2" fill="#90A3BF"/>
                            <rect x="6" y="8" width="2" height="4" fill="#90A3BF"/>
                            <rect x="4" y="4" width="6" height="6" rx="3" fill="white"/>
                        </svg>
                        <span class="text-[12px] text-[#90A3BF] font-[500] tracking-[-0.02rem] lg:text-[14px] lg:pl-[4px]">${product.geartype}</span>
                    </div>
                    <div class="flex items-center gap-[4px] mt-[3px]">
                        <svg class="lg:w-[24px] lg:h-[24px] w-[14px] h-[14px]" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.24999 1.16667C3.72166 1.16667 2.47916 2.40917 2.47916 3.93751C2.47916 5.43667 3.65166 6.65001 5.17999 6.70251C5.22666 6.69667 5.27332 6.69667 5.30832 6.70251C5.31999 6.70251 5.32582 6.70251 5.33749 6.70251C5.34332 6.70251 5.34332 6.70251 5.34916 6.70251C6.84249 6.65001 8.01499 5.43667 8.02082 3.93751C8.02082 2.40917 6.77832 1.16667 5.24999 1.16667Z" fill="#90A3BF"/>
                            <path d="M8.21334 8.25416C6.58584 7.16916 3.93167 7.16916 2.29251 8.25416C1.55167 8.75 1.14334 9.42083 1.14334 10.1383C1.14334 10.8558 1.55167 11.5208 2.28667 12.0108C3.10334 12.5592 4.17667 12.8333 5.25001 12.8333C6.32334 12.8333 7.39667 12.5592 8.21334 12.0108C8.94834 11.515 9.35668 10.85 9.35668 10.1267C9.35084 9.40916 8.94834 8.74416 8.21334 8.25416Z" fill="#90A3BF"/>
                            <path d="M11.6608 4.28167C11.7542 5.41334 10.9492 6.405 9.835 6.53917C9.82917 6.53917 9.82917 6.53917 9.82334 6.53917H9.80584C9.77083 6.53917 9.73583 6.53917 9.70667 6.55084C9.14083 6.58 8.62167 6.39917 8.23083 6.06667C8.83167 5.53 9.17584 4.725 9.10584 3.85C9.065 3.3775 8.90167 2.94584 8.65667 2.57834C8.87834 2.4675 9.135 2.3975 9.3975 2.37417C10.5408 2.275 11.5617 3.12667 11.6608 4.28167Z" fill="#90A3BF"/>
                            <path d="M12.8275 9.67751C12.7808 10.2433 12.4192 10.7333 11.8125 11.0658C11.2292 11.3867 10.4942 11.5383 9.76499 11.5208C10.185 11.1417 10.43 10.6692 10.4767 10.1675C10.535 9.44417 10.1908 8.75001 9.5025 8.19584C9.11166 7.88667 8.65666 7.64167 8.16083 7.46084C9.44999 7.08751 11.0717 7.33834 12.0692 8.14334C12.6058 8.57501 12.88 9.11751 12.8275 9.67751Z" fill="#90A3BF"/>
                        </svg>
                        <span class="text-[12px] text-[#90A3BF] font-[500] tracking-[-0.02rem] lg:text-[14px] lg:pl-[4px]">${product.capcity} People</span>
                    </div>
                </div>                
            </div> 
            <div class="flex justify-between items-center lg:mt-[10px]">
                <div class="flex flex-col mt-[-5px]">
                    <span class="text-[#1A202C] text-[18px] font-[600] tracking-[-0.01em] lg:tracking-[0] lg:text-[24px]">$${product.price}/ <span class="text-[#90A3BF] text-[12px] font-[600] tracking-[-0.01em] lg:text-[14px]">day</span></span>
                    <del class="mt-[-3px] text-[#90A3BF] font-[500] tracking-[-0.01em] lg:text-[18px]">${product.discount}</del>
                </div>
                <button class="px-[16px] pb-[10px] pt-[8px] mt-[3px] rounded-[4px] bg-[#3563E9] w-[100px] lg:text-[18px] h-[36px] text-[13px] font-[600] tracking-[-0.02em] lg:w-[116px] lg:h-[44px] lg:mt-[5px] lg:mr-[-1px]">
                <span class="lg:hidden text-white">Rental Now</span> 
                <span class="hidden lg:block  text-white ">Rent Now</span> 
                </button>
            </div>
        </div>`; 
  
  }); 
  productCard.innerHTML = template; 
  }




//   filter product
function filterProducts(products, filter) {
    let filteredProducts = [...products];
    if (filter.type.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        filter.type.includes(product.type)
      );
    }
  
    //people filter
    if (filter.people.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        filter.people.includes(product.capcity)        
      );
    }
  
    //price filter
    if (filter.price.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
            parseInt(product.price) < filter.price[0]
          
        );
      }
  
    const perPage = filter.perpage[0];
    const page = 1
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const result = filteredProducts.slice(startIndex, endIndex);  
    return result;
  }


//   show more cars
function showmore(){
    filter.perpage[0]+=3;
    if (filter.perpage[0] >= totalcarpresnt){
        console.log(filter.perpage[0])
       const showMoreButton =document.querySelector(".showMoreButton")
       showMoreButton.classList.remove("flex");
       showMoreButton.classList.add("hidden");

       const centercontainer=document.querySelector(".centercontainer");
       centercontainer.classList.add("md:mb-[40px]")
    }

    filteredproduct=filterProducts(product, filter)    
    productview() ;
}



// fetch the page details from webserver
let pagedetail;
function pageData() {
    let uri = "https://poised-bat-bathing-suit.cyclic.app/footer";
    fetch(uri) 
      .then(response => response.json())
      .then(data => {
        pagedetail = data; 
       console.log(pagedetail); 
       footercontent()
      })
      .catch(error => {
        console.error('Error fetching JSON data:', error);
      });
  }
  document.addEventListener("DOMContentLoaded",pageData() );



//   footer details
function footercontent(){
    const footerHeaderDetails=document.querySelector(".footerHeader")
    const footerAbouttem=document.querySelector(".footerAbout")
    const footerSocialtem=document.querySelector(".footerSocial")
    const footerSocialtemdes=document.querySelector(".footerSocialdes")
    const footercommunity=document.querySelector(".footercommunity")
    const lastline=document.querySelector(".lastline")
    const lastlinedes=document.querySelector(".lastlinedes");


    lastlinedes.innerHTML=`
                        <div class="flex">
                            <a href="/#" class="text-[17px] text-[#1A202C] font-[600] tracking-[-0.02em]">${pagedetail[1]["terms"][2]}</a>
                        </div>
                        <div class="flex gap-[70px]">
                            <a href="/#" class="text-[17px] text-[#1A202C] font-[600] tracking-[-0.02em]">${pagedetail[1]["terms"][0]}</a>
                            <a href="/#" class="text-[17px] text-[#1A202C] font-[600] tracking-[-0.02em]">${pagedetail[1]["terms"][1]}</a>
                        </div>`

    
    
    const footerData=pagedetail[0]    
    
    footerHeaderDetails.innerHTML=`                       
                        <div class="flex flex-col">
                            <img src="${footerData["brandlogo"]}" class="w-[100px] h-[22px] lg:h-[26px] lg:w-[134px]" alt="brand logo">
                            <span class="mt-[17px] lg:mt-[20px] w-[65%] lg:w-[53%] text-[#90A3BF] text-[13px] lg:text-[17px] leading-[200%] lg:leading-[150%] tracking-[-0.01em]">${footerData["quotes"]}</span>
                        </div>`


    let templatefooter=``
    function footerCreater(info){
        templatefooter=``
        console.log(info)
        info.forEach((info,index)=>{
            console.log(info)
            templatefooter+=`<li class="${index==0 ? "text-[#1A202C]":"text-[#90A3BF]"}
            ${index==0 ? "text-[21px]":"text-[16px] lg:text-[18px]"} ${index==0 ? "font-[600]":"font-[500]"} 
            ${index==0 ? "mb-[19px] lg:mb-[32px]":"mt-[14px] lg:mt-[20px]"} 
            ${index==0 ?"tracking-[-0.02em]":"tracking-[0em] lg:tracking-[-0.02em]"}"><a href="/#">${info}</a></li>`
          })
    }

    footerCreater(pagedetail[1]["about"])
    // console.log(templatefooter)
    footerAbouttem.innerHTML=templatefooter;

    footerCreater(pagedetail[1]["socials"])
    // console.log(templatefooter)
    footerSocialtem.innerHTML=templatefooter;
    footerSocialtemdes.innerHTML=templatefooter;

    footerCreater(pagedetail[1]["community"])
    footercommunity.innerHTML=templatefooter;


    lastline.innerHTML=`
            <div class="flex justify-between" >
                <a href="/#" class="text-[13px] text-[#1A202C] font-[600] tracking-[-0.02em]">${pagedetail[1]["terms"][0]}</a>
                <a href="/#" class="text-[13px] text-[#1A202C] font-[600] tracking-[-0.02em]">${pagedetail[1]["terms"][1]}</a>
            </div>
            <a href="/#" class="text-[13px] text-[#1A202C] font-[600] tracking-[-0.02em] mt-[30px]">${pagedetail[1]["terms"][2]}</a>`





}



//show and hide the dialog box
function showleftside(){
    const leftside=document.querySelector(".leftside")
    document.body.classList.add('overflow-hidden');
    modal.showModal();
  
    if(leftside.classList.contains("hidden")){
       leftside.classList.remove("hidden")}
  }

  function filterapply(){
    modal.close();
    document.body.classList.remove('overflow-hidden');
  };


//   dropdown  Pick up
function locatinpickup(){
    document.querySelector('.Pick-up__button').addEventListener('click', function() {
        document.querySelector('.Pick-up__list').classList.toggle('active');
    });
    
    var listItems = document.querySelectorAll('.Pick-up__list-item');
    listItems.forEach(function(item) {
        item.addEventListener('click', function() {
        var itemValue = this.getAttribute('data-value');
        console.log(itemValue);
        var buttonText = this.innerText;
        var button = document.querySelector('.Pick-up__button span');
        button.innerText = buttonText;
        button.parentNode.setAttribute('data-value', itemValue);
        document.querySelector('.Pick-up__list').classList.remove('active');
        });
    });


    // pick up time
    document.querySelector('.pickupTime__button').addEventListener('click', function() {
        document.querySelector('.pickupTime__list').classList.toggle('active');
    });
    
    var listItems = document.querySelectorAll('.pickupTime__list-item');
    listItems.forEach(function(item) {
        item.addEventListener('click', function() {
        var itemValue = this.getAttribute('data-value');
        console.log(itemValue);
        var buttonText = this.innerText;
        var button = document.querySelector('.pickupTime__button span');
        button.innerText = buttonText;
        button.parentNode.setAttribute('data-value', itemValue);
        document.querySelector('.pickupTime__list').classList.remove('active');
        });
    });

   
}
    


//   price slider

var sliderLeft=document.getElementById("slider0to50");
var sliderRight=document.getElementById("slider51to100");
var inputMin=document.getElementById("min");

document.getElementById("slider0to50").oninput = function() {
    var element = document.getElementById("slider0to50");
    var value = (element.value - element.min) / (element.max - element.min) * 100;
    element.style.background = 'linear-gradient(to right, #3563E9 0%, #3563E9 ' + value + '%, #90A3BF ' + value + '%, #90A3BF 100%)';
  };

///value updation from input to slider
//function input update to slider
function sliderLeftInput(){
   sliderLeft.value=inputMin.value;
}
function sliderRightInput(){
   sliderRight.value=(inputMax.value);
}


console.log(sliderLeftInput)

function inputMinSliderLeft(){//slider update inputs
   inputMin.innerHTML=`<span class="text-[#596780] text-[23px] font-[600] tracking-[-0.02em]"> Max.$${sliderLeft.value}.00</span>`
   filter.price[0]=sliderLeft.value;
   filteredproduct=filterProducts(product, filter) ;
    console.log(filteredproduct)
    productview() ;

}

sliderLeft.addEventListener("change",inputMinSliderLeft);


// dropdown for drop
function locaationdropdown(){
    document.querySelector('.Drop-Off__button').addEventListener('click', function() {
        document.querySelector('.Drop-Off__list').classList.toggle('active');
    });
    
    var listItems = document.querySelectorAll('.Drop-Off__list-item');
    listItems.forEach(function(item) {
        item.addEventListener('click', function() {
        var itemValue = this.getAttribute('data-value');
        console.log(itemValue);
        var buttonText = this.innerText;
        console.log(buttonText)
        var button = document.querySelector('.Drop-Off__button span');
        button.innerText = buttonText;
        button.parentNode.setAttribute('data-value', itemValue);
        document.querySelector('.Drop-Off__list').classList.remove('active');
        });
    });


    // drop time 
    document.querySelector('.dropoffTime__button').addEventListener('click', function() {
        document.querySelector('.dropoffTime__list').classList.toggle('active');
    });
    
    var listItems = document.querySelectorAll('.dropoffTime__list-item');
    listItems.forEach(function(item) {
        item.addEventListener('click', function() {
        var itemValue = this.getAttribute('data-value');
        console.log(itemValue);
        var buttonText = this.innerText;
        console.log(buttonText)
        var button = document.querySelector('.dropoffTime__button span');
        button.innerText = buttonText;
        button.parentNode.setAttribute('data-value', itemValue);
        document.querySelector('.dropoffTime__list').classList.remove('active');
        });
    });
}


//  swap contentt

function swapValues() {
    const button1 = document.getElementById("Pick-upswap");
    const button2 = document.getElementById("Drop-Offswap");

    const temp = button1.textContent.trim();
    const temp2=button2.textContent.trim();
    var itemValue = button1.getAttribute('data-value');
    console.log("button one",temp);

    var itemValue = button2.getAttribute('data-value');
    console.log("button two",temp2);


    var buttonText = temp2;
    var button = document.querySelector('.Pick-up__button span');
    button.innerText = buttonText;
    button.parentNode.setAttribute('data-value', itemValue);
    document.querySelector('.Pick-up__list').classList.remove('active');


    var buttonText = temp;
    var button = document.querySelector('.Drop-Off__button span');
    button.innerText = buttonText;
    button.parentNode.setAttribute('data-value', itemValue);
    document.querySelector('.Drop-Off__list').classList.remove('active');

   
    console.log(temp)
    // button1.parentNode.setAttribute('data-value', temp)
    // Swap the values
    
    // button1.textContent = button2.textContent;
    // button2.textContent = temp;
  }



  



//   skeleton for the webpage

const productlistskelton =document.querySelector(".productlist")
let productsk=``
for (let i = 0; i < filter.perpage[0]; i++) {
    productsk+=`<div class="flex w-[100%] h-[240px]  lg:w-[100%] lg:h-[388px] bg-[#dddddd] rounded-[15px]"></div>`
  }
  productlistskelton.innerHTML=productsk;



const pickupsk=document.querySelector(".pickup")
const dropoffsk=document.querySelector(".dropoff")
let bannersk=`<div class="flex w-[100%] h-[120px]  lg:w-[100%] lg:h-[136px] bg-[#dddddd] rounded-[10px]"></div> `
pickupsk.innerHTML=bannersk;
dropoffsk.innerHTML=bannersk;


const typesk=document.querySelector("#carTypes")
let typetemplate=``
for (let i = 0; i < 6; i++) {
    typetemplate+=`<div class="flex w-[150px] h-[28px] bg-[#dddddd] rounded-[15px] mt-[27px]"></div>`
  }
typesk.innerHTML=typetemplate;



const capacitysk=document.querySelector("#carCapacities")
let capacitytemplate=``
for (let i = 0; i < 4; i++) {
    capacitytemplate+=`<div class="flex w-[150px] h-[28px] bg-[#dddddd] rounded-[15px] mt-[27px]"></div>`
  }
  capacitysk.innerHTML=capacitytemplate;


const footerHeadersk=document.querySelector(".footerHeader")
footerHeadersk.innerHTML=`<div class="flex w-[120px] h-[38px] lg:w-[168px] lg:h-[46px] bg-[#dddddd] rounded-[30px]"></div>
                    <div class="flex w-[250px] h-[50px] lg:w-[250px] lg:h-[56px] bg-[#dddddd] rounded-[25px] mt-[16px]"></div>`
    
                    
let footersk=``          
for (let i = 0; i < 5; i++) {
    footersk+=`<div class="flex w-[110px] h-[22px] bg-[#dddddd] rounded-[15px] ${i==0 ?"mt-[0px]":"mt-[21px]"}"></div>`
  }

const footerAboutsk=document.querySelector(".footerAbout")
footerAboutsk.innerHTML=footersk;
const footerSocialsk=document.querySelector(".footerSocial")
footerSocialsk.innerHTML=footersk;
const footercommunitysk=document.querySelector(".footercommunity")
footercommunitysk.innerHTML=footersk;
const footerSocialdessk=document.querySelector(".footerSocialdes")
footerSocialdessk.innerHTML=footersk;


const lastlinedes=document.querySelector(".lastlinedes");


lastlinedes.innerHTML=`
                    <div class="flex w-[250px] h-[30px]  bg-[#dddddd] rounded-[25px]">
                    </div>
                    <div class="flex gap-[70px]">
                       <div class="flex w-[150px] h-[30px]  bg-[#dddddd] rounded-[25px]"></div>
                       <div class="flex w-[150px] h-[30px]  bg-[#dddddd] rounded-[25px]"></div>
                    </div>`
const lastline=document.querySelector(".lastline")

lastline.innerHTML=` <div class="flex justify-between" >
                        <div class="flex w-[100px] h-[30px]  bg-[#dddddd] rounded-[25px]"></div>
                        <div class="flex w-[100px] h-[30px]  bg-[#dddddd] rounded-[25px]"></div>
                    </div>
                    <div class="flex w-[200px] h-[30px]  bg-[#dddddd] rounded-[25px] mt-[30px]"></div>`


               



// header content
function header(){
const header=document.querySelector(".header")

header.innerHTML=`<div class="flex justify-between h-[28px] w-full mb-[35px] lg:hidden">
                    <button aria-label="menu"><img src="images/menu.svg" src="menu button" class="w-[24px] h-[24px]" alt="menu"></button>
                    <a href="/#"><img src="${locationDetails["header"][0]["profileImage"]}" alt="profile" class="w-[28px] h-[28px]"></a>
                    </div>
                    <div class="lg:hidden">
                    <a href="/#"><img src="${locationDetails["header"][0]["brandlogomobile"]}" alt="brand logo" class="w-[100px] h-[24px]"></a>
                    </div>
                    <div class="flex mt-[25px] flex-1 gap-4 justify-between items-center w-full lg:hidden">
                    <div class="mobsearchlabel flex w-[100%]">
                        <input type="text" placeholder="&nbsp;Search something here" class="mobsearchinput min-w-[200px] w-full border-[1px] border-[#C3D4E9] border-solid p-[11px] rounded-[10px] placeholder-[#596780] placeholder text-[14px]  font-medium flex-1 grow">
                    </div>
                    <div>
                        <button class="border-[#C3D4E9] border-[1px] rounded-[10px] p-[10px]" onclick="showleftside()">
                            <svg  class="w-[34px] h-[24px]"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 6.5H16" stroke="#596780" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M6 6.5H2" stroke="#596780" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M10 10C11.933 10 13.5 8.433 13.5 6.5C13.5 4.567 11.933 3 10 3C8.067 3 6.5 4.567 6.5 6.5C6.5 8.433 8.067 10 10 10Z" stroke="#596780" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M22 17.5H18" stroke="#596780" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8 17.5H2" stroke="#596780" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M14 21C15.933 21 17.5 19.433 17.5 17.5C17.5 15.567 15.933 14 14 14C12.067 14 10.5 15.567 10.5 17.5C10.5 19.433 12.067 21 14 21Z" stroke="#596780" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>                            
                        </button>
                    </div>
                    </div>
                    <div class="lg:flex md:gap-[40px] lg:gap-[79px] pl-[20px] w-full hidden">
                    <div class="flex">
                        <img src="${locationDetails["header"][0]["brandlogodes"]}" alt="brand logo" class="w-[166px] h-[28px] mt-[7px]">
                    </div>
                    <div class="searchlabel flex w-[100%]">
                        <input type="text" placeholder="&nbsp;&nbsp;&nbsp;&nbsp;Search something here" class="searchinput min-w-[200px] max-w-[492px] w-[100%] border-[1px] border-[#C3D4E9] border-solid p-[11px] rounded-[70px] placeholder-[#596780] placeholder text-[14px]  font-[500] flex-1 grow">
                    </div>
                    </div>
                    <div class="lg:flex gap-[20px] ml-[20px] hidden">
                    <button class="profileheadrer" aria-label="favourite button">
                        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.44 0.0999756C12.63 0.0999756 11.01 0.979976 10 2.32998C8.99 0.979976 7.37 0.0999756 5.56 0.0999756C2.49 0.0999756 0 2.59998 0 5.68998C0 6.87998 0.19 7.97998 0.52 8.99998C2.1 14 6.97 16.99 9.38 17.81C9.72 17.93 10.28 17.93 10.62 17.81C13.03 16.99 17.9 14 19.48 8.99998C19.81 7.97998 20 6.87998 20 5.68998C20 2.59998 17.51 0.0999756 14.44 0.0999756Z" fill="#596780"/>
                        </svg>                    
                    </button>
                    <button class="profileheadrer" aria-label="notification button">
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.34 12.49L14.34 10.83C14.13 10.46 13.94 9.76 13.94 9.35V6.82C13.94 4.47 12.56 2.44 10.57 1.49C10.05 0.57 9.09 0 7.99 0C6.9 0 5.92 0.59 5.4 1.52C3.45 2.49 2.1 4.5 2.1 6.82V9.35C2.1 9.76 1.91 10.46 1.7 10.82L0.690004 12.49C0.290004 13.16 0.200004 13.9 0.450004 14.58C0.690004 15.25 1.26 15.77 2 16.02C3.94 16.68 5.98 17 8.02 17C10.06 17 12.1 16.68 14.04 16.03C14.74 15.8 15.28 15.27 15.54 14.58C15.8 13.89 15.73 13.13 15.34 12.49Z" fill="#596780"/>
                        </svg>
                        <div class="reddot">
                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="5.5" cy="5.5" r="5.5" fill="#FF4423"/>
                            </svg>                        
                        </div>
                    </button>
                    <button class="profileheadrer" aria-label="setting button">
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.1 7.22006C16.29 7.22006 15.55 5.94006 16.45 4.37006C16.97 3.46006 16.66 2.30006 15.75 1.78006L14.02 0.790059C13.23 0.320059 12.21 0.600059 11.74 1.39006L11.63 1.58006C10.73 3.15006 9.25 3.15006 8.34 1.58006L8.23 1.39006C7.78 0.600059 6.76 0.320059 5.97 0.790059L4.24 1.78006C3.33 2.30006 3.02 3.47006 3.54 4.38006C4.45 5.94006 3.71 7.22006 1.9 7.22006C0.86 7.22006 0 8.07006 0 9.12006V10.8801C0 11.9201 0.85 12.7801 1.9 12.7801C3.71 12.7801 4.45 14.0601 3.54 15.6301C3.02 16.5401 3.33 17.7001 4.24 18.2201L5.97 19.2101C6.76 19.6801 7.78 19.4001 8.25 18.6101L8.36 18.4201C9.26 16.8501 10.74 16.8501 11.65 18.4201L11.76 18.6101C12.23 19.4001 13.25 19.6801 14.04 19.2101L15.77 18.2201C16.68 17.7001 16.99 16.5301 16.47 15.6301C15.56 14.0601 16.3 12.7801 18.11 12.7801C19.15 12.7801 20.01 11.9301 20.01 10.8801V9.12006C20 8.08006 19.15 7.22006 18.1 7.22006ZM10 13.2501C8.21 13.2501 6.75 11.7901 6.75 10.0001C6.75 8.21006 8.21 6.75006 10 6.75006C11.79 6.75006 13.25 8.21006 13.25 10.0001C13.25 11.7901 11.79 13.2501 10 13.2501Z" fill="#596780"/>
                        </svg>
                    </button>
                    <button class="w-[44px] h-[44px]">
                        <img src="${locationDetails["header"][0]["profileImage"]}" class="w-[44px] h-[44px]" alt="profile">
                    </button>
                    </div> `

}
