package com.vsm22.lizard;


import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import com.vsm22.lizard.data.Artist;
import com.vsm22.lizard.data.Tag;

public class LastFmApiAccessor {	
	private static String apiKey;
	private static String apiSharedSecret;
	private static String apiUrl;
	private static String apiUsername;
	
	static {
		try {
  		RemoteResourceAttributeLoader loader = new RemoteResourceAttributeLoader("src/main/resources/remote-resources.xml");
  		Element lastFmResourceSpec = loader.getResourceSpec("last.fm"); 
  		
  		apiKey = lastFmResourceSpec.getElementsByTagName("resource-key").item(0).getTextContent();
  		apiSharedSecret = lastFmResourceSpec.getElementsByTagName("resource-shared-secret").item(0).getTextContent();
  		apiUrl = lastFmResourceSpec.getElementsByTagName("resource-url").item(0).getTextContent();
  		apiUsername = lastFmResourceSpec.getElementsByTagName("resource-username").item(0).getTextContent();
		} catch (Exception e) {
			System.err.println(e);
		}
	}
	
	/**
	 * Get artist info
	 * @param name
	 * @return
	 * @throws IOException
	 */
	public static Artist getArtistInfo(String name) throws IOException, ParserConfigurationException, SAXException {
		String requestSpec = apiUrl 
				+ "?method=artist.getinfo"
				+ "&artist=" + name
				+ "&autocorrect=1"
				+ "&api_key=" + apiKey;
		
		InputStream artistInfoStream = RemoteResourceAccessor.getResponseStream(requestSpec);
		Document artistInfoDocument = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(artistInfoStream);

		Element artistElement = (Element) artistInfoDocument.getElementsByTagName("artist").item(0);
		String artistName = artistElement.getElementsByTagName("name").item(0).getTextContent();
		String artistUrl = artistElement.getElementsByTagName("url").item(0).getTextContent();
		String artistImageSmallUrl = artistElement.getElementsByTagName("image").item(0).getTextContent();
		String artistImageMediumUrl = artistElement.getElementsByTagName("image").item(1).getTextContent();
		String artistImageLargeUrl = artistElement.getElementsByTagName("image").item(2).getTextContent();
		
		Element artistBioElement = (Element) artistInfoDocument.getElementsByTagName("bio").item(0);
		String artistBioContent = artistBioElement.getElementsByTagName("content").item(0).getTextContent();
		String artistBioSummary = artistBioElement.getElementsByTagName("summary").item(0).getTextContent();
		
		List<Artist> similarArtists = new ArrayList<>();
		Element similarArtistsElement = (Element) artistInfoDocument.getElementsByTagName("similar").item(0);
		NodeList similarArtistsNodeList = similarArtistsElement.getElementsByTagName("artist");
		
		for (int i = 0; i < similarArtistsNodeList.getLength(); i++) {
			Element similarArtistElement = (Element) similarArtistsNodeList.item(i);
			String similarArtistName = similarArtistElement.getElementsByTagName("name").item(0).getTextContent();
			String similarArtistUrl = similarArtistElement.getElementsByTagName("url").item(0).getTextContent();
			String similarArtistImageSmallUrl = similarArtistElement.getElementsByTagName("image").item(0).getTextContent();
			String similarArtistImageMediumUrl = similarArtistElement.getElementsByTagName("image").item(1).getTextContent();
			String similarArtistImageLargeUrl = similarArtistElement.getElementsByTagName("image").item(2).getTextContent();
			
			similarArtists.add(new Artist(similarArtistName, similarArtistUrl, similarArtistImageSmallUrl, similarArtistImageMediumUrl, similarArtistImageLargeUrl));	
		}
		
		List<Tag> artistTags = new ArrayList<>(); 
		Element artistTagsElement = (Element) artistInfoDocument.getElementsByTagName("tags").item(0);
		NodeList artistTagsNodeList = artistTagsElement.getElementsByTagName("tag");
		
		for(int i = 0; i < artistTagsNodeList.getLength(); i++) {
			Element artistTagElement = (Element) artistTagsNodeList.item(i);
			String tagName = artistTagElement.getElementsByTagName("name").item(0).getTextContent();
			String tagUrl = artistTagElement.getElementsByTagName("url").item(0).getTextContent();
			
			artistTags.add(new Tag(tagName, tagUrl));
		}
		
		Artist artist = new Artist(artistName, artistUrl, artistImageSmallUrl, artistImageMediumUrl, artistImageLargeUrl, 
				artistBioSummary, artistBioContent, artistTags, similarArtists);
		
		return artist;
	}
	

	
	public static void main(String[] args) throws Exception {
		Artist artist = LastFmApiAccessor.getArtistInfo("Bjork");
		
		System.out.print(artist.toJson());
	}
}
