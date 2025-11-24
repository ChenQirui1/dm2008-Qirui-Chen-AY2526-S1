import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
from waybackpy import WaybackMachineCDXServerAPI


# throttle every 5 seconds


def extract_wayback_content(original_url: str) -> dict:

    # from orginal url
    wayback = WaybackMachineCDXServerAPI(original_url, user_agent="MyAgent/1.0")

    # latest snapshot
    # snapshot = wayback.newest()

    # middle snapshots
    snapshots = wayback.snapshots()

    snapshots_list = list(snapshots)

    # get middle snapshot
    try:
        snapshot = snapshots_list[len(snapshots_list) // 2]
    except IndexError:
        snapshot = wayback.oldest()
    archive_url = snapshot.archive_url
    print("Snapshot archive URL:", archive_url)

    # extract from archive url
    # archive_url = original_url

    # Get HTML content
    response = requests.get(archive_url)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")

    # Extract title
    title = soup.title.string if soup.title else "No title"

    # Extract paragraphs text
    paragraphs = [p.get_text(strip=True) for p in soup.find_all("p")]

    # Extract tables (as HTML strings)
    tables = [
        str(table.get_text(separator="\t", strip=True))
        for table in soup.find_all("table")
    ]

    # Extract full URLs for images
    images = []
    for img in soup.find_all("img"):
        src = img.get("src")
        if src:
            full_url = urljoin(
                archive_url, src
            )  # Convert relative -> absolute within archive domain
            images.append(full_url)

    return {
        "title": title,
        "paragraphs": paragraphs,
        "tables": tables,
        "images": images,
    }


# Example usage
# url = "https://www.e-icisleri.gov.tr/Anasayfa/MulkiIdariBolumleri.aspx"
# archive_url = "https://web.archive.org/web/20150706215822/https://www.e-icisleri.gov.tr/Anasayfa/MulkiIdariBolumleri.aspx"
# archive_url = "https://web.archive.org/web/20220330042659/https://oberlingroup.org/about-oberlin-group"

archive_url = "https://oberlingroup.org/about-oberlin-group"

content = extract_wayback_content(archive_url)

print("Title:", content["title"])
print(f"\nExtracted {len(content['paragraphs'])} paragraphs:")
for p in content["paragraphs"]:
    print("-", p[:100])  # Preview first 100 chars

print(f"\nExtracted {len(content['tables'])} tables (HTML snippets)")

print(f"\nExtracted {len(content['images'])} image URLs:")
for img_url in content["images"]:
    print(img_url)

print(content["tables"])
