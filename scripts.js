// gobal variable
let product;
let filteredproduct;
const productCard=document.querySelector(".productlist")

let filter={
    type:[],
    people:[],
    price:[],
    perpage:[7]
}







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







// Function to display the unique car types with counts
function displayCarTypes() {
    // Create an object to store the car types and their counts
    var carTypes = {};

    // Loop through the products and count the car types
    for (var i = 0; i < product.length; i++) {
        var car = product[i];
        var carType = car.type;

        if (carType in carTypes) {
            carTypes[carType]++;
        } else {
            carTypes[carType] = 1;
        }
    }

    // Display the car types and their counts
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
    // Create an object to store the car capacities and their counts
    var carCapacities = {};

    // Loop through the products and count the car capacities
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
        if (capacity!=8){
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





// function for pick and drop

function pickupfun(x){
    let y;
    if (x=="Pick - Up"){
        y="Pick-up";
    }
    else{
        y="Drop-Off"
    }

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
            <div class="flex justify-between mt-[20px]">
                <div class="flex flex-col w-full mt-[20ox]">
                    <div class="flex flex-col">
                        <span class="font-[700]">Locations</span>
                        <div class="${y}">
                            <button href="#" role="button" data-value="" class="${y}__button" id="${y}swap">
                            <span class="text-[13px] text-[#90A3BF] tracking-[-0.01em] font-[400]">Semarang</span>
                            <i class="downarrow">
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.00015 5.3997C4.65016 5.3997 4.30015 5.2647 4.03515 4.9997L0.775155 1.7397C0.630155 1.5947 0.630155 1.3547 0.775155 1.2097C0.920155 1.0647 1.16015 1.0647 1.30515 1.2097L4.56515 4.4697C4.80515 4.7097 5.19516 4.7097 5.43515 4.4697L8.69515 1.2097C8.84015 1.0647 9.08015 1.0647 9.22515 1.2097C9.37016 1.3547 9.37016 1.5947 9.22515 1.7397L5.96516 4.9997C5.70016 5.2647 5.35015 5.3997 5.00015 5.3997Z" fill="#1A202C" stroke="#1A202C" stroke-width="0.5"/>
                                </svg>                            
                            </i>
                            </button>
                            <ul class="${y}__list">
                            <li data-value="1" class="${y}__list-item"><span class="dropdowntext">Bangalore</span></li>
                            <li data-value="2" class="${y}__list-item"><span class="dropdowntext">Karur</span></li>
                            <li data-value="3" class="${y}__list-item"><span class="dropdowntext">Salem</span></li>
                            <li data-value="4" class="${y}__list-item"><span class="dropdowntext">Coimbatore</span></li>
                            </ul>
                        </div>                        
                    </div>
                </div>
                <div class="w-[1px] h-[48px] bg-[#C3D4E9] ml-[24px]"></div>
                <div class="flex flex-col justify-start w-full min-w-[127px] px-[20px]">
                    <span class="font-[700]">Date</span>
                </div>
                <div class="w-[1px] h-[48px] bg-[#C3D4E9] mr-[20px]"></div>
                <div class="flex flex-col w-full">
                    <span class="font-[700]">Time</span>
                </div>
            </div>
        </div>`
}
const pickup=document.querySelector(".pickup")
const dropoff=document.querySelector(".dropoff")

pickup.innerHTML=pickupfun("Pick - Up")
dropoff.innerHTML=pickupfun("Drop - Off")



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
function totalitem(){
    const total=document.querySelector(".totalitems")
    const productlen=product.length;
    console.log(productlen)
    total.innerHTML=`${productlen} car`;
  }



// product template
function productview(){

    let template = ''; 
  
    filteredproduct.forEach(product => {
      template += `
      <div class="bg-white min-w-[300px] w-full h-[240px] rounded-[10px] p-[16px] lg:h-[388px] lg:px-[24px] lg:py-[22px] lg:w-[97%] lg:mt-[5px]">
            <div class="justify-between flex">
                <div class="flex flex-col">
                    <span class="text-[16px] text-[#1A202C] font-[600] tracking-[-0.02em] lg:text-[22px] lg:tracking-[-0.03]">${product.name}</span>
                    <span class="text-[12px] lg:text-[16px] text-[#90A3BF] font-[500] mt-[-3px] tracking-[-0.02em]">${product.type}</span>
                </div>
                <button class="flex mt-[3px] h-[15px]" id="myButton${product.id}" aria-label="heartbutton" onclick="heartchange(${product.id})">
                    <svg class="lg:w-[24px] lg:h-[26px]" width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="myPath${product.id}" d="M8.41334 12.8733C8.18668 12.9533 7.81334 12.9533 7.58668 12.8733C5.65334 12.2133 1.33334 9.45998 1.33334 4.79332C1.33334 2.73332 2.99334 1.06665 5.04001 1.06665C6.25334 1.06665 7.32668 1.65332 8.00001 2.55998C8.67334 1.65332 9.75334 1.06665 10.96 1.06665C13.0067 1.06665 14.6667 2.73332 14.6667 4.79332C14.6667 9.45998 10.3467 12.2133 8.41334 12.8733Z" stroke="#90A3BF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            <div class="flex h-[130px] justify-center lg:block lg:h-[230px]">
                <div class="flex justify-between items-center  lg:justify-center lg:h-[160px] lg:items-end">
                    <div class="flex [w-221px] justify-center flex-col">
                        <div class="flex justify-center ml-[-20px] lg:ml-[0px]">
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
            // console.log(product.price)
            parseInt(product.price) < filter.price[0]
          
        );
      }
  
    // Determine number of results per page
    const perPage = filter.perpage[0];
  
    // Get the desired page based on perPage value
    const page = 1

    // Calculate the start and end indices for the current page
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
  
    // Get the products for the current page
    const result = filteredProducts.slice(startIndex, endIndex);  
    return result;
  }


//   show more cars
function showmore(){
    filter.perpage[0]+=3;
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



//  swap contentt

function swapValues() {
    const button1 = document.getElementById("Pick-upswap");
    const button2 = document.getElementById("Drop-Offswap");

    const temp = button1.textContent;
    const temp2=button2.textContent;

    var itemValue = button2.getAttribute('data-value');
    console.log(itemValue);
    var buttonText = temp2;
    var button = document.querySelector('.Pick-up__button span');
    button.innerText = buttonText;
    button.parentNode.setAttribute('data-value', itemValue);
    document.querySelector('.Pick-up__list').classList.remove('active');

   
    console.log(temp)
    // button1.parentNode.setAttribute('data-value', temp)
    // Swap the values
    
    // button1.textContent = button2.textContent;
    // button2.textContent = temp;
  }