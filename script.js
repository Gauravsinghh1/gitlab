const countriesContanier=document.querySelector(".countries-content");
const searchInput=document.querySelector(".search-container");
const filterByRegion=document.querySelector(".filter-by-region");
const changeTheme=document.querySelector(".themeChanger");

let allCountriesData;
 
fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) =>
  {
    renderCountries(data);
    allCountriesData= data;
  }
  );

  searchInput.addEventListener("input",(e)=>{
     const filteredCountry=allCountriesData.filter((country)=>country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
     renderCountries(filteredCountry);
  })
  
  filterByRegion.addEventListener("change",(e)=>{
    console.log(e.target.value);
    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then((res) =>  res.json())
    .then((data)=>{
      renderCountries(data);
    })
  });

  // searchInput.addEventListener("input",(e){
    
  // })

  function renderCountries(data){
    countriesContanier.innerHTML='';
       data.forEach((country) => {
        console.log(country)
        const countryCard = document.createElement("a");
        countryCard.href=`./country.html?name=${country.name.common}`
        countryCard.classList.add("countries-card");
        console.log(countryCard)
        const cardHTML = `
 <img src=${country.flags.svg} alt="flag" />
          <div class="card-text">
            <h2 class="card-title">${country.name.common}</h2>
            <p><b>Population:</b>${ new Intl.NumberFormat("en-IN").format(country.population)}</p>
            <p><b>Region:</b>${country.region}</p>
            <p><b>Capital:</b>${country.capital}</p>
          </div>
`;
countryCard.innerHTML = cardHTML;

countriesContanier.append(countryCard);
    })
  }

//Below method is lengthy process for create each and every element
/*
const image=document.createElement('img');
image.src="https://flagcdn.com/is.svg";
countryCard.appendChild(image);

*/
let themeColor=JSON.parse(localStorage.getItem("dark")) || {}

if(themeColor.dark){
  document.body.classList.add('dark');
  changeTheme.innerHTML=themeColor.title;
}


changeTheme.addEventListener("click",()=>{ 
  const dark=document.body.classList.toggle('dark');

  themeColor={
    dark:dark,
    title:""
  }

  if(dark){
    themeColor.title=`<i class="fa-regular fa-sun"></i>&nbsp;&nbsp;Light Mode`
    changeTheme.innerHTML=themeColor.title;
  }else{
    changeTheme.innerHTML=`<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode`
  }
  
  localStorage.setItem("dark", JSON.stringify(themeColor));

})





