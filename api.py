import os
import re
import sys
import urllib
from pathlib import Path
from urllib.parse import urljoin

import pyperclip
import requests
from bs4 import BeautifulSoup

file = Path("/Users/Kirill.Krylov/WebstormProjects/premiertips-front-react/src")
base_url = "https://premiertips.atlassian.net/wiki/spaces/PRA/pages/65593/REST+API"
url = "https://premiertips.atlassian.net/wiki/plugins/viewsource/viewpagesrc.action?pageId=65593"

OKGREEN = "\033[92m"
FAIL = "\033[91m"
ENDC = "\033[0m"

headers = {
    "cookie": "JSESSIONID=F181F1AABFD2D4F6ADEF9F03B7073E70; ajs_anonymous_id=%2205ebd3e7-02f4-4ad7-b4d2-d7ad58ed681c%22"
              "; cloud.session.token=eyJraWQiOiJzZXNzaW9uLXNlcnZpY2VcL3Byb2QtMTU5Mjg1ODM5NCIsImFsZyI6IlJTMjU2In0.eyJhc3"
              "NvY2lhdGlvbnMiOltdLCJzdWIiOiI1ZjNkNmIwNThkODllMzAwNDY2OWVkNTciLCJlbWFpbERvbWFpbiI6ImdtYWlsLmNvbSIsImltcG"
              "Vyc29uYXRpb24iOltdLCJjcmVhdGVkIjoxNjQ5MzI3MDExLCJyZWZyZXNoVGltZW91dCI6MTY1MjU3MDQ1NiwidmVyaWZpZWQiOnRydW"
              "UsImlzcyI6InNlc3Npb24tc2VydmljZSIsInNlc3Npb25JZCI6IjYyODEzODc1LWJmNWItNGNhMy1hMGNkLTRhMmEyYWQyMWY3YyIsIn"
              "N0ZXBVcHMiOltdLCJhdWQiOiJhdGxhc3NpYW4iLCJuYmYiOjE2NTI1Njk4NTYsImV4cCI6MTY1NTE2MTg1NiwiaWF0IjoxNjUyNTY5OD"
              "U2LCJlbWFpbCI6Im1ybS5raWtsbEBnbWFpbC5jb20iLCJqdGkiOiI2MjgxMzg3NS1iZjViLTRjYTMtYTBjZC00YTJhMmFkMjFmN2MifQ"
              ".M_RsPuuVeneBA_h4Qh30nONdfGnSUzGQkRGXYK8rEvrFP_kTe68z0RQmMdn8zOv14bdXZ35GThIkuWRxoCciwGDItl4c5FypnLznhVB"
              "5siBwSX2TzbOzaIcL6ggRF4UYipgmd1WqU6peF1hDF9vQ4YCW_3Zy0EWn7u9j4WiJnc2-SrPzAiyukQQlnn5G2qQxc5bTv0i36eiqVy3"
              "NMz9kakxmH9KskJP9B_DbHRcGCIEVGFiCNvxq7Q5yFcJmaIzkesSbyWLoel8IaMs2qx77tu9ytMY0pIGS-Y_Kk-_TyUAtc7tV5pt4jG6"
              "CTnFP-wqIunw5qaG09_aggn6P7jqujg"
}


def save_page(_url, page_path='page'):
    # noinspection PyShadowingNames,SpellCheckingInspection
    def save_rename(soup, pagefolder, session, url, tag, inner):
        if not os.path.exists(pagefolder):  # create only once
            os.mkdir(pagefolder)
        for res in soup.findAll(tag):  # images, css, etc..
            if res.has_attr(inner):  # check inner tag (file object) MUST exists
                try:
                    filename, ext = os.path.splitext(os.path.basename(res[inner]))  # get name and extension
                    filename = re.sub('\W+', '', filename) + ext  # clean special chars from name
                    fileurl = urljoin(url, res.get(inner))
                    filepath = os.path.join(pagefolder, filename)
                    # rename html ref so can move html and folder of files anywhere
                    res[inner] = os.path.join(os.path.basename(pagefolder), filename)
                    if not os.path.isfile(filepath):  # was not downloaded
                        with open(filepath, 'wb') as file:
                            filebin = session.get(fileurl)
                            file.write(filebin.content)
                except Exception as exc:
                    print(exc, file=sys.stderr)

    session = requests.Session()
    session.headers.update(headers)
    # ... whatever other requests config you need here
    response = session.get(_url)
    soup = BeautifulSoup(response.text, "html.parser")
    path, _ = os.path.splitext(page_path)
    pagefolder = path + '_files'  # page contents folder
    tags_inner = {'img': 'src', 'link': 'href', 'script': 'src'}  # tag&inner tags to grab
    for tag, inner in tags_inner.items():  # saves resource files and rename refs
        save_rename(soup, pagefolder, session, _url, tag, inner)
    with open(path + '.html', 'wb') as _file:  # saves modified html doc
        _file.write(bytes('<meta charset="utf-8" />\n', "utf-8"))
        _file.write(soup.prettify('utf-8'))


def parse_data(filename):
    data = []

    content = open(filename + '.html', 'r').read()
    soup = BeautifulSoup(content, "html.parser")
    for item in soup.find_all("td", {"class": "wysiwyg-macro-body"}):
        a = item.findAll('pre', text=re.compile('.*URL:.*'))
        if not a:
            continue
        pre = str(a).split("\n")
        method = pre[0][len("<pre>METHOD: "):].upper().strip()
        uri = pre[1][len("URL:"):-len("</pre>") - 1].lower().strip()

        h1 = item.findPrevious("h2")
        if not h1:
            h1 = item.findPrevious("h1")
        h1_id = str(h1)[len("<h1>"):-len("</h1>")].strip().replace(" ", "-")

        h1_id_enc = "#" + urllib.parse.quote_plus(h1_id).replace(",", "%2C")
        data.append({"method": method, "uri": uri, "name": h1_id, "id": h1_id_enc})
        # break

    res = ""
    for row in data:
        res += f"\t// {row['name']}\n" \
               f"\t// {row['method']} {base_url}{row['id']}\n" \
               f"\tTEMP: url(\"{row['uri']}\"),\n"
    return res


if __name__ == "__main__":
    save_page(url, "google")

    data = parse_data("google")
    pyperclip.copy(data)

    os.remove("google.html")
