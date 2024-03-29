const searchHistory = $(`#history`)
const searchHistorySection = $(`.searchHistory`);
const searchArr = [];
const clearAllButton = $(`#clearAllButton`);
const listenedButton = $(`#listenedButton`);
const lyricsButton = $(`#lyricsButton`);
const sudokuButton = $(`#sudokuButton`);
const sudokuTable = $(`.sudokuTable`)
const revealSudoku = $(`#revealSudoku`)
const returnToStart = $(`#returnToStart`);




//Get any locally stored search history
  searchHistory.empty()
if (localStorage.getItem(`searchArr`) != null){
  const storedArr = localStorage.getItem(`searchArr`).split(`,`)
  // prepend search history buttons
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
    const songButton = $(`<button>`).text(song).attr(`song-name`, song)
    const songDiv = $(`<div>`).append(songButton)
    searchHistory.prepend(songDiv);
}}

//SUBMIT event when a user searches for a song
$(`#search-form`).on(`submit`, function(e){
  e.preventDefault()
  song = $(`#search-input`).val().trim().toUpperCase()
  if (song != ``){
    // load the music info for that song
        //call load music info function
    displaySong()
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
    //make search form hidden
    $(`#searchform`).addClass(`hide`)
    $(`#stepOne`).addClass(`hide`)
    $(`#findYourSound`).addClass(`hide`)
    $(`#songDisplay`).removeClass(`hide`).addClass(`show`)
    searchHistorySection.addClass(`hide`)
  }
}
)

//Let user go back to previous results
searchHistory.on(`click`, function(e) {
  e.preventDefault()
  song = e.target.textContent
  displaySong()
  console.log(song)
  $(`#searchform`).addClass(`hide`)
  $(`#stepOne`).addClass(`hide`)
  $(`#findYourSound`).addClass(`hide`)
  $(`#songDisplay`).removeClass(`hide`).addClass(`show`)
  searchHistorySection.addClass(`hide`)
});

//CLICK event when a user has listened to the song
listenedButton.on(`click`, function(e){
  e.preventDefault()
  $(`#songDisplay`).addClass(`hide`)
  $(`#lyricsDisplay`).removeClass(`hide`).addClass(`show`)
  $(`#songImage`).removeClass(`hide`)
})

//CLICK event when a user has read the lyrics
lyricsButton.on(`click`, function(e){
  e.preventDefault()
  $(`#lyricsDisplay`).addClass(`hide`)
  $(`#songImage`).addClass(`hide`)
  $(`#activityDisplay`).removeClass(`hide`).addClass(`show`)
})

//sudoku fetch
const queryURL = `https://sudoku-api.vercel.app/api/dosuku`
fetch(queryURL)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  $(`.difficulty`).text(`difficulty: ${data.newboard.grids[0].difficulty}`)
  const newTable = data.newboard.grids[0].value
  const solution = data.newboard.grids[0].solution

  //for loop to print sudoku array to html
  function printSudoku(sudoku){
  for (let i=0; i<9; i++){
    const row = sudoku[i]
    const rowEl = $(`<tr>`)
    sudokuTable.append(rowEl)
    for(let j=0; j<9; j++){
      if (row[j] === 0){
        var boxEl =$(`<td></td>`)
        const boxInputEl = $(`<input type="text" class="sudokuValue" value=""/>`)
        boxEl.append(boxInputEl)
      } else {
        const boxSolutionEl = $(`<div class="sudokuValue">`).text(row[j])
        var boxEl =$(`<td class="sudokuValue"></td >`).append(boxSolutionEl)
      }
      rowEl.append(boxEl)
      if (j===2 || j===5){
        boxEl.addClass(`borderSide`)
      }
      if (i===2 || i===5){
        boxEl.addClass(`borderBottom`)
      }
    }
  }
  } 
  printSudoku(newTable)
  // printSudoku(solution)
  revealSudoku.on(`click`, function(e){
    e.preventDefault()
    sudokuTable.empty()
    printSudoku(solution)
  })
})

//CLICK event when sudoku finished
sudokuButton.on(`click`, function(e){
  e.preventDefault()
  $(`#activityDisplay`).addClass(`hide`)
  $(`#songRecsDisplay`).removeClass(`hide`).addClass(`show`)
})

//CLICK event when a user clicks to clear search
clearAllButton.on(`click`, function(e){
  e.preventDefault()
  localStorage.clear()
  searchHistory.empty()
})

//return to start button after 5 step process has been followed
returnToStart.on(`click`, function(e){
  e.preventDefault()
  location.reload()
})


//music search API
function displaySong(){
//!----------
//! commented out to reduce API requests
const search = song
const url = `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${search}&per_page=1&page=1`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f1fc93eb62msh53d5de87ba02763p18b518jsn1d4079e9e397',
		'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
	}
};
fetch(url, options)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log(data)
  //get song title and artist
  const songTitle = data.hits[0].result.full_title
  $(`#songOptions`).text(`${songTitle}`);
  const lyricsURL = $(`<a href=${data.hits[0].result.url} target="_blank">`).text(`${songTitle} lyrics`)
  $(`#lyrics`).append(lyricsURL)
  const songImage = data.hits[0].result.song_art_image_url
  $(`#songImage`).attr(`src`, songImage)
})
}
