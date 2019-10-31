// Book Class: represents a book
class Song {
  constructor(song, key, comment, songLink, backingLink) {
    this.song = song;
    this.key = key;
    this.comment = comment;
    this.songLink = songLink;
    this.backingLink = backingLink;
  }
}

// UI Class: handles UI tasks
class UI {
  static displaySongs() {
    const songs = Store.getSongs();

    songs.forEach(song => UI.addSongToList(song));
  }

  static addSongToList(song) {
    const list = document.getElementById("song-list");

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${song.song}</td>
      <td>${song.key}</td>
      <td>${song.comment}</td>
      <td><a href="${song.songLink}" target="_blank">Listen here<a></td>
      <td><a href="${song.backingLink}" target="_blank">Playalong<a></td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>

    `;

    list.appendChild(row);
  }

  static deleteSong(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }


  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#song-form');
    container.insertBefore(div, form);

    // Vanish in 2 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 2000);
  }

  static clearFields() {
    document.getElementById("song").value = "";
    document.getElementById("key").value = "";
    document.getElementById("comment").value = "";
    document.getElementById("songLink").value = "";
    document.getElementById("backingLink").value = "";

  }
}

// Store Class: handles storage
class Store {
  static getSongs() {
    let songs;
    if (localStorage.getItem('songs') === null) {
      songs = [];
    } else {
      songs = JSON.parse(localStorage.getItem('songs'));
    }
    return songs;
  }

  static addSong(song) {
    const songs = Store.getSongs();
    songs.push(song);
    localStorage.setItem('songs', JSON.stringify(songs));
  }
  static removeSong(song) {
    const songs = Store.getSongs();

    songs.forEach((song, index) => {
      if (song.song === song) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('songs', JSON.stringify(songs))
  }
  
}

// Event: display books
document.addEventListener("DOMContentLoaded", UI.displaySongs);

// Event: add a book
document.getElementById("song-form").addEventListener("submit", e => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const songTitle = document.getElementById("song").value;
  const key = document.getElementById("key").value;
  const comment = document.getElementById("comment").value;
  const songLink = document.getElementById("songLink").value;
  const backingLink = document.getElementById("backingLink").value;

// Validate
if (songTitle === '' || key === '') {
  UI.showAlert('Please fill in song title and key', 'danger')
} else {
  // Instantiate book
  const song = new Song(songTitle, key, comment, songLink, backingLink);

  // Add book to UI
  UI.addSongToList(song);

  // Add book to store
  Store.addSong(song);

  // Show success message
  UI.showAlert('Song Added', 'success');

  // Clear fields
  UI.clearFields();
}  
});

document.getElementById('song-list').addEventListener('click', (e) => {
 
 // Remove book from UI
  UI.deleteSong(e.target);

  // Remove book from store
  Store.removeSong(e.target.parentElement.previousElementSibling.textContent)

  // Show success message
UI.showAlert('Song Removed', 'success');
})
