const leftbar = document.getElementById("leftbar")

const getSearchData = () =>{
    let specieName = null
    fetch(`https://swapi.dev/api/people/`)//897
    .then(res=>res.ok==true ? Promise.resolve(res) : Promise.reject(res))
    .then(res=>res.json())
    .then(res=>{
        res.results.map((people)=>{
            if (people.species[0]) {
                fetch(people.species[0])
                .then(res=>res.ok==true ? Promise.resolve(res) : Promise.reject(res))
                .then(res=>res.json())
                .then(res=>{
                    specieName = res.name
                })
            }
            fetch(people.homeworld)
            .then(res=>res.ok==true ? Promise.resolve(res) : Promise.reject(res))
            .then(res=>res.json())
            .then(res=>{
                const fragment = document.createDocumentFragment()
                const div1 = document.createElement("div")
                div1.innerHTML =`
                <div class="card-left">
                    <h2 class="h2">${people.name}</h2>
                    <span class="text">${(specieName?specieName:"")} ${res.name}</span>
                </div>
                <div class="card-right">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                      </svg>
                </div>`
                div1.classList.add("card")
                fragment.appendChild(div1)
                leftbar.appendChild(fragment)

            })
        })
    }) 
}

getSearchData() 