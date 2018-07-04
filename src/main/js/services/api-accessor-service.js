export default {
    getXHRPromise: function (url) {
        let xhr = new XMLHttpRequest();

        return new Promise((resolve, reject) => {
            xhr.open("GET", url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                }
            };
            xhr.send();
        });
    }
}
