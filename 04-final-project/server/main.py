import asyncio
import websockets
import json
from pybottest import track_internetarchivebot_edits_with_diff
from getdiff import get_revisions_content
from getwayback import extract_wayback_content


async def fetch_and_send(websocket):

    current_record = None
    data = {}

    while True:
        revision_record = track_internetarchivebot_edits_with_diff()

        # skip the pulling
        if revision_record == current_record:
            print("No new revision found, waiting...")

        else:
            archive_url = get_revisions_content(
                revision_record["page_id"],
                revision_record["rev_id"],
                revision_record["prev_id"],
            )
            print("Fetched archive URL:", archive_url)

            data = extract_wayback_content(archive_url)

            print("Sending data:", data)

            current_record = revision_record

        await websocket.send(json.dumps([data]))

        await asyncio.sleep(5)  # throttling to avoid getting blocked


async def mock_fetch_and_send(websocket):
    while True:
        # Mock data for testing
        data = {
            "title": "Sample Title",
            "paragraphs": [
                "This is the first sample paragraph.",
                "This is the second sample paragraph.",
                "This is the third sample paragraph.",
            ],
        }

        print("Sending data:", data)

        await websocket.send(json.dumps(data))

        await asyncio.sleep(1)


async def main():
    server = await websockets.serve(fetch_and_send, "localhost", 6789)
    print("WebSocket server running on ws://localhost:6789")
    await server.wait_closed()


if __name__ == "__main__":
    asyncio.run(main())
