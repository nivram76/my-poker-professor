from uuid import uuid4

from fastapi import FastAPI, HTTPException

from .schemas import Hand, HandCreate

app = FastAPI(title="PokerSense API")

hands: dict[str, Hand] = {}


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/hands", response_model=Hand, response_model_by_alias=True)
def create_hand(payload: HandCreate) -> Hand:
    hand = Hand(
        **payload.model_dump(by_alias=True),
        id=f"hand_{uuid4().hex[:12]}",
    )
    hands[hand.id] = hand

    return hand


@app.get("/hands/{hand_id}", response_model=Hand, response_model_by_alias=True)
def get_hand(hand_id: str) -> Hand:
    hand = hands.get(hand_id)

    if hand is None:
        raise HTTPException(status_code=404, detail="Hand not found")

    return hand
