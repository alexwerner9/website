import requests
import time
import json

all_events = {}

for i in range(0, 2024):
    resp = requests.get(f'https://events.historylabs.io/year/{i}')
    print(resp, i)
    resp_json = resp.json()
    events = resp_json['events']
    all_events[i] = events
    time.sleep(0.1)

with open('events.json', 'w') as file:
    json.dump(all_events, file, indent=2)
