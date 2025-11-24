import requests
import difflib
import time
import requests
import re


def get_revisions_content(page_id: int, rev_id: int, prev_id: int):
    url = "https://en.wikipedia.org/w/api.php"

    headers = {"User-Agent": "MyAppName/1.0 (contact@example.com)"}

    # Helper function to fetch content for a single revision
    params = {
        "action": "query",
        "prop": "revisions",
        # "pageids": page_id,
        "revids": f"{prev_id}|{rev_id}",
        "rvslots": "main",
        "rvprop": "content",
        "format": "json",
    }
    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()

    data = response.json()
    page = data["query"]["pages"].get(str(page_id), {})

    # return page
    revisions = page.get("revisions", [])

    # split content into lines
    for i in range(len(revisions)):
        revisions[i] = revisions[i]["slots"]["main"]["*"].splitlines()

        # compute diff

    diff_lines = difflib.unified_diff(
        revisions[0],
        revisions[1],
        # fromfile=f"Revision {revisions[1]['revid']} (old)",
        # tofile=f"Revision {revisions[0]['revid']} (new)",
        lineterm="",
    )

    diff_result = "\n".join(diff_lines)

    # text = """Webarchive|url=https://web.archive.org/web/20150706215822/https://www.e-icisleri.gov.tr/Anasayfa/MulkiIdariBolumleri.aspx |date=2015-07-06"""

    # pattern = r"Webarchive\|url=(https:\/\/web\.archive\.org\/web\/[0-9]+\/https:\/\/www\.e-icisleri\.gov\.tr\/Anasayfa\/MulkiIdariBolumleri\.aspx)"
    # pattern = r"https:\/\/web\.archive\.org\/[^\s)]+"
    # pattern = r"\archive\|url=(https:\/\/web\.archive\.org\/[^\s|}]+)"
    pattern = r"https://web\.archive\.org[^|]*"

    match = re.search(pattern, diff_result)
    print(match)
    if match:
        print("Extracted URL:", match.group(0))

        input_string = match.group(0)

        second_pos = input_string.find("http", input_string.find("http") + 1)
        original_url = input_string[second_pos:]

        print("Original URL:", original_url)

        return original_url
    else:
        return diff_result


if __name__ == "__main__":
    content_rev = get_revisions_content(1620995, 1320878311, 1287485911)
    print(content_rev)
