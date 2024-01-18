//const APIKey = `` //<--insert own API key here
const searchHistory = $(`#history`)
const searchArr = [];
const clearAllButton = $(`.clearAll`);

//__________________
//Rowan :

//Get any locally stored search history
  searchHistory.empty()
if (Object.entries(localStorage) != ``){
  const storedArr = localStorage.getItem(`searchArr`).split(`,`)
  // prepend search history buttons
  if (storedArr != null){
    for (let i=0; i<storedArr.length; i++){
      song = storedArr[i]
      prependSongButton()
    }
  // load music info function()
}}

//prepend searched for songs as buttons in a function:
function prependSongButton(){
  if (song != ``){
    const songButton = $(`<button>`).text(song).addClass(`btn btn-outline-primary m-1`).attr(`song-name`, song)
    const songDiv = $(`<div>`).append(songButton)
    searchHistory.prepend(songDiv);
}}

//SUBMIT event when a user searches for a song
$(`#search-form`).on(`submit`, function(e){
  e.preventDefault()
  song = $(`#search-input`).val().trim().toUpperCase()
    // load the music info for that song
        //call load music info function
    //if the searchArr is longer than 5, remove the 5th and push the most recent
    if (searchArr.length>=5){
      searchArr.splice(0, 1);}
    // push song to searchArr
    searchArr.push(song)
    // prepend search button
    prependSongButton();
    // set the array in local storage
    localStorage.setItem(`searchArr`, searchArr)
    //clear form search bar
    $(`#search-input`).val(``)
      }
)

//CLICK event when a user clicks to clear search
clearAllButton.on(`click`, function(e){
  e.preventDefault()
  localStorage.clear()
  searchHistory.empty()
})



//_____________________
// Nikoleta:

// load music information function:
  //fetch