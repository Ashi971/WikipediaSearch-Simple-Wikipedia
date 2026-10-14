let searchInput=document.getElementById("searchInput")
let searchResults=document.getElementById('searchResults')
let spinner=document.getElementById('spinner')
function createAndAppendSearchResult(result){
    //creating result item
    let resultitemElement=document.createElement('div')
    resultitemElement.classList.add("result-item")
    searchResults.appendChild(resultitemElement)
    
    //creating title eleemnt
    let {link,title,description}=result
    let titleElement=document.createElement('a')
    titleElement.href=link
    titleElement.target="_blank"
    titleElement.textContent=title
    titleElement.classList.add("result-title")
    resultitemElement.appendChild(titleElement)
    
    //creating break elemn
    let titlebreakelement=document.createElement("br")
    resultitemElement.appendChild(titlebreakelement)
    //creating the url element
    let urlElement=document.createElement('a')
    urlElement.classList.add("result-url")
    urlElement.textContent=link
    urlElement.href=link
    urlElement.target="_blank"
    resultitemElement.appendChild(urlElement)
    
    //create the break eleemnt
    let linebreakurl=document.createElement('br')
    resultitemElement.appendChild(linebreakurl)
    //create description eleemnt

    let contentEl=document.createElement('p')
    contentEl.classList.add("link-description")
    contentEl.textContent=description
    resultitemElement.appendChild(contentEl)
}


function displayResults(searchedResult){
    // let result=searchedResult[0]
    // createAndAppendSearchResult(result)
    spinner.classList.toggle('d-none')
    if(searchedResult.length!==0){
        for (let i of searchedResult){
        createAndAppendSearchResult(i)
    }
    }
    else{
        let noResultFound=document.createElement('h3')
        noResultFound.textContent="No Result Found"
        searchResults.appendChild(noResultFound)
    }
}



function search(event){
    if(event.key==="Enter"){
        searchResults.textContent=""
        spinner.classList.toggle("d-none")
        let searchedKey=searchInput.value
        let link="https://apis.ccbp.in/wiki-search?search="+searchedKey
        let options={
            method:"GET"
        }
        fetch(link,options)
        .then(function(x){
            return x.json()
        }).then(function(x){
            console.log(x)
            let {search_results}=x
            displayResults(search_results)
        })
    }
}

searchInput.addEventListener("keydown",search)