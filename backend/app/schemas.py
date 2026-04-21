from pydantic import BaseModel, Field


class OptimalPlay(BaseModel):
    action: str = "Review"
    frequency: str = "0.0%"
    ev: str = "Pending"
    equity: str = "Pending"


class HandAction(BaseModel):
    id: str
    street: str
    position: str
    action: str
    amount: str | None = None


class HandCreate(BaseModel):
    name: str
    summary: str
    hero_position: str = Field(alias="heroPosition")
    hero_cards: list[str] = Field(alias="heroCards")
    board: list[str]
    notes: str = ""
    actions: list[HandAction]


class Hand(HandCreate):
    id: str
    result: str = "Created"
    pot: str = "Pending"
    optimal_play: OptimalPlay = Field(default_factory=OptimalPlay, alias="optimalPlay")

    class Config:
        populate_by_name = True
