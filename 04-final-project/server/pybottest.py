import re
import pywikibot
from pywikibot.data.api import Request


def track_internetarchivebot_edits_with_diff() -> dict:
    site = pywikibot.Site("en", "wikipedia")
    user = "InternetArchiveBot"

    # Fetch user contributions (last 1 edits)
    contributions = site.usercontribs(user, total=10)
    # print(contributions)

    for contri in contributions:
        pageid = contri.get("pageid")
        rev_id = contri.get("revid")
        prev_id = contri.get("parentid")
        # print(f"Processing page ID: {pageid}, rev ID: {rev_id}, prev ID: {prev_id}")

    print(f"Processing page ID: {pageid}, rev ID: {rev_id}, prev ID: {prev_id}")
    return {"page_id": pageid, "rev_id": rev_id, "prev_id": prev_id}
    # fetch user contrib for last 10 edits
    # contributions = site.usercontribs(user, total=10)

    # for contrib in contributions:
    #     # use numeric ids where appropriate to avoid creating a Page with a numeric
    #     # title (which can lead to InconsistentTitleError when querying revisions)
    #     pageid = contrib.get("pageid")
    #     rev_id = contrib.get("revid")
    #     prev_id = contrib.get("parentid")
    #     print(f"Processing page ID: {pageid}, rev ID: {rev_id}, prev ID: {prev_id}")

    # Construct Page using pageid when available. Fall back to title if not.
    # if pageid:
    #     try:
    #         page_obj = pywikibot.Page(site, pageid=int(pageid))
    #     except Exception:
    #         # Fallback: try using the title stored in the contrib (if present)
    #         page_obj = pywikibot.Page(site, contrib.get("title") or str(pageid))
    # else:
    #     page_obj = pywikibot.Page(site, contrib.get("title") or "")

    # curr_text = fetch_revision_text(site, rev_id)
    # prev_text = fetch_revision_text(site, prev_id)

    # if curr_text == "" and prev_text == "":
    #     print(f"No content available for revids {prev_id} -> {rev_id}; skipping")
    #     continue

    # Extract ref blocks that contain archive-url in either old or new text
    # prev_refs = [r for r in get_ref_blocks(prev_text) if ref_has_archive_url(r)]
    # curr_refs = [r for r in get_ref_blocks(curr_text) if ref_has_archive_url(r)]

    # # Print archive-url ref diffs (if any)
    # if prev_refs or curr_refs:
    #     # Prepare unified diff between previous and current ref lists
    #     prev_joined = "\n\n".join(prev_refs) if prev_refs else ""
    #     curr_joined = "\n\n".join(curr_refs) if curr_refs else ""
    #     diff_lines = difflib.unified_diff(
    #         prev_joined.splitlines(),
    #         curr_joined.splitlines(),
    #         lineterm="",
    #         fromfile=f"pageid:{pageid}@oldid={prev_id}",
    #         tofile=f"pageid:{pageid}@oldid={rev_id}",
    #     )
    #     print(
    #         f"\n=== archive-url <ref> diff for pageid={pageid} (rev {prev_id} -> {rev_id}) ==="
    #     )
    #     printed_any = False
    #     for line in diff_lines:
    #         printed_any = True
    #         print(line)
    #     if not printed_any:
    #         print("(no differences in archive-url <ref> blocks)")

    # Example: if user wants to list all ref links for this page object, call:
    # show_all_ref_links_for_page(page_obj, site=site, pageid=pageid)

    # try:
    #     # Fetch current revision text
    #     curr_text = page_obj.getOldVersion(rev_id)
    #     # Fetch previous revision text
    #     prev_text = page_obj.getOldVersion(prev_id)
    #     # Basic diff logic (unified diff, or you can use difflib for a nicer output)
    #     import difflib

    #     diff = difflib.unified_diff(
    #         prev_text.splitlines(),
    #         curr_text.splitlines(),
    #         lineterm="",
    #         fromfile=f"{page}@oldid={prev_id}",
    #         tofile=f"{page}@oldid={rev_id}",
    #     )
    #     print(f"\n=== Diff for {page} (rev {rev_id}) ===")
    #     for line in diff:
    #         print(line)
    # except Exception as e:
    #     print(f"Error fetching diff for {page}: {e}")


# Processing page ID: 12409311, rev ID: 1320875647, prev ID: 1312346031

if __name__ == "__main__":
    track_internetarchivebot_edits_with_diff()
