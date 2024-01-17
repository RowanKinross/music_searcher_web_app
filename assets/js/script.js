//const APIKey = `` //<--insert own API key here
const searchHistory = $(`#history`)


//__________________
//Rowan :

//Get any locally stored search history

//prepend searched for songs as buttons in a function:

//SUBMIT event when a user searches for a song
$(`#search-form`).on(`submit`, function(e){
  e.preventDefault()

    // load the music info for that song
        //call load music info function

    // if the searchArr includes the song already, remove it and push it again(to the start)

    // add the song as a button in the search history

    // push song to searchArr

    // set the array in local storage

  
  }
)
//CLICK event when a user clicks on search history
searchHistory.on(`click`, function(e){
  e.preventDefault()
  song = e.target.innerHTML
      //call load music info function 
})




//_____________________
// Nikoleta:

// load music information function:
  //fetch