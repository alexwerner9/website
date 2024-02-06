import requests
import json
import re

from unidecode import unidecode
from bs4 import BeautifulSoup


def find_in_dict(d, param):
    if type(d) != dict:
        return None
    if d.get(param):
        return d[param]
    else:
        for key in d:
            p = find_in_dict(d[key], param)
            if p:
                return p
    return None


def clean_text(text):
    text = unidecode(text)
    text = re.sub('\.(?!\s|\d|$)', '. ', text)
    text = re.sub(r"\((.*?)\)", "", text)
    text = re.sub(r"\[(.*?)\]", "", text)
    text = re.sub(r" ,", ",", text)
    text = re.sub(' +', ' ', text)
    text = re.sub('\n', ' ', text)
    return text


def main():
    response = requests.get('https://en.wikipedia.org/wiki/Wikipedia:Unusual_articles')
    html_doc = response.text
    if not html_doc:
        print("OH NO")
        return
    
    soup = BeautifulSoup(html_doc, 'html.parser')

    all_tables = soup.find_all('table')
    wikitables = [table for table in all_tables if table['class'] == ['wikitable']]
    all_entries = []
    for table in wikitables:
        for child in table.children:
            if child.name == 'tbody':
                for entry in child.children:
                    if entry.name == 'tr':
                        all_entries.append(entry)
    
    all_titles = []
    for tr in all_entries:
        title = tr.td.b.a["href"]
        if not title:
            continue
        all_titles.append(title.split('/')[-1])

    query = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles={title}&explaintext=1&exsectionformat=plain&exintro=&format=json"

    final_obj = []
    c = 0
    l = len(all_titles)
    for title in all_titles:
        print(f'Querying: {title}. {c} / {l}')
        response = requests.get(query.format(title=title))
        response_dict = json.loads(response.text)
        text = find_in_dict(response_dict, 'extract')
        if not text:
            continue
        text = clean_text(text)
        final_obj.append([title, text])
        c += 1
        if c > 1000:
            break
    with open('wikidata.js', 'w+') as file:
        json.dump(final_obj, file)


if __name__ == '__main__':
    main()
