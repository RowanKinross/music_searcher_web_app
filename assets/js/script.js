//const APIKey = `` //<--insert own API key here
const searchHistory = $(`#history`)
const searchArr = [];

//__________________
//Rowan :

//Get any locally stored search history
if (Object.entries(localStorage) != ``){
  const storedArr = localStorage.getItem(`searchArr`).split(`,`)
  searchHistory.empty()
  if (storedArr != null){
    for (let i=0; i<storedArr.length; i++){
    song = storedArr[i]
    prependSongButton()
    searchArr.push(song)
    }
  // load music info function()
}}

//prepend searched for songs as buttons in a function:
function prependSongButton(){
  if (song != ``){
    const songButton = $(`<button>`).text(song).addClass(`btn btn-outline-primary m-1`).attr(`song-name`, song)
    const clearButton = $(`<button>`).text(`X`).addClass(`btn btn-warning`)
    const songDiv = $(`<div>`).append(songButton, clearButton)
    searchHistory.prepend(songDiv);
}}

//SUBMIT event when a user searches for a song
$(`#search-form`).on(`submit`, function(e){
  e.preventDefault()
  song = $(`#search-input`).val().trim().toUpperCase()
    // load the music info for that song
        //call load music info function

    //if the searchArr includes the song already, remove it and push it again(to the start)
    if (searchArr.includes(song)){
      const index = searchArr.indexOf(song)
      searchArr.splice(index, 1);}
      else{
      // add the song as a button in the search history
      prependSongButton()
      }
      // push song to searchArr
      searchArr.push(song)
      // set the array in local storage
      localStorage.setItem(`searchArr`, searchArr)
  }
)

//CLICK event when a user clicks on search history
searchHistory.on(`click`, function(e){
  e.preventDefault()
  song = e.target.innerHTML
      //call load music info function 
})

//CLICK event when a user clicks on search history `X`
//clear search history button
//CLICK event when a user clicks on on clear search history




//_____________________
// Nikoleta:

// load music information function:
  //fetch