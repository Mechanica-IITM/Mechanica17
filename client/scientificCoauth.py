#Program to do SNA for IITM profs

from lxml import html
import requests

page = requests.get('https://scholar.google.co.in/citations?view_op=view_org&hl=en&org=6479859954410285989')
tree = html.fromstring(page.content)

authors = tree.xpath("//h3/a/text()")

print ('authors:', authors)
 