//const APIKey = `` //<--insert own API key here
const searchHistory = $(`#history`)
const searchArr = [];
const clearAllButton = $(`#clearAllButton`);
const listenedButton = $(`#listenedButton`);
const lyricsButton = $(`#lyricsButton`);
const sudokuButton = $(`#sudokuButton`);
const sudokuTable = $(`.sudokuTable`)
const revealSudoku = $(`#revealSudoku`)


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
      }
)

//CLICK event when a user has listened to the song
listenedButton.on(`click`, function(e){
  e.preventDefault()
  $(`#songDisplay`).addClass(`hide`)
  $(`#lyricsDisplay`).removeClass(`hide`).addClass(`show`)
})

//CLICK event when a user has read the lyrics
lyricsButton.on(`click`, function(e){
  e.preventDefault()
  $(`#lyricsDisplay`).addClass(`hide`)
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


  //for loop to print array to html
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



//music search API
function displaySong(){
//!----------
//! commented out to reduce API requests
// const search = song
// const url = `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${search}&per_page=1&page=1`;
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '',
// 		'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
// 	}
// };
// fetch(url, options)
// .then(function (response) {
//   return response.json();
// })
// .then(function (data) {
//   //get song title and artist
//   const songTitle = data.hits[0].result.full_title
//   $(`#songOptions`).text(`${songTitle}`);
//   const lyricsURL = $(`<a href=${data.hits[0].result.url} target="_blank">`).text(`${songTitle} lyrics`)
//   $(`#lyrics`).append(lyricsURL)

// })
}





// 87da8ceb3cmsh47e55b14fb5df33p1b27fbjsn54acddce7032

//   //get lyrics
//   const songLyrics = data.hits[0].result
//   console.log(songLyrics.id)
//   // $(`#lyrics`).text(`${songLyrics}`)
//   const lyricsID = songLyrics.id;
//   const url = `https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=${lyricsID}`;
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '',
// 		'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
// 	}
// };
//   fetch(url, options)
//   .then(function(response){
//     return response.json();
//   })
//   .then(function(data){
//     console.log(data)
//   })


//!---------------
//! still to do:
  //! make search history clickable
  //! deploy page 
      //! uncomment api
      //! get a new key at last min before presentation to ensure we have enough requests left)
  //! more styling
      //! links to spotify, youtube etc on the `step 2` display
      //! refactor code so there's no repeats/dry code, ideally tagging styles to classes and IDs instead of elements
  //! add song recommendations to `step 5` display
  //! readMe
  //! footer waffles




//_____________________
// Nikoleta:
