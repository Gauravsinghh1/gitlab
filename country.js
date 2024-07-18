const countryName = new URLSearchParams(window.location.search).get("name"); //this is use for get paragraph(name,palce ,etc) from url

const countryNameh1 = document.querySelector(".heading span");
const countryFlags = document.querySelector(".image img");
const nativeName = document.querySelector(".nativeName");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subregion = document.querySelector(".subregion");
const capital = document.querySelector(".capital");
const domainName = document.querySelector(".domainName");
const countryCurrencies = document.querySelector(".Currencies");
const language = document.querySelector(".language");
const borderCountries = document.querySelector(".border-countries");
const PageThemeChange = document.querySelector(".page-themechager");

console.log(PageThemeChange);

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then(function (res) {
    return res.json();
  })
  .then((data) => {
    countryFlags.src = data[0].flags.svg;
    countryNameh1.innerText = data[0].name.common;
    population.innerText = data[0].population.toLocaleString("en-IN");
    region.innerText = data[0].region;
    domainName.innerText = data[0].tld[0];

    if (data[0].languages) {
      language.innerText = Object.values(data[0].languages).join(",");
    }
    if (data[0].subregion) {
      subregion.innerText = data[0].subregion;
    }

    if (data[0].capital[0]) {
      capital.innerText = data[0].capital[0];
    }

    if (data[0].currencies) {
      countryCurrencies.innerText = Object.values(data[0].currencies)
        .map((currency) => currency.name)
        .join(",");
    }

    if (data[0].name.nativeName) {
      nativeName.innerHTML = Object.values(data[0].name.nativeName)[0].common;
    } else {
      nativeName.innerHTML = data[0].name.common;
    }

    if (data[0].borders) {
      data[0].borders.forEach((borderCountry) => {
        fetch(`https://restcountries.com/v3.1/alpha/${borderCountry}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            const borderCountryTag = document.createElement("a");
            borderCountryTag.innerText = borderCountry.name.common;
            borderCountryTag.href = `./country.html?name=${borderCountry.name.common}`;
            borderCountries.append(borderCountryTag);
          });
      });
    }
  });

let pageThemeColor = JSON.parse(localStorage.getItem("pageDark")) || {};

if (pageThemeColor.dark) {
  document.body.classList.add("dark");
  PageThemeChange.innerHTML = pageThemeColor.title;
}

PageThemeChange.addEventListener("click", () => {
  const dark = document.body.classList.toggle("dark");

  pageThemeColor = {
    dark: dark,
    title: "",
  };

  if (dark) {
    pageThemeColor.title = `<i class="fa-regular fa-sun"></i>&nbsp;&nbsp;Light Mode`;
    PageThemeChange.innerHTML = pageThemeColor.title;
  } else {
    PageThemeChange.innerHTML = `<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode`;
  }

  localStorage.setItem("pageDark", JSON.stringify(pageThemeColor));
});
