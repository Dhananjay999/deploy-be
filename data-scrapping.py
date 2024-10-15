import requests

from bs4 import BeautifulSoup

# Send a GET request to the URL

response = requests.get('https://shareglb-dev.dxassist.ai/search/share?sid=01JA5KBW4ZE4HDFT77F8847RB')

# Parse the HTML content using BeautifulSoup

soup = BeautifulSoup(response.text, 'html.parser')
print(soup)
# Find all elements with a specific tag (e.g. all h2 headings)

titles = soup.find_all('h2')

# Extract text content from each H2 element

for title in titles:
    print(title.text)
