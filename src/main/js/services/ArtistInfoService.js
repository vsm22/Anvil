const ArtistInfoService = {
  getXHRPromise: function (artistName) {
    let xhr = new XMLHttpRequest();
    let url = "./getArtistInfo?query=" + artistName;

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

export default ArtistInfoService
