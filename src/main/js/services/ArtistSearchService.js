const ArtistSearchService = {
  getXHRPromise: function (artistName) {
    let xhr = new XMLHttpRequest();
    let url = "./searchArtist?searchQuery=" + artistName;

    return new Promise((resolve, reject) => {
      xhr.open("GET", url, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        }
      };
      xhr.send();
    });
  }
}

export default ArtistSearchService
