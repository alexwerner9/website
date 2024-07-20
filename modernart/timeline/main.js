// DOM element where the Timeline will be attached
var container = document.getElementById('timeline');

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
    ['Degas', 'French', 'The Tub', '1886']
]

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
    height: '95%',
    zoomKey: 'ctrlKey',
    horizontalScroll: true,
    min: '1760'
};

// Create a Timeline
var timeline = new vis.Timeline(container, items, options);