export default {

  /**
   * Parse a string containing an article with paragraphs separated by \n
   * Return a JSX representation of an article
   */
  parseArticleStringToJSX(str, splitByPattern) {
    splitByPattern = (typeof splitByPattern === "undefined") ? "/n" : splitByPattern;
    const linkRegex = /<a\s.*href=(.*)>(.*)<\/a>/;

    let paragraphs = str.split(splitByPattern);

    return (
      <article>
      {
        paragraphs.map(paragraph => {
          if (paragraph != "") {
            let link = paragraph.match(linkRegex);

            if (link != null) {
              return (<a href={link[1]}> {link[2]} </a>);
            }
            else {
              return (<p> {paragraph} </p> );
            }
          }
        })
      }
      </article>
    );
  }
}
