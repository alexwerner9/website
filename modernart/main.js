console.log("Hello, World!")

const artworks = [
    ['David', 'French', 'Oath of the Horatii', '1785', 'Neoclassicism, Oil painting'],
    ['Kauffman', 'Swiss', 'Cornelia Presenting Her Children as her Treasures', '1785', 'Neoclassicism, Oil painting'],
    ['Vigee-Lebrun', 'French', 'Self-Portrait', '1790', 'Neoclassicism, Oil painting'],
    ['David', 'French', 'Marat at his Last Breath', '1793'],
    ['David', 'French', 'Napoleon at the Saint-Bernard Pass', '1800'],
    ['Canova', 'Italian', 'Pauline Borghese as Venus', '1808', 'Marble'],
    ['Jefferson', 'American', 'Rotunda', '1819-1826', 'Located at University of Virginia'],
    ['Ingres', 'French', 'Grande Odalisque', '1814'],
    ['Gericault', 'French', 'The Raft of the Medusa', '1819'],
    ['Gericault', 'French', 'Woman Suffering From Envy', '1822'],
    ['Delacroix', 'French', 'The Death of Sardanapalus', '1827'],
    ['Delacroix', 'French', 'Liberty Leading the People', '1830'],
    ['Goya', 'Spanish', 'The sleep of reason produces monsters', '1799', 'Aquatint'],
    ['Goya', 'Spanish', '3rd of May 1808', '1814-1815'],
    ['Constable', 'British', 'Hay Wain', '1821'],
    ['Barry, Pugin', 'British', 'Houses of Parliament', 'begun 1836'],
    ['Turner', 'British', 'The Slave Ship', '1840'],
    ['Friedrich', 'German', 'Abbey in the Oak Forest', '1809'],
    ['David', 'French', 'Death of Socrates', '1787'],
    ['Goya', 'Spanish', 'Manuel Osorio Manrique de Zuniga', '1787-1788'],
    ['Labille-Guiard', 'French', 'Self-Portrait with Two Pupils', '1785'],
    ['Leutze', 'German, moved to America', 'Washington Crossing the Delaware', '1851'],
    ['Homer', 'American', 'The Gulf Stream', '1899'],
    ['Cassatt', 'American', 'Lady at the Tea Table', '1883-1885'],
    ['Daumier', 'French', 'Third-Class Carriage', '1862'],
    ['Gerome', 'French', 'Prayer in the Mosque', '1871'],
    ['Friedrich', 'German', 'Two Men Contemplating the Moon', '1825-1835'],
    ['Bonheur', 'French', 'The Horse Fair', '1853-1855'],
    ['Courbet', 'French', 'Young Ladies from the Village', '1852'],
    ['Cole', 'English, moved to America', 'The Oxbow', '1836'],
    ['Daumier', 'French', 'Rue Transnonain April 15 1834', '1834', 'Lithograph'],
    ['Daguerre', 'French', 'Still Life in Studio', '1837', 'Dugerreotype'],
    ['Millet', 'French', 'The Gleaners', '1857'],
    ['Courbet', 'French', 'The Stone Breakers', '1849'],
    ['Millais', 'British', 'Ophelia', '1852', 'Artist of the Pre-Raphaelite Brotherhood'],
    ['Manet', 'French', 'Luncheon on the Grass', '1863'],
    ['Manet', 'French', 'Olympia', '1863'],
    ['O\'Sullivan', 'b. Irish, American', 'A Harvest of Death', '1863', 'Albumen print'],
    ['Lewis', 'American', 'Forever Free', '1867', 'Marble'],
    ['Monet', 'French', 'Impression, Sunrise', '1872'],
    ['Monet', 'French', 'Gare Saint-Lazare', '1877'],
    ['Renoir', 'French', 'Ball at the Moulin de la Galette', '1867'],
    ['Degas', 'French', 'Ballet Rehearsal', '1874'],
    ['Garnier', 'French', 'Opera', '1861-1874', 'Paris opera house'],
    ['Degas', 'French', 'The Tub', '1886'],
    ['Caillebotte', 'French', 'Paris Street, A Rainy Day', '1877'],
    ['Morisot', 'French', 'Summer\s Day', '1879'],
    ['Cassatt', 'American', 'The Bath', '1892'],
    ['Eakins', 'American', 'The Gross Clinic', '1875'],
    ['Tanner', 'American', 'The Thankful Poor', '1984'],
    ['Whistler', 'American', 'Noctuen in Black and Gold: The Falling Rocket', '1874'],
    ['Seurat', 'French', 'A Sunday on the Island of the Grande Jatte', '1886'],
    ['Bellows', 'American', 'Dempsey and Firpo', '1924'],
    ['Demuth', 'American', 'My Egypt', '1927'],
    ['Staff', 'American', 'Afferent Nerves', '2023'],
    ['Jackson', 'American', 'deepest ocean, what we do not know, what might see', '2021'],
    ['Oppenhiem', 'Swiss', 'Object: Fur Breakfast', '1936'],
    ['Margritte', 'Belgian', 'The Treachery of Images', '1929'],
    ['Dali', 'Spanish', 'The Persistence of Memory', '1931'],
    ['Kahlo', 'Mexican', 'The Two Fridas'],
    ['Douglas', 'American', 'From Slavery through Reconstruction', '1934'],
    ['Hopper', 'American', 'Nighthawks', '1942'],
    ['Picasso', 'Spanish', 'Guernica', '1937'],
    ['Kandinsky', 'Russian', 'Improvisation Number 28', '1912'],
    ['Gropius', 'German', 'Bauhaus', '1925-1926'],
    ['Le Corbusier', 'Swiss', 'Villa Savoye', '1929', 'Located in Poissy-sur-Seine, France'],
    ['Van Alen', 'American', 'Chrysler Building', '1928', 'Located in NYC'],
    ['Ernst', 'German', '2 Children are threatened by a Nightingale', '1924'],
    ['Hoch', 'German', 'Cut with the Kitchen Knife', '1919', 'Long title: Cut with the Kitchen Knife Data through the Last Weimar Beer-Belly Cultural Epoch of Germany'],
    ['Malevich', 'Russian', 'Suprematist Painting: Airplane Flying', '1915'],
    ['Tatlin', 'Russian', 'Monument to the Third International', '1919'],
    ['Mondrian', 'Dutch', 'Composition in Red, Blue and Yellow', '1930'],
    ['Rietvelt', 'Dutch', 'The Schroder House', '1924', 'Located in Utrecht, Netherlands'],
    ['Duchamp', 'French', 'Bicycle Wheel', '1951', 'After lost original of 1913', 'Dada'],
    ['Mondrian', 'Dutch', 'Broadway Boogie Woogie', '1942'],
    ['Oppenheim', 'Swiss', 'Object: Fur Breakfast', '1936'],
    ['Leger', 'French', 'The City', '1919'],
    ['Boccioni', 'Italian', 'Unique Forms of Continuity in Space', '1913'],
    ['Duchamp', 'French', 'Nude Descending a Staircase No 2', '1912', 'Dada'],
    ['Duchamp', 'French', 'Fountain', '1950', 'Dada. After original of 1917'],
    ['Duchamp', 'French', 'The Large Glass', '1915', 'Long title: The Bride Stripped Bare by her Bachelors, Even'],
    ['Kirchner', 'German', 'Street, Dresden', '1908'],
    ['Picasso', 'Spanish', 'Portrait of Gertrude Stein', '1905'],
    ['Picasso', 'Spanish', 'Les Demoiselles d\'Avignon', '1907'],
    ['Braque', 'French', 'The Portuguese', '1911'],
    ['Picasso', 'Spanish', 'Still Life with Chair Caning', '1912'],
    ['Eiffel', 'French', 'Eiffel Tower', '1889'],
    ['Cezanne', 'French', 'Mont Sainte-Victoire', '1902'],
    ['Cezanne', 'French', 'Large Bathers', '1906'],
    ['Matisse', 'French', 'Woman with the Hat (Madame Matisse)'],
    ['Matisse', 'French', 'The Joy of Life'],
    ['Gaugin', 'French', 'Vision After the Sermon, Jacob Wrestling with the Angel', '1888'],
    ['Munch', 'Norwegian', 'The Scream', '1893'],
    ['Rodin', 'French', 'The Thinker', '1880'],
    ['Horta', 'Belgian', 'Staircase in Van Eetvelde House', '1895', 'Located in Brussels, Belgium'],
    ['Klimt', 'Austrian', 'The Kiss', '1907'],
    ['Van Gogh', 'Dutch', 'The Potato Eaters', '1885'],
    ['Van Gogh', 'Dutch', 'The Night Cafe', '1888'],
    ['Van Gogh', 'Dutch', 'Starry Night', '1889'],
    ['Van Gogh', 'Dutch', 'La Berceuse', '1889'],
]

artworks.splice(0, 51);

function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }

shuffle(artworks)

let currIndex = 0;

const seenIndexes = []

function linkCheck(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status != 404;
}

let answersVisible = false;

function swapVisibility() {
    const infoDivs = document.getElementsByClassName('info')
    for(const infoDiv of infoDivs) {
        infoDiv.style.visibility = answersVisible ? "hidden" : "visible"
    }
    answersVisible = !answersVisible
    const showButton = document.getElementById('show-answers')
    showButton.innerText = answersVisible ? "Hide answers" : "Show answers"
}

function showNext() {
    if(answersVisible) {
        swapVisibility()
    }
    const imgElement = document.getElementById('painting-img')
    if(currIndex == artworks.length) {
        shuffle(artworks)
        currIndex = 0
    }
    const imgInfo = artworks[currIndex]
    const imgArtist = imgInfo[0]
    const imgNationality = imgInfo[1]
    const imgTitle = imgInfo[2]
    const imgDate = imgInfo[3]
    let imgNotes = 'None'
    if(imgInfo.length == 5) {
        imgNotes = imgInfo[4]
    }
    const extensions = ['.jpg', '.jpeg', '.png', '.webp']
    let imgPath = ""
    for(const extension of extensions) {
        imgPath = "images\\" + imgTitle.replaceAll(':', '').replaceAll(' ', '-').replaceAll(',', '').replaceAll('\'', '').toLowerCase() + extension
        if(linkCheck(imgPath)) {
            break;
        }
        console.log("NOT FOUND " + imgPath)
    }
    imgElement.src = imgPath;
    const imgArtistElement = document.getElementById('artist')
    imgArtistElement.innerText = "Artist: " + imgArtist
    const imgNationalityElement = document.getElementById('nationality')
    imgNationalityElement.innerText = "Nationality: " + imgNationality
    const imgTitleElement = document.getElementById('title')
    imgTitleElement.innerText = "Title: " + imgTitle
    const imgDateElement = document.getElementById('date')
    imgDateElement.innerText = "Date: " + imgDate
    const imgNotesElement = document.getElementById('notes')
    imgNotesElement.innerText = "Notes: " + imgNotes

    const unseenCounts = document.getElementById('unseen')
    unseenCounts.innerText = artworks.length - currIndex + " unseen artworks"
    currIndex += 1
}
showNext()

const mainButton = document.getElementById('main-button')
const mainWrapper = document.getElementById('wrapper')
const timelineButton = document.getElementById('timeline-button')
const timelineWrapper = document.getElementById('wrapper-timeline')
mainButton.style.backgroundColor = 'rgb(75,75,75)';
mainButton.onclick = () => {
    timelineWrapper.style.display = 'none';
    mainWrapper.style.display = 'flex';
    mainButton.style.backgroundColor = 'rgb(75,75,75)';
    timelineButton.style.backgroundColor = '#2ea44f';
}
timelineButton.onclick = () => {
    mainWrapper.style.display = 'none';
    timelineWrapper.style.display = 'block'
    timelineButton.style.backgroundColor = 'rgb(75,75,75)';
    mainButton.style.backgroundColor = '#2ea44f';
}

////////////////////////////////////

var container = document.getElementById('timeline');

const artItems = []
let i = 0
for(const artwork of artworks) {
    artItems.push({
        id: i,
        content: artwork[0] + " - " + artwork[2] + " (" + artwork[3] + ")",
        start: artwork[3].split('-')[0]
    })
    i += 1
}

// Create a DataSet (allows two way data-binding)
var items = new vis.DataSet(artItems);

// Configuration for the Timeline
var options = {
    height: '75%',
    zoomKey: 'ctrlKey',
    horizontalScroll: true,
    min: '1760'
};

// Create a Timeline
var timeline = new vis.Timeline(container, items, options);

